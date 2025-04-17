import { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { noticeService } from "./teacher.service"

const createTeacher = catchAsync(async (req: Request, res: Response) => {
    const teacherData = req.body
    const result = await noticeService.createNewTeacherIntoDB(teacherData)
    res.status(200).json({
        success: true,
        massage: 'Teacher created successfully',
        data: result
    })
})

const getAllTeacherAdmin = catchAsync(async (req: Request, res: Response) => {
    const result = await noticeService.getAllTeacherAdminIntoDB()
    res.status(200).json({
        success: true,
        massage: 'All Teacher retrieve successfully',
        data: result
    })
})

const getAllTeacherUser = catchAsync(async (req: Request, res: Response) => {
    const result = await noticeService.getAllTeacherUserIntoDB()
    res.status(200).json({
        success: true,
        massage: 'All Teacher retrieve successfully',
        data: result
    })
})

const updateTeacher = catchAsync(async (req: Request, res: Response) => {
    const teacherId = req.params.id
    const payload = req.body
    const result = await noticeService.updateTeacherStatusIntoDB(teacherId, payload)
    res.status(200).json({
        success: true,
        massage: 'Teacher update successfully',
        data: result
    })
})

const deleteTeacher = catchAsync(async (req: Request, res: Response) => {
    const teacherId = req.params.id
    const result = await noticeService.deleteTeacherIntoDB(teacherId)
    res.status(200).json({
        success: true,
        massage: 'Teacher delete successfully',
        data: result
    })
})

const countTeacher = catchAsync(async (req: Request, res: Response) => {
    const result = await noticeService.countTeacherIntoDB()

    res.status(200).json({
        success: true,
        massage: 'Teacher count successfully',
        data: result
    })
})




export const teacherController = {
    createTeacher,
    getAllTeacherAdmin,
    getAllTeacherUser,
    updateTeacher,
    deleteTeacher,
    countTeacher
}