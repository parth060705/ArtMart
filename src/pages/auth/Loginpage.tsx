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

const formSchema = loginFormSchema

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const loginMutation = useLogin();
  const { login, isAuthenticated } = useAuth();
  const fromUpload = location.state?.from?.pathname === '/upload';
  const fromProfile = location.state?.from === '/me/profile';

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
        const redirectTo = fromUpload ? '/upload' : fromProfile ? '/me/profile' : '/';
        navigate(redirectTo);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || 'Login failed');
      },
    });
  }

  useEffect(() => {
    document.title = 'Login | Auroraa';
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);


  return (
    <div className="w-full h-screen flex flex-col items-center justify-center px-4">
      <Card className="mx-auto w-full max-w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            {fromUpload || fromProfile ? (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      {fromUpload && 'Please login to upload your artwork.'}
                      {fromProfile && 'Please login to access your profile.'}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              'Enter your credentials to access your account'
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="username">Username</FormLabel>
                      <FormControl>
                        <Input
                          id="username"
                          placeholder="Enter your username"
                          type="text"
                          autoComplete="username"
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
                    <FormItem className="grid gap-2">
                      <div className="flex justify-between items-center">
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Link
                          to="#"
                          className="ml-auto inline-block text-sm underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <FormControl>
                        <Input
                          type='password'
                          id="password"
                          placeholder="Enter your password"
                          autoComplete="current-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
                  {loginMutation.isPending ? 'Logging in...' : 'Login'}
                </Button>
              </div>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link to="/auth/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
};

export default LoginPage;
