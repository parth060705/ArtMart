import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/user/auth/UseAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Upload, ImagePlus, X } from 'lucide-react';
import { useUploadProduct } from '@/hooks/useUploadProduct';
import { uploadProductSchema } from '@/lib/validation-schemas';
import type { z } from 'zod';
import { Routes } from '@/lib/routes';
import LoadingSpinner from '@/components/LoadingSpinner';

const categories = [
  'Painting',
  'Digital Art',
  'Sculpture',
  'Illustration',
  'Sketch',
] as const;

type FormData = z.infer<typeof uploadProductSchema>;

const UploadArtwork = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { mutate: uploadProduct, isPending: isUploading } = useUploadProduct();
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [forSale, setForSale] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(uploadProductSchema) as any, // Type assertion to fix the resolver type
    defaultValues: {
      images: [],
      title: '',
      description: '',
      price: '',
      category: '',
      quantity: '',
      tags: [],
      forSale: false,
    }
  });

  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = form;

  const watchForSale = watch('forSale');

  const SUPPORTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/avif'
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validImageFiles: File[] = [];
    const invalidFiles: string[] = [];

    files.forEach(file => {
      if (file instanceof File) {
        if (file.type.startsWith('image/')) {
          if (SUPPORTED_IMAGE_TYPES.includes(file.type)) {
            validImageFiles.push(file);
          } else {
            invalidFiles.push(file.name);
          }
        }
      }
    });

    if (invalidFiles.length > 0) {
      toast.error(
        `The following files are not supported: ${invalidFiles.join(', ')}. ` +
        'Supported formats: JPG, PNG, WebP, GIF, AVIF'
      );
    }

    if (validImageFiles.length === 0) return;

    const totalFiles = imageFiles.length + validImageFiles.length;
    if (totalFiles > 5) {
      toast.error('You can upload a maximum of 5 images');
      return;
    }

    const newPreviewUrls = validImageFiles.map(file => URL.createObjectURL(file));

    setImageFiles(prev => [...prev, ...validImageFiles]);
    setPreviewUrls(prev => [...prev, ...newPreviewUrls]);

    setValue('images', [...imageFiles, ...validImageFiles].map(file => file.name), {
      shouldValidate: true
    });
  };

  const removeImage = (index: number) => {
    const urlToRevoke = previewUrls[index];
    if (urlToRevoke) {
      URL.revokeObjectURL(urlToRevoke);
    }

    const newImageFiles = [...imageFiles];
    const newPreviewUrls = [...previewUrls];

    newImageFiles.splice(index, 1);
    newPreviewUrls.splice(index, 1);

    setImageFiles(newImageFiles);
    setPreviewUrls(newPreviewUrls);

    setValue('images', newImageFiles.map(file => file.name), {
      shouldValidate: true
    });
  };

  const onSubmit = async (data: FormData) => {
    console.log('Form submitted with data:', data);
    console.log('Image files:', imageFiles);

    if (!isAuthenticated) {
      console.error('User not authenticated');
      toast.error('Please log in to upload artwork');
      return;
    }

    if (imageFiles.length === 0) {
      console.error('No images uploaded');
      toast.error('Please upload at least one image');
      return;
    }

    try {
      let priceValue: number | undefined;
      let quantityValue: number | undefined;

      if (data.forSale) {
        if (!data.price) {
          toast.error('Price is required for items marked for sale');
          return;
        }
        priceValue = parseFloat(data.price);
        if (isNaN(priceValue) || priceValue <= 0) {
          toast.error('Please enter a valid price');
          return;
        }

        if (!data.quantity) {
          toast.error('Quantity is required for items marked for sale');
          return;
        }
        quantityValue = parseInt(data.quantity, 10);
        if (isNaN(quantityValue) || quantityValue <= 0) {
          toast.error('Please enter a valid quantity');
          return;
        }
      }

      const productData = {
        title: data.title,
        description: data.description,
        price: priceValue || 0,
        tags: data.tags,
        category: data.category,
        quantity: quantityValue || 1,
        forSale: data.forSale,
        files: imageFiles
      };

      console.log('Uploading product with data:', productData);
      try {
        uploadProduct(productData, {
          onSuccess: (response) => {
            console.log('Upload successful:', response);
            toast.success('Artwork uploaded successfully!');
            reset();
            setImageFiles([]);
            setPreviewUrls([]);
            // Optionally navigate to the artwork page or home
            // navigate('/');
          },
          onError: (error) => {
            console.error('Error uploading artwork:', error);
            toast.error(error.message || 'Failed to upload artwork. Please try again.');
          }
        });
      } catch (error) {
        console.error('Unexpected error in upload process:', error);
        toast.error('An unexpected error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error in form submission:', error);
      toast.error('An unexpected error occurred');
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(Routes.AuthLoginPage, { state: { from: location } });
    }
  }, [isAuthenticated, navigate, location]);

  if (!isAuthenticated) return null;

  return (
    <div className="container mx-auto md:px-4 md:py-8 max-w-4xl mb-24 md:mb-0">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Upload Artwork</CardTitle>
          <CardDescription>
            Share your creative work with the Auroraa community
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
              <Label htmlFor="description">Description</Label>
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

            {/* Tags */}
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                placeholder="#abstract, #colorful"
                onChange={(e) => {
                  const inputTags = e.target.value
                    .split(',')
                    .map(tag => tag.trim())
                    .filter(tag => tag.length > 0);

                  setValue('tags', inputTags, { shouldValidate: true });
                }}
              />
              {errors.tags && (
                <p className="text-sm text-red-500">{errors.tags.message}</p>
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

            {/* For Sale Toggle */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="forSale"
                {...register('forSale')}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="forSale">This artwork is for sale</Label>
            </div>

            {watchForSale && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
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

                {/* Quantity */}
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="1"
                    min="1"
                    {...register('quantity')}
                  />
                  {errors.quantity && (
                    <p className="text-sm text-red-500">{errors.quantity.message}</p>
                  )}
                </div>
              </div>
            )}

            {/* Submit */}
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full md:w-auto"
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <LoadingSpinner />
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

export default UploadArtwork;