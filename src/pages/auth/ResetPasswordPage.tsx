'use client'

import { useState, useEffect } from 'react'
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
import { Input } from '@/components/ui/input'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { useSendOTP } from '@/hooks/user/useSendOTP'
import { useResetPassword } from '@/hooks/user/useResetPassword'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Mail, KeyRound, ArrowLeft } from 'lucide-react'
import { Routes } from '@/lib/routes'

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
        mode: 'onChange'
    })

    useEffect(() => {
        document.title = 'Reset Password | Auroraa';
    }, []);

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
        <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0B] font-sans px-4">
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
                className="relative z-10 w-full max-w-md"
            >
                <div className="bg-[#0f1115]/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 mb-4 text-[#0DB8D3]">
                            <KeyRound className="w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">Reset Password</h1>
                        <p className="text-gray-400 text-sm">
                            {!showOTPForm
                                ? "Enter your email for a recovery code"
                                : `Enter the 6-digit code sent to ${email}`
                            }
                        </p>
                    </div>

                    <AnimatePresence mode="wait">
                        {!showOTPForm ? (
                            <motion.div
                                key="send-otp"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Form {...sendOTPForm}>
                                    <form onSubmit={sendOTPForm.handleSubmit(onSendOTP)} className="space-y-6">
                                        <FormField
                                            control={sendOTPForm.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem className="space-y-2">
                                                    <FormLabel className="text-gray-300">Email Address</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                                                            <Input
                                                                placeholder="your-email@example.com"
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
                                        <Button
                                            type="submit"
                                            className="w-full h-11 bg-gradient-to-r from-[#1B7FDC] to-[#0DB8D3] hover:opacity-90 transition-opacity text-white font-semibold rounded-xl"
                                            disabled={isPending}
                                        >
                                            {isPending ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                    <span>Sending Code...</span>
                                                </div>
                                            ) : 'Send Recovery Code'}
                                        </Button>
                                    </form>
                                </Form>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="reset-password"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Form {...resetPasswordForm}>
                                    <form onSubmit={resetPasswordForm.handleSubmit(onResetPassword)} className="space-y-6">
                                        <FormField
                                            control={resetPasswordForm.control}
                                            name="otp"
                                            render={({ field }) => (
                                                <FormItem className="space-y-2">
                                                    <FormLabel className="text-gray-300">Verification Code</FormLabel>
                                                    <FormControl>
                                                        <div className="flex justify-center py-2">
                                                            <InputOTP
                                                                maxLength={6}
                                                                {...field}
                                                                className="gap-2"
                                                            >
                                                                <InputOTPGroup className="gap-2 md:gap-3">
                                                                    {[...Array(6)].map((_, i) => (
                                                                        <InputOTPSlot
                                                                            key={i}
                                                                            index={i}
                                                                            className="w-10 h-10 md:w-12 md:h-12 border border-white/10 bg-[#0A0A0B]/50 text-white text-lg rounded-lg focus:border-[#0DB8D3] focus:ring-[#0DB8D3]/20 transition-all"
                                                                        />
                                                                    ))}
                                                                </InputOTPGroup>
                                                            </InputOTP>
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage className="text-center" />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={resetPasswordForm.control}
                                            name="new_password"
                                            render={({ field }) => (
                                                <FormItem className="space-y-2">
                                                    <FormLabel className="text-gray-300">New Password</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                                                            <Input
                                                                type="password"
                                                                placeholder="Create new password"
                                                                className="pl-10 bg-[#0A0A0B]/50 border-white/10 text-white placeholder-gray-500 focus:border-[#1B7FDC]/50 focus:ring-[#1B7FDC]/20 transition-all h-11"
                                                                {...field}
                                                            />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="text-center">
                                            <button
                                                type="button"
                                                className="text-sm text-[#0DB8D3] hover:text-[#1B7FDC] transition-colors"
                                                onClick={() => sendOTPForm.handleSubmit(onSendOTP)()}
                                                disabled={isPending}
                                            >
                                                {isPending ? 'Resending...' : 'Resend Code'}
                                            </button>
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full h-11 bg-gradient-to-r from-[#1B7FDC] to-[#0DB8D3] hover:opacity-90 transition-opacity text-white font-semibold rounded-xl"
                                            disabled={isResetting}
                                        >
                                            {isResetting ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                    <span>Resetting Password...</span>
                                                </div>
                                            ) : 'Reset Password'}
                                        </Button>
                                    </form>
                                </Form>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="mt-8 text-center">
                        <button
                            onClick={() => navigate(`/${Routes.AuthLoginPage}`)}
                            className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Login
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}