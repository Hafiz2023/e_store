"use client";

import { useState } from "react";
import { CldUploadWidget, CloudinaryUploadWidgetResults, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";
import Image from "next/image";

interface UploadedFile {
  asset_id: string;
  public_id: string;
  secure_url: string;
  thumbnail_url?: string;
  original_filename: string;
}

const UploadMedia = ({ isMultiple = false }) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(false);

  const handleOnError = (error: unknown) => {
    console.error("Cloudinary Upload Error:", error);
    setLoading(false);
  };

  const handleOnUploadComplete = async (result: CloudinaryUploadWidgetResults) => {
    setLoading(false);

    if (typeof result.info === "string" || !result.info) {
      return;
    }

    // Cast info to our UploadedFile type as we expect these fields from Cloudinary
    const info = result.info as unknown as UploadedFile;

    const filesArray: UploadedFile[] = [info];

    setUploadedFiles((prev) => [...prev, ...filesArray]);

    try {
      const payload = filesArray.map((file) => ({
        asset_id: file.asset_id,
        public_id: file.public_id,
        path: file.secure_url,
        thumbnail_url: file.thumbnail_url || file.secure_url,
        alt: file.original_filename,
        title: file.original_filename,
      }));

      const res = await fetch("/api/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      console.log("✅ Media saved to MongoDB:", data);
    } catch (error) {
      console.error("❌ MongoDB Save Failed:", error);
    }
  };

  return (
    <div className="space-y-4">
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
        onError={handleOnError}
        onSuccess={handleOnUploadComplete}
        options={{
          multiple: isMultiple,
          sources: ["local", "url", "unsplash", "google_drive"],
          resourceType: "image",
        }}
      >
        {({ open }) => (
          <Button
            onClick={() => {
              setLoading(true);
              open();
            }}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <FiPlus />
            {loading ? "Uploading..." : "Upload Media"}
          </Button>
        )}
      </CldUploadWidget>

      {uploadedFiles.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {uploadedFiles.map((file, idx) => (
            <div
              key={idx}
              className="w-24 h-24 border rounded overflow-hidden relative"
            >
              <Image
                src={file.secure_url}
                alt={file.original_filename}
                fill
                sizes="100%"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadMedia;
