import { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { galleryService } from "./gallery.service"

const createGallery = catchAsync(async (req: Request, res: Response) => {
    const galleryData = req.body

    const result = await galleryService.createNewGalleryIntoDB(galleryData)
    res.status(200).json({
        success: true,
        massage: 'Gallery created successfully',
        data: result
    })
})

const getAllGalleryAdmin = catchAsync(async (req: Request, res: Response) => {
    const result = await galleryService.getAllGalleryAdminIntoDB()
    res.status(200).json({
        success: true,
        massage: 'All Gallery retrieve successfully',
        data: result
    })
})

const getAllGalleryUser = catchAsync(async (req: Request, res: Response) => {
    const result = await galleryService.getAllGalleryUserIntoDB()
    res.status(200).json({
        success: true,
        massage: 'All Gallery retrieve successfully',
        data: result
    })
})

const updateGallery = catchAsync(async (req: Request, res: Response) => {
    const galleryId = req.params.id
    const payload = req.body
    const result = await galleryService.updateGalleryIntoDB(galleryId, payload)
    res.status(200).json({
        success: true,
        massage: 'Gallery update successfully',
        data: result
    })
})

const deleteGallery = catchAsync(async (req: Request, res: Response) => {
    const galleryId = req.params.id
    const result = await galleryService.deleteGalleryIntoDB(galleryId)
    res.status(200).json({
        success: true,
        massage: 'Gallery delete successfully',
        data: result
    })
})

const countGallery = catchAsync(async (req: Request, res: Response) => {
    const result = await galleryService.countGalleryIntoDB()

    res.status(200).json({
        success: true,
        massage: 'Gallery count successfully',
        data: result
    })
})




export const galleryController = {
    createGallery,
    getAllGalleryAdmin,
    getAllGalleryUser,
    updateGallery,
    deleteGallery,
    countGallery
}