import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../hooks/UseAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Upload, ImagePlus, X } from 'lucide-react';
import { useUploadProduct } from '@/query/hooks/useUploadProduct';
import { uploadProductSchema } from '@/lib/validation-schemas';
import type { z } from 'zod';

const categories = [
  'Painting',
  'Digital Art',
  'Photography',
  'Sculpture',
  'Illustration',
  'Other'
] as const;

interface ProductFormData {
  title: string;
  description: string;
  price: string;
  category: string;
  images: File[];
  previewUrls: string[];
}
type FormData = z.infer<typeof uploadProductSchema>;

const UploadProduct = () => {
  const { userProfile } = useAuth();
  const { mutate: uploadProduct, isPending: isUploading } = useUploadProduct();
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm<FormData>({
    resolver: zodResolver(uploadProductSchema),
    defaultValues: {
      title: '',
      description: '',
      price: '',
      category: '',
      images: []
    }
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Filter only image files
    const newImageFiles = files.filter((file): file is File => 
      file instanceof File && file.type.startsWith('image/')
    );
    
    if (newImageFiles.length === 0) return;
    
    // Create preview URLs
    const newPreviewUrls = newImageFiles.map(file => URL.createObjectURL(file));
    
    // Update state
    setImageFiles(prev => [...prev, ...newImageFiles]);
    setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    
    // Update form values
    setValue('images', [...imageFiles, ...newImageFiles].map(file => file.name), {
      shouldValidate: true
    });
  };

  const removeImage = (index: number) => {
    // Revoke the object URL to prevent memory leaks
    const urlToRevoke = previewUrls[index];
    if (urlToRevoke) {
      URL.revokeObjectURL(urlToRevoke);
    }
    
    // Update states
    const newImageFiles = [...imageFiles];
    const newPreviewUrls = [...previewUrls];
    
    newImageFiles.splice(index, 1);
    newPreviewUrls.splice(index, 1);
    
    setImageFiles(newImageFiles);
    setPreviewUrls(newPreviewUrls);
    
    // Update form values
    setValue('images', newImageFiles.map(file => file.name), {
      shouldValidate: true
    });
  };

  const uploadImages = async (files: File[]): Promise<string[]> => {
    // TODO: Replace with your actual image upload logic
    // This is a placeholder that simulates an upload
    const uploadPromises = files.map(async (file) => {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real app, you would upload the file to your server here
      // and return the URL from the server response
      return URL.createObjectURL(file);
    });
    
    return Promise.all(uploadPromises);
  };

  const onSubmit = async (data: FormData) => {
    try {
      // First upload all images
      const imageUrls = await uploadImages(imageFiles);
      
      // Then submit the product data with image URLs
      uploadProduct({
        ...data,
        price: parseFloat(data.price),
        images: imageUrls,
      }, {
        onSuccess: () => {
          // Reset form after successful submission
          reset();
          setImageFiles([]);
          setPreviewUrls([]);
          
          toast.success('Your artwork has been uploaded successfully!');
        },
        onError: () => {
          toast.error('Failed to upload artwork. Please try again.');
        }
      });
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Failed to upload images. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Upload Artwork</CardTitle>
          <CardDescription>
            Share your creative work with the ArtMart community
          </CardDescription>
          {errors.images && (
            <p className="text-sm text-red-500">{errors.images.message}</p>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Upload Images */}
            <div className="space-y-2">
              <Label htmlFor="images">Artwork Images *</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {/* Image Previews */}
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove image"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                
                {/* Upload Button */}
                {imageFiles.length < 5 && (
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <ImagePlus className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">
                      {imageFiles.length > 0 ? 'Add more' : 'Upload images'}
                    </span>
                    <input
                      id="image-upload"
                      type="file"
                      className="hidden"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </div>
              <p className="text-xs text-gray-500">
                Upload up to 5 images (max 5MB each)
              </p>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="Enter artwork title"
                {...register('title')}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Tell us about your artwork..."
                rows={4}
                {...register('description')}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price">Price (₹) *</Label>
                <div className="relative">
                  <Input
                    id="price"
                    type="number"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="pl-8"
                    {...register('price')}
                  />
                  <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                </div>
                {errors.price && (
                  <p className="text-sm text-red-500">{errors.price.message}</p>
                )}
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  onValueChange={(value) => setValue('category', value, { shouldValidate: true })}
                  {...register('category')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-red-500">{errors.category.message}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full md:w-auto"
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Artwork
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadProduct;
