import { z } from 'zod';
export const bdPhoneRegex = /^(013|014|015|016|017|018|019)[0-9]{8}$/;
const creteTeacherValidationSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email address"),
        phone: z
            .string()
            .min(11, "Phone must be 11 digits")
            .max(11, "Phone must be 11 digits")
            .regex(bdPhoneRegex, "Invalid Bangladeshi phone number"),
        photo: z.string().url("Photo must be a valid URL"),
        designation: z.string().min(1, "Designation is required"),
        subject: z.string().min(1, "Subject is required"),
        qualifications: z.string().min(1, "Qualifications are required"),
    })
});

const updateTeacherValidationSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Name is required").optional(),
        email: z.string().email("Invalid email address").optional(),
        phone: z
            .string()
            .min(11, "Phone must be 11 digits")
            .max(11, "Phone must be 11 digits")
            .regex(bdPhoneRegex, "Invalid Bangladeshi phone number").optional(),
        photo: z.string().url("Photo must be a valid URL").optional(),
        designation: z.string().min(1, "Designation is required").optional(),
        subject: z.string().min(1, "Subject is required").optional(),
        qualifications: z.string().min(1, "Qualifications are required").optional()
    })
});

export const teacherValidationSchema = {
    creteTeacherValidationSchema,
    updateTeacherValidationSchema
}
