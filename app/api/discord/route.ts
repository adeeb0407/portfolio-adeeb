import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://discord.com/api/v10/invites/7Hz7gB45S2?with_counts=true",
      {
        next: { revalidate: 300 },
        headers: { "User-Agent": "adeeb-portfolio" },
      },
    );
    if (!res.ok) throw new Error(`discord ${res.status}`);
    const j = await res.json();
    return NextResponse.json({
      ok: true,
      name: j.guild?.name ?? "Acronoid E-Sports",
      members: j.approximate_member_count ?? null,
      online: j.approximate_presence_count ?? null,
    });
  } catch (err) {
    return NextResponse.json({
      ok: false,
      name: "Acronoid E-Sports",
      members: null,
      online: null,
      error: String(err),
    });
  }
}
