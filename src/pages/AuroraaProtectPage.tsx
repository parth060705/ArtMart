// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Upload, Shield, Lock, Cloud, FileText, Key, Clock, Zap, Instagram, Facebook, Youtube, Sparkles, ArrowRight, Check } from 'lucide-react';
// import Header from '@/components/protect/Header';
// import { Link } from 'react-router-dom';
// import { Routes } from '@/lib/routes';
// import SuccessMessage from '@/components/protect/SuccessMessage';

// const AuroraaProtectPage = () => {
//     // const [isVisible, setIsVisible] = useState(false);
//     const [email, setEmail] = useState('');
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [isSubmitted, setIsSubmitted] = useState(false);
//     const [showSuccessPopup, setShowSuccessPopup] = useState(false);

//     // const features = [
//     //     {
//     //         icon: <Shield className="w-8 h-8 text-blue-500" />,
//     //         title: "Military-Grade Encryption",
//     //         description: "Your files are protected with AES-256 encryption, the same standard used by banks and governments."
//     //     },
//     //     {
//     //         icon: <Lock className="w-8 h-8 text-green-500" />,
//     //         title: "Zero-Knowledge Privacy",
//     //         description: "We can't see your files. Only you hold the keys to decrypt and access your data."
//     //     },
//     //     {
//     //         icon: <Cloud className="w-8 h-8 text-purple-500" />,
//     //         title: "Secure Cloud Backup",
//     //         description: "Automatic backups ensure your files are always safe, even if your device is lost or damaged."
//     //     },
//     //     {
//     //         icon: <FileText className="w-8 h-8 text-amber-500" />,
//     //         title: "Document Protection",
//     //         description: "Secure your sensitive documents with password protection and access controls."
//     //     },
//     //     {
//     //         icon: <Key className="w-8 h-8 text-red-500" />,
//     //         title: "Password Management",
//     //         description: "Securely store and manage all your passwords in one encrypted vault."
//     //     },
//     //     {
//     //         icon: <Clock className="w-8 h-8 text-cyan-500" />,
//     //         title: "Version History",
//     //         description: "Access previous versions of your files with our comprehensive version control system."
//     //     }
//     // ];

//     const handleSubmit = async (e: any) => {
//         e.preventDefault();
//         setIsSubmitting(true);
//         const formData = new FormData();
//         formData.append("entry.1167542943", email);
//         await fetch('https://docs.google.com/forms/d/e/1FAIpQLSe2uP0xP2I7TJCBdKy20oYdnghKFqI4cuRZGH8h8pLj3e3J9A/formResponse', {
//             method: 'POST',
//             mode: "no-cors",
//             body: formData,
//         });
//         setIsSubmitting(false);
//         setIsSubmitted(true);
//         setShowSuccessPopup(true);
//         setEmail('');
//     };


//     // Animation variants
//     const fadeInUp = {
//         hidden: { opacity: 0, y: 20 },
//         visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
//     };

//     const staggerContainer = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.1
//             }
//         }
//     };

//     const navigationItems = [
//         { label: 'Features', href: '#features' },
//     ];

//     const features = [
//         {
//             icon: <Shield className="w-10 h-10 text-purple-600" />,
//             title: 'AI-Untrainable Protection',
//             description: 'Your artwork is processed so AI models cannot learn or replicate your style.'
//         },
//         {
//             icon: <Lock className="w-10 h-10 text-amber-500" />,
//             title: 'Visually Identical Output',
//             description: 'The protected image looks the same to humans — no visible distortion or quality loss.'
//         },
//         {
//             icon: <Cloud className="w-10 h-10 text-purple-500" />,
//             title: 'One-Click Upload & Download',
//             description: 'Upload your image, wait a few seconds, and download the protected version instantly.'
//         },
//         {
//             icon: <FileText className="w-10 h-10 text-amber-400" />,
//             title: 'Style-Theft Prevention',
//             description: 'Blocks AI systems from extracting style patterns used for cloning or imitation.'
//         },
//         {
//             icon: <Key className="w-10 h-10 text-purple-400" />,
//             title: 'Privacy-First Processing',
//             description: 'Files are processed securely and not stored after protection is applied.'
//         },
//         {
//             icon: <Clock className="w-10 h-10 text-amber-600" />,
//             title: 'Share-Safe for Social Platforms',
//             description: 'The protected image can be posted, shared, or printed while remaining resistant to AI training.'
//         }
//     ]

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-purple-50 via-amber-50 to-purple-100 text-gray-900 font-sans overflow-x-hidden">

