"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";

import logo from "@/assests/logo.png";
import { usePlan } from "@/context/PlanContext";

const ACCENT = "#ccff00";

const NAV_LINKS = [
  {
    label: "Workout",
    href: "/",
  },
  {
    label: "My Plan",
    href: "/my-plan",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const { todayPlan, saved } = usePlan();

  return (
    <nav className="w-full border-b border-white/10 bg-[#0d0d0d]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between py-4">

          {/* Logo */}
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

          {/* Desktop menu */}
          <div className="hidden items-center gap-2 md:flex">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                    active
                      ? "text-black"
                      : "text-gray-300 hover:text-white"
                  }`}
                  style={
                    active
                      ? {
                          backgroundColor: ACCENT,
                        }
                      : undefined
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop counters */}
          <div className="hidden items-center gap-4 sm:flex">

            <Link
              href="/my-plan"
              className="flex items-center gap-2"
            >
              <span className="text-sm text-gray-300">
                Plan
              </span>

              <span
                className="flex h-6 min-w-6 items-center justify-center rounded-full px-1 text-xs font-bold text-black"
                style={{
                  backgroundColor: ACCENT,
                }}
              >
                {todayPlan.length}
              </span>
            </Link>

            <Link
              href="/my-plan"
              className="flex items-center gap-2"
            >
              <span className="text-sm text-gray-300">
                Saved
              </span>

              <span className="flex h-6 min-w-6 items-center justify-center rounded-full border border-white/30 px-1 text-xs font-bold text-white">
                {saved.length}
              </span>
            </Link>

          </div>

          {/* Hamburger */}
          <button
            onClick={() =>
              setMenuOpen((previous) => !previous)
            }
            className="flex h-9 w-9 items-center justify-center rounded-md border border-white/20 text-xl text-white md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>

        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="border-t border-white/10 pb-4 pt-4 md:hidden">

            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(
                        link.href
                      );

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() =>
                      setMenuOpen(false)
                    }
                    className={`rounded-md px-4 py-3 text-sm ${
                      active
                        ? "text-black"
                        : "text-gray-300"
                    }`}
                    style={
                      active
                        ? {
                            backgroundColor:
                              ACCENT,
                          }
                        : undefined
                    }
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/10 pt-4">

              <Link
                href="/my-plan"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="flex items-center justify-between rounded-md bg-white/5 px-4 py-3"
              >
                <span className="text-sm text-gray-300">
                  Plan
                </span>

                <span
                  className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-black"
                  style={{
                    backgroundColor: ACCENT,
                  }}
                >
                  {todayPlan.length}
                </span>
              </Link>

              <Link
                href="/my-plan"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="flex items-center justify-between rounded-md bg-white/5 px-4 py-3"
              >
                <span className="text-sm text-gray-300">
                  Saved
                </span>

                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/30 text-xs text-white">
                  {saved.length}
                </span>
              </Link>

            </div>
          </div>
        )}

      </div>
    </nav>
  );
}