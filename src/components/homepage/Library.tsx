import Link from "next/link";
import Image from "next/image";
import { FiClock, FiStar } from "react-icons/fi";
import { FaFire } from "react-icons/fa";

type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  duration: number;
  caloriesBurned: number;
  rating: number;
};

const getWorkouts = async (): Promise<Workout[]> => {
  const response = await fetch(
    "https://api.abcz.workers.dev/api/fitlog",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }

  const data = await response.json();

  return data;
};

const Library = async () => {
  const workouts = await getWorkouts();

  return (
    <section
      id="library"
      className="bg-[#101216] text-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-8">
          <h2 className="text-2xl font-black uppercase tracking-tight md:text-3xl">
            THE LIBRARY
          </h2>

          <p className="mt-2 text-xs text-[#8b8d91]">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Workout Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {workouts.map((workout) => (
            <Link
              key={workout.id}
              href={`/workout/${workout.id}`}
              className="group overflow-hidden rounded-lg bg-[#181a1f]"
            >
              {/* Image */}
              <div className="h-56 w-full overflow-hidden">
                <Image
                  src={workout.image}
                  alt={workout.name}
                  width={600}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Card Content */}
              <div className="px-4 pb-4 pt-4">

                {/* Muscle Groups */}
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  {workout.muscleGroups?.map((muscle) => (
                    <span
                      key={muscle}
                      className="rounded-full bg-[#c8ff00] px-2.5 py-1 text-[9px] font-black uppercase leading-none text-black"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>

                {/* Workout Name */}
                <h3 className="text-sm font-black uppercase tracking-wide text-white">
                  {workout.name}
                </h3>

                {/* Equipment */}
                <p className="mt-1 text-[11px] text-[#8d9095]">
                  {workout.equipment}
                </p>

                {/* Divider */}
                <div className="my-4 h-px bg-[#25282e]" />

                {/* Stats */}
                <div className="flex items-center gap-5 text-[10px] text-[#8d9095]">

                  <div className="flex items-center gap-1.5">
                    <FiClock className="text-xs" />
                    <span>{workout.duration} min</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <FaFire className="text-xs" />
                    <span>{workout.caloriesBurned} kcal</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <FiStar className="text-xs" />
                    <span>{workout.rating}</span>
                  </div>

                </div>
              </div>
            </Link>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Library;