//             {showSuccessPopup && (
//                 <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1100] flex items-center justify-center p-4"
//                     onClick={() => setShowSuccessPopup(false)}
//                 >
//                     <motion.div
//                         initial={{ scale: 0.9, opacity: 0 }}
//                         animate={{ scale: 1, opacity: 1 }}
//                         exit={{ scale: 0.9, opacity: 0 }}
//                         className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
//                         onClick={(e) => e.stopPropagation()}
//                     >
//                         <SuccessMessage email={email} />
//                         <div className="p-4 border-t border-gray-100 flex justify-end">
//                             <button
//                                 onClick={() => setShowSuccessPopup(false)}
//                                 className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
//                             >
//                                 Close
//                             </button>
//                         </div>
//                     </motion.div>
//                 </motion.div>
//             )}

//             <Header navigationItems={navigationItems} />

//             {/* Floating decorative elements */}
//             <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
//                 {[...Array(15)].map((_, i) => (
//                     <motion.div
//                         key={i}
//                         className="absolute rounded-full bg-purple-200/20"
//                         style={{
//                             width: Math.random() * 400 + 100 + 'px',
//                             height: Math.random() * 400 + 100 + 'px',
//                             left: Math.random() * 100 + '%',
//                             top: Math.random() * 100 + '%',
//                             filter: 'blur(60px)'
//                         }}
//                         animate={{
//                             x: [0, Math.random() * 200 - 100, 0],
//                             y: [0, Math.random() * 200 - 100, 0],
//                             opacity: [0.2, 0.4, 0.2],
//                         }}
//                         transition={{
//                             duration: Math.random() * 10 + 10,
//                             repeat: Infinity,
//                             repeatType: 'reverse',
//                             ease: 'easeInOut'
//                         }}
//                     />
//                 ))}
//             </div>

//             {/* Aurora Background Effects */}
//             <div className="absolute inset-0 overflow-hidden pointer-events-none">
//                 <motion.div
//                     className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl"
//                     animate={{
//                         scale: [1, 1.1, 1],
//                         opacity: [0.3, 0.5, 0.3],
//                     }}
//                     transition={{
//                         duration: 8,
//                         repeat: Infinity,
//                         repeatType: 'reverse',
//                         ease: 'easeInOut',
//                     }}
//                 />
//                 <motion.div
//                     className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-300/30 rounded-full blur-3xl"
//                     animate={{
//                         scale: [0.9, 1, 0.9],
//                         opacity: [0.2, 0.4, 0.2],
//                     }}
//                     transition={{
//                         duration: 10,
//                         repeat: Infinity,
//                         repeatType: 'reverse',
//                         ease: 'easeInOut',
//                         delay: 1
//                     }}
//                 />
//             </div>

//             {/* Hero Section */}
//             <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
//                 <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
//                     <motion.div
//                         initial="hidden"
//                         animate="visible"
//                         variants={staggerContainer}
//                         className="max-w-4xl mx-auto text-center space-y-8"
//                     >
//                         <motion.div variants={fadeInUp}>
//                             <motion.div
//                                 className="inline-flex items-center space-x-3 mb-6 px-6 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-aurora"
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ delay: 0.3 }}
//                             >
//                                 <Sparkles className="w-5 h-5 text-amber-500" />
//                                 <span className="text-sm font-medium text-purple-800">Coming Soon</span>
//                             </motion.div>

//                             <motion.h1
//                                 variants={fadeInUp}
//                                 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-900 via-purple-700 to-amber-600 mb-6 leading-tight"
//                             >
//                                 Your digital assets,
//                                 <br />
//                                 <motion.span
//                                     className="text-amber-600"
//                                     animate={{
//                                         textShadow: [
//                                             '0 0 0px rgba(217, 119, 6, 0)',
//                                             '0 0 20px rgba(245, 158, 11, 0.5)',
//                                             '0 0 0px rgba(217, 119, 6, 0)'
//                                         ]
//                                     }}
//                                     transition={{
//                                         duration: 3,
//                                         repeat: Infinity,
//                                         repeatType: 'reverse'
//                                     }}
//                                 >
//                                     protected like never before.
//                                 </motion.span>
//                             </motion.h1>

