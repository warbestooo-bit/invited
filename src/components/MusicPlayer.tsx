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
                className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 shadow-lg group hover:bg-white/40 transition-all active:scale-90"
            >
                {isPlaying ? (
                    <Volume2 size={20} className="animate-pulse" />
                ) : (
                    <VolumeX size={20} />
                )}
                <span className="absolute right-14 text-[10px] tracking-widest uppercase bg-black/40 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {isPlaying ? "Mute" : "Play"}
                </span>
            </button>
        </div>
    );
}
