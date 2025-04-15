import AppError from "../../error/AppError";
import { TNotice } from "./notice.interface";
import { noticeModal } from "./notice.model";

const createNewNoticeIntoDB = async (payload: { title: string, description: string, image: string }) => {
  const createNotice = await noticeModal.create(payload);
  return createNotice;
}

const getAllNoticeAdminIntoDB = async () => {
  const result = await noticeModal.find();
  return result;
}

const getAllNoticeUserIntoDB = async () => {
  const result = await noticeModal.find({ isBlock: false });
  return result;
}

const updateNoticeStatusIntoDB = async (id: string, updateInfo: Partial<TNotice>) => {
  const isNoticeExist = await noticeModal.findById(id)
  if (!isNoticeExist) {
    throw new AppError(404, 'Notice not found')
  }
  const blockNotice = await noticeModal.findByIdAndUpdate(id, updateInfo, { new: true })
  return blockNotice
}

const deleteNoticeIntoDB = async (payload: string) => {
  const isNoticeExist = await noticeModal.findById(payload)
  if (!isNoticeExist) {
    throw new AppError(404, 'Notice not found')
  }
  const deleteNotice = await noticeModal.findByIdAndDelete(payload)
  return deleteNotice
}

const countNoticeIntoDB = async () => {
  const result = await noticeModal.countDocuments()
  return result;
}

export const noticeService = {
  createNewNoticeIntoDB,
  getAllNoticeAdminIntoDB,
  getAllNoticeUserIntoDB,
  updateNoticeStatusIntoDB,
  deleteNoticeIntoDB,
  countNoticeIntoDB
}