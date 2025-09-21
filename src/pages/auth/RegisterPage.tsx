'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
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

const formSchema = registerFormSchema

export default function RegisterPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            username: '',
            location: '',
            gender: '',
            age: '',
            pincode: '',
            phone: '',
            password: '',
            confirmPassword: '',
        },
    })

    const navigate = useNavigate();
    const registerMutation = useRegister();
    const { isAuthenticated } = useAuth();

    async function onSubmit(values: z.infer<typeof formSchema>) {
        registerMutation.mutate(values, {
            onSuccess: (data) => {
                toast.success('Registration successful!');
                // Optionally store token or redirect
                setTimeout(() => navigate('/auth/login'), 500);
            },
            onError: (error: any) => {
                toast.error(error?.response?.data?.message || 'Registration failed');
            }
        });
    }

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
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
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
                                                <Input
                                                    id="gender"
                                                    placeholder="Male/Female/Other"
                                                    type="text"
                                                    {...field}
                                                />
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

                                <div className="md:col-span-2">
                                    <Button 
                                type="submit" 
                                className="w-full py-6 text-base sm:py-2" 
                                disabled={registerMutation.isPending}
                                size="lg"
                            >
                                {registerMutation.isPending ? 'Creating account...' : 'Create account'}
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
