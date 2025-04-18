import { Types } from "mongoose";

export type TUser = {
    _id: String,
    name: String,
    email: String,
    password: String,
    role: 'admin' | 'user',
    profilePicture: String,
    followers: string[],
    following: string[],
    phoneNumber: string,
    emailVerified: boolean,
    createdAt?: Date,
    updatedAt?: Date,
    blockedUser: Boolean
}

export const userRoles = {
    user: 'user',
    admin: 'admin'
}

export type TUpdateUserData = {
    name?: string,
    email: string,
    currentPassword?: string,
    profilePicture?: string,
    newPassword?: string,
}

type TFollowers = [string]

export type TUpdateUserInfo = {
    name?: String,
    password?: String,
    profilePicture?: String,
}

export type TUserRole = keyof typeof userRoles;