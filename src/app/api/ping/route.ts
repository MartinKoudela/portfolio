import { networking } from "@/content/site";

export const dynamic = "force-dynamic";

export function GET() {
    if (!networking.features.requestTrace) return new Response(null, { status: 404 });
    return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
}
