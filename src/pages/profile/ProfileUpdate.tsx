import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/UseAuth';
import { useUserProfile } from '@/hooks/useUserProfile';
import { User } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Routes } from '@/lib/routes';

const ProfileUpdate: React.FC = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: userProfile } = useUserProfile();
  const { isAuthenticated } = useAuth();

  const [formData, setFormData] = useState<User>({
    id: userProfile?.id || 0,
    name: userProfile?.name || '',
    username: userProfile?.username || '',
    profileImage: userProfile?.profileImage || '',
    bio: userProfile?.bio || '',
    location: userProfile?.location || '',
    gender: userProfile?.gender || '',
    age: userProfile?.age || 0,
    pincode: userProfile?.pincode || 0,
    phone: userProfile?.phone || 0,
    createdAt: userProfile?.createdAt || '',
    updatedAt: userProfile?.updatedAt || '',
    followers: userProfile?.followers || 0,
    following: userProfile?.following || 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Implement API call to update profile
      console.log('Updating profile with:', formData);
      navigate(-1); // Go back
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(Routes.AuthLoginPage, {
        state: { from: location },
        replace: true,
      });
    }
  }, [isAuthenticated, navigate, location]);

  if (!isAuthenticated) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="mb-8">
          <p className="text-sm text-gray-500">
            Last updated:{' '}
            {formData.updatedAt
              ? new Date(formData.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : 'N/A'}
          </p>
          <p className="text-sm text-gray-500">
            Account created:{' '}
            {formData.createdAt
              ? new Date(formData.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : 'N/A'}
          </p>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Update Profile</h1>
          <p className="text-sm text-gray-500">Update your profile information</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Image Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Profile Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-32 h-32">
                  <img
                    src={formData.profileImage || '/default-avatar.png'}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover border-2 border-white shadow-lg"
                  />
                  <div className="absolute bottom-0 right-0 bg-white/90 rounded-full p-1 shadow">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => {
                          if (e.target.files && e.target.files[0]) {
                            const reader = new FileReader();
                            reader.onload = event => {
                              setFormData(prev => ({
                                ...prev,
                                profileImage: event.target?.result as string,
                              }));
                            };
                            reader.readAsDataURL(e.target.files[0]);
                          }
                        }}
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-blue-500 hover:text-blue-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </label>
                  </div>
                </div>
                <p className="text-sm text-gray-500 text-center">
                  Click the camera icon to upload a new profile image
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself"
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter your location"
                />
              </div>

              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={formData.gender}
                  onValueChange={value =>
                    handleChange({ target: { name: 'gender', value } } as any)
                  }
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

              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter your age"
                />
              </div>

              <div>
                <Label htmlFor="pincode">Pincode</Label>
                <Input
                  id="pincode"
                  name="pincode"
                  type="number"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Enter your pincode"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              onClick={() => navigate(-1)}
              variant="outline"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-white">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate;
