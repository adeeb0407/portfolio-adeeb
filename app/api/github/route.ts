import { NextResponse } from "next/server";

interface GhEvent {
  type: string;
  repo: { name: string };
  created_at: string;
}

const USER = "adeeb0407";
const DAY = 86_400_000;

/**
 * Real shipping activity from GitHub's public events (the API keeps ~90 days, 300 events).
 * Counts pushes, not events, across all three pages, so busy weeks are not cut off.
 */
export async function GET() {
  try {
    const pages = await Promise.all(
      [1, 2, 3].map((page) =>
        fetch(`https://api.github.com/users/${USER}/events/public?per_page=100&page=${page}`, {
          headers: {
            Accept: "application/vnd.github+json",
            "User-Agent": "adeeb-portfolio",
            ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
          },
          next: { revalidate: 900 },
        }).then((r) => (r.ok ? (r.json() as Promise<GhEvent[]>) : [])),
      ),
    );
    const events = pages.flat();
    // every page failed (usually the unauthenticated rate limit): say so instead of reporting zero
    if (events.length === 0) throw new Error("no events (rate limited?)");
    const now = Date.now();
    const recent = events.filter((e) => now - new Date(e.created_at).getTime() <= 30 * DAY);
    const pushes = recent.filter((e) => e.type === "PushEvent");
    const perDay = Array.from({ length: 30 }, (_, i) => {
      const start = now - (30 - i) * DAY;
      return pushes.filter((e) => {
        const t = new Date(e.created_at).getTime();
        return t > start && t <= start + DAY;
      }).length;
    });
    return NextResponse.json({
      ok: true,
      pushes30: pushes.length,
      activeDays: perDay.filter((n) => n > 0).length,
      repos: new Set(recent.map((e) => e.repo.name)).size,
      perDay,
      lastPushAt: pushes[0]?.created_at ?? null,
      // kept for older clients
      items: pushes.map((e) => ({ at: e.created_at })),
    });
  } catch (err) {
    return NextResponse.json({ ok: false, pushes30: null, activeDays: null, repos: null, perDay: [], lastPushAt: null, items: [], error: String(err) });
  }
}
