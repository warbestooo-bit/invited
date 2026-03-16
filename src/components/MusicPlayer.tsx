"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Attempt to play on first interaction (browser policy)
        const playAudio = () => {
            if (audioRef.current && !isPlaying) {
                audioRef.current.play().catch(() => {
                    // Play failed, wait for user interaction
                });
                setIsPlaying(true);
                window.removeEventListener('click', playAudio);
                window.removeEventListener('touchstart', playAudio);
            }
        };

        window.addEventListener('click', playAudio);
        window.addEventListener('touchstart', playAudio);

        return () => {
            window.removeEventListener('click', playAudio);
            window.removeEventListener('touchstart', playAudio);
        };
    }, [isPlaying]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="fixed top-6 right-6 z-50">
            <audio
                ref={audioRef}
                src="/music/Happy Birthday - Dangdut Koplo.mp3"
                loop
            />
            <button
                onClick={togglePlay}
                className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 shadow-lg group hover:bg-white/40 transition-all"
            >
                {isPlaying ? (
                    <Volume2 size={20} className="animate-pulse" />
                ) : (
                    <VolumeX size={20} />
                )}
                <span className="absolute right-14 text-[10px] tracking-widest uppercase bg-white/20 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Music {isPlaying ? "Off" : "On"}
                </span>
            </button>
        </div>
    );
}
