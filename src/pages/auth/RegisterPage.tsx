'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useState, useRef } from 'react'
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Camera, User } from 'lucide-react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import { registerFormSchema } from '@/lib/validation-schemas'
import { Link, useNavigate } from 'react-router-dom'
import { useRegister } from '@/hooks/user/auth/useRegister'
import { useEffect } from 'react'
import { useAuth } from '@/hooks/user/auth/UseAuth'
import { Routes } from '@/lib/routes'

// Extend the register form schema with additional fields
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
            location: '',
            gender: 'prefer-not-to-say',
            age: '',
            pincode: '',
            phone: '',
            password: '',
            confirmPassword: '',
            bio: '',
            terms: false,
        },
    })

    const navigate = useNavigate();
    const registerMutation = useRegister();
    const { isAuthenticated } = useAuth();

    async function onSubmit(values: FormValues) {
        setIsUploading(true);
        const formData = new FormData();

        // Manually append each field to avoid TypeScript errors with dynamic keys
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('username', values.username);
        formData.append('location', values.location);
        formData.append('gender', values.gender);
        formData.append('age', values.age);
        formData.append('pincode', values.pincode);
        formData.append('phone', values.phone);
        formData.append('password', values.password);
        if (values.bio) formData.append('bio', values.bio);
        formData.append('terms', values.terms.toString());

        registerMutation.mutate(formData, {
            onSuccess: (data) => {
                toast.success('Registration successful!');
                setTimeout(() => navigate('/auth/login'), 500);
            },
            onError: (error: any) => {
                toast.error(error?.response?.data?.message || 'Registration failed');
            },
            onSettled: () => {
                setIsUploading(false);
            }
        });
    }

    useEffect(() => {
        document.title = 'Register | Auroraa';
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="flex min-h-screen w-full items-center justify-center p-4 sm:p-6 pb-20 md:pb-6">
            <Card className="w-full max-w-md sm:max-w-lg md:max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl">Register</CardTitle>
                    <CardDescription>
                        Create a new account by filling out the form below.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                                {/* Name Field */}
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel htmlFor="name" className="text-sm sm:text-base">Full Name</FormLabel>
                                            <FormControl>
                                                <Input id="name" placeholder="John Doe" {...field} />
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
                                        <FormItem className="grid gap-2">
                                            <FormLabel htmlFor="email" className="text-sm sm:text-base">Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="email"
                                                    placeholder="johndoe@mail.com"
                                                    type="email"
                                                    autoComplete="email"
                                                    {...field}
                                                />
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
                                        <FormItem className="grid gap-2">
                                            <FormLabel htmlFor="username" className="text-sm sm:text-base">Username</FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="username"
                                                    placeholder="tony"
                                                    type="text"
                                                    autoComplete="username"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Location Field */}
                                <FormField
                                    control={form.control}
                                    name="location"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel htmlFor="location" className="text-sm sm:text-base">Location</FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="location"
                                                    placeholder="Mumbai"
                                                    type="text"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Gender Field */}
                                <FormField
                                    control={form.control}
                                    name="gender"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel htmlFor="gender" className="text-sm sm:text-base">Gender</FormLabel>
                                            <FormControl>
                                                <select
                                                    id="gender"
                                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                    {...field}
                                                >
                                                    <option value="prefer-not-to-say">Prefer not to say</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Age Field */}
                                <FormField
                                    control={form.control}
                                    name="age"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel htmlFor="age" className="text-sm sm:text-base">Age</FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="age"
                                                    placeholder="21"
                                                    type="number"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Pincode Field */}
                                <FormField
                                    control={form.control}
                                    name="pincode"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel htmlFor="pincode">Pincode</FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="pincode"
                                                    placeholder="400001"
                                                    type="text"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Phone Field */}
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel htmlFor="phone">Phone</FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="phone"
                                                    placeholder="555-123-4567"
                                                    type="tel"
                                                    autoComplete="tel"
                                                    {...field}
                                                />
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
                                        <FormItem className="grid gap-2">
                                            <FormLabel htmlFor="password">Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='password'
                                                    id="password"
                                                    placeholder="******"
                                                    autoComplete="new-password"
                                                    {...field}
                                                />
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
                                        <FormItem className="grid gap-2">
                                            <FormLabel htmlFor="confirmPassword">
                                                Confirm Password
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='password'
                                                    id="confirmPassword"
                                                    placeholder="******"
                                                    autoComplete="new-password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Bio Field */}
                                <FormField
                                    control={form.control}
                                    name="bio"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2 md:col-span-2">
                                            <FormLabel htmlFor="bio" className="text-sm sm:text-base">Bio</FormLabel>
                                            <FormControl>
                                                <textarea
                                                    id="bio"
                                                    rows={3}
                                                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                    placeholder="Tell us about yourself..."
                                                    {...field}
                                                />
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
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                        className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                                                    />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel className="text-sm font-normal text-foreground">
                                                        I agree to the{' '}
                                                        <Link
                                                            to={Routes.TermsAndConditionsPage}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-primary hover:underline"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            Terms and Conditions
                                                        </Link>
                                                        {' '}and{' '}
                                                        <Link
                                                            to={Routes.PrivacyPolicyPage}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-primary hover:underline"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            Privacy Policy
                                                        </Link>
                                                    </FormLabel>
                                                    <FormMessage className="text-destructive text-xs" />
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <Button
                                        type="submit"
                                        className="w-full py-6 text-base sm:py-2"
                                        disabled={registerMutation.isPending || isUploading}
                                        size="lg"
                                    >
                                        {isUploading ? 'Uploading...' : registerMutation.isPending ? 'Creating account...' : 'Create account'}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </Form>
                    <div className="mt-6 text-center text-sm sm:text-base">
                        Already have an account?{' '}
                        <Link to={Routes.AuthLoginPage} className="font-medium text-primary underline-offset-4 hover:underline">
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
