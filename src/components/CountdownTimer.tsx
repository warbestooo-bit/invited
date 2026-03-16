"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CountdownTimerProps {
    targetDate: string;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState<{
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    } | null>(null);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +new Date(targetDate) - +new Date();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            } else {
                setTimeLeft(null);
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft();

        return () => clearInterval(timer);
    }, [targetDate]);

    if (!timeLeft) {
        return (
            <div className="text-pink-500 font-bold text-center py-4 bg-pink-100/50 rounded-2xl border border-pink-200 animate-pulse">
                The Celebration Has Begun! ✨
            </div>
        );
    }

    return (
        <div className="grid grid-cols-4 gap-2 w-full max-w-xs mx-auto">
            <TimerUnit value={timeLeft.days} label="Hari" />
            <TimerUnit value={timeLeft.hours} label="Jam" />
            <TimerUnit value={timeLeft.minutes} label="Menit" />
            <TimerUnit value={timeLeft.seconds} label="Detik" />
        </div>
    );
}

function TimerUnit({ value, label }: { value: number; label: string }) {
    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center p-2 bg-pink-500/10 rounded-xl border border-pink-500/20"
        >
            <span className="text-xl md:text-2xl font-bold text-pink-600 leading-none">
                {value < 10 ? `0${value}` : value}
            </span>
            <span className="text-[10px] uppercase tracking-tighter text-pink-900/60 font-bold mt-1">
                {label}
            </span>
        </motion.div>
    );
}
