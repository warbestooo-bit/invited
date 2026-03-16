"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Attempt to play on first interaction (browser policy)
        const playAudio = () => {
            if (audioRef.current && !hasInteracted) {
                audioRef.current.play().then(() => {
                    setIsPlaying(true);
                    setHasInteracted(true);
                }).catch(() => {
                    // Auto-play might still be blocked if no real interaction happened
                });

                // Remove listeners after first successful interaction attempt
                window.removeEventListener('click', playAudio);
                window.removeEventListener('touchstart', playAudio);
                window.removeEventListener('keydown', playAudio);
            }
        };

        window.addEventListener('click', playAudio);
        window.addEventListener('touchstart', playAudio);
        window.addEventListener('keydown', playAudio);

        return () => {
            window.removeEventListener('click', playAudio);
            window.removeEventListener('touchstart', playAudio);
            window.removeEventListener('keydown', playAudio);
        };
    }, [hasInteracted]);

    const togglePlay = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering other click events
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play();
                setIsPlaying(true);
                setHasInteracted(true); // Ensure we don't try to auto-play again
            }
        }
    };

    return (
        <div className="fixed top-6 right-6 z-[100]">
            <audio
                ref={audioRef}
                src="/music/Happy Birthday - Dangdut Koplo.mp3"
                loop
                preload="auto"
            />
            <button
                onClick={togglePlay}
                className="w-14 h-14 bg-pink-500/90 backdrop-blur-xl rounded-full flex flex-col items-center justify-center text-white border-2 border-white/50 shadow-[0_0_20px_rgba(244,114,182,0.5)] group hover:bg-pink-600 transition-all active:scale-90 relative"
            >
                <div className="relative">
                    {isPlaying ? (
                        <Volume2 size={24} className="animate-pulse" />
                    ) : (
                        <VolumeX size={24} className="opacity-80" />
                    )}
                </div>

                {/* Always visible label for clarity */}
                <span className="text-[7px] font-bold tracking-tighter uppercase mt-0.5 opacity-90 group-hover:scale-110 transition-transform">
                    Music
                </span>

                {/* Floating Tooltip */}
                <span className="absolute -bottom-10 right-0 text-[9px] tracking-widest uppercase bg-pink-900/80 text-white px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
                    {isPlaying ? "Click to Mute" : "Click to Play"}
                </span>
            </button>
        </div>
    );
}
