"use client";

import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";
import { Gift } from "lucide-react";

interface GiftBoxSceneProps {
    onOpen: () => void;
}

export default function GiftBoxScene({ onOpen }: GiftBoxSceneProps) {
    const [isOpen, setIsOpen] = useState(false);
    const controls = useAnimation();

    const handleOpen = async () => {
        if (isOpen) return;
        setIsOpen(true);

        // Confetti effect
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FBCFE8', '#DDD6FE', '#FFFFFF', '#F472B6']
        });

        await controls.start({
            scale: [1, 1.2, 0.8, 1],
            rotate: [0, 10, -10, 0],
            transition: { duration: 0.5 }
        });

        setTimeout(onOpen, 3000);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="relative flex flex-col items-center justify-center w-full h-screen bg-gradient-to-t from-pink-100 to-white overflow-hidden"
        >
            <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-romantic-purple font-medium text-lg mb-12 cinematic-text"
            >
                Ada hadiah kecil untuk kamu 🎁
            </motion.p>

            <motion.div
                animate={controls}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleOpen}
                className="relative cursor-pointer"
            >
                {!isOpen ? (
                    <motion.div
                        initial={{ y: 0 }}
                        animate={{ y: [-10, 0, -10] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-40 h-40 bg-gradient-to-tr from-pink-400 to-rose-300 rounded-2xl shadow-2xl flex items-center justify-center border-4 border-white/50"
                    >
                        {/* Ribbons */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-full bg-white/40" />
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-full bg-white/40" />
                        <Gift className="text-white w-16 h-16 relative z-10" />

                        {/* Ribbon Bow */}
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-1">
                            <div className="w-8 h-8 rounded-full border-4 border-white/50 bg-pink-400" />
                            <div className="w-8 h-8 rounded-full border-4 border-white/50 bg-pink-400" />
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 1, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1.2 }}
                        className="flex flex-col items-center"
                    >
                        <div className="w-40 h-40 flex items-center justify-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: [0, 1.5, 1] }}
                                transition={{ duration: 0.8 }}
                                className="text-6xl"
                            >
                                ✨
                            </motion.div>
                        </div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-4 text-pink-500 font-bold text-xl"
                        >
                            Surprise!
                        </motion.div>
                    </motion.div>
                )}

                {/* Outer Glow */}
                <div className="absolute inset-0 bg-pink-400/20 blur-3xl -z-10 rounded-full scale-150 animate-pulse" />
            </motion.div>

            {/* Floating Hearts */}
            {!isOpen && (
                <div className="absolute bottom-20 flex gap-4 opacity-50">
                    <motion.span animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 2 }}>💖</motion.span>
                    <motion.span animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}>💝</motion.span>
                    <motion.span animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 1 }}>💖</motion.span>
                </div>
            )}
        </motion.div>
    );
}
