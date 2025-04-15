import { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { noticeService } from "./notice.service"
const createNotice = catchAsync(async (req: Request, res: Response) => {
    const noticeData = req.body
    const result = await noticeService.createNewNoticeIntoDB(noticeData)
    res.status(200).json({
        success: true,
        massage: 'Notice created successfully',
        data: result
    })
})

const getAllNoticeAdmin = catchAsync(async (req: Request, res: Response) => {
    const result = await noticeService.getAllNoticeAdminIntoDB()
    res.status(200).json({
        success: true,
        massage: 'All Notice retrieve successfully',
        data: result
    })
})

const getAllNoticeUser = catchAsync(async (req: Request, res: Response) => {
    const result = await noticeService.getAllNoticeUserIntoDB()
    res.status(200).json({
        success: true,
        massage: 'All Notice retrieve successfully',
        data: result
    })
})

const updateNoticeStatus = catchAsync(async (req: Request, res: Response) => {
    const noticeId = req.params.id
    const payload = req.body
    const result = await noticeService.updateNoticeStatusIntoDB(noticeId, payload)
    res.status(200).json({
        success: true,
        massage: 'Notice status update successfully',
        data: result
    })
})

const deleteNotice = catchAsync(async (req: Request, res: Response) => {
    const noticeId = req.params.id
    const result = await noticeService.deleteNoticeIntoDB(noticeId)
    res.status(200).json({
        success: true,
        massage: 'Notice delete successfully',
        data: result
    })
})

const countNotice = catchAsync(async (req: Request, res: Response) => {
    const result = await noticeService.countNoticeIntoDB()

    res.status(200).json({
        success: true,
        massage: 'Notice count successfully',
        data: result
    })
})




export const noticeController = {
    createNotice,
    getAllNoticeAdmin,
    getAllNoticeUser,
    updateNoticeStatus,
    deleteNotice,
    countNotice
}