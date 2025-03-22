import { z } from 'zod';

const emailVerifyMailSend = z.object({
    body: z.object({
        email: z.string({ required_error: "Email is required" }),
    })
});

const updateEmailVerifyStatus = z.object({
    body: z.object({
        token: z.string({ required_error: "Token is required" }),
    })
});

export const emailVerifyValidationSchema = {
    emailVerifyMailSend,
    updateEmailVerifyStatus
}
