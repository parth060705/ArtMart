import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Upload, ImagePlus, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUploadProduct } from '@/hooks/useUploadProduct';
import { uploadProductSchema } from '@/lib/validation-schemas';
import { Routes } from '@/lib/routes';
import LoadingSpinner from '@/components/LoadingSpinner';
import { IPostFormProps, PostCategories, SUPPORTED_IMAGE_TYPES } from '@/lib/types';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/hooks/user/auth/UseAuth';
import { useUpdateArtwork } from '@/hooks/useUpdateArtwork';
import { useUploadArtworkImages } from '@/hooks/useUploadArtworkImages';
import { useUpdateArtworkImages } from '@/hooks/useUpdateArtworkImages';
import { useDeleteArtworkImage } from '@/hooks/useDeleteArtworkImage';

const PostForm: React.FC<IPostFormProps> = ({
    type,
    defaultValues
}) => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);
    const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
    const [deletingImageUrl, setDeletingImageUrl] = useState<string | null>(null);
    const [uploadingNewImages, setUploadingNewImages] = useState(false);

    const { mutate: uploadProduct, isPending: isUploadArtworkPending } = useUploadProduct();
    const { mutate: updateArtwork, isPending: isUpdateArtworkPending } = useUpdateArtwork(id || '');
    const { mutate: deleteImage, isPending: isDeleteImagePending } = useDeleteArtworkImage(id || '');
    const { mutate: uploadArtworkImages, isPending: isUploadArtworkImagesPending } = useUploadArtworkImages(id || '');

    const form = useForm<z.infer<typeof uploadProductSchema>>({
        resolver: zodResolver(uploadProductSchema),
        defaultValues: {
            title: defaultValues?.title || '',
            description: defaultValues?.description || '',
            category: defaultValues?.category || '',
            price: defaultValues?.price || '0',
            quantity: defaultValues?.quantity || '1',
            tags: defaultValues?.tags || '',
            forSale: defaultValues?.forSale || false,
            images: defaultValues?.images || [],
        }
    })

    useEffect(() => {
        if (defaultValues?.title) {
            form.reset({
                title: defaultValues.title,
                description: defaultValues.description || '',
                category: defaultValues.category || '',
                price: defaultValues.price || '0',
                quantity: defaultValues.quantity || '1',
                tags: defaultValues.tags || '',
                forSale: defaultValues.forSale || false,
                images: defaultValues.images || [],
            });
        }

        if (type === 'edit' && defaultValues?.images && defaultValues.images.length > 0) {
            // For edit mode, images are URLs
            const urls = defaultValues.images.map((img: any) =>
                typeof img === 'string' ? img : img.url
            );
            setExistingImageUrls(urls);
            setPreviewUrls(urls);
        } else if (type === 'upload' && defaultValues?.images && defaultValues.images.length > 0) {
            setPreviewUrls(defaultValues.images);
        }
    }, [defaultValues, form, type]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const validImageFiles: File[] = [];
        const invalidFiles: string[] = [];

        files.forEach(file => {
            if (file instanceof File) {
                if (file.type.startsWith('image/')) {
                    if (Object.values(SUPPORTED_IMAGE_TYPES).includes(file.type as SUPPORTED_IMAGE_TYPES)) {
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
                'Supported formats: JPG, PNG, WebP'
            );
        }

        if (validImageFiles.length === 0) return;

        const totalFiles = previewUrls.length + validImageFiles.length;
        if (totalFiles > 5) {
            toast.error('You can upload a maximum of 5 images');
            return;
        }

        const newPreviewUrls = validImageFiles.map(file => URL.createObjectURL(file));

        if (type === 'edit') {
            // For edit mode, track new files separately
            setNewImageFiles(prev => [...prev, ...validImageFiles]);
            setUploadingNewImages(true);
        } else {
            // For upload mode, use imageFiles
            setImageFiles(prev => [...prev, ...validImageFiles]);
        }

        setPreviewUrls(prev => [...prev, ...newPreviewUrls]);

        const allImages = type === 'edit'
            ? [...existingImageUrls, ...newImageFiles, ...validImageFiles].map((file, idx) =>
                file instanceof File ? file.name : `existing-${idx}`
            )
            : [...imageFiles, ...validImageFiles].map(file => file.name);

        form.setValue('images', allImages, {
            shouldValidate: true
        });
    };

    const removeImage = (index: number) => {
        const urlToRemove = previewUrls[index];

        if (type === 'edit') {
            // Check if it's an existing URL or a new file
            const isExistingImage = existingImageUrls.includes(urlToRemove);

            if (isExistingImage) {
                // It's an existing image from API - use delete hook
                setDeletingImageUrl(urlToRemove);

                const imagePublicId = defaultValues?.images.find((img: any) => img.url === urlToRemove)?.public_id;
                
                const formData = new FormData();
                formData.append('public_id', imagePublicId);

                // Call the delete API
                deleteImage(formData, {
                    onSuccess: () => {
                        // Remove from existing URLs after successful deletion
                        const newExistingUrls = existingImageUrls.filter(url => url !== urlToRemove);
                        setExistingImageUrls(newExistingUrls);

                        // Remove from preview
                        const newPreviewUrls = previewUrls.filter(url => url !== urlToRemove);
                        setPreviewUrls(newPreviewUrls);

                        setDeletingImageUrl(null);
                        toast.success('Image deleted successfully');
                    },
                    onError: (error) => {
                        setDeletingImageUrl(null);
                        toast.error(error.message || 'Failed to delete image');
                    }
                });
            } else {
                // It's a new file, just remove from local state
                URL.revokeObjectURL(urlToRemove);
                const newFileIndex = previewUrls.slice(0, index).filter(url => !existingImageUrls.includes(url)).length;
                const updatedNewFiles = [...newImageFiles];
                updatedNewFiles.splice(newFileIndex, 1);
                setNewImageFiles(updatedNewFiles);

                // Remove from preview
                const newPreviewUrls = [...previewUrls];
                newPreviewUrls.splice(index, 1);
                setPreviewUrls(newPreviewUrls);

                toast.success('Image removed');
            }
        } else {
            // Upload mode - original logic
            if (urlToRemove && urlToRemove.startsWith('blob:')) {
                URL.revokeObjectURL(urlToRemove);
            }
            const newImageFilesArray = [...imageFiles];
            newImageFilesArray.splice(index, 1);
            setImageFiles(newImageFilesArray);

            const newPreviewUrls = [...previewUrls];
            newPreviewUrls.splice(index, 1);
            setPreviewUrls(newPreviewUrls);
        }

        const allImages = type === 'edit'
            ? previewUrls.filter((_, idx) => idx !== index).map((url, idx) =>
                existingImageUrls.includes(url) ? `existing-${idx}` : `new-${idx}`
            )
            : imageFiles.map((file) => file.name);

        form.setValue('images', allImages, {
            shouldValidate: true
        });
    };

    const handleEditSubmit = async (productData: any) => {
        // First, update the artwork metadata
        const metadataFormData = new FormData();
        Object.entries(productData).forEach(([key, value]) => {
            if (key !== 'images' && value !== undefined && value !== null) {
                if (key === 'tags' && Array.isArray(value)) {
                    metadataFormData.append('tags', value.join(','));
                } else {
                    metadataFormData.append(key, String(value));
                }
            }
        });

        // Update artwork metadata first
        updateArtwork(metadataFormData, {
            onSuccess: async (response) => {
                // Upload new images if any
                if (newImageFiles.length > 0) {
                    const newImagesFormData = new FormData();
                    newImageFiles.forEach(file => {
                        newImagesFormData.append('files', file);
                    });

                    uploadArtworkImages(newImagesFormData, {
                        onSuccess: () => {
                            setUploadingNewImages(false);
                            toast.success('Artwork and images updated successfully!');
                            navigate(`/${Routes.ProductDetailPage}/${response.id}`);
                            setNewImageFiles([]);
                            setPreviewUrls([]);
                            setExistingImageUrls([]);
                        },
                        onError: (error) => {
                            setUploadingNewImages(false);
                            toast.error(error.message || 'Failed to upload new images.');
                        }
                    });
                } else {
                    toast.success('Artwork updated successfully!');
                    navigate(`/${Routes.ProductDetailPage}/${response.id}`);
                }
            },
            onError: (error) => {
                toast.error(error.message || 'Failed to update artwork. Please try again.');
            }
        });
    };

    const validate = () => {
        const productData = form.getValues();

        try {
            if (type === 'upload') {
                const formData = new FormData();

                imageFiles.forEach((file) => {
                    formData.append('files', file);
                });

                Object.entries(productData).forEach(([key, value]) => {
                    if (key !== 'images' && value !== undefined && value !== null) {
                        if (key === 'tags' && Array.isArray(value)) {
                            formData.append('tags', value.join(','));
                        } else if (key === 'price') {
                            formData.append('price', '0');
                        } else {
                            formData.append(key, String(value));
                        }
                    }
                });

                uploadProduct(formData, {
                    onSuccess: (response) => {
                        toast.success('Artwork uploaded successfully!');
                        if (response) {
                            navigate(`/${Routes.ProductDetailPage}/${response.artwork.id}`);
                        }
                        setImageFiles([]);
                        setPreviewUrls([]);
                    },
                    onError: (error) => {
                        toast.error(error.message || 'Failed to upload artwork. Please try again.');
                    }
                });
            } else {
                handleEditSubmit(productData);
            }
        } catch (error) {
            toast.error('An unexpected error occurred. Please try again.');
        }
    }

    const isLoading = isUploadArtworkPending || isUpdateArtworkPending ||
        isDeleteImagePending || isUploadArtworkImagesPending;

    return (
        <div className="container mx-auto md:px-4 md:py-8 max-w-4xl mb-24 md:mb-0">
            <Card className="border-0 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                        {type === 'upload' ? 'Upload Artwork' : 'Edit Artwork'}
                    </CardTitle>
                    {type === 'edit' ? (
                        <CardDescription>
                            Edit your artwork details
                        </CardDescription>
                    ) : (
                        <CardDescription>
                            Share your creative work with the Auroraa community
                        </CardDescription>
                    )}
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(validate)} className="space-y-6">
                            {/* Upload Images */}
                            <div className="space-y-2">
                                <Label htmlFor="images">Artwork Images *</Label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                    {previewUrls.map((url: string, index: number) => {
                                        const isExistingImage = type === 'edit' && existingImageUrls.includes(url);
                                        const isDeleting = deletingImageUrl === url;
                                        const isNewImage = type === 'edit' && !isExistingImage;

                                        return (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={url}
                                                    alt={`Preview ${index + 1}`}
                                                    className={`w-full h-32 object-cover rounded-lg transition-opacity ${isDeleting ? 'opacity-50' : ''
                                                        }`}
                                                />

                                                {/* Deleting Overlay for API Images */}
                                                {isDeleting && (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                                                        <div className="flex flex-col items-center">
                                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mb-1"></div>
                                                            <span className="text-white text-xs">Deleting...</span>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* New Image Badge */}
                                                {isNewImage && (
                                                    <div className="absolute top-1 left-1 bg-green-500 text-white text-xs px-2 py-0.5 rounded">
                                                        New
                                                    </div>
                                                )}

                                                {/* Remove Button */}
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    disabled={isDeleting}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                                                    aria-label="Remove image"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        );
                                    })}

                                    {previewUrls.length < 5 && (
                                        <label
                                            htmlFor="image-upload"
                                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                                        >
                                            <ImagePlus className="h-8 w-8 text-gray-400 mb-2" />
                                            <span className="text-sm text-gray-500">
                                                {previewUrls.length > 0 ? 'Add more' : 'Upload images'}
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
                                <div className="flex items-center space-x-2">
                                    <p className="text-xs text-gray-500">
                                        Max 5 images
                                    </p>
                                    {uploadingNewImages && newImageFiles.length > 0 && (
                                        <p className="text-xs text-green-600 flex items-center">
                                            <span className="inline-block w-2 h-2 bg-green-600 rounded-full mr-1 animate-pulse"></span>
                                            {newImageFiles.length} new image{newImageFiles.length > 1 ? 's' : ''} to upload
                                        </p>
                                    )}
                                    {form.formState.errors.images && (
                                        <p className="text-sm text-red-500">{form.formState.errors.images.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Title */}
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="title"
                                                placeholder="Enter artwork title"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            {/* Description */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                id="description"
                                                placeholder="Tell us about your artwork..."
                                                rows={4}
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            {/* Tags */}
                            <FormField
                                control={form.control}
                                name="tags"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tags</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                id="tags"
                                                placeholder="Tags (comma separated)"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            {/* Category */}
                            {type === 'upload' && (
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {Object.values(PostCategories).map((category) => (
                                                            <SelectItem key={category} value={category}>
                                                                {category}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            )}

                            <div className='hidden'>
                                {/* Price - Only show if forSale is true */}
                                {form.watch('forSale') && (
                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Price</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        min="0"
                                                        step="0.01"
                                                        value={field.value}
                                                        placeholder="Enter price"
                                                        onChange={(e) => {
                                                            field.onChange(e.target.value);
                                                        }}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                )}

                                {/* For Sale Toggle */}
                                <FormField
                                    control={form.control}
                                    name="forSale"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center space-x-2">
                                            <FormControl>
                                                <input
                                                    type="checkbox"
                                                    id="forSale"
                                                    checked={field.value}
                                                    onChange={(e) => {
                                                        field.onChange(e.target.checked);
                                                        if (!e.target.checked) {
                                                            form.setValue('price', '');
                                                        }
                                                    }}
                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                />
                                            </FormControl>
                                            <FormLabel className="!mt-0 cursor-pointer" htmlFor="forSale">
                                                This artwork is for sale
                                            </FormLabel>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Submit */}
                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    className="w-full md:w-auto"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <LoadingSpinner />
                                            {type === 'upload' ? 'Uploading...' : 'Updating...'}
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="mr-2 h-4 w-4" />
                                            {type === 'upload' ? 'Upload' : 'Update'} Artwork
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default PostForm