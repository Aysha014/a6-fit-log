"use client";

import bannerImg from "@/assests/banner.png";
import Image from "next/image";
import Link from "next/link";

const ACCENT = "#ccff00";

export default function Banner() {
    return (
        <section className="w-full bg-black px-4 py-6">
            <div className="mx-auto max-w-7xl rounded-2xl bg-[#161616] border border-white/5 px-10 py-14 md:px-16 md:py-20">
                <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                    {/* Left: Text content */}
                    <div className="max-w-2xl">
                        <p
                            className="text-xs font-bold tracking-widest uppercase mb-4"
                            style={{ color: ACCENT }}
                        >
                            Workout Library
                        </p>

                        <h1 className="text-white font-extrabold uppercase leading-[1.05] text-4xl md:text-5xl lg:text-6xl mb-6">
                            Train with intent.
                            <br />
                            Log every set.
                        </h1>

                        <p className="text-gray-400 text-base md:text-lg mb-8 max-w-md">
                            FitLog is a dark, no-nonsense gym companion: pick a lift, lock
                            it into today&apos;s plan, and watch the week&apos;s work add
                            up.
                        </p>

                        <Link
                            href="/workouts"
                            className="inline-block rounded-md px-6 py-3 font-bold text-sm uppercase tracking-wide text-black transition-transform hover:scale-[1.02]"
                            style={{ backgroundColor: ACCENT }}
                        >
                            Browse Workouts
                        </Link>
                    </div>

                    {/* Right: Illustration */}
                    <div className="shrink-0 w-72 h-72"> {/* fixed 288x288 box */}
                        <Image
                            src={bannerImg}
                            alt="Muscle anatomy figure on a gym machine"
                            className="w-full h-auto object-contain"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
