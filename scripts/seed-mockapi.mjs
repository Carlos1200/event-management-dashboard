import { readFile } from "node:fs/promises";

const BASE_URL = process.env.MOCKAPI_BASE_URL;
const RESOURCE = "events";

if (!BASE_URL) {
    console.error(
        "Missing MOCKAPI_BASE_URL environment variable. Please set it in .env.local",
    );
    process.exit(1);
}

const raw = await readFile(
    new URL("./seed/seed-events.json", import.meta.url),
    "utf-8",
);
const events = JSON.parse(raw);

for (const event of events) {
    const res = await fetch(`${BASE_URL}/${RESOURCE}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
    });

    if (!res.ok) {
        const text = await res.text();
        console.error(`Error creating ${event.eventCode}:`, res.status, text);
        continue;
    }

    const created = await res.json();
    console.log(`OK -> ${created.id} ${created.eventCode}`);
}
