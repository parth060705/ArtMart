import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/user/auth/UseAuth';
import { watermarkVerify, WatermarkVerificationResult } from '@/services/watermarkApi';
import { Upload, AlertCircle, Loader2, CheckCircle2, ShieldAlert, FileText, X, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate, useLocation } from 'react-router-dom';
import { Routes } from '@/lib/routes';
import FeedbackCard from '@/components/common/FeedbackCard';
import { submitFeedback } from '@/services/feedbackApi';

interface VerifySectionProps {
    className?: string;
}

const VerifySection: React.FC<VerifySectionProps> = ({ className }) => {
    const [file, setFile] = useState<File | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [verificationResult, setVerificationResult] = useState<WatermarkVerificationResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showAuthPopup, setShowAuthPopup] = useState(false);

    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleFeedbackSubmit = async (rating: 'positive' | 'negative', comment: string) => {
        try {
            await submitFeedback({
                type: 'general',
                message: comment?.trim() ? comment.trim() : rating === 'positive' ? 'Positive feedback' : 'Negative feedback',
                page: location.pathname,
                feature: 'verify',
                rating: rating === 'positive' ? 1 : 0,
            });
            toast.success('Thanks for your feedback!');
        } catch (error) {
            console.error('Feedback submit error:', error);
            toast.error('Failed to submit feedback. Please try again.');
        }
    };

    const handleLoginRedirect = () => {
        setShowAuthPopup(false);
        navigate(`/${Routes.AuthLoginPage}`, {
            state: { from: { pathname: location.pathname } }
        });
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        if (!isAuthenticated) return;
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();

        if (!isAuthenticated) {
            setShowAuthPopup(true);
            return;
        }

        setIsDragOver(false);
        const droppedFile = e.dataTransfer.files[0];
        validateAndSetFile(droppedFile);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isAuthenticated) {
            setShowAuthPopup(true);
            e.target.value = '';
            return;
        }

        if (e.target.files && e.target.files[0]) {
            validateAndSetFile(e.target.files[0]);
        }
    };

    const handleClick = () => {
        if (!isAuthenticated) {
            setShowAuthPopup(true);
        }
    }

    const validateAndSetFile = (uploadedFile: File) => {
        if (!isAuthenticated) {
            setShowAuthPopup(true);
            return;
        }

        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!validTypes.includes(uploadedFile.type)) {
            setError('Please upload a valid image file (JPG, PNG, WebP).');
            return;
        }

        if (uploadedFile.size > 50 * 1024 * 1024) {
            setError('File size must be less than 50MB.');
            return;
        }

        setFile(uploadedFile);
        setError(null);
        setVerificationResult(null);
        verifyFile(uploadedFile);
    };

    const verifyFile = async (fileToVerify: File) => {
        setIsVerifying(true);
        try {
            const result = await watermarkVerify(fileToVerify);
            setVerificationResult(result);
        } catch (err: any) {
            console.error("Verification failed", err);
            const errorMessage = err?.response?.data?.message || "Failed to verify image. Please try again.";
            setError(errorMessage);
        } finally {
            setIsVerifying(false);
        }
    };

    const clearFile = () => {
        setFile(null);
        setVerificationResult(null);
        setError(null);
    };

    return (
        <section className={`py-20 relative overflow-hidden ${className}`}>
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Verify Authenticity
                    </h2>
                    <p className="text-xl text-gray-400">
                        Upload an image to check if it's protected by Auroraa.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    {!file ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`
                                relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300
                                ${isDragOver
                                    ? 'border-[#0DB8D3] bg-[#0DB8D3]/5 shadow-[0_0_30px_-5px_rgba(13,184,211,0.2)]'
                                    : isAuthenticated
                                        ? 'border-white/10 bg-[#0f1115]/50 hover:border-white/20 hover:bg-[#0f1115]/80'
                                        : 'border-gray-800 bg-gray-900/50 cursor-pointer'
                                }
                            `}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={handleClick}
                        >
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className={`absolute inset-0 w-full h-full opacity-0 z-10 ${isAuthenticated ? 'cursor-pointer' : 'cursor-pointer pointer-events-none'}`}
                            />

                            <div className="flex flex-col items-center gap-6 pointer-events-none">
                                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-colors duration-300 ${isDragOver ? 'bg-[#0DB8D3]/20 text-[#0DB8D3]' : 'bg-white/5 text-gray-400'}`}>
                                    {isAuthenticated ? <Upload className="w-10 h-10" /> : <Lock className="w-10 h-10" />}
                                </div>
                                <div>
                                    <p className="text-xl font-medium text-white mb-2">
                                        {isAuthenticated
                                            ? (isDragOver ? 'Drop it here!' : 'Drag and drop your image here')
                                            : 'Login to Verify Digital Assets'
                                        }
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {isAuthenticated ? 'or click to browse from your computer' : 'Click to login or create an account'}
                                    </p>
                                </div>
                                <div className="flex gap-4 text-xs text-gray-600 uppercase tracking-wider font-medium">
                                    <span>JPG</span>
                                    <span>PNG</span>
                                    <span>WebP</span>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="space-y-8">
                            {/* File Preview Card */}
                            <div className="bg-[#0f1115]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex items-center gap-6 shadow-xl">
                                <div className="w-16 h-16 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center shrink-0">
                                    <FileText className="w-8 h-8 text-gray-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-white font-medium truncate">{file.name}</p>
                                    <p className="text-sm text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                </div>

                                {!isVerifying && (
                                    <button
                                        onClick={clearFile}
                                        className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                            </div>

                            {/* Loading State */}
                            {isVerifying && (
                                <div className="text-center py-12">
                                    <Loader2 className="w-12 h-12 text-[#0DB8D3] animate-spin mx-auto mb-4" />
                                    <p className="text-gray-400 animate-pulse">Analyzing image signatures...</p>
                                </div>
                            )}

                            {/* Error State */}
                            {error && !isVerifying && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 flex items-start gap-4"
                                >
                                    <AlertCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="text-lg font-bold text-red-500 mb-1">Verification Failed</h3>
                                        <p className="text-red-400/80">{error}</p>
                                    </div>
                                </motion.div>
                            )}

                            {/* Result State */}
                            {verificationResult && !isVerifying && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className={`
                                        rounded-3xl p-8 border backdrop-blur-xl shadow-2xl relative overflow-hidden
                                        ${verificationResult.verified
                                            ? (verificationResult.confidence * 100 > 80
                                                ? 'bg-green-500/5 border-green-500/30 shadow-[0_0_50px_-10px_rgba(34,197,94,0.15)]'
                                                : 'bg-[#0DB8D3]/5 border-[#0DB8D3]/30 shadow-[0_0_50px_-10px_rgba(13,184,211,0.15)]')
                                            : 'bg-red-500/5 border-red-500/30'
                                        }
                                    `}
                                >
                                    {/* Glow Effect */}
                                    <div className={`absolute top-0 right-0 w-[300px] h-[300px] blur-[100px] rounded-full pointer-events-none opacity-20 ${verificationResult.verified ? (verificationResult.confidence * 100 > 80 ? 'bg-green-500' : 'bg-[#0DB8D3]') : 'bg-red-500'}`} />

                                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
                                        <div className={`
                                            w-24 h-24 rounded-2xl flex items-center justify-center shrink-0 border-2
                                            ${verificationResult.verified
                                                ? (verificationResult.confidence * 100 > 80
                                                    ? 'bg-green-500/10 border-green-500 text-green-500'
                                                    : 'bg-[#0DB8D3]/10 border-[#0DB8D3] text-[#0DB8D3]')
                                                : 'bg-red-500/10 border-red-500 text-red-500'
                                            }
                                        `}>
                                            {verificationResult.verified ? (
                                                <CheckCircle2 className="w-12 h-12" />
                                            ) : (
                                                <ShieldAlert className="w-12 h-12" />
                                            )}
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex flex-col gap-1 mb-4">
                                                <span className={`text-sm font-bold uppercase tracking-wider ${verificationResult.verified ? (verificationResult.confidence * 100 > 80 ? 'text-green-500' : 'text-[#0DB8D3]') : 'text-red-500'}`}>
                                                    {verificationResult.verified ? 'Verification Successful' : 'Verification Warning'}
                                                </span>
                                                <h2 className="text-3xl font-bold text-white">
                                                    {verificationResult.message.label}
                                                </h2>
                                            </div>

                                            <p className="text-gray-300 text-lg leading-relaxed mb-6">
                                                {verificationResult.message.message}
                                            </p>

                                            {verificationResult.verified && (
                                                <div className="flex items-center gap-8 pt-6 border-t border-white/10">
                                                    {/* <div>
                                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Confidence</p>
                                                        <p className="text-xl font-bold text-white">{(verificationResult.confidence * 100).toFixed(0)}%</p>
                                                    </div> */}
                                                    <div>
                                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Issuer</p>
                                                        <p className="text-xl font-bold text-white">{verificationResult.issued_by_auroraa ? 'Auroraa Official' : 'Unknown'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Status</p>
                                                        <p className="text-xl font-bold capitalize text-white">{verificationResult.status}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {verificationResult && !isVerifying && (
                                <FeedbackCard
                                    onFeedbackSubmit={handleFeedbackSubmit}
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Auth Popup - Styled to match */}
            <AnimatePresence>
                {showAuthPopup && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        onClick={() => setShowAuthPopup(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-[#0f1115] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Decorative background in popup */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#1B7FDC]/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-full bg-[#1B7FDC]/10 flex items-center justify-center mb-6">
                                    <Lock className="w-6 h-6 text-[#1B7FDC]" />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-2">Login Required</h3>
                                <p className="text-gray-400 mb-6 leading-relaxed">
                                    Create an account to verify and secure your digital assets (images only for now).
                                </p>

                                <div className="space-y-3">
                                    <button
                                        onClick={handleLoginRedirect}
                                        className="w-full py-3 px-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        Create Account / Login
                                    </button>
                                    <button
                                        onClick={() => setShowAuthPopup(false)}
                                        className="w-full py-3 px-4 border border-white/10 text-gray-400 rounded-lg hover:bg-white/5 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default VerifySection
