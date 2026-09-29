import Image from "next/image";
import Link from "next/link";

import banner from "@/assests/banner.png";

import { FiArrowDown } from "react-icons/fi";

export default function Banner() {
  return (
    <section className="bg-[#0d0f12] text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">

        {/* Left */}
        <div>
          <p className="mb-4 text-xs font-bold tracking-[0.25em] text-[#ccff00]">
            WORKOUT LIBRARY
          </p>

          <h1 className="text-4xl font-black uppercase leading-[1.05] sm:text-5xl lg:text-6xl">
            Train with intent.
            <br />
            Log every set.
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-6 text-gray-400 sm:text-base">
            FitLog is a dark, no-nonsense gym
            companion: pick a lift, lock it into
            today&apos;s plan, and watch the week&apos;s work
            add up.
          </p>

          <Link
            href="#library"
            className="mt-7 inline-flex items-center gap-2 rounded-md bg-[#ccff00] px-5 py-3 text-sm font-bold text-black transition hover:opacity-90"
          >
            BROWSE WORKOUTS
            <FiArrowDown />
          </Link>
        </div>

        {/* Right */}
        <div>
          <Image
            src={banner}
            alt="FitLog workout banner"
            priority
            className="h-auto w-full rounded-lg object-cover"
          />
        </div>

      </div>
    </section>
  );
}