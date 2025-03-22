import { Document } from "mongoose";

export interface TVerifyEmail {
    email : string;
    token ?: string;
    createdAt?: Date;
}