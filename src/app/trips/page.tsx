import Link from "next/link";
import { supabase } from "@/lib/supabase";


type Trip = {
  id: string;
  title: string;
  startDate: string; // ISO
  endDate?: string;  // ISO
  location: string;
  cover?: string;    // (will be a Supabase image later)
  status: "past" | "upcoming";
};

const demoTrips: Trip[] = [
  { id: "lux-2025-09", title: "Luxembourg — Sep 2025", startDate: "2025-09-20", endDate: "2025-09-27", location: "Luxembourg", status: "upcoming" },
  { id: "porto-2024-06", title: "Porto — Jun 2024", startDate: "2024-06-10", endDate: "2024-06-15", location: "Portugal", status: "past" },
];

export const metadata = { title: "Trips • Birthday Trips" };

export default function TripsPage() {
  const past = demoTrips.filter(t => t.status === "past");
  const upcoming = demoTrips.filter(t => t.status === "upcoming");

  return (
    <section className="space-y-10">
      <header className="flex items-end justify-between">
        <h1 className="text-3xl font-bold">Trips</h1>
        <Link href="/planner" className="text-sm underline hover:no-underline">Open Planner →</Link>
      </header>

      {upcoming.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Upcoming</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcoming.map(t => <TripCard key={t.id} trip={t} />)}
          </div>
        </div>
      )}

      {past.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Past</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {past.map(t => <TripCard key={t.id} trip={t} />)}
          </div>
        </div>
      )}
    </section>
  );
}

function TripCard({ trip }: { trip: Trip }) {
  return (
    <Link
      href={`/trips/${encodeURIComponent(trip.id)}`}
      className="block rounded-xl border hover:bg-gray-50 transition"
    >
      <div className="aspect-[16/9] rounded-t-xl bg-gray-100" />
      <div className="p-4">
        <div className="font-semibold">{trip.title}</div>
        <div className="text-sm text-gray-600">{trip.location}</div>
      </div>
    </Link>
  );
}