//                             <motion.p
//                                 variants={fadeInUp}
//                                 className="text-xl sm:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed"
//                             >
//                                 Auroraa Protect keeps your creative work secure in the AI era.
//                             </motion.p>
//                         </motion.div>

//                         <motion.div
//                             variants={fadeInUp}
//                             className="relative z-10"
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: 0.4 }}
//                         >
//                             <div className="relative max-w-2xl mx-auto mt-12">
//                                 <motion.div
//                                     className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-amber-400 rounded-2xl opacity-30 blur"
//                                     animate={{
//                                         opacity: [0.2, 0.4, 0.2],
//                                     }}
//                                     transition={{
//                                         duration: 4,
//                                         repeat: Infinity,
//                                         repeatType: 'reverse',
//                                     }}
//                                 />
//                                 <div id='hero-section' className="relative bg-white/80 backdrop-blur-sm p-1 rounded-2xl shadow-2xl">
//                                     <div className="p-8 text-center">
//                                         <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-amber-50 mb-6 shadow-inner">
//                                             <Lock className="h-12 w-12 text-purple-600" />
//                                         </div>
//                                         <h2 className="text-3xl font-bold text-gray-900 mb-4">Secure File Protection</h2>
//                                         <p className="text-gray-600 mb-8 max-w-lg mx-auto text-lg">
//                                             Your creative work deserves the highest level of security.
//                                         </p>

//                                         <div className="border-2 border-dashed border-purple-100 rounded-xl p-8 text-center hover:border-purple-300 transition-colors bg-white/50 backdrop-blur-sm">
//                                             <Upload className="h-12 w-12 text-purple-500 mx-auto mb-4" />
//                                             <p className="text-lg font-medium text-gray-700 mb-2">Coming Soon</p>
//                                             <p className="text-gray-500">
//                                                 We're working hard to bring you the most secure file protection platform.
//                                             </p>
//                                         </div>

//                                         <div className="mt-12">
//                                             <p className="text-sm text-gray-500 mb-4">Be the first to know when we launch</p>
//                                             <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={handleSubmit}>
//                                                 <input
//                                                     type="email"
//                                                     value={email}
//                                                     onChange={(e) => setEmail(e.target.value)}
//                                                     placeholder="Your email address"
//                                                     className="flex-1 px-6 py-4 bg-white/90 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-gray-900 placeholder-gray-500 transition-all shadow-inner"
//                                                     required
//                                                 />
//                                                 <button
//                                                     type="submit"
//                                                     disabled={isSubmitting}
//                                                     className="group inline-flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-lg font-semibold rounded-lg shadow-aurora-strong hover:shadow-[0_12px_40px_rgba(245,158,11,0.35)] hover:scale-[1.02] transition-all ease-in-out cursor-pointer"
//                                                 >
//                                                     {isSubmitting ? (
//                                                         'Joining...'
//                                                     ) : isSubmitted ? (
//                                                         <>
//                                                             <Check className="w-5 h-5" /> Joined
//                                                         </>
//                                                     ) : (
//                                                         <>
//                                                             <span>Join for free</span>
//                                                             {/* <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /> */}
//                                                         </>
//                                                     )}
//                                                 </button>
//                                             </form>
//                                             <p className="text-sm text-gray-500 mt-4 flex items-center justify-center space-x-2">
//                                                 <Shield className="w-4 h-4 text-purple-500" />
//                                                 <span>Your email is safe with us. No spam, ever.</span>
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </motion.div>
//                     </motion.div>
//                 </div>
//             </section>

//             {/* Features Section */}
//             <section id="features" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white/30 backdrop-blur-sm">
//                 <div className="max-w-7xl mx-auto">
//                     <div className="text-center mb-16">
//                         <h2 className="text-4xl font-bold text-gray-900 mb-6">Powerful Protection for Creators</h2>
//                         <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//                             Auroraa Protect offers comprehensive security features designed specifically for artists and creators.
//                         </p>
//                     </div>

