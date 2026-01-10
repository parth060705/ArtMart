'use client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useState, useRef, useEffect } from 'react'
import { Checkbox } from '@/components/ui/checkbox'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { User, Lock, Mail, MapPin, Calendar, Hash, Phone, FileText } from 'lucide-react'
import { Input } from '@/components/ui/input'

import { registerFormSchema } from '@/lib/validation-schemas'
import { Link, useNavigate } from 'react-router-dom'
import { useRegister } from '@/hooks/user/auth/useRegister'
import { useAuth } from '@/hooks/user/auth/UseAuth'
import { Routes } from '@/lib/routes'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import { useGoogleLoginRegister } from '@/hooks/user/auth/useGoogleLoginRegister'
import { motion } from 'framer-motion'

// Extend the register form schema with additional fields (keeping existing schema logic)
const formSchema = registerFormSchema.extend({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name cannot exceed 50 characters'),
    email: z.string()
        .email('Please enter a valid email address')
        .max(100, 'Email cannot exceed 100 characters'),
    username: z.string()
        .min(3, 'Username must be at least 3 characters')
        .max(30, 'Username cannot exceed 30 characters')
        .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
    location: z.string()
        .min(2, 'Location must be at least 2 characters')
        .max(100, 'Location cannot exceed 100 characters'),
    gender: z.enum(['male', 'female', 'other', 'prefer-not-to-say'], {
        errorMap: () => ({ message: 'Please select a valid gender' })
    }),
    age: z.string()
        .min(1, 'Age is required')
        .refine((val) => !isNaN(Number(val)) && Number(val) >= 13 && Number(val) <= 120, {
            message: 'Age must be between 13 and 120',
        }),
    pincode: z.string()
        .min(6, 'Pincode must be 6 digits')
        .max(6, 'Pincode must be 6 digits')
        .regex(/^[0-9]+$/, 'Pincode must contain only numbers'),
    phone: z.string()
        .min(10, 'Phone number must be at least 10 digits')
        .max(15, 'Phone number cannot exceed 15 digits')
        .regex(/^[0-9+\-\s]*$/, 'Please enter a valid phone number'),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
    confirmPassword: z.string(),
    bio: z.string()
        .min(10, 'Bio must be at least 10 characters')
        .max(500, 'Bio cannot exceed 500 characters')
        .optional(),
    terms: z.literal(true, {
        errorMap: () => ({ message: 'You must accept the terms and conditions' })
    })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

export default function RegisterPage() {
    const [isUploading, setIsUploading] = useState(false);
    const navigate = useNavigate();
    const registerMutation = useRegister();
    const { login, isAuthenticated } = useAuth();
    const googleLoginRegister = useGoogleLoginRegister();

    // Keeping the Type definition
    type FormValues = {
        name: string;
        email: string;
        username: string;
        location: string;
        gender: 'male' | 'female' | 'other' | 'prefer-not-to-say';
        age: string;
        pincode: string;
        phone: string;
        password: string;
        confirmPassword: string;
        bio?: string;
        terms: boolean;
    };

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            name: '',
            email: '',
            username: '',
            password: '',
            terms: false,
        },
    })

    async function onSubmit(values: FormValues) {
        setIsUploading(true);
        const formData = new FormData();

        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('username', values.username);
        formData.append('password', values.password);
        formData.append('terms', values.terms.toString());

        registerMutation.mutate(formData, {
            onSuccess: (data) => {
                toast.success('Registration successful!');
                setTimeout(() => navigate(`/${Routes.AuthLoginPage}`), 500);
            },
            onError: (error: any) => {
                toast.error(error?.response?.data?.message || 'Registration failed');
            },
            onSettled: () => {
                setIsUploading(false);
            }
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
                    navigate(`/${Routes.SocialBasePage}`);
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
        console.error('Google login failed');
        toast.error('Google login failed');
    }

    useEffect(() => {
        document.title = 'Register | Auroraa';
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            navigate(`/${Routes.SocialBasePage}`);
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="relative w-full min-h-screen flex items-center justify-center overflow-auto bg-[#0A0A0B] font-sans py-12 px-4">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#1B7FDC]/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#0DB8D3]/10 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-700" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-2xl"
            >
                <div className="bg-[#0f1115]/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 sm:p-10">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 mb-4 text-[#0DB8D3]">
                            <User className="w-6 h-6" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
                        <p className="text-gray-400">Join the community of artists and creators</p>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                                {/* Name Field */}
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel className="text-gray-300 text-sm">Full Name</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <User className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                                                    <Input
                                                        placeholder="John Doe"
                                                        className="pl-10 bg-[#0A0A0B]/50 border-white/10 text-white placeholder-gray-500 focus:border-[#1B7FDC]/50 focus:ring-[#1B7FDC]/20 transition-all h-11"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Email Field */}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel className="text-gray-300 text-sm">Email</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                                                    <Input
                                                        placeholder="johndoe@mail.com"
                                                        type="email"
                                                        autoComplete="email"
                                                        className="pl-10 bg-[#0A0A0B]/50 border-white/10 text-white placeholder-gray-500 focus:border-[#1B7FDC]/50 focus:ring-[#1B7FDC]/20 transition-all h-11"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Username Field */}
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel className="text-gray-300 text-sm">Username</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <span className="absolute left-3 top-3 text-gray-500 text-sm">@</span>
                                                    <Input
                                                        placeholder="tony"
                                                        type="text"
                                                        autoComplete="username"
                                                        className="pl-8 bg-[#0A0A0B]/50 border-white/10 text-white placeholder-gray-500 focus:border-[#1B7FDC]/50 focus:ring-[#1B7FDC]/20 transition-all h-11"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Password Field */}
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel className="text-gray-300 text-sm">Password</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                                                    <Input
                                                        type='password'
                                                        placeholder="Create a password"
                                                        autoComplete="new-password"
                                                        className="pl-10 bg-[#0A0A0B]/50 border-white/10 text-white placeholder-gray-500 focus:border-[#1B7FDC]/50 focus:ring-[#1B7FDC]/20 transition-all h-11"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Confirm Password Field */}
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel className="text-gray-300 text-sm">
                                                Confirm Password
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                                                    <Input
                                                        type='password'
                                                        placeholder="Confirm your password"
                                                        autoComplete="new-password"
                                                        className="pl-10 bg-[#0A0A0B]/50 border-white/10 text-white placeholder-gray-500 focus:border-[#1B7FDC]/50 focus:ring-[#1B7FDC]/20 transition-all h-11"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Terms and Conditions */}
                                <div className="md:col-span-2">
                                    <FormField
                                        control={form.control}
                                        name="terms"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border border-white/5 bg-white/5 p-4">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                        className="data-[state=checked]:bg-[#1B7FDC] border-white/20"
                                                    />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel className="text-sm font-normal text-gray-300">
                                                        I agree to the{' '}
                                                        <Link
                                                            to={`/${Routes.TermsAndConditionsPage}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-[#0DB8D3] hover:text-[#1B7FDC] transition-colors"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            Terms and Conditions
                                                        </Link>
                                                        {' '}and{' '}
                                                        <Link
                                                            to={`/${Routes.PrivacyPolicyPage}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-[#0DB8D3] hover:text-[#1B7FDC] transition-colors"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            Privacy Policy
                                                        </Link>
                                                    </FormLabel>
                                                    <FormMessage className="text-red-400 text-xs" />
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <Button
                                        type="submit"
                                        className="w-full h-12 bg-gradient-to-r from-[#1B7FDC] to-[#0DB8D3] hover:opacity-90 transition-opacity text-white font-bold rounded-xl text-base shadow-lg shadow-[#1B7FDC]/20"
                                        disabled={registerMutation.isPending || isUploading}
                                        size="lg"
                                    >
                                        {isUploading ? 'Uploading...' : registerMutation.isPending ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                <span>Creating account...</span>
                                            </div>
                                        ) : 'Create account'}
                                    </Button>
                                </div>
                            </div>
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
                                width="100%"
                                theme="outline"
                            />
                        </div>
                    </div>

                    <div className="mt-8 text-center text-sm text-gray-400">
                        Already have an account?{' '}
                        <Link to={`/${Routes.AuthLoginPage}`} className="text-[#0DB8D3] hover:text-[#1B7FDC] font-medium transition-colors">
                            Sign in
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

