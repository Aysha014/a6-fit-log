import Image from "next/image";
import Link from "next/link";
import logo from "@/assests/logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0d0d0d]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">

        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <Image
            src={logo}
            alt="FitLog logo"
            width={22}
            height={22}
          />

          <span className="text-sm font-extrabold tracking-wide text-white">
            FITLOG
          </span>
        </Link>

        <p className="text-xs text-gray-500">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}