//                     <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//                         {features.map((feature, index) => (
//                             <motion.div
//                                 key={index}
//                                 className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
//                                 initial={{ opacity: 0, y: 20 }}
//                                 whileInView={{ opacity: 1, y: 0 }}
//                                 viewport={{ once: true }}
//                                 transition={{ delay: index * 0.1 }}
//                             >
//                                 <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-purple-50 to-amber-50 mb-6">
//                                     {feature.icon}
//                                 </div>
//                                 <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
//                                 <p className="text-gray-600">{feature.description}</p>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* CTA Section */}
//             <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-900 to-amber-900 text-white">
//                 <div className="max-w-4xl mx-auto text-center">
//                     <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to secure your creative work?</h2>
//                     <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
//                         Join the waitlist to get early access to Auroraa Protect and be the first to know when we launch.
//                     </p>
//                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                         <a 
//                             href="#hero-section" 
//                             className="px-8 py-4 bg-white text-purple-900 font-semibold rounded-xl hover:bg-purple-50 transition-colors"
//                             onClick={(e) => {
//                                 e.preventDefault();
//                                 document.getElementById('hero-section')?.scrollIntoView({ 
//                                     behavior: 'smooth',
//                                     block: 'start'
//                                 });
//                             }}
//                         >
//                             Join Waitlist
//                         </a>
//                     </div>
//                 </div>
//             </section>

//             {/* Footer */}
//             <div className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
//                 <div className="max-w-6xl mx-auto">
//                     <div className="grid md:grid-cols-4 gap-8 mb-12">
//                         <div>
//                             <Link to='/' className="text-2xl font-bold logo-font bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
//                                 Auroraa
//                             </Link>
//                             <p className="text-gray-600 mb-6">Empowering artists in the digital age with protection-first technology.</p>
//                             <div className="flex space-x-4">
//                                 {/* {['twitter', 'instagram', 'discord', 'github'].map((social) => (
//                                                 <a
//                                                     key={social}
//                                                     href="#"
//                                                     className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-purple-600 hover:shadow-aurora transition-all"
//                                                     aria-label={social}
//                                                 >
//                                                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                                                         <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
//                                                     </svg>
//                                                 </a>
//                                             ))} */}
//                                 <div className="mt-4 flex items-center gap-3">
//                                     <a
//                                         href="https://instagram.com/auroraadotin"
//                                         target="_blank"
//                                         rel="noreferrer"
//                                         aria-label="Auroraa on Instagram"
//                                         className="inline-flex items-center justify-center rounded-full bg-accent/15 text-foreground hover:bg-accent/25 ring-1 ring-accent/30 w-9 h-9"
//                                     >
//                                         <Instagram className="w-4 h-4" />
//                                     </a>
//                                     <a
//                                         href="https://www.facebook.com/auroraa.a.social.marketplace.for.art.a"
//                                         target="_blank"
//                                         rel="noreferrer"
//                                         aria-label="Auroraa on Facebook"
//                                         className="inline-flex items-center justify-center rounded-full bg-accent/15 text-foreground hover:bg-accent/25 ring-1 ring-accent/30 w-9 h-9"
//                                     >
//                                         <Facebook className="w-4 h-4" />
//                                     </a>
//                                     <a
//                                         href="https://youtube.com/@AuroraaCommunity"
//                                         target="_blank"
//                                         rel="noreferrer"
//                                         aria-label="Auroraa on YouTube"
//                                         className="inline-flex items-center justify-center rounded-full bg-accent/15 text-foreground hover:bg-accent/25 ring-1 ring-accent/30 w-9 h-9"
//                                     >
//                                         <Youtube className="w-4 h-4" />
//                                     </a>
//                                 </div>
//                             </div>
//                         </div>

//                         <div>
//                             <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Product</h3>
//                             <ul className="space-y-3">
//                                 <li>
//                                     <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Auroraa Protect</a>
//                                 </li>
//                             </ul>
//                         </div>

//                         {/* <div>
//                                         <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Company</h3>
//                                         <ul className="space-y-3">
//                                             {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
//                                                 <li key={item}>
//                                                     <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">{item}</a>
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </div> */}

//                         <div>
//                             <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Legal</h3>
//                             <ul className="space-y-3">
//                                 <li >
//                                     <Link to={`/${Routes.PrivacyPolicyPage}`} className="text-gray-600 hover:text-purple-600 transition-colors">Privacy</Link>
//                                 </li>
//                                 <li>
//                                     <Link to={`/${Routes.TermsAndConditionsPage}`} className="text-gray-600 hover:text-purple-600 transition-colors">Terms</Link>
//                                 </li>
//                                 <li>
//                                     {/* <Link to={`/${Routes.PrivacyPolicyPage}`} className="text-gray-600 hover:text-purple-600 transition-colors">GDPR</Link> */}
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>

