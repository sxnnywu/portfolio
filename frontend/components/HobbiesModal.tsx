"use client";

import { useEffect } from "react";

interface HobbiesModalProps {
  onClose: () => void;
}

export default function HobbiesModal({ onClose }: HobbiesModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-cream border border-indigo/10 rounded-2xl p-8 max-w-sm w-full mx-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-display text-4xl text-indigo">hobbies</h2>
          <button
            onClick={onClose}
            className="text-indigo/40 hover:text-indigo transition-colors text-lg leading-none"
          >
            ✕
          </button>
        </div>
        <p className="font-body text-sm text-indigo/60">coming soon!</p>
      </div>
    </div>
  );
}
