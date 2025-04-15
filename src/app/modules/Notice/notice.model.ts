import { model, Schema } from "mongoose";
import { TNotice } from "./notice.interface";

const noticeSchema = new Schema<TNotice>({
    noticeTitle: { type: String },
    noticeDescription: { type: String },
    image: { type: String },
    isBlock: { type: Boolean, default: false },
}, { timestamps: true })

export const noticeModal = model<TNotice>('notice', noticeSchema)