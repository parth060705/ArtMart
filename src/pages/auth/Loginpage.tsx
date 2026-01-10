import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { loginFormSchema } from '../../lib/validation-schemas';
import { useAuth } from '@/hooks/user/auth/UseAuth';
import { useLogin } from '@/hooks/user/auth/useLogin';
import { useEffect } from 'react';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useGoogleLoginRegister } from '@/hooks/user/auth/useGoogleLoginRegister';
import { Routes } from '@/lib/routes';
import { motion } from 'framer-motion';
import { AlertCircle, Lock, Sparkles } from 'lucide-react';

const formSchema = loginFormSchema

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const loginMutation = useLogin();
  const { login, isAuthenticated } = useAuth();
  const googleLoginRegister = useGoogleLoginRegister();
  const fromUpload = location.state?.from?.pathname === '/upload';
  const fromProfile = location.state?.from === '/me/profile';
  const fromProtect = location.state?.from?.pathname?.pathname === '/protect';
  console.log({ fromProtect })
  console.log({ fromProfile })
  console.log({ fromUpload })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append('username', values.username);
    formData.append('password', values.password);

    loginMutation.mutate(formData, {
      onSuccess: (data) => {
        if (!data.access_token) {
          throw new Error('No access token received');
        }
        login(data.access_token, data.refresh_token);
        toast.success('Login successful!');
        // Redirect to the previous page or home
        const redirectTo = fromUpload ? '/upload' : fromProfile ? '/me/profile' : fromProtect ? '/protect' : `/${Routes.ProtectPage}`;
        navigate(redirectTo);
      },
      onError: (error: any) => {
        console.error('Login error:', error);
        const errorMessage = error?.response?.data?.message ||
          error?.response?.data?.detail ||
          error?.message ||
          'Login failed. Please try again.';
        toast.error(errorMessage);
      },
    });
  }

  const googleOnSuccessHandler = (response: CredentialResponse) => {
    if (response.credential) {
      googleLoginRegister.mutate(response.credential, {
        onSuccess: (data) => {
          if (!data.tokens?.access_token) {
            throw new Error('No access token received');
          }
          login(data?.tokens?.access_token, data?.tokens?.refresh_token);
          toast.success('Login successful!');
          // Redirect to the previous page or home
          const redirectTo = fromUpload ? '/upload' : fromProfile ? '/me/profile' : fromProtect ? '/protect' : `/${Routes.ProtectPage}`;
          navigate(redirectTo);
        },
        onError: (error: any) => {
          console.error('Login error:', error);
          const errorMessage = error?.response?.data?.message ||
            error?.response?.data?.detail ||
            error?.message ||
            'Login failed. Please try again.';
          toast.error(errorMessage);
        },
      })
    } else {
      console.error('No credential received from Google');
    }
  }

  const googleOnErrorHandler = () => {
    toast.error('Google login failed');
  }

  useEffect(() => {
    document.title = 'Login | Auroraa';
  }, []);

  // Redirect authenticated users to appropriate page based on where they came from
  useEffect(() => {
    if (isAuthenticated) {
      const redirectTo = fromUpload ? '/upload' : fromProfile ? '/me/profile' : fromProtect ? '/protect' : `/${Routes.ProtectPage}`;
      navigate(redirectTo);
    }
  }, [isAuthenticated, navigate, fromUpload, fromProfile, fromProtect]);


  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0B] font-sans">

      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#1B7FDC]/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#0DB8D3]/10 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-700" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-[420px] px-4"
      >
        <div className="bg-[#0f1115]/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 mb-4 text-[#0DB8D3]">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400 text-sm">Enter your credentials to access your account</p>
          </div>

          {(fromUpload || fromProfile || fromProtect) && (
            <div className="bg-[#EAB308]/10 border border-[#EAB308]/20 rounded-lg p-3 mb-6 flex gap-3 items-start">
              <AlertCircle className="w-5 h-5 text-[#EAB308] shrink-0 mt-0.5" />
              <p className="text-xs text-[#EAB308]/90 leading-relaxed">
                {fromUpload && 'Please login to upload your artwork.'}
                {fromProfile && 'Please login to access your profile.'}
                {fromProtect && 'Please login to protect your artwork.'}
              </p>
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-gray-300">Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your username"
                        type="text"
                        autoComplete="username"
                        className="bg-[#0A0A0B]/50 border-white/10 text-white placeholder-gray-500 focus:border-[#1B7FDC]/50 focus:ring-[#1B7FDC]/20 transition-all h-11"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <div className="flex justify-between items-center">
                      <FormLabel className="text-gray-300">Password</FormLabel>
                      <Link
                        to={`/${Routes.AuthResetPasswordPage}`}
                        className="text-xs text-[#1B7FDC] hover:text-[#0DB8D3] transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        className="bg-[#0A0A0B]/50 border-white/10 text-white placeholder-gray-500 focus:border-[#1B7FDC]/50 focus:ring-[#1B7FDC]/20 transition-all h-11"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-[#1B7FDC] to-[#0DB8D3] hover:opacity-90 transition-opacity text-white font-semibold rounded-xl text-base"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Logging in...</span>
                  </div>
                ) : 'Login'}
              </Button>
            </form>
          </Form>

          <div className="mt-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10"></div>
            <span className="text-xs text-gray-500 uppercase tracking-wider">Or continue with</span>
            <div className="h-px flex-1 bg-white/10"></div>
          </div>

          <div className="mt-6">
            <div className="bg-white rounded-lg overflow-hidden flex justify-center">
              <GoogleLogin
                onSuccess={googleOnSuccessHandler}
                onError={googleOnErrorHandler}
                useOneTap
                text="continue_with"
                shape="rectangular"
                // size="large"
                width="100%"
                theme="outline"
              />
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to={`/${Routes.AuthRegisterPage}`} className="text-[#0DB8D3] hover:text-[#1B7FDC] font-medium transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
};

export default LoginPage;
