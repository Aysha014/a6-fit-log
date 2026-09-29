export default function LibraryLoading() {
  return (
    <section className="bg-[#101216] py-20">
      <div className="flex flex-col items-center justify-center gap-4">
        
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-700 border-t-[#ccff00]" />

        <p className="text-sm text-gray-400">
          Loading workouts...
        </p>

      </div>
    </section>
  );
}