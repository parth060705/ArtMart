import React from 'react'
import { motion } from 'framer-motion'

const FloatingDecorativeElements = () => {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        width: Math.random() * 300 + 200 + 'px',
                        height: Math.random() * 300 + 200 + 'px',
                        left: Math.random() * 80 + 10 + '%',
                        top: Math.random() * 80 + 10 + '%',
                        background: `radial-gradient(circle, ${i % 3 === 0 ? 'rgba(6, 91, 152, 0.5)' :
                            i % 3 === 1 ? 'rgba(27, 127, 220, 0.5)' :
                                'rgba(13, 184, 211, 0.5)'
                            }, transparent)`,
                        filter: 'blur(30px)'
                    }}
                    animate={{
                        x: [0, Math.random() * 200 - 100, 0],
                        y: [0, Math.random() * 200 - 100, 0],
                        opacity: [0.2, 0.4, 0.2],
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
    )
}

export default FloatingDecorativeElements
