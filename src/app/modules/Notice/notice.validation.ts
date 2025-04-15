import { z } from 'zod';

const creteNoticeValidationSchema = z.object({
    body: z.object({
        noticeTitle: z.string({ required_error: "Notice title is required" }),
        noticeDescription: z.string({ required_error: "Notice description is required" }),
        image: z.string({ required_error: "Notice image is required" }),
    })
});

const updateNoticeValidationSchema = z.object({
    body: z.object({
        id: z.string({ required_error: "Notice id is required" }),
        blockStatus: z.boolean({ required_error: "Notice status is required" })
    })
});

export const noticeValidationSchema = {
    creteNoticeValidationSchema,
    updateNoticeValidationSchema
}
