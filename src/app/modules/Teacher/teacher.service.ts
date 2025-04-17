import AppError from "../../error/AppError";
import { TTeacher } from "./teacher.interface";
import { teacherModal } from "./teacher.model";

const createNewTeacherIntoDB = async (payload: { title: string, description: string, image: string }) => {
  const result = await teacherModal.create(payload);
  return result;
}

const getAllTeacherAdminIntoDB = async () => {
  const result = await teacherModal.find();
  return result;
}

const getAllTeacherUserIntoDB = async () => {
  const result = await teacherModal.find({ isBlock: false });
  return result;
}

const updateTeacherStatusIntoDB = async (id: string, updateInfo: Partial<TTeacher>) => {
  const isTeacherExist = await teacherModal.findById(id)
  if (!isTeacherExist) {
    throw new AppError(404, 'Teacher not found')
  }
  const updateTeacher = await teacherModal.findByIdAndUpdate(id, updateInfo, { new: true })
  return updateTeacher
}

const deleteTeacherIntoDB = async (payload: string) => {
  const isTeacherExist = await teacherModal.findById(payload)
  if (!isTeacherExist) {
    throw new AppError(404, 'Teacher not found')
  }
  const deleteTeacher = await teacherModal.findByIdAndDelete(payload)
  return deleteTeacher
}

const countTeacherIntoDB = async () => {
  const result = await teacherModal.countDocuments()
  return result;
}

export const noticeService = {
  createNewTeacherIntoDB,
  getAllTeacherAdminIntoDB,
  getAllTeacherUserIntoDB,
  updateTeacherStatusIntoDB,
  deleteTeacherIntoDB,
  countTeacherIntoDB
}