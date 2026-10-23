import { identity, siteMeta } from "@/content/site";
import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = siteMeta.imageAlt;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
    return ogImage({
        title: identity.device,
        titleSize: 230,
        subtitle: identity.name,
        line: siteMeta.ogLine,
        active: "eth1",
    });
}
