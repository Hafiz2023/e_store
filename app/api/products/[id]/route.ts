import { NextResponse } from "next/server";
import { connectDB } from "@/lib/databaseconnection";
import ProductModel from "@/app/models/Product.model";
import { ProductSchema } from "@/lib/zodSchema";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(_: Request, { params }: any) {
  try {
    await connectDB();
    const { id } = await params;
    const product = await ProductModel.findById(id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function PUT(req: Request, { params }: any) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    // Validate input (partial validation for updates could be considered, but for now using full schema)
    // For partial updates, we might want to use .partial() on the schema, but let's assume full update or careful partial
    const validationResult = ProductSchema.partial().safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error.format() },
        { status: 400 }
      );
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      validationResult.data,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function DELETE(_: Request, { params }: any) {
  try {
    await connectDB();
    const { id } = await params;
    const deletedProduct = await ProductModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
