import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Move the function inside GET handler to fix the Vercel deployment error
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get("folder");

    if (!folder) {
      return NextResponse.json(
        { error: "Folder query parameter is required" },
        { status: 400 }
      );
    }

    // Moved getImagesFromFolder logic here
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: folder,
      max_results: 500,
    });

    return NextResponse.json(result.resources);
  } catch (error) {
    console.error("Error fetching images from Cloudinary:", error);
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}
