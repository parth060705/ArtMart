import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/user/auth/UseAuth';
import { useUserProfile } from '@/hooks/user/auth/useUserProfile';
import { User, UserUpdate } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Routes } from '@/lib/routes';
import { useLocation } from 'react-router-dom';
import { useUserProfileImageUpdate } from '@/hooks/user/useUserProfileImageUpdate';
import { useUserProfileUpdate } from '@/hooks/user/useUserProfileUpdate';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Loader2, Save, X } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { data: userProfile, isLoading } = useUserProfile();
  const { isAuthenticated } = useAuth();

  // Show loading state while user profile is being fetched
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Image update state and handlers
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const { mutateAsync: updateProfileImage, isPending: isUpdatingImage } = useUserProfileImageUpdate();

  // Profile data update
  const { mutateAsync: updateProfile, isPending: isUpdating } = useUserProfileUpdate();

  // Form state
  const [userData, setUserData] = useState<UserUpdate>({
    name: '',
    username: '',
    bio: '',
    location: '',
    gender: '',
    age: 0,
    pincode: 0,
    phone: 0,
  });

  // Initialize form data when userProfile is loaded
  useEffect(() => {
    if (userProfile) {
      setUserData({
        name: userProfile.name || '',
        username: userProfile.username || '',
        bio: userProfile.bio || '',
        location: userProfile.location || '',
        gender: userProfile.gender || '',
        age: userProfile.age || 0,
        pincode: userProfile.pincode || 0,
        phone: userProfile.phone || 0,
      });

      if (userProfile.profileImage) {
        setImagePreview(userProfile.profileImage);
      }
    }
  }, [userProfile]);

  // Update form data
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle image upload
  const handleImageUpload = async () => {
    if (!selectedImage) return;

    try {
      await updateProfileImage({ image: selectedImage });
      setSelectedImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error updating profile image:', error);
    }
  };

  // Handle profile data update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(userData);
      // Invalidate user profile query to refetch the updated data
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] });
      navigate(-1); // Go back to previous page
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  useEffect(() => {
    // Redirect if user is not authenticated
    if (!isAuthenticated) {
      navigate(`/${Routes.AuthLoginPage}`, {
        state: { from: location },
        replace: true
      });
    }
  }, [isAuthenticated, navigate, location]);

  // If user is not authenticated, redirect to login (handled by useEffect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Profile Image Update Card */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-32 w-32">
                <AvatarImage
                  src={imagePreview || userProfile?.profileImage || '/default-avatar.png'}
                  alt={userProfile?.name || 'User'}
                />
                <AvatarFallback>
                  {userProfile?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <label
                htmlFor="profile-image"
                className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-primary/90 transition-colors"
                title="Change profile picture"
              >
                <Camera className="h-5 w-5" />
                <span className="sr-only">Change profile picture</span>
              </label>
              <input
                id="profile-image"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>

            {selectedImage && (
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedImage(null);
                    setImagePreview('');
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                  }}
                  disabled={isUpdatingImage}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button
                  onClick={handleImageUpload}
                  disabled={isUpdatingImage}
                >
                  {isUpdatingImage ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Profile Data Update Card */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <p className="text-sm text-muted-foreground">
            Update your account's profile information and email address.
          </p>
        </CardHeader>
        <CardContent>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <Label htmlFor="name">Full Name</Label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={userData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Username */}
              <div>
                <Label htmlFor="username">Username</Label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    value={userData.username}
                    onChange={handleChange}
                    placeholder="Enter username"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="md:col-span-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={userData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself"
                  className="min-h-[100px]"
                />
              </div>

              {/* Location */}
              <div>
                <Label htmlFor="location">Location</Label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <Input
                    id="location"
                    name="location"
                    type="text"
                    value={userData.location}
                    onChange={handleChange}
                    placeholder="Enter your location"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={userData.gender}
                  onValueChange={(value) => handleChange({ target: { name: 'gender', value } } as any)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Age */}
              <div>
                <Label htmlFor="age">Age</Label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    value={userData.age}
                    onChange={handleChange}
                    placeholder="Enter your age"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Pincode */}
              <div>
                <Label htmlFor="pincode">Pincode</Label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <Input
                    id="pincode"
                    name="pincode"
                    type="number"
                    value={userData.pincode}
                    onChange={handleChange}
                    placeholder="Enter your pincode"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="phone">Phone</Label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={userData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 col-span-full">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                  disabled={isUpdating}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[var(--primary)] hover:bg-[var(--primary)]/90"
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileUpdate;
