// src/app/trips/page.tsx
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type TripRow = {
  slug: string;
  title: string;
  location: string;
  start_date: string | null;
  end_date: string | null;
  visibility: "public" | "private";
};

export const metadata = { title: "Trips • Birthday Trips" };
export const revalidate = 60; // cache SSR result for 60s

export default async function TripsPage() {
  const { data, error } = await supabase
    .from("trips")
    .select("slug,title,location,start_date,end_date,visibility")
    .eq("visibility", "public")
    .order("start_date", { ascending: false });

  if (error) {
    return (
      <section className="space-y-4">
        <h1 className="text-3xl font-bold">Trips</h1>
        <p className="text-red-600">Error loading trips: {error.message}</p>
      </section>
    );
  }

  const trips = (data ?? []) as TripRow[];
  const now = new Date();

  const upcoming = trips.filter(
    (t) => t.start_date && new Date(t.start_date) >= now
  );
  const past = trips.filter(
    (t) => !t.start_date || new Date(t.start_date) < now
  );

  return (
    <section className="space-y-10">
      <header className="flex items-end justify-between">
        <h1 className="text-3xl font-bold">Trips</h1>
        <Link href="/planner" className="text-sm underline hover:no-underline">
          Open Planner →
        </Link>
      </header>

      {upcoming.length > 0 && (
        <TripSection title="Upcoming" items={upcoming} />
      )}

      {past.length > 0 && <TripSection title="Past" items={past} />}
    </section>
  );
}

function TripSection({ title, items }: { title: string; items: TripRow[] }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((t) => (
          <TripCard key={t.slug} trip={t} />
        ))}
      </div>
    </div>
  );
}

function TripCard({ trip }: { trip: TripRow }) {
  return (
    <Link
      href={`/trips/${encodeURIComponent(trip.slug)}`}
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
