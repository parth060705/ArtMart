import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Routes } from '@/lib/routes';
import { useAuth } from '@/hooks/user/auth/UseAuth';
import { useProductDetails } from '@/hooks/useProductDetails';
import PostForm from '@/components/PostForm';
import LoadingSpinner from '@/components/LoadingSpinner';
import { uploadProductSchema } from '@/lib/validation-schemas';
import type { z } from 'zod';

const EditArtwork = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { id } = useParams<{ id: string }>();
  const { data: artwork, isLoading, error } = useProductDetails(id || '');
  const [defaultValues, setDefaultValues] = useState<z.infer<typeof uploadProductSchema>>({
    images: [],
    title: '',
    description: '',
    price: '',
    category: '',
    quantity: '1',
    tags: '',
    forSale: false,
  })

  // Initialize form with artwork data
  useEffect(() => {
    if (artwork) {
      setDefaultValues({
        title: artwork.title,
        description: artwork.description,
        category: artwork.category,
        tags: Array.isArray(artwork.tags) ? artwork.tags.join(', ') : '',
        forSale: Boolean(artwork.forSale),
        price: artwork.price?.toString() || '',
        quantity: artwork.quantity?.toString() || '1',
        images: artwork.images || [],
      });
    }
  }, [artwork]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(Routes.AuthLoginPage, { state: { from: location } });
    }
  }, [isAuthenticated, navigate, location]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error loading artwork: {error.message}</div>;
  }

  if (!artwork) {
    return <div>Artwork not found</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <PostForm
        defaultValues={defaultValues}
        type="edit"
      />
    </div>
  );
};

export default EditArtwork;