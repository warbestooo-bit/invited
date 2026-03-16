"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";

interface InvitationSceneProps {
    onNext: () => void;
}

export default function InvitationScene({ onNext }: InvitationSceneProps) {
    const [showName, setShowName] = useState(false);
    const [sparkleData, setSparkleData] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => setShowName(true), 1500);
        const nextTimer = setTimeout(() => onNext(), 6000);

        fetch("https://lottie.host/8e2b7a90-3450-4883-9b4b-97e38ba18b7a/V4U7T1A1B1.json") // Sparkles
            .then(res => res.json())
            .then(data => setSparkleData(data));

        return () => {
            clearTimeout(timer);
            clearTimeout(nextTimer);
        };
    }, [onNext]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative flex flex-col items-center justify-center w-full h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-violet-100 overflow-hidden px-6 text-center"
        >
            <div className="z-10 flex flex-col items-center">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-romantic-purple font-medium tracking-[0.3em] uppercase mb-4 text-sm md:text-base"
                >
                    Birthday Invitation
                </motion.p>

                {showName && (
                    <motion.div className="relative">
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 1.5, type: "spring" }}
                            className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-500 drop-shadow-sm px-4"
                            style={{ fontFamily: "var(--font-playfair)" }}
                        >
                            Silviaana Santika Wijaya
                        </motion.h1>

                        {/* Sparkle Lottie around text */}
                        <div className="absolute -inset-10 z-[-1] pointer-events-none opacity-40">
                            {sparkleData && (
                                <Lottie animationData={sparkleData} loop={true} />
                            )}
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            opacity: 0,
                            scale: 0,
                            x: `${Math.random() * 100}vw`,
                            y: `${Math.random() * 100}vh`
                        }}
                        animate={{
                            opacity: [0, 0.4, 0],
                            scale: [0, 1.2, 0],
                            y: "-=100"
                        }}
                        transition={{
                            duration: 3 + Math.random() * 4,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                        }}
                        className="absolute w-2 h-2 rounded-full bg-pink-300 blur-[1px]"
                    />
                ))}
            </div>
        </motion.div>
    );
}
