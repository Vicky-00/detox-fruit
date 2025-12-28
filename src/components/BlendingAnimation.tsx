"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

export default function BlendingAnimation() {
    const [phase, setPhase] = useState<"drop" | "blend" | "finish">("drop");
    const controls = useAnimation();

    useEffect(() => {
        const sequence = async () => {
            // Phase 1: Drop
            setPhase("drop");
            await new Promise((resolve) => setTimeout(resolve, 800)); // Wait for drops

            // Phase 2: Blend (Vortex)
            setPhase("blend");
            await new Promise((resolve) => setTimeout(resolve, 1800)); // Longer blending

            // Phase 3: Finish
            setPhase("finish");
        };

        sequence();
    }, []);

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl overflow-visible">
                <defs>
                    <linearGradient id="juiceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#34d399" />
                        <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                    <radialGradient id="vortexGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
                    </radialGradient>
                    <filter id="blurFilter">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
                    </filter>
                </defs>

                {/* --- BLENDER JAR --- */}
                {/* Base / Motor Unit */}
                <path
                    d="M70 180 L130 180 L135 190 L65 190 Z"
                    fill="#cbd5e1"
                    opacity="0.5"
                />

                {/* Glass Container */}
                <path
                    d="M60 40 L70 170 Q75 180 100 180 T130 170 L140 40"
                    fill="#f8fafc"
                    fillOpacity="0.2"
                    stroke="#94a3b8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* --- LIQUID (Fills up during blending) --- */}
                <motion.path
                    d="M70 170 Q75 180 100 180 T130 170 L138 60 L62 60 Z"
                    fill="url(#juiceGradient)"
                    initial={{ scaleY: 0, transformOrigin: "bottom" }}
                    animate={{
                        scaleY: phase === "drop" ? 0 : phase === "blend" ? [0, 0.7, 0.65] : 1, // Turbulence
                        opacity: phase === "drop" ? 0 : 0.9,
                    }}
                    transition={{ duration: phase === "blend" ? 1.5 : 0.8, ease: "easeInOut" }}
                />

                {/* Liquid Surface Wave (Active in Finish) */}
                {phase === "finish" && (
                    <motion.path
                        d="M62 60 Q80 55 100 60 T138 60"
                        fill="none"
                        stroke="#6ee7b7"
                        strokeWidth="2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, d: ["M62 60 Q80 55 100 60 T138 60", "M62 60 Q80 65 100 60 T138 60", "M62 60 Q80 55 100 60 T138 60"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                )}

                {/* --- VORTEX (Blend Phase) --- */}
                {phase === "blend" && (
                    <g transform="translate(100, 130)">
                        {/* Spinning Core */}
                        <motion.circle
                            cx="0" cy="0" r="30"
                            fill="url(#vortexGradient)"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: [0, 1.2, 0], opacity: [0, 1, 0], rotate: 720 }}
                            transition={{ duration: 1.8, ease: "easeInOut" }}
                        />
                        {/* Swirling Bits */}
                        {[...Array(5)].map((_, i) => (
                            <motion.circle
                                key={i}
                                cx="0" cy="0" r={Math.random() * 3 + 1}
                                fill="#ffffff"
                                initial={{ x: 0, y: 0, opacity: 0 }}
                                animate={{
                                    x: [0, (Math.random() - 0.5) * 60],
                                    y: [0, (Math.random() - 0.5) * 60],
                                    opacity: [0, 1, 0]
                                }}
                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                            />
                        ))}
                    </g>
                )}

                {/* --- FRUITS (Drop Phase) --- */}
                {/* Apple Segment */}
                <motion.g
                    initial={{ y: -50, opacity: 0, rotate: 0 }}
                    animate={
                        phase === "drop"
                            ? { y: 140, opacity: 1 }
                            : phase === "blend"
                                ? { y: 150, rotate: 720, scale: 0, x: [0, 10, -10, 0] } // Getting sucked in
                                : { opacity: 0 }
                    }
                    transition={
                        phase === "drop"
                            ? { type: "spring", bounce: 0.4, duration: 0.8, delay: 0.1 }
                            : { duration: 0.8, ease: "anticipate" }
                    }
                >
                    <circle cx="90" cy="0" r="10" fill="#ef4444" />
                    <path d="M90 -10 L95 -20" stroke="#166534" strokeWidth="2" />
                </motion.g>

                {/* Banana Slice */}
                <motion.g
                    initial={{ y: -60, opacity: 0, rotate: 45 }}
                    animate={
                        phase === "drop"
                            ? { y: 130, opacity: 1, rotate: 20 }
                            : phase === "blend"
                                ? { y: 140, rotate: -720, scale: 0, x: [0, -15, 5, 0] }
                                : { opacity: 0 }
                    }
                    transition={
                        phase === "drop"
                            ? { type: "spring", bounce: 0.5, duration: 0.9, delay: 0.2 }
                            : { duration: 0.8, ease: "anticipate" }
                    }
                >
                    <circle cx="110" cy="0" r="9" fill="#facc15" />
                </motion.g>

                {/* Berry */}
                <motion.g
                    initial={{ y: -40, opacity: 0 }}
                    animate={
                        phase === "drop"
                            ? { y: 120, opacity: 1 }
                            : phase === "blend"
                                ? { y: 130, rotate: 1080, scale: 0 }
                                : { opacity: 0 }
                    }
                    transition={
                        phase === "drop"
                            ? { type: "spring", bounce: 0.3, duration: 0.7, delay: 0.3 }
                            : { duration: 0.6, ease: "anticipate" }
                    }
                >
                    <circle cx="100" cy="0" r="7" fill="#8b5cf6" />
                </motion.g>


                {/* --- STRAW (Finish Phase) --- */}
                {phase === "finish" && (
                    <motion.path
                        d="M100 120 L135 20"
                        stroke="#f59e0b"
                        strokeWidth="6"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0, y: -50 }}
                        animate={{ pathLength: 1, opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3, type: "spring", bounce: 0.3 }}
                    />
                )}


                {/* --- SPARKLES/STARS (Restored specific user request) --- */}
                {phase === "finish" && (
                    <g>
                        {/* Star 1 (Small) */}
                        <motion.path
                            d="M150 40 L153 35 L156 40 L161 43 L156 46 L153 51 L150 46 L145 43 Z"
                            fill="#fbbf24"
                            initial={{ opacity: 0, scale: 0, y: 0 }}
                            animate={{ opacity: 1, scale: 0.8, y: [-5, 5, -5] }}
                            transition={{ opacity: { duration: 0.5 }, y: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
                        />
                        {/* Star 2 (Medium) */}
                        <motion.path
                            d="M40 90 L44 82 L48 90 L56 94 L48 98 L44 106 L40 98 L32 94 Z"
                            fill="#fbbf24"
                            initial={{ opacity: 0, scale: 0, y: 0 }}
                            animate={{ opacity: 1, scale: 1, y: [5, -5, 5] }}
                            transition={{ opacity: { duration: 0.5, delay: 0.2 }, y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
                        />
                        {/* Star 3 (Large) */}
                        <motion.path
                            d="M160 110 L165 100 L170 110 L180 115 L170 120 L165 130 L160 120 L150 115 Z"
                            fill="#fbbf24"
                            initial={{ opacity: 0, scale: 0, y: 0 }}
                            animate={{ opacity: 1, scale: 1.2, y: [-8, 8, -8] }}
                            transition={{ opacity: { duration: 0.5, delay: 0.4 }, y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" } }}
                        />
                    </g>
                )}
            </svg>
        </div>
    );
}
