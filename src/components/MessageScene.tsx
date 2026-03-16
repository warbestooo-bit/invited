"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface MessageSceneProps {
    onNext: () => void;
}

export default function MessageScene({ onNext }: MessageSceneProps) {
    const fullText = `Selamat ulang tahun Silvianna.\n\nSemoga hari ini dipenuhi dengan kebahagiaan, tawa, dan cinta.\n\nTerima kasih sudah menjadi seseorang yang begitu spesial.`;
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < fullText.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + fullText[index]);
                setIndex((prev) => prev + 1);
            }, 50); // Speed of typing
            return () => clearTimeout(timeout);
        } else {
            const timer = setTimeout(onNext, 1500);
            return () => clearTimeout(timer);
        }
    }, [index, fullText, onNext]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative flex flex-col items-center justify-center w-full h-screen bg-gradient-to-br from-pink-50 to-purple-50 overflow-hidden px-10"
        >
            <div className="max-w-md w-full glass-morphism p-8 rounded-3xl relative">
                {/* Decorative Quote Mark */}
                <div className="absolute -top-4 -left-4 text-6xl text-pink-200 opacity-50">"</div>

                <p className="text-pink-900/80 text-lg md:text-xl leading-relaxed whitespace-pre-wrap font-light italic text-center">
                    {displayedText}
                    <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="inline-block w-1 h-6 bg-pink-400 ml-1 translate-y-1"
                    />
                </p>

                <div className="absolute -bottom-4 -right-4 text-6xl text-pink-200 opacity-50">"</div>
            </div>

            {/* Floating Sparkles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0, 0.8, 0],
                            scale: [0, 1, 0],
                            x: Math.random() * 20 - 10,
                            y: Math.random() * 20 - 10
                        }}
                        transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 5,
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

            {/* Floating Hearts */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                className="absolute inset-0 pointer-events-none overflow-hidden"
            >
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -100],
                            opacity: [0, 1, 0],
                            x: [0, Math.sin(i) * 30]
                        }}
                        transition={{
                            duration: 5 + i,
                            repeat: Infinity,
                            delay: i * 2,
                        }}
                        className="absolute bottom-[-20px] text-3xl"
                        style={{ left: `${20 + i * 15}%` }}
                    >
                        ❤️
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
}
