"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export default function FinalScene() {
    const [balloonData, setBalloonData] = useState(null);

    useEffect(() => {
        // Continuous confetti
        const duration = 15 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min: number, max: number) {
            return Math.random() * (max - min) + min;
        }

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        fetch("https://lottie.host/8040b284-486a-4977-8025-06048d087b32/NfGv6jQ8uS.json") // Balloons
            .then(res => res.json())
            .then(data => setBalloonData(data));

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative flex flex-col items-center justify-center w-full h-screen bg-gradient-to-tr from-pink-200 via-rose-100 to-violet-200 overflow-hidden text-center"
        >
            {/* Background Balloons */}
            <div className="absolute inset-0 z-0 opacity-40">
                {balloonData && (
                    <Lottie animationData={balloonData} loop={true} />
                )}
            </div>

            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    delay: 0.5
                }}
                className="z-10 px-6"
            >
                <h2 className="text-romantic-purple uppercase tracking-[0.4em] text-sm md:text-md mb-4 font-bold">
                    Once again,
                </h2>
                <h1 className="text-5xl md:text-7xl font-black text-rose-500 cinematic-text drop-shadow-xl mb-6">
                    Happy Birthday Silvianna <span className="text-rose-400">❤️</span>
                </h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="text-pink-900/60 font-medium tracking-widest text-sm"
                >
                    MAKING EVERY MOMENT COUNT
                </motion.p>
            </motion.div>

            {/* Floating Hearts */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: "110vh", x: `${Math.random() * 100}vw` }}
                        animate={{
                            y: "-20vh",
                            rotate: Math.random() * 360
                        }}
                        transition={{
                            duration: 6 + Math.random() * 6,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                        }}
                        className="absolute text-rose-300 opacity-60 text-4xl"
                    >
                        ❤️
                    </motion.div>
                ))}
            </div>

            {/* Footer / Replay button if needed */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3 }}
                className="absolute bottom-12 z-20"
            >
                <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-white/30 backdrop-blur-md rounded-full text-pink-700 text-xs tracking-widest uppercase hover:bg-white/50 transition-colors"
                >
                    Replay magic ✨
                </button>
            </motion.div>
        </motion.div>
    );
}
