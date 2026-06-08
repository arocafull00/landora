import { getEffectiveClientId } from "@/lib/auth";
import { cloudinary } from "@/lib/cloudinary";

export async function GET() {
  const userId = await getEffectiveClientId();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;

  if (!apiSecret || !cloudName || !apiKey) {
    return Response.json({ error: "Cloudinary not configured" }, { status: 500 });
  }

  const folder = `landora/tenants/${userId}`;
  const timestamp = Math.round(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder },
    apiSecret
  );

  return Response.json({ cloudName, apiKey, timestamp, signature, folder });
}
