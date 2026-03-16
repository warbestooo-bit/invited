"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import PremiumOpening from "@/components/PremiumOpening";
import InvitationDetails from "@/components/InvitationDetails";
import MusicPlayer from "@/components/MusicPlayer";

export default function Home() {
  const [scene, setScene] = useState(0);

  const nextScene = () => setScene((prev) => prev + 1);

  return (
    <main className="relative h-screen w-full bg-background overflow-hidden font-sans">
      <MusicPlayer />

      <AnimatePresence mode="wait">
        {scene === 0 && (
          <PremiumOpening key="opening" onOpen={nextScene} />
        )}
        {scene === 1 && (
          <InvitationDetails />
        )}
      </AnimatePresence>

      {/* Global Cinematic Overlay (Fine grain/dust) */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay" />
    </main>
  );
}

