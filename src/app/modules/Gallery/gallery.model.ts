import { model, Schema } from "mongoose";
import { TGallery } from "./gallery.interface";

const gallerySchema = new Schema<TGallery>({
    galleryName: { type: String, required: true },
    galleryDescription: { type: String, required: true },
    photos: { type: [String], required: true },
    isBlock: { type: Boolean, default: false },
}, { timestamps: true })

export const galleryModal = model<TGallery>('gallery', gallerySchema)