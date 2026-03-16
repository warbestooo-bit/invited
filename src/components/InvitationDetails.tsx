"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Star, Heart } from "lucide-react";

interface InvitationDetailsProps {
    onNext?: () => void;
}

export default function InvitationDetails({ onNext }: InvitationDetailsProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative flex flex-col items-center justify-center w-full h-screen bg-gradient-to-b from-rose-50 to-pink-100 overflow-hidden px-6 pt-10"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-sm bg-pink-100 border-4 border-pink-200 rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(244,114,182,0.3)] relative overflow-hidden"
            >
                {/* Decorative corner background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-300/10 rounded-full -mr-10 -mt-10 blur-2xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-300/10 rounded-full -ml-10 -mb-10 blur-2xl" />

                <div className="relative z-10 space-y-8">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <motion.div
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex justify-center items-center gap-2 text-rose-500 font-bold tracking-widest text-xs uppercase"
                        >
                            <Star size={14} fill="currentColor" /> Birthday Celebration
                        </motion.div>
                        <motion.h2
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-2xl md:text-3xl font-bold text-pink-900 leading-tight"
                            style={{ fontFamily: "var(--font-playfair)" }}
                        >
                            Silvianna Santika Wijaya
                        </motion.h2>
                    </div>

                    {/* Timeline Items */}
                    <div className="space-y-6">
                        <TimelineItem
                            icon={<MapPin size={18} />}
                            title="Tiluwan Coffee"
                            time="17:00 – 19:00"
                            description="Romantic dinner & birthday moment bersama."
                            delay={0.5}
                        />
                        <TimelineItem
                            icon={<Star size={18} />}
                            title="Photobooth"
                            time="20:00 – 20:30"
                            description="Mengabadikan momen spesial dengan foto kenangan."
                            delay={0.6}
                        />
                    </div>

                    {/* Closing Text */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-center pt-4 border-t border-pink-200/50"
                    >
                        <p className="text-pink-800/70 text-sm italic leading-relaxed">
                            "Malam ditutup dengan kebersamaan dan kenangan indah dari hari yang spesial."
                        </p>
                    </motion.div>

                    {/* Bday Greeting */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 1, type: "spring" }}
                        className="text-center bg-pink-500/10 py-4 rounded-2xl border border-pink-500/20"
                    >
                        <span className="text-pink-600 font-bold text-sm block mb-1">💖 Happy Birthday 🎂</span>
                        <span className="text-pink-900 font-semibold text-xs tracking-wider">Silvianna Santika Wijaya</span>
                    </motion.div>
                </div>
            </motion.div>

            {/* Replay Button Instead of Next */}
            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
                onClick={() => window.location.reload()}
                className="mt-8 px-6 py-2 bg-pink-200/50 text-pink-700 rounded-full text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-pink-300 transition-colors"
            >
                Replay Magic ✨
            </motion.button>

            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute top-20 left-10 text-4xl opacity-20 transform -rotate-12">☕</div>
                <div className="absolute bottom-40 right-10 text-4xl opacity-20 transform rotate-12">📸</div>
            </div>
        </motion.div>
    );
}

function TimelineItem({ icon, title, time, description, delay }: any) {
    return (
        <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay }}
            className="flex gap-4 group"
        >
            <div className="flex-shrink-0 w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-colors duration-300 shadow-sm">
                {icon}
            </div>
            <div className="space-y-1">
                <div className="flex items-center gap-2">
                    <h3 className="font-bold text-pink-900 text-sm md:text-md uppercase tracking-wide">{title}</h3>
                    <span className="text-[10px] font-bold bg-pink-500 text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Clock size={10} /> {time}
                    </span>
                </div>
                <p className="text-pink-800/60 text-xs md:text-sm leading-snug">{description}</p>
            </div>
        </motion.div>
    );
}
