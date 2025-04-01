// app/api/getImages/route.js
import { v2 as cloudinary} from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryResource {
  asset_id: string;
  public_id: string;
  format: string;
  version: number;
  resource_type: string;
  type: string;
  created_at: string;
  bytes: number;
  width: number;
  height: number;
  url: string;
  secure_url: string;
}

export async function getImagesFromFolder(folderName: string): Promise<CloudinaryResource[]> {
  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: folderName, // specify the folder name
      max_results: 500, // You can adjust the number of images you want to fetch
    });
    return result.resources;
  } catch (error) {
    console.error("Error fetching images from Cloudinary:", error);
    return [];
  }
}

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const folder = searchParams.get("folder");

  if (!folder) {
    return new Response("Folder query parameter is required", { status: 400 });
  }

  const images = await getImagesFromFolder(folder);

  return new Response(JSON.stringify(images), {
    headers: { "Content-Type": "application/json" },
  });
}
