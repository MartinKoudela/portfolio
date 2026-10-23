import https from "node:https";
import tls from "node:tls";
import { networking } from "@/content/site";

export const dynamic = "force-static";
export const revalidate = 300;

const HOSTS = ["martinkoudela.com", "laravix.com"];
const TIMEOUT = 10_000;

export type ServiceCheck = {
    host: string;
    up: boolean;
    responseMs: number | null;
    httpStatus: number | null;
    certValidTo: string | null;
    error: "timeout" | "connection" | null;
    certError: boolean;
};

export type StatusPayload = { checkedAt: string; services: ServiceCheck[] };

function checkHttp(host: string): Promise<Pick<ServiceCheck, "up" | "responseMs" | "httpStatus" | "error">> {
    return new Promise((resolve) => {
        const start = performance.now();
        const req = https.request({ host, path: "/", method: "GET", timeout: TIMEOUT }, (res) => {
            const responseMs = Math.round(performance.now() - start);
            const httpStatus = res.statusCode ?? null;
            res.destroy();
            resolve({ up: httpStatus !== null && httpStatus < 400, responseMs, httpStatus, error: null });
        });
        req.on("timeout", () => req.destroy(new Error("timeout")));
        req.on("error", (err) =>
            resolve({ up: false, responseMs: null, httpStatus: null, error: err.message === "timeout" ? "timeout" : "connection" })
        );
        req.end();
    });
}

function checkCertificate(host: string): Promise<string | null> {
    return new Promise((resolve) => {
        const socket = tls.connect({ host, port: 443, servername: host, timeout: TIMEOUT }, () => {
            const validTo = socket.getPeerCertificate().valid_to;
            socket.end();
            resolve(validTo ? new Date(validTo).toISOString() : null);
        });
        socket.on("timeout", () => socket.destroy());
        socket.on("error", () => resolve(null));
        socket.on("close", () => resolve(null));
    });
}

export async function GET() {
    if (!networking.features.statusPanel) return new Response(null, { status: 404 });

    const services = await Promise.all(
        HOSTS.map(async (host): Promise<ServiceCheck> => {
            const [http, certValidTo] = await Promise.all([checkHttp(host), checkCertificate(host)]);
            return { host, ...http, certValidTo, certError: certValidTo === null };
        })
    );

    return Response.json({ checkedAt: new Date().toISOString(), services } satisfies StatusPayload);
}
