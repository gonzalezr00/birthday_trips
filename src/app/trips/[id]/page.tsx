import Link from "next/link";
import { supabase } from "@/lib/supabase";
import PhotoThumb from "@/components/PhotoThumb"; // add this import


export const revalidate = 60;

export default async function TripDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;                 // ← await params
  const slug = decodeURIComponent(id);

  const { data: trip, error } = await supabase
    .from("trips")
    .select("id,slug,title,location,start_date,end_date,visibility")
    .eq("slug", slug)
    .maybeSingle();

  if (error) return <div className="text-red-600">Error: {error.message}</div>;
  if (!trip || trip.visibility !== "public") return <div>Trip not found.</div>;

  const { data: photos } = await supabase
    .from("photos")
    .select("id,storage_path,caption,taken_at")
    .eq("trip_id", trip.id)
    .order("taken_at", { ascending: true });

  return (
    <section className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{trip.title}</h1>
          <p className="text-gray-600">
            {trip.location} · {trip.start_date} → {trip.end_date ?? "—"}
          </p>
        </div>
        <Link href="/trips" className="text-sm underline hover:no-underline">← Back to Trips</Link>
      </div>

      <div className="aspect-[16/6] rounded-xl bg-gray-100" />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {(photos ?? []).length === 0
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-lg bg-gray-100" />
            ))
          : photos!.map((p) => <PhotoThumb key={p.id} path={p.storage_path} />)}
      </div>
    </section>
  );
}