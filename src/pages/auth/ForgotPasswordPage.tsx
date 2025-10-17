
// 'use client'

// import { z } from 'zod'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useForm } from 'react-hook-form'
// import { toast } from 'sonner'

// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from '@/components/ui/form'
// import { Button } from '@/components/ui/button'
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardHeader,
//     CardTitle,
// } from '@/components/ui/card'
// import { Input } from '@/components/ui/input'

// import { emailSchema } from '@/lib/validation-schemas'

// // Schema for email validation
// const formSchema = z.object({
//     email: emailSchema,
// })

// export default function ForgetPasswordPage() {
//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             email: '',
//         },
//     })

//     async function onSubmit(values: z.infer<typeof formSchema>) {
//         try {
//             // Assuming a function to send reset email
//             console.log(values)
//             toast.success('Password reset email sent. Please check your inbox.')
//         } catch (error) {
//             console.error('Error sending password reset email', error)
//             toast.error('Failed to send password reset email. Please try again.')
//         }
//     }

//     return (
//         <div className="flex min-h-[40vh] h-full w-full items-center justify-center px-4">
//             <Card className="mx-auto w-[500px]">
//                 <CardHeader>
//                     <CardTitle className="text-2xl">Forgot Password</CardTitle>
//                     <CardDescription>
//                         Enter your email address to receive a password reset link.
//                     </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <Form {...form}>
//                         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//                             <div className="grid gap-4">
//                                 {/* Email Field */}
//                                 <FormField
//                                     control={form.control}
//                                     name="email"
//                                     render={({ field }) => (
//                                         <FormItem className="grid gap-2">
//                                             <FormLabel htmlFor="email">Email</FormLabel>
//                                             <FormControl>
//                                                 <Input
//                                                     id="email"
//                                                     placeholder="johndoe@mail.com"
//                                                     type="email"
//                                                     autoComplete="email"
//                                                     {...field}
//                                                 />
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />
//                                 <Button type="submit" className="w-full">
//                                     Send Reset Link
//                                 </Button>
//                             </div>
//                         </form>
//                     </Form>
//                 </CardContent>
//             </Card>
//         </div>
//     )
// }


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

import { useResetPassword } from '@/hooks/user/auth/useforgotpassword' // Adjust path as needed

// Schema for OTP + new password validation
const formSchema = z.object({
    email: z.string().email('Invalid email address'),
    otp: z.string().min(4, 'OTP must be at least 4 characters'),
    new_password: z.string().min(6, 'Password must be at least 6 characters'),
})

export default function ResetPasswordPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            otp: '',
            new_password: '',
        },
    })

    const { resetPassword, loading } = useResetPassword()

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await resetPassword(values)
            toast.success('Password updated successfully. You can now log in.')
            form.reset()
        } catch (error) {
            console.error('Error resetting password', error)
            toast.error('Failed to reset password. Please check your OTP and try again.')
        }
    }

    return (
        <div className="flex min-h-[40vh] h-full w-full items-center justify-center px-4">
            <Card className="mx-auto w-[500px]">
                <CardHeader>
                    <CardTitle className="text-2xl">Reset Password</CardTitle>
                    <CardDescription>
                        Enter your email, OTP, and new password to reset your account password.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid gap-4">
                                {/* Email */}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel htmlFor="email">Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="email"
                                                    placeholder="johndoe@mail.com"
                                                    type="email"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* OTP */}
                                <FormField
                                    control={form.control}
                                    name="otp"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel htmlFor="otp">OTP</FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="otp"
                                                    placeholder="Enter OTP"
                                                    type="text"
                                                    maxLength={6}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* New Password */}
                                <FormField
                                    control={form.control}
                                    name="new_password"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel htmlFor="new_password">New Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="new_password"
                                                    placeholder="Enter new password"
                                                    type="password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? 'Resetting...' : 'Reset Password'}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
