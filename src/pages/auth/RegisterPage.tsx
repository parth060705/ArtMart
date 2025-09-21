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

// Extend the register form schema with additional fields
const formSchema = registerFormSchema.extend({
    bio: z.string().min(10, 'Bio must be at least 10 characters').max(500, 'Bio cannot exceed 500 characters').optional(),
    gender: z.enum(['male', 'female', 'other', 'prefer-not-to-say']),
    profileImage: z.instanceof(FileList).optional()
        .refine(files => !files || files.length === 0 || files[0]?.size <= 5 * 1024 * 1024, 'Max file size is 5MB')
        .refine(files => !files || files.length === 0 || ['image/jpeg', 'image/png', 'image/webp'].includes(files[0]?.type), 'Only .jpg, .png, and .webp formats are supported'),
    terms: z.literal(true, {
        errorMap: () => ({ message: 'You must accept the terms and conditions' })
    })
})

export default function RegisterPage() {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

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
        profileImage?: FileList;
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

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            form.setValue('profileImage', e.target.files);
        }
    }

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
        if (values.profileImage?.[0]) {
            formData.append('profileImage', values.profileImage[0]);
        }
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
                            {/* Profile Image Upload */}
                            <div className="flex flex-col items-center justify-center gap-4 md:col-span-2">
                                <div className="relative">
                                    <Avatar className="h-24 w-24 border-2 border-primary">
                                        <AvatarImage
                                            src={(() => {
                                                const file = form.watch('profileImage')?.[0];
                                                return file ? URL.createObjectURL(file) : '';
                                            })()}
                                        />
                                        <AvatarFallback className="bg-muted">
                                            <User className="h-12 w-12 text-muted-foreground" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <label
                                        htmlFor="profileImage"
                                        className="absolute -bottom-2 -right-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
                                    >
                                        <Camera className="h-4 w-4" />
                                        <span className="sr-only">Upload profile image</span>
                                    </label>
                                    <input
                                        type="file"
                                        id="profileImage"
                                        accept="image/jpeg, image/png, image/webp"
                                        className="hidden"
                                        ref={fileInputRef}
                                        onChange={handleImageChange}
                                    />
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-medium">Profile Photo</p>
                                    <p className="text-xs text-muted-foreground">Click to upload (max 5MB)</p>
                                    {form.formState.errors.profileImage && (
                                        <p className="text-xs text-destructive">
                                            {form.formState.errors.profileImage.message}
                                        </p>
                                    )}
                                </div>
                            </div>

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
                                                        <a
                                                            href="/terms"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-primary hover:underline"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            Terms and Conditions
                                                        </a>
                                                        {' '}and{' '}
                                                        <a
                                                            href="/privacy"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-primary hover:underline"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            Privacy Policy
                                                        </a>
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
                        <Link to="/auth/login" className="font-medium text-primary underline-offset-4 hover:underline">
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
