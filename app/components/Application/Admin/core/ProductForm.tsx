/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";

interface ProductFormProps {
  mode: "create" | "edit";

  initial?: any;
}

export default function ProductForm({ mode, initial }: ProductFormProps) {
  const router = useRouter();

  const [form, setForm] = useState({
    name: initial?.name || "",
    description: initial?.description || "",
    price: initial?.price || 0,
    image: initial?.images?.[0] || initial?.image || "",
    category: initial?.category || "",
    stock: initial?.stock || 0,
  });

  const [loading, setLoading] = useState(false);


  function onChange(e: any) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }


  async function submit(e: any) {
    e.preventDefault();
    setLoading(true);

    if (!form.image) {
      alert("Please upload an image first.");
      setLoading(false);
      return;
    }

    try {
      const url =
        mode === "create"
          ? "/api/products"
          : `/api/products/${initial._id}`;

      // Transform form data to match API schema
      const payload = {
        ...form,
        images: form.image ? [form.image] : [], // Convert single image to array
        stock: Number(form.stock), // Ensure stock is a number
      };

      // Remove single image field from payload
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { image, ...finalPayload } = payload;

      console.log("Submitting Payload:", finalPayload); // DEBUG

      // TEMPORARY DEBUG ALERT
      alert(`Sending Data:\nName: ${finalPayload.name}\nImage: ${finalPayload.images[0] || "None"}`);

      const res = await fetch(url, {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalPayload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("API Error:", errorData); // DEBUG
        throw new Error(errorData.error || "Something went wrong");
      }

      router.refresh();
      router.push("/admin/dashboard/products");
    } catch (err) {
      console.error("Submit Error:", err);
      alert("Failed to save product. Please check inputs.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4 max-w-lg">
      <input
        name="name"
        value={form.name}
        onChange={onChange}
        placeholder="Product Name"
        className="w-full p-2 border rounded"
        required
      />

      <input
        name="category"
        value={form.category}
        onChange={onChange}
        placeholder="Category"
        className="w-full p-2 border rounded"
        required
      />

      <textarea
        name="description"
        value={form.description}
        onChange={onChange}
        placeholder="Description"
        className="w-full p-2 border rounded"
        required
      />

      <div className="flex gap-4">
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={onChange}
          placeholder="Price"
          className="w-1/2 p-2 border rounded"
          required
          min="0"
        />
        <input
          name="stock"
          type="number"
          value={form.stock}
          onChange={onChange}
          placeholder="Stock"
          className="w-1/2 p-2 border rounded"
          required
          min="0"
        />
      </div>

      {/* Cloudinary Upload */}
      <div className="flex items-center gap-4">
        <CldUploadWidget
          uploadPreset="unsigned_upload"
          onSuccess={(result: any) => {
            console.log("Upload Success:", result); // DEBUG
            if (result.info?.secure_url) {
              setForm((s) => ({ ...s, image: result.info.secure_url }));
            }
          }}
        >
          {({ open }) => (
            <Button
              type="button"
              onClick={() => open?.()}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              {form.image ? "Change Image" : "Upload Image"}
            </Button>
          )}
        </CldUploadWidget>

        {form.image && (
          <span className="text-green-600 text-sm font-medium">
            ✅ Image Uploaded
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full px-4 py-2 rounded text-white font-semibold transition-colors ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
      >
        {loading ? "Saving Product..." : mode === "create" ? "Submit Product" : "Update Product"}
      </button>
    </form>
  );
}
