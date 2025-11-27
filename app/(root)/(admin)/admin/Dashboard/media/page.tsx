'use client';

import { BreadcrumbDemo } from "@/app/components/Application/Admin/BreadCrumbDemo";
import UploadMedia from "@/app/components/Application/Admin/UploadMedia";
import { ADMIN_DASHBOARD } from "@/app/routes/AdminPanelRoute";
import { useState } from "react";

const breadcrumbData = [
  { href: ADMIN_DASHBOARD, label: "Home" },
  { href: "/admin/Dashboard/media", label: "Media" },
];

// Mock media data
const initialMedia = [
  { id: 1, src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30", alt: "Product 1" },
  { id: 2, src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e", alt: "Product 2" },
  { id: 3, src: "https://images.unsplash.com/photo-1572635196237-14b3f281503f", alt: "Product 3" },
  { id: 4, src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff", alt: "Product 4" },
  { id: 5, src: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f", alt: "Product 5" },
  { id: 6, src: "https://images.unsplash.com/photo-1491553895911-0055eca6402d", alt: "Product 6" },
];

const Media = () => {
  const [mediaItems, setMediaItems] = useState(initialMedia);

  return (
    <div className="p-4 space-y-6">
      <BreadcrumbDemo breadcrumbData={breadcrumbData} />

      <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-semibold mb-4">Upload New Media</h2>
        <UploadMedia />
      </div>

      <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-semibold mb-4">Media Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mediaItems.map((item) => (
            <div key={item.id} className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden border">
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                <button className="text-white bg-red-600 p-1.5 rounded-full hover:bg-red-700" title="Delete">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                </button>
                <button className="text-white bg-blue-600 p-1.5 rounded-full hover:bg-blue-700" title="View">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Media;
