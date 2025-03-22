import { model, Schema } from "mongoose";
import { TVerifyEmail } from "./emailVerify.interface";

const emailVerifySchema = new Schema<TVerifyEmail>({
    email: { type: String, required: true, },
    token: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300
    }
})



export const emailVerifyModel = model<TVerifyEmail>('emailVerify', emailVerifySchema)