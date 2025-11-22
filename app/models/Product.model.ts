import mongoose, { Document, Schema, Model } from "mongoose";

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    category: string;
    images: string[];
    stock: number;
    tags?: string[];
    variants?: {
        name: string;
        options: string[];
    }[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const productSchema: Schema<IProduct> = new Schema(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
        category: { type: String, required: true },
        images: { type: [String], required: true },
        stock: { type: Number, required: true, min: 0, default: 0 },
        tags: { type: [String], default: [] },
        variants: [
            {
                name: { type: String, required: true },
                options: { type: [String], required: true },
            },
        ],
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

const ProductModel: Model<IProduct> =
    mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);

export default ProductModel;
