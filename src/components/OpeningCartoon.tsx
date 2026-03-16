"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";

interface OpeningCartoonProps {
    onStart: () => void;
}

export default function OpeningCartoon({ onStart }: OpeningCartoonProps) {
    const [showButton, setShowButton] = useState(false);
    const [textIndex, setTextIndex] = useState(0);
    const [starsData, setStarsData] = useState(null);
    const [cartoonData, setCartoonData] = useState(null);

    const texts = [
        "Hari ini adalah hari yang sangat spesial...",
        "Karena seseorang yang luar biasa sedang berulang tahun 🎂"
    ];

    useEffect(() => {
        const timer1 = setTimeout(() => setTextIndex(1), 3000);
        const timer2 = setTimeout(() => setShowButton(true), 6000);

        // Fetch Lottie JSONs
        fetch("https://lottie.host/17e2343c-623e-4613-8671-897f2613d98d/N3M2k8uWdY.json")
            .then(res => res.json())
            .then(data => setStarsData(data));

        fetch("https://lottie.host/02094c7b-e1c5-4d7c-87b6-f4d06a0966a3/2pD07gK7vG.json")
            .then(res => res.json())
            .then(data => setCartoonData(data));

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative flex flex-col items-center justify-center w-full h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-pink-300 overflow-hidden"
        >
            {/* Background Stars/Lottie */}
            <div className="absolute inset-0 z-0">
                {starsData && (
                    <Lottie
                        animationData={starsData}
                        loop={true}
                        className="w-full h-full opacity-60"
                    />
                )}
            </div>

            {/* Cartoon Character / Gift Lottie */}
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="z-10 w-72 h-72 mb-10"
            >
                {cartoonData && (
                    <Lottie
                        animationData={cartoonData}
                        loop={true}
                    />
                )}
            </motion.div>

            {/* Text Messages */}
            <div className="z-10 text-center px-8 h-24 max-w-sm">
                <motion.p
                    key={textIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-white text-xl md:text-2xl font-light italic cinematic-text drop-shadow-md"
                >
                    {texts[textIndex]}
                </motion.p>
            </div>

            {/* Start Button */}
            {showButton && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onStart}
                    className="z-20 mt-8 px-12 py-3 bg-white/20 backdrop-blur-lg border border-white/40 text-white rounded-full text-lg font-medium tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300"
                >
                    Mulai
                </motion.button>
            )}

            {/* Floating Hearts/Balloons */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: "110vh", x: `${Math.random() * 100}vw` }}
                        animate={{ y: "-10vh" }}
                        transition={{
                            duration: 8 + Math.random() * 8,
                            repeat: Infinity,
                            delay: Math.random() * 10,
                        }}
                        className="absolute text-pink-200 opacity-40 text-2xl"
                    >
                        {i % 2 === 0 ? "🎈" : "💖"}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
