import { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { emailVerifyService } from "./emailVerify.service"


const emailVerifyMailSend = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body
    const result = await emailVerifyService.EmailVerifyMailSendIntoDB(payload)

    res.status(200).json({
        success: true,
        massage: 'Email Verify email send successful',
        data: result
    })
})

const updateUserVerifiedStatus = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body
    const result = await emailVerifyService.updateUserVerifiedStatusIntoDB(payload.token)

    res.status(200).json({
        success: true,
        massage: 'Email Verify successful',
        data: result
    })
})

export const emailVerifyController = {
    emailVerifyMailSend,
    updateUserVerifiedStatus
}