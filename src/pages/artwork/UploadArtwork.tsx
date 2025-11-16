import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/user/auth/UseAuth';
import { Routes } from '@/lib/routes';
import PostForm from '@/components/PostForm';
import { useEffect } from 'react';

const UploadArtwork = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(Routes.AuthLoginPage, { state: { from: location } });
    }
  }, [isAuthenticated, navigate, location]);

  if (!isAuthenticated) return null;

  return (
    <PostForm
      type={'upload'}
    />
  );
};

export default UploadArtwork;