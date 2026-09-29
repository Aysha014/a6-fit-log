import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#101216] px-4 text-white">
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#ccff00]">
          Error
        </p>

        <h1 className="mt-3 text-7xl font-black sm:text-8xl">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-black uppercase">
          Page not found
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-400">
          The page you are looking for does not exist or may have been moved.
        </p>

        <Link
          href="/"
          className="mt-7 inline-block rounded-md bg-[#ccff00] px-5 py-3 text-sm font-bold text-black"
        >
          Back to workouts
        </Link>
      </div>
    </main>
  );
}