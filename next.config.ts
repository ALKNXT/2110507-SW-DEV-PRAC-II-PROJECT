import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    env: {
        NEXT_PUBLIC_CAR_SERVICE_API_URL:
            process.env.CAR_SERVICE_API_URL ||
            process.env.NEXT_PUBLIC_CAR_SERVICE_API_URL ||
            "http://localhost:5000/api/v1",
    },
};

export default nextConfig;
