import Image from "next/image";
import { supabase } from "@/lib/supabase";

function toPublicUrl(fullPath: string) {
  const relative = fullPath.replace(/^photos\//, "");
  const { data } = supabase.storage.from("photos").getPublicUrl(relative);
  return data.publicUrl;
}

export default function PhotoThumb({ path }: { path: string }) {
  const src = toPublicUrl(path);
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-lg">
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
        className="object-cover"
        priority={false}
      />
    </div>
  );
}
