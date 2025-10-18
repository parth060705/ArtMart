'use client'

import { useState } from 'react'
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
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
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { useSendOTP } from '@/hooks/user/auth/useSendOTP'
import { useResetPassword } from '@/hooks/user/auth/useResetPassword'
import { ArrowRight } from 'lucide-react'

const sendOTPFormSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
})

const resetPasswordFormSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    otp: z.string().min(6, 'OTP must be 6 digits').max(6, 'OTP must be 6 digits'),
    new_password: z.string().min(6, 'Password must be at least 6 characters')
})

type SendOTPFormData = z.infer<typeof sendOTPFormSchema>
type ResetPasswordFormData = z.infer<typeof resetPasswordFormSchema>

export default function ResetPasswordPage() {
    const { mutate: sendOTP, isPending } = useSendOTP()
    const { mutate: resetPassword, isPending: isResetting } = useResetPassword()
    const [showOTPForm, setShowOTPForm] = useState(false)
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const sendOTPForm = useForm<SendOTPFormData>({
        resolver: zodResolver(sendOTPFormSchema),
        defaultValues: {
            email: '',
        },
    })

    const resetPasswordForm = useForm<Omit<ResetPasswordFormData, 'email'>>({
        resolver: zodResolver(resetPasswordFormSchema.omit({ email: true })),
        defaultValues: {
            otp: '',
            new_password: ''
        },
        mode: 'onChange' // Enable validation on change
    })

    const onSendOTP: SubmitHandler<SendOTPFormData> = (data) => {
        setEmail(data.email)
        sendOTP(data.email, {
            onSuccess: () => {
                toast.success('Check your email for OTP')
                setShowOTPForm(true)
            },
            onError: () => {
                toast.error('Failed to send OTP')
            }
        })
    }

    const onResetPassword: SubmitHandler<Omit<ResetPasswordFormData, 'email'>> = (data) => {
        const resetData = {
            email: email,
            otp: data.otp,
            new_password: data.new_password
        };

        resetPassword(resetData, {
            onSuccess: () => {
                toast.success('Password reset successfully')
                setShowOTPForm(false)
                resetPasswordForm.reset()
                sendOTPForm.reset()
                navigate('/auth/login')
            },
            onError: () => {
                toast.error('Failed to reset password. Please try again.')
            }
        })
    }

    return (
        <div className="flex h-svh w-full items-center justify-center px-4">
            <Card className="mx-auto w-[500px]">
                {!showOTPForm && <>
                    <CardHeader>
                        <CardTitle className="text-2xl">Reset Password</CardTitle>
                        <CardDescription>
                            Enter your email address to receive a password reset link.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...sendOTPForm}>
                            <form onSubmit={sendOTPForm.handleSubmit(onSendOTP)} className="space-y-8">
                                <div className="grid gap-4">
                                    <FormField
                                        control={sendOTPForm.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem className="grid gap-2">
                                                <FormLabel htmlFor="email">Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        id="email"
                                                        placeholder="your-email@example.com"
                                                        type="email"
                                                        autoComplete="email"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={isPending}
                                    >
                                        {isPending ? 'Sending...' : 'Send OTP'}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </>}

                {/* OTP Input Form */}
                {showOTPForm && (
                    <>
                        <CardHeader>
                            <CardTitle className="text-2xl">Reset Password</CardTitle>
                            <CardDescription>
                                We've sent a 6-digit code to {sendOTPForm.watch('email')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...resetPasswordForm}>
                                <form onSubmit={resetPasswordForm.handleSubmit(onResetPassword)} className="space-y-6">
                                    <div className="grid gap-6">
                                        {/* Remove the hidden input as we're using state for email */}

                                        <FormField
                                            control={resetPasswordForm.control}
                                            name="otp"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Verification Code</FormLabel>
                                                    <FormControl>
                                                        <div className="flex justify-center">
                                                            <InputOTP
                                                                maxLength={6}
                                                                {...field}
                                                                className="[&>div]:gap-2"
                                                            >
                                                                <InputOTPGroup className="gap-2">
                                                                    {[...Array(6)].map((_, i) => (
                                                                        <InputOTPSlot
                                                                            key={i}
                                                                            index={i}
                                                                            className="w-12 h-12 text-lg border-2 rounded-md border-input bg-gray-200"
                                                                        />
                                                                    ))}
                                                                </InputOTPGroup>
                                                            </InputOTP>
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={resetPasswordForm.control}
                                            name="new_password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>New Password</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="password"
                                                            placeholder="Enter your new password"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="text-sm text-muted-foreground text-center">
                                            Didn't receive a code?
                                            <button
                                                type="button"
                                                className="ml-1 text-primary hover:underline"
                                                onClick={() => sendOTPForm.handleSubmit(onSendOTP)()}
                                            >
                                                Resend OTP
                                            </button>
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full"
                                            disabled={isResetting}
                                        >
                                            {isResetting ? 'Resetting Password...' : 'Reset Password'}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </>
                )}
            </Card>
        </div>
    )
}