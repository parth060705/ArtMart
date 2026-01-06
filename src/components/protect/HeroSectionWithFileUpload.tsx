import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Upload, Shield, Zap, Lock, X, AlertCircle, Trash2 } from 'lucide-react';
import { useAuth } from '@/hooks/user/auth/UseAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import { Routes } from '@/lib/routes';
import { uploadWatermark } from '@/services/watermarkApi';

const HeroSectionWithFileUpload = () => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [showAuthPopup, setShowAuthPopup] = useState(false);
    const [fileError, setFileError] = useState<string | null>(null);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleUploadClick = () => {
        if (!isAuthenticated) {
            setShowAuthPopup(true);
            return;
        }
    };

    const handleRemoveFile = () => {
        setUploadedFile(null);
        setFileError(null);
    };

    const validateFileType = (file: File): boolean => {
        const validTypes = ['image/jpeg', 'image/jpg'];
        return validTypes.includes(file.type);
    };

    const handleApplyProtection = async () => {
        if (!uploadedFile) {
            setFileError('Please upload a file first');
            return;
        }

        try {
            setFileError(null);
            const result = await uploadWatermark(uploadedFile);
            
            if (result.success) {
                console.log('Watermark applied successfully:', result.data);
                // You can add success handling here, like showing a success message or redirecting
                // For example: navigate('/success') or show a success notification
            } else {
                setFileError(result.message || 'Failed to apply watermark');
            }
        } catch (error) {
            console.error('Error applying watermark:', error);
            setFileError('Failed to apply watermark. Please try again.');
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
            
            // Validate file type
            if (!validateFileType(file)) {
                setFileError('Only JPG and JPEG files are supported for now.');
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
            
            // Validate file type
            if (!validateFileType(file)) {
                setFileError('Only JPG and JPEG files are supported for now.');
                setUploadedFile(null);
                return;
            }
            
            // Clear any previous error and set the file
            setFileError(null);
            setUploadedFile(file);
        }
    };

    return (
        <section className="relative min-h-screen overflow-hidden pt-20 px-4 sm:px-8 bg-gradient-to-br from-[#193546] via-[#0f2533] to-[#193546]">
            {/* Floating decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 sm:top-20 sm:left-20 w-48 sm:w-72 h-48 sm:h-72 bg-[#1B7FDC]/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-10 right-10 sm:bottom-20 sm:right-20 w-64 sm:w-96 h-64 sm:h-96 bg-[#0DB8D3]/10 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.h1
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight"
                    >
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B7FDC] via-[#0DB8D3] to-[#1B7FDC]">
                            Your digital assets,
                        </span>
                        <br />
                        <motion.span
                            className="text-[#0DB8D3]"
                            animate={{
                                textShadow: [
                                    '0 0 0px rgba(13, 184, 211, 0)',
                                    '0 0 20px rgba(13, 184, 211, 0.5)',
                                    '0 0 0px rgba(13, 184, 211, 0)'
                                ]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                repeatType: 'reverse'
                            }}
                        >
                            Protected like never before.
                        </motion.span>
                    </motion.h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex items-center justify-center h-auto"
                >
                    <div className="w-full max-w-md relative">
                        <motion.div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={handleUploadClick}
                            className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                                isDragOver
                                    ? 'border-[#0DB8D3] bg-[#0DB8D3]/5'
                                    : uploadedFile
                                    ? 'border-[#1B7FDC] bg-[#1B7FDC]/5'
                                    : isAuthenticated
                                    ? 'border-gray-600 bg-[#0f2533]/50 hover:border-[#1B7FDC]/50 cursor-pointer'
                                    : 'border-gray-700 bg-[#0f2533]/30 cursor-pointer'
                            }`}
                            whileHover={{ scale: 1.02 }}
                        >
                            <input
                                id="upload"
                                type="file"
                                className={`absolute inset-0 w-full h-full opacity-0 ${
                                    isAuthenticated ? 'cursor-pointer pointer-events-auto' : 'cursor-pointer pointer-events-none'
                                }`}
                                onChange={handleFileChange}
                                accept="image/jpeg,image/jpg"
                                disabled={!isAuthenticated}
                            />
                            
                            <div className="pointer-events-none">
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="mx-auto w-16 h-16 mb-4"
                                >
                                    <Upload className="w-full h-full text-[#0DB8D3]" />
                                </motion.div>
                                
                                {uploadedFile ? (
                                    <div>
                                        <p className="text-white font-medium mb-2">{uploadedFile.name}</p>
                                        <p className="text-sm text-gray-400">Image selected</p>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="text-white font-medium mb-2">
                                            {isDragOver ? 'Drop your file here' : 'Upload your artwork'}
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            Drag and drop or click to browse
                                        </p>
                                        <p className="text-xs text-gray-500 mt-2">
                                            Supports: JPG, JPEG (Max 10MB)
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* Error message */}
                        {fileError && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg"
                            >
                                <div className="flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 text-red-400" />
                                    <p className="text-sm text-red-400">{fileError}</p>
                                </div>
                            </motion.div>
                        )}

                        {/* Remove file button */}
                        {uploadedFile && (
                            <motion.button
                                onClick={handleRemoveFile}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="absolute top-4 right-4 p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors border border-red-500/30"
                                title="Remove file"
                            >
                                <Trash2 className="w-4 h-4" />
                            </motion.button>
                        )}

                        {/* Action button */}
                        {uploadedFile && (
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleApplyProtection}
                                className="w-full mt-6 bg-gradient-to-r from-[#1B7FDC] to-[#0DB8D3] text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                Apply Protection
                            </motion.button>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Authentication Popup */}
            {showAuthPopup && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    onClick={() => setShowAuthPopup(false)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-[#193546] border border-[#1B7FDC]/20 rounded-2xl p-8 max-w-md mx-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <AlertCircle className="w-6 h-6 text-[#0DB8D3]" />
                                <h3 className="text-xl font-bold text-white">Account Required</h3>
                            </div>
                            <button
                                onClick={() => setShowAuthPopup(false)}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <p className="text-gray-300 leading-relaxed">
                                You need to create an account to apply watermarks and protect your artwork. This helps us verify ownership and provide you with the best protection features.
                            </p>

                            <div className="bg-[#0DB8D3]/10 border border-[#0DB8D3]/20 rounded-lg p-4">
                                <h4 className="font-semibold text-[#0DB8D3] mb-2">Why create an account?</h4>
                                <ul className="space-y-2 text-sm text-gray-300">
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#0DB8D3] mt-1">•</span>
                                        <span>Add ownership watermarks to your artwork</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#0DB8D3] mt-1">•</span>
                                        <span>Track your protected creations</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#0DB8D3] mt-1">•</span>
                                        <span>Access advanced protection features</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setShowAuthPopup(false)}
                                className="flex-1 px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                Maybe Later
                            </button>
                            <motion.button
                                onClick={handleLoginRedirect}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1 px-4 py-2 bg-gradient-to-r from-[#1B7FDC] to-[#0DB8D3] text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                            >
                                Create Account
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </section>
    )
}

export default HeroSectionWithFileUpload
