import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Event Management Dashboard",
        short_name: "Events Dashboard",
        description:
            "Responsive dashboard to create, track, and manage events.",
        start_url: "/",
        display: "standalone",
        background_color: "#f5f7fb",
        theme_color: "#13c8ec",
        icons: [
            {
                src: "/favicon.ico",
                sizes: "any",
                type: "image/x-icon",
            },
        ],
    };
}
