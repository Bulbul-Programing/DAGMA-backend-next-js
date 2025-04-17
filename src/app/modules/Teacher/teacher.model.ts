import { model, Schema } from "mongoose";
import { TTeacher } from "./teacher.interface";

const teacherSchema = new Schema<TTeacher>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    photo: { type: String, required: true },
    designation: { type: String, required: true },
    subject: { type: String, required: true },
    qualifications: { type: String, required: true },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    isBlock: { type: Boolean, default: false },
}, { timestamps: true })

export const teacherModal = model<TTeacher>('teacher', teacherSchema)