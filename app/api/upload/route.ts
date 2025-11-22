// app/api/upload/route.ts
import { NextResponse } from "next/server";
import cloudinary from "cloudinary";
import { connectDB } from "@/lib/databaseconnection";
import MediaModel from "@/app/models/Media.model";

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

export async function POST(request: Request) {
  try {
    await connectDB();

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const alt = formData.get("alt") as string;
    const title = formData.get("title") as string;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file uploaded" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        {
          folder: "e-store-nextjs",
          resource_type: "auto",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    // Save to MongoDB
    const media = await MediaModel.create({
      asset_id: result.asset_id,
      public_id: result.public_id,
      path: result.secure_url,
      thumbnail_url: result.secure_url, // ya thumbnail banao
      alt: alt || "",
      title: title || file.name.split(".")[0],
    });

    return NextResponse.json(
      {
        success: true,
        message: "Uploaded and saved!",
        data: {
          id: media._id,
          public_id: result.public_id,
          url: result.secure_url,
          thumbnail: result.secure_url,
        },
      },
      { status: 200 }
    );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}