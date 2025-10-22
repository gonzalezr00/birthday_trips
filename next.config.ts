// next.config.ts
const supabaseHost = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL!).hostname;

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: supabaseHost },
    ],
  },
};

export default nextConfig;