//                     <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
//                         <p className="text-sm text-gray-500 mb-4 md:mb-0">
//                             © {new Date().getFullYear()} Auroraa All rights reserved.
//                         </p>
//                         <div className="flex space-x-6">
//                             <Link to={`/${Routes.PrivacyPolicyPage}`} className="text-sm text-gray-500 hover:text-gray-700">Privacy Policy</Link>
//                             <Link to={`/${Routes.TermsAndConditionsPage}`} className="text-sm text-gray-500 hover:text-gray-700">Terms of Service</Link>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
//             </div>
//         </div>
//     );
// };

// export default AuroraaProtectPage;







import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Shield, Lock, Cloud, FileText, Key, Clock, Zap, Instagram, Facebook, Youtube, Sparkles, ArrowRight, Check } from 'lucide-react';
import Header from '@/components/protect/Header';
import { Link } from 'react-router-dom';
import { Routes } from '@/lib/routes';
import SuccessMessage from '@/components/protect/SuccessMessage';

const AuroraaProtectPage = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append("entry.1167542943", email);
        await fetch('https://docs.google.com/forms/d/e/1FAIpQLSe2uP0xP2I7TJCBdKy20oYdnghKFqI4cuRZGH8h8pLj3e3J9A/formResponse', {
            method: 'POST',
            mode: "no-cors",
            body: formData,
        });
        setIsSubmitting(false);
        setIsSubmitted(true);
        setShowSuccessPopup(true);
        setEmail('');
    };

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const navigationItems = [
        { label: 'Features', href: '#features' },
    ];

    const features = [
        {
            icon: <Shield className="w-10 h-10 text-[#0DB8D3]" />,
            title: 'AI-Untrainable Protection',
            description: 'Your artwork is processed so AI models cannot learn or replicate your style.'
        },
        {
            icon: <Lock className="w-10 h-10 text-[#1B7FDC]" />,
            title: 'Visually Identical Output',
            description: 'The protected image looks the same to humans — no visible distortion or quality loss.'
        },
        {
            icon: <Cloud className="w-10 h-10 text-[#0DB8D3]" />,
            title: 'One-Click Upload & Download',
            description: 'Upload your image, wait a few seconds, and download the protected version instantly.'
        },
        {
            icon: <FileText className="w-10 h-10 text-[#1B7FDC]" />,
            title: 'Style-Theft Prevention',
            description: 'Blocks AI systems from extracting style patterns used for cloning or imitation.'
        },
        {
            icon: <Key className="w-10 h-10 text-[#0DB8D3]" />,
            title: 'Privacy-First Processing',
            description: 'Files are processed securely and not stored after protection is applied.'
        },
        {
            icon: <Clock className="w-10 h-10 text-[#1B7FDC]" />,
            title: 'Share-Safe for Social Platforms',
            description: 'The protected image can be posted, shared, or printed while remaining resistant to AI training.'
        }
    ]

    return (
        <div className="min-h-screen bg-[#193546] text-white font-sans overflow-x-hidden">

            {showSuccessPopup && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1100] flex items-center justify-center p-4"
                    onClick={() => setShowSuccessPopup(false)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-[#193546] border border-[#1B7FDC]/30 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <SuccessMessage email={email} />
                        <div className="p-4 border-t border-[#1B7FDC]/20 flex justify-end">
                            <button
                                onClick={() => setShowSuccessPopup(false)}
                                className="px-6 py-2 bg-gradient-to-r from-[#1B7FDC] to-[#0DB8D3] text-white rounded-lg hover:opacity-90 transition-all"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            <Header navigationItems={navigationItems} />

            {/* Floating decorative elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            width: Math.random() * 400 + 100 + 'px',
                            height: Math.random() * 400 + 100 + 'px',
                            left: Math.random() * 100 + '%',
                            top: Math.random() * 100 + '%',
                            background: `radial-gradient(circle, ${
                                i % 3 === 0 ? 'rgba(6, 91, 152, 0.15)' : 
                                i % 3 === 1 ? 'rgba(27, 127, 220, 0.15)' : 
                                'rgba(13, 184, 211, 0.15)'
                            }, transparent)`,
                            filter: 'blur(60px)'
                        }}
                        animate={{
                            x: [0, Math.random() * 200 - 100, 0],
                            y: [0, Math.random() * 200 - 100, 0],
                            opacity: [0.15, 0.3, 0.15],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            ease: 'easeInOut'
                        }}
                    />
                ))}
            </div>

            {/* Aurora Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(27, 127, 220, 0.3), transparent)' }}
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeInOut',
                    }}
                />
                <motion.div
                    className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(13, 184, 211, 0.3), transparent)' }}
                    animate={{
                        scale: [0.9, 1, 0.9],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeInOut',
                        delay: 1
                    }}
                />
            </div>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="max-w-4xl mx-auto text-center space-y-8"
                    >
                        <motion.div variants={fadeInUp}>
                            <motion.div
                                className="inline-flex items-center space-x-3 mb-6 px-6 py-2 bg-[#065B98]/20 backdrop-blur-sm rounded-full border border-[#1B7FDC]/30"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Sparkles className="w-5 h-5 text-[#0DB8D3]" />
                                <span className="text-sm font-medium text-[#0DB8D3]">Coming Soon</span>
                            </motion.div>

                            <motion.h1
                                variants={fadeInUp}
                                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight"
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
                                    protected like never before.
                                </motion.span>
                            </motion.h1>

                            <motion.p
                                variants={fadeInUp}
                                className="text-xl sm:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
                            >
                                Auroraa Protect keeps your creative work secure in the AI era.
                            </motion.p>
                        </motion.div>

                        <motion.div
                            variants={fadeInUp}
                            className="relative z-10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <div className="relative max-w-2xl mx-auto mt-12">
                                <motion.div
                                    className="absolute -inset-1 bg-gradient-to-r from-[#1B7FDC] to-[#0DB8D3] rounded-2xl opacity-30 blur"
                                    animate={{
                                        opacity: [0.2, 0.4, 0.2],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        repeatType: 'reverse',
                                    }}
                                />
                                <div id='hero-section' className="relative bg-[#0f2533] backdrop-blur-sm p-1 rounded-2xl shadow-2xl border border-[#1B7FDC]/30">
                                    <div className="p-8 text-center">
                                        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#065B98]/30 to-[#1B7FDC]/20 mb-6 border border-[#1B7FDC]/30">
                                            <Lock className="h-12 w-12 text-[#0DB8D3]" />
                                        </div>
                                        <h2 className="text-3xl font-bold text-white mb-4">Secure File Protection</h2>
                                        <p className="text-gray-300 mb-8 max-w-lg mx-auto text-lg">
                                            Your creative work deserves the highest level of security.
                                        </p>

                                        <div className="border-2 border-dashed border-[#1B7FDC]/30 rounded-xl p-8 text-center hover:border-[#0DB8D3]/50 transition-colors bg-[#193546]/50 backdrop-blur-sm">
                                            <Upload className="h-12 w-12 text-[#0DB8D3] mx-auto mb-4" />
                                            <p className="text-lg font-medium text-white mb-2">Coming Soon</p>
                                            <p className="text-gray-400">
                                                We're working hard to bring you the most secure file protection platform.
                                            </p>
                                        </div>

                                        <div className="mt-12">
                                            <p className="text-sm text-gray-400 mb-4">Be the first to know when we launch</p>
                                            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={handleSubmit}>
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="Your email address"
                                                    className="flex-1 px-6 py-4 bg-[#193546] border border-[#065B98]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B7FDC]/50 text-white placeholder-gray-400 transition-all"
                                                    required
                                                />
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="group inline-flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-[#1B7FDC] to-[#0DB8D3] text-white text-lg font-semibold rounded-lg shadow-lg hover:shadow-[0_12px_40px_rgba(13,184,211,0.35)] hover:scale-[1.02] transition-all ease-in-out cursor-pointer"
                                                >
                                                    {isSubmitting ? (
                                                        'Joining...'
                                                    ) : isSubmitted ? (
                                                        <>
                                                            <Check className="w-5 h-5" /> Joined
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span>Join for free</span>
                                                        </>
                                                    )}
                                                </button>
                                            </form>
                                            <p className="text-sm text-gray-400 mt-4 flex items-center justify-center space-x-2">
                                                <Shield className="w-4 h-4 text-[#0DB8D3]" />
                                                <span>Your email is safe with us. No spam, ever.</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#0f2533]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-6">Powerful Protection for Creators</h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Auroraa Protect offers comprehensive security features designed specifically for artists and creators.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="bg-[#193546]/80 backdrop-blur-sm p-8 rounded-2xl border border-[#1B7FDC]/20 hover:border-[#0DB8D3]/40 shadow-lg hover:shadow-[0_8px_30px_rgba(13,184,211,0.2)] transition-all"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-[#065B98]/20 border border-[#1B7FDC]/30 mb-6">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-300">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#065B98] via-[#1B7FDC] to-[#0DB8D3] text-white">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bS0yIDBjMCAxLjEwNC0uODk2IDItMiAycy0yLS44OTYtMi0yIC44OTYtMiAyLTIgMiAuODk2IDIgMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>
                </div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to secure your creative work?</h2>
                    <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
                        Join the waitlist to get early access to Auroraa Protect and be the first to know when we launch.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a 
                            href="#hero-section" 
                            className="px-8 py-4 bg-white text-[#065B98] font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('hero-section')?.scrollIntoView({ 
                                    behavior: 'smooth',
                                    block: 'start'
                                });
                            }}
                        >
                            Join Waitlist
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <div className="relative py-16 px-4 sm:px-6 lg:px-8 bg-[#0f2533] border-t border-[#1B7FDC]/20">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-12">
                        <div>
                            <Link to='/' className="text-2xl font-bold logo-font bg-gradient-to-r from-[#1B7FDC] via-[#0DB8D3] to-[#1B7FDC] bg-clip-text text-transparent">
                                Auroraa
                            </Link>
                            <p className="text-gray-400 mb-6 mt-3">Empowering artists in the digital age with protection-first technology.</p>
                            <div className="flex space-x-4">
                                <div className="flex items-center gap-3">
                                    <a
                                        href="https://instagram.com/auroraadotin"
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label="Auroraa on Instagram"
                                        className="inline-flex items-center justify-center rounded-full bg-[#1B7FDC]/20 text-[#0DB8D3] hover:bg-[#1B7FDC]/30 border border-[#1B7FDC]/30 w-9 h-9 transition-all"
                                    >
                                        <Instagram className="w-4 h-4" />
                                    </a>
                                    <a
                                        href="https://www.facebook.com/auroraa.a.social.marketplace.for.art.a"
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label="Auroraa on Facebook"
                                        className="inline-flex items-center justify-center rounded-full bg-[#1B7FDC]/20 text-[#0DB8D3] hover:bg-[#1B7FDC]/30 border border-[#1B7FDC]/30 w-9 h-9 transition-all"
                                    >
                                        <Facebook className="w-4 h-4" />
                                    </a>
                                    <a
                                        href="https://youtube.com/@AuroraaCommunity"
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label="Auroraa on YouTube"
                                        className="inline-flex items-center justify-center rounded-full bg-[#1B7FDC]/20 text-[#0DB8D3] hover:bg-[#1B7FDC]/30 border border-[#1B7FDC]/30 w-9 h-9 transition-all"
                                    >
                                        <Youtube className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Product</h3>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#" className="text-gray-400 hover:text-[#0DB8D3] transition-colors">Auroraa Protect</a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h3>
                            <ul className="space-y-3">
                                <li >
                                    <Link to={`/${Routes.PrivacyPolicyPage}`} className="text-gray-400 hover:text-[#0DB8D3] transition-colors">Privacy</Link>
                                </li>
                                <li>
                                    <Link to={`/${Routes.TermsAndConditionsPage}`} className="text-gray-400 hover:text-[#0DB8D3] transition-colors">Terms</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-[#1B7FDC]/20 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-gray-400 mb-4 md:mb-0">
                            © {new Date().getFullYear()} Auroraa All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <Link to={`/${Routes.PrivacyPolicyPage}`} className="text-sm text-gray-400 hover:text-gray-300">Privacy Policy</Link>
                            <Link to={`/${Routes.TermsAndConditionsPage}`} className="text-sm text-gray-400 hover:text-gray-300">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuroraaProtectPage;