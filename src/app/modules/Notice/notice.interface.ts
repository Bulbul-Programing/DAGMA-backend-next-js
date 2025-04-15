import { ObjectId } from "mongoose";

export type TNotice = {
    noticeTitle: string;
    noticeDescription: string;
    image: string;
    isBlock: boolean; 
}

export type TUpdateNotice = {
    _id : ObjectId
    noticeTitle: string;
    noticeDescription: string;
    image: string;
    isBlock: boolean; 
}