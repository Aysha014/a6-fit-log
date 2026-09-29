"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const ACCENT = "#ccff00";

const NAV_LINKS = [
    { label: "Workout", href: "/workouts" },
    { label: "My Plan", href: "/plan" },
];

export default function Navbar({ planCount = 0, savedCount = 0 }) {
    const [active, setActive] = useState("Workout");

    return (
        <nav className="w-full bg-[#0d0d0d] border-b border-white/10">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                {/* Left: Logo */}
                <Link href="/" className="flex items-center gap-2 shrink-0">
                    <Image
                        src="/logo.png"
                        alt="FitLog logo"
                        width={20}
                        height={20}
                        className="h-5 w-5"
                    />
                    <span className="text-white font-extrabold tracking-wide text-sm">
                        FITLOG
                    </span>
                </Link>

                {/* Middle: Nav links */}
                <div className="flex items-center gap-2">
                    {NAV_LINKS.map((link) => {
                        const isActive = active === link.label;
                        return (
                            <Link
                                key={link.label}
                                href={link.href}
                                onClick={() => setActive(link.label)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${isActive
                                        ? "text-black"
                                        : "text-gray-300 hover:text-white"
                                    }`}
                                style={isActive ? { backgroundColor: ACCENT } : undefined}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Right: Status badges */}
                <div className="flex items-center gap-4 text-sm shrink-0">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-300">Plan</span>
                        <span
                            className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-black"
                            style={{ backgroundColor: ACCENT }}
                        >
                            {planCount}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-300">Saved</span>
                        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/30 text-xs font-bold text-white">
                            {savedCount}
                        </span>
                    </div>
                </div>
            </div>
        </nav>
    );
}
