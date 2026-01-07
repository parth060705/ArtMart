import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, AlertCircle, Trash2, ShieldCheck, Lock, Sparkles, Fingerprint, Download } from 'lucide-react';
import { useAuth } from '@/hooks/user/auth/UseAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import { Routes } from '@/lib/routes';
import { uploadWatermark } from '@/services/watermarkApi';

const HeroSectionWithFileUpload = () => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [showAuthPopup, setShowAuthPopup] = useState(false);
    const [fileError, setFileError] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [watermarkType, setWatermarkType] = useState<'invisible' | 'ai'>('invisible');
    const [protectedImageUrl, setProtectedImageUrl] = useState<string | null>(null);
    const [protectedFilename, setProtectedFilename] = useState<string | null>(null);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        return () => {
            if (protectedImageUrl) URL.revokeObjectURL(protectedImageUrl);
        };
    }, [protectedImageUrl]);

    const handleUploadClick = () => {
        if (!isAuthenticated) {
            setShowAuthPopup(true);
            return;
        }
    };

    const handleRemoveFile = () => {
        setUploadedFile(null);
        setFileError(null);
        if (protectedImageUrl) {
            URL.revokeObjectURL(protectedImageUrl);
            setProtectedImageUrl(null);
            setProtectedFilename(null);
        }
    };

    const validateFileType = (file: File): boolean => {
        const validTypes = ['image/jpeg', 'image/jpg'];
        const maxSize = 50 * 1024 * 1024; // 50MB in bytes

        if (!validTypes.includes(file.type)) {
            setFileError('Only JPG and JPEG files are supported for now.');
            return false;
        }

        if (file.size > maxSize) {
            setFileError('File size must be less than 50MB.');
            return false;
        }

        return true;
    };

    const handleApplyProtection = async () => {
        if (!uploadedFile) {
            setFileError('Please upload a file first');
            return;
        }

        if (watermarkType === 'ai') {
            setFileError('AI protection is not available yet. Please use invisible watermark.');
            return;
        }

        try {
            setFileError(null);
            setIsUploading(true);
            if (protectedImageUrl) {
                URL.revokeObjectURL(protectedImageUrl);
                setProtectedImageUrl(null);
                setProtectedFilename(null);
            }

            const result = await uploadWatermark(uploadedFile);
            const url = URL.createObjectURL(result.blob);
            setProtectedImageUrl(url);

            const baseName = uploadedFile.name.replace(/\.[^/.]+$/, '');
            const fallbackName = `${baseName}-protected.jpg`;
            setProtectedFilename(result.filename || fallbackName);
        } catch (error) {
            console.error('Error applying watermark:', error);
            setFileError('Failed to apply watermark. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isAuthenticated) {
            setShowAuthPopup(true);
            e.target.value = ''; // Clear the input
            return;
        }

        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];

            if (protectedImageUrl) {
                URL.revokeObjectURL(protectedImageUrl);
                setProtectedImageUrl(null);
                setProtectedFilename(null);
            }

            // Validate file type and size
            if (!validateFileType(file)) {
                setUploadedFile(null);
                e.target.value = ''; // Clear the input
                return;
            }

            // Clear any previous error and set the file
            setFileError(null);
            setUploadedFile(file);
        }
    };

    const handleLoginRedirect = () => {
        setShowAuthPopup(false);
        navigate(`/${Routes.AuthLoginPage}`, {
            state: { from: { pathname: location } }
        });
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        if (!isAuthenticated) {
            return;
        }
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
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];

            if (protectedImageUrl) {
                URL.revokeObjectURL(protectedImageUrl);
                setProtectedImageUrl(null);
                setProtectedFilename(null);
            }

            // Validate file type and size
            if (!validateFileType(file)) {
                setUploadedFile(null);
                return;
            }

            // Clear any previous error and set the file
            setFileError(null);
            setUploadedFile(file);
        }
    };

    return (
        <section className="relative w-full min-h-[90vh] flex flex-col justify-center overflow-hidden bg-[#0A0A0B] selection:bg-[#0DB8D3]/30 selection:text-[#0DB8D3]">

            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                {/* Subtle Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                {/* Ambient Orbs */}
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#1B7FDC]/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#0DB8D3]/15 rounded-full blur-[140px] mix-blend-screen animate-pulse delay-700" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col lg:flex-row items-center gap-16">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex-1 text-center lg:text-left space-y-8"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B7FDC]/10 border border-[#1B7FDC]/20 text-[#1B7FDC] text-sm font-medium">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Enterprise Grade Protection</span>
                    </div>

                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
                        Protect Your Art <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B7FDC] via-[#0DB8D3] to-[#1B7FDC] animate-gradient bg-[length:200%_auto]">
                            In The AI Era
                        </span>
                    </h1>

                    <p className="text-lg text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                        Secure your digital assets with invisible watermarking and advanced AI protection layers.
                        Claim ownership and prevent unauthorized usage with a single drag and drop.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-[#0DB8D3]" />
                            <span>Invisible Marking</span>
                        </div>
                        <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-600" />
                        <div className="flex items-center gap-2">
                            <Fingerprint className="w-4 h-4 text-[#0DB8D3]" />
                            <span>Proof of Ownership</span>
                        </div>
                        <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-600" />
                        <div className="flex items-center gap-2">
                            <Lock className="w-4 h-4 text-[#0DB8D3]" />
                            <span>Tamper Proof</span>
                        </div>
                    </div>
                </motion.div>

                {/* Upload Card */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="flex-1 w-full max-w-lg"
                >
                    <div className="relative group">
                        {/* Glow effect */}
                        <div className={`absolute -inset-1 bg-gradient-to-r from-[#1B7FDC] to-[#0DB8D3] rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 ${isDragOver ? 'opacity-75' : ''}`}></div>

                        <div className="relative bg-[#0f1115]/80 backdrop-blur-2xl border border-white/10 p-8 rounded-2xl shadow-2xl">

                            {/* Upload Area */}
                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={handleUploadClick}
                                className={`
                                    relative border-2 border-dashed rounded-xl h-80 flex flex-col items-center justify-center text-center p-6
                                    transition-all duration-300 group/upload
                                    ${isDragOver
                                        ? 'border-[#0DB8D3] bg-[#0DB8D3]/10 scale-[1.02]'
                                        : uploadedFile
                                            ? 'border-[#1B7FDC]/50 bg-[#1B7FDC]/10'
                                            : isAuthenticated
                                                ? 'border-gray-700 hover:border-[#0DB8D3]/50 hover:bg-[#0DB8D3]/5 cursor-pointer'
                                                : 'border-gray-800 bg-gray-900/50 cursor-pointer'
                                    }
                                `}
                            >
                                <input
                                    id="upload"
                                    type="file"
                                    className={`absolute inset-0 w-full h-full opacity-0 z-50 cursor-pointer ${isAuthenticated ? 'pointer-events-auto' : 'pointer-events-none'}`}
                                    onChange={handleFileChange}
                                    accept="image/jpeg,image/jpg"
                                    disabled={!isAuthenticated || isUploading}
                                />

                                <AnimatePresence mode="wait">
                                    {uploadedFile ? (
                                        <motion.div
                                            key="file-uploaded"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="w-full flex flex-col items-center z-10"
                                        >
                                            <div className="relative w-32 h-32 rounded-lg overflow-hidden shadow-lg mb-4 border border-white/10">
                                                <img
                                                    src={URL.createObjectURL(uploadedFile)}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                                    {/* Overlay on hover if needed */}
                                                </div>
                                            </div>
                                            <p className="text-white font-medium truncate max-w-xs">{uploadedFile.name}</p>
                                            <p className="text-sm text-gray-400 mt-1">{(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB</p>

                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRemoveFile();
                                                }}
                                                className="mt-4 flex items-center gap-2 text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 px-4 py-2 rounded-full text-sm transition-colors z-50 pointer-events-auto"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                                Remove
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="upload-prompt"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex flex-col items-center"
                                        >
                                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#1B7FDC]/20 to-[#0DB8D3]/20 flex items-center justify-center mb-6 group-hover/upload:scale-110 transition-transform duration-300">
                                                <Upload className="w-8 h-8 text-[#0DB8D3]" />
                                            </div>
                                            <h3 className="text-xl font-semibold text-white mb-2">
                                                {isDragOver ? 'Drop it here!' : 'Upload your artwork'}
                                            </h3>
                                            <p className="text-gray-400 text-sm mb-4 max-w-[200px]">
                                                Drag & drop your file here or click to browse
                                            </p>
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/5 text-xs text-gray-500">
                                                <span className="font-mono">JPG, JPEG</span>
                                                <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                                                <span>Max 50MB</span>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Error Toast */}
                            <AnimatePresence>
                                {fileError && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, height: 0 }}
                                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                                        exit={{ opacity: 0, y: -10, height: 0 }}
                                        className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 overflow-hidden"
                                    >
                                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                                        <p className="text-sm text-red-200">{fileError}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Actions */}
                            {uploadedFile && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-6 space-y-4"
                                >
                                    <div className="bg-[#0A0A0B]/50 p-1.5 rounded-xl flex gap-1 border border-white/5">
                                        <button
                                            onClick={() => setWatermarkType('invisible')}
                                            className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-300 ${watermarkType === 'invisible'
                                                ? 'bg-[#1B7FDC] text-white shadow-lg shadow-blue-900/20'
                                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                                }`}
                                        >
                                            Invisible Watermark
                                        </button>
                                        <div className="relative flex-1 group">
                                            <button
                                                onClick={() => setWatermarkType('ai')}
                                                disabled
                                                // disabled // Uncomment when ready to disable or enable based on feature flag
                                                className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-300 ${watermarkType === 'ai'
                                                    ? 'bg-[#0DB8D3] text-white shadow-lg shadow-cyan-900/20'
                                                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                                                    }`}
                                            >
                                                AI Protection
                                            </button>

                                            <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="rounded-md bg-black/90 text-white text-xs px-3 py-1.5 border border-white/10 shadow-lg whitespace-nowrap">
                                                    Coming soon
                                                </div>
                                                <div className="mx-auto w-2 h-2 bg-black/90 rotate-45 -mt-1 border-l border-b border-white/10" />
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleApplyProtection}
                                        disabled={isUploading}
                                        className="w-full bg-gradient-to-r from-[#1B7FDC] to-[#0DB8D3] hover:from-[#156abc] hover:to-[#0aa3bb] text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-[#0DB8D3]/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                                    >
                                        <span className="flex items-center justify-center gap-2">
                                            {isUploading ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                    <span>Processing...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>Apply {watermarkType === 'invisible' ? 'Invisible' : 'AI'} Protection</span>
                                                    <ShieldCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                                </>
                                            )}
                                        </span>
                                    </button>

                                    {protectedImageUrl && (
                                        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                                            <div className="flex items-center justify-between gap-3 mb-3">
                                                <p className="text-sm text-gray-300 font-medium truncate">
                                                    {protectedFilename || 'protected-image.jpg'}
                                                </p>
                                                <motion.div
                                                    className="flex flex-col sm:flex-row gap-4 justify-center text-center"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.5, delay: 0.2 }}
                                                >
                                                    <a
                                                        href={protectedImageUrl}
                                                        download={protectedFilename || 'protected-image.jpg'}
                                                        className="group inline-flex items-center space-x-2 px-8 py-2 bg-white text-black text-sm font-bold rounded-xl shadow-[0_0_20px_-5px_rgba(255,255,255,0.5)] hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.6)] hover:scale-105 transition-all ease-in-out cursor-pointer"
                                                    >
                                                        Download
                                                        <Download className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                    </a>

                                                </motion.div>
                                            </div>

                                            <div className="w-full rounded-lg overflow-hidden border border-white/10">
                                                <img
                                                    src={protectedImageUrl}
                                                    alt="Protected preview"
                                                    className="w-full h-48 object-cover"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.div>
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
                                    Join thousands of artists protecting their work. Create an account to watermark, track, and secure your digital assets.
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

export default HeroSectionWithFileUpload
