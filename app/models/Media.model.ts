import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    asset_id: { type: String, required: true, trim: true },
    public_id: { type: String, required: true, trim: true, unique: true },
    path: { type: String, required: true, trim: true },
    thumbnail_url: { type: String, required: true, trim: true },
    alt: { type: String, trim: true },
    title: { type: String, trim: true },
    deletedAt: { type: Date, default: null, index: true },
  },
  { timestamps: true, collection: "Medias" }
);

export interface IMedia {
  asset_id: string;
  public_id: string;
  path: string;
  thumbnail_url: string;
  alt?: string;
  title?: string;
  deletedAt?: Date | null;
}

export type IMediaDocument = mongoose.Document & IMedia;

const MediaModel =
  (mongoose.models.Media as mongoose.Model<IMediaDocument>) ||
  mongoose.model<IMediaDocument>("Media", mediaSchema);

export default MediaModel;
