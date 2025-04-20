import AppError from "../../error/AppError";
import { TGallery } from "./gallery.interface";
import { galleryModal } from "./gallery.model";

const createNewGalleryIntoDB = async (payload : TGallery) => {
  const result = await galleryModal.create(payload);
  return result;
}

const getAllGalleryAdminIntoDB = async () => {
  const result = await galleryModal.find();
  return result;
}

const getAllGalleryUserIntoDB = async () => {
  const result = await galleryModal.find({ isBlock: false });
  return result;
}

const updateGalleryIntoDB = async (id: string, updateInfo: Partial<TGallery>) => {
  const isTeacherExist = await galleryModal.findById(id)
  if (!isTeacherExist) {
    throw new AppError(404, 'Gallery not found')
  }
  const updateTeacher = await galleryModal.findByIdAndUpdate(id, updateInfo, { new: true })
  return updateTeacher
}

const deleteGalleryIntoDB = async (payload: string) => {
  const isTeacherExist = await galleryModal.findById(payload)
  if (!isTeacherExist) {
    throw new AppError(404, 'Gallery not found')
  }
  const deleteTeacher = await galleryModal.findByIdAndDelete(payload)
  return deleteTeacher
}

const countGalleryIntoDB = async () => {
  const result = await galleryModal.countDocuments()
  return result;
}

export const galleryService = {
  createNewGalleryIntoDB,
  getAllGalleryAdminIntoDB,
  getAllGalleryUserIntoDB,
  updateGalleryIntoDB,
  deleteGalleryIntoDB,
  countGalleryIntoDB
}