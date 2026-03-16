"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

interface PremiumOpeningProps {
    onOpen: () => void;
}

export default function PremiumOpening({ onOpen }: PremiumOpeningProps) {
    useEffect(() => {
        // Light initial confetti
        const timer = setTimeout(() => {
            confetti({
                particleCount: 40,
                spread: 70,
                origin: { y: 0.8 },
                colors: ["#FBCFE8", "#FFFFFF", "#F472B6"],
            });
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative flex flex-col items-center justify-center w-full h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 overflow-hidden text-center px-6"
        >
            {/* Floating Hearts Decoration */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: "110vh", x: `${Math.random() * 100}vw`, opacity: 0 }}
                        animate={{
                            y: "-10vh",
                            opacity: [0, 0.4, 0],
                            x: `${Math.random() * 100}vw`
                        }}
                        transition={{
                            duration: 10 + Math.random() * 10,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                        }}
                        className="absolute text-pink-300 text-2xl"
                    >
                        ❤️
                    </motion.div>
                ))}
            </div>

            {/* Content Container */}
            <div className="z-10 space-y-6 max-w-2xl">
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="text-pink-400 font-medium tracking-[0.5em] uppercase text-sm md:text-lg"
                >
                    You are invited
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                    className="text-pink-900 font-light tracking-[0.2em] text-xl md:text-3xl uppercase"
                >
                    Birthday Celebration
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                    className="py-4"
                >
                    <h1
                        className="text-5xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-500 to-purple-500 drop-shadow-sm leading-tight"
                        style={{ fontFamily: "var(--font-playfair)" }}
                    >
                        Silviaana Santika Wijaya
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 2 }}
                    className="flex justify-center gap-2 text-pink-300"
                >
                    <span>✨</span>
                    <span>✨</span>
                    <span>✨</span>
                </motion.div>

                <motion.button
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ delay: 2, duration: 0.8 }}
                    onClick={onOpen}
                    className="mt-12 px-12 py-4 bg-pink-500 text-white rounded-full text-lg md:text-xl font-bold tracking-widest shadow-[0_10px_30px_rgba(244,114,182,0.4)] hover:bg-pink-600 transition-all uppercase"
                >
                    Open Invitation
                </motion.button>
            </div>

            {/* Sparkles Decoration */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.8, 0], scale: [0, 1, 0] }}
                        transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 3,
                        }}
                        className="absolute text-yellow-400 text-xs"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`
                        }}
                    >
                        ✨
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
