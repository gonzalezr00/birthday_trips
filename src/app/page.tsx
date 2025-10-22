import Link from "next/link";

export default function Home() {
  return (
    <section className="min-h-[60vh] flex flex-col items-start justify-center gap-6">
      <h1 className="text-5xl font-extrabold tracking-tight">
        Tailwind is <span className="underline decoration-4">ON</span> 🎉
      </h1>

      <p className="text-gray-600 max-w-prose">
        If you see a huge bold headline and this paragraph in gray,
        Tailwind is working. Next, we’ll scaffold Trips and the Planner.
      </p>

      <Link
        href="/trips"
        className="inline-flex items-center rounded-xl border px-5 py-3 text-base font-medium hover:bg-gray-50"
      >
        See Trips →
      </Link>
    </section>
  );
}
