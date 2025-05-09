import { userInfo } from "os";
import config from "../../config";
import AppError from "../../error/AppError";
import { isPasswordMatched } from "../../utils/isPasswordMatch";
import { createToken } from "../auth/auth.utils";
import { TUpdateUserData, TUpdateUserInfo, TUser } from "./user.interface";
import { userModel } from "./user.model";
import { isUserExist } from "../../utils/isUserExist";
import bcrypt from "bcrypt";
import { sendMail } from "../../utils/sendMail";
import { emailVerifyService } from "../emailVerify/emailVerify.service";

const createNewUserIntoDB = async (payload: TUser) => {
    const existingUser = await userModel.findOne({ email: payload.email })

    if (existingUser) {
        throw new AppError(401, 'User already exist')
    }
    const createUser = await userModel.create(payload);
    const userData = await userModel.findById(createUser._id).select({ password: 0 }) as TUser

    const jwtPayload = {
        email: userData.email.toString(),
        role: userData.role,
        id: userData._id,
        profilePicture: userData.profilePicture.toString(),
    };

    const accessToken = createToken(
        jwtPayload,
        config.accessTokenSecrete as string,
        config.accessTokenExpire as string,
    );
    const refreshToken = createToken(
        jwtPayload,
        config.refreshTokenExpire as string,
        config.refreshTokenExpire as string,
    );

    const result = await emailVerifyService.EmailVerifyMailSendIntoDB(userData.email.toString())
    return { accessToken, refreshToken }
}

const getAllUserCountIntoDB = async () => {
    const result = await userModel.countDocuments()
    return result
}

const getAllUserIntoDB = async () => {
    const result = await userModel.find()
    return result
}

const addFollowerIntoDB = async (payload: { userId: string, followerId: string }) => {
    const isExistUser = await userModel.findById(payload.userId)
    if (!isExistUser) {
        throw new AppError(401, 'User not found')
    }

    const isExistFollower = await userModel.findById(payload.followerId)
    if (!isExistFollower) {
        throw new AppError(401, 'Follower user not found')
    }

    if (isExistFollower && isExistFollower!.followers.length < 1) {
        const result = await userModel.updateOne({ _id: payload.followerId }, { $push: { followers: payload.userId } })
        await userModel.updateOne({ _id: payload.userId }, { $push: { following: payload.followerId } })
        return result
    }

    const isAlreadyFollower = isExistFollower.followers.some((follower) => follower.toString() === payload.userId)
    if (isAlreadyFollower) {
        throw new AppError(403, 'You are already following this user')
    }

    const result = await userModel.updateOne({ _id: payload.followerId }, { $push: { followers: payload.userId } })
    await userModel.updateOne({ _id: payload.userId }, { $push: { following: payload.followerId } })
    return result

}

const removeFollowerIntoDB = async (payload: { userId: string, followerId: string }) => {
    const isExistUser = await userModel.findById(payload.userId)
    if (!isExistUser) {
        throw new AppError(401, 'User not found')
    }

    const isExistFollower = await userModel.findById(payload.followerId)
    if (!isExistFollower) {
        throw new AppError(401, 'Follower user not found')
    }

    if (!isExistFollower.followers.includes(payload.userId)) {
        throw new AppError(403, 'You are not following this user')
    }

    const result = await userModel.updateOne({ _id: payload.followerId }, { $pull: { followers: payload.userId } })

    await userModel.updateOne({ _id: payload.userId }, { $pull: { following: payload.followerId } })
    return result


}

const getFollowerDataIntoDB = async (followIds: string[]) => {
    const result = await userModel.find({ _id: { $in: followIds } })
    return result
}

const getFollowingDataIntoDB = async (followingIds: string[]) => {
    const result = await userModel.find({ _id: { $in: followingIds } })
    return result
}

const updateUserDataIntoDB = async (payload: TUpdateUserData) => {
    const isExistUser = await isUserExist(payload.email)
    if (!isExistUser) {
        throw new AppError(401, 'User not found')
    }

    let updateInfo: TUpdateUserInfo = {}
    if (payload.currentPassword && payload.newPassword) {
        const isPasswordMatch = await isPasswordMatched(payload.currentPassword, isExistUser.password.toString())

        if (!isPasswordMatch) {
            throw new AppError(403, 'Your current password is not a valid')
        }
        updateInfo.password = await bcrypt.hash((payload.newPassword as string), 10)
    }
    if (payload.name) {
        updateInfo.name = payload.name
    }
    if (payload.name) {
        updateInfo.name = payload.name
    }
    if (payload.profilePicture) {
        updateInfo.profilePicture = payload.profilePicture
    }
    const result = await userModel.updateOne({ email: payload.email }, updateInfo, { new: true })
    return result
}

const updateUserPremiumStatusIntoDB = async (transId: string) => {
    const isExistTransId = await userModel.findOne({ transitionId: transId })
    if (!isExistTransId) {
        throw new AppError(401, 'Invalid transition id provided!')
    }
    const result = await userModel.updateOne({ transitionId: transId }, { premiumStatus: true })
    return result
}

const getTopFiveFollowersIntoDB = async () => {
    const result = await userModel.aggregate([
        {
            $sort: { followers: -1 }
        }
    ]).limit(5)
    return result
}

const deleteUserIntoDB = async (id: string) => {
    const isExistUser = await userModel.find({ followers: id })
    if (!isExistUser) {
        throw new AppError(404, 'user not found!')
    }
    // Delete this user which use follow
    await userModel.updateMany({ followers: id }, { $pull: { followers: id } })
    // Delete this user which use followIng
    await userModel.updateMany({ following: id }, { $pull: { following: id } })
    const result = await userModel.findByIdAndDelete(id)
    return result
}

const blockUserIntoDB = async (payload: { id: string, blockStatus: boolean }) => {
    const isUserExist = await userModel.findById(payload.id)
    if (!isUserExist) {
        throw new AppError(404, 'user not found')
    }
    const blockedUser = await userModel.findByIdAndUpdate(payload.id, { blockedUser: payload.blockStatus }, { new: true })
    return blockedUser
}

// const verifyEmailSendIntoDB = async (email: string) => {
//     const isExistUser = await userModel.findOne({ email: email })
//     if (!isExistUser) {
//         throw new AppError(401, 'User not found')
//     }
//     const jwtPayload = {
//         email: email
//     }
//     const generateToken = createToken(jwtPayload, config.emailVerifySecrete as string, '5m')

//     const verifiedEmailLink = `http://localhost:3000/auth/verifyEmail?token=${generateToken}`

//     const data = {
//         token: generateToken,
//         email: email
//     }
//     const sendMailData = {
//         to: email,
//         subject: 'Verify Your Email - Duaria Abdul Gafoor Model Academy',
//         text: `Hello,

//         Thank you for signing up for Duaria Abdul Gafoor Model Academy. Please verify your email address using the following 6-digit code:

//         Verification Code: ${verifiedEmailLink}

//         This code will expire in 5 minutes. If you did not request this verification, please ignore this email.

//         Best regards,
//         Duaria Abdul Gafoor Model Academy Support Team`,
//         html: `<!DOCTYPE html>
//         <html lang="en">
//         <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <title>Email Verification</title>
//           <style>
//             body {
//               margin: 0;
//               padding: 0;
//               background-color: #f5f5f5;
//               font-family: Arial, sans-serif;
//             }
//             .container {
//               display: flex;
//               justify-content: center;
//               align-items: center;
//               min-height: 100vh;
//               background-color: #f5f5f5;
//             }
//             .email-wrapper {
//               width: 100%;
//               background-color: #ffffff;
//               border-radius: 8px;
//               overflow: hidden;
//               box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
//               text-align: center;
//               padding: 20px;
//               box-sizing: border-box;
//             }
//             .header {
//               background-color: #dbeafe;
//               padding: 20px 0;
//             }
//             .header img {
//               width: 100px;
//               border-radius: 50%;
//               background-color: white;
//             }
//             .content h1 {
//               font-size: 24px;
//               color: #333333;
//               margin: 20px 0;
//             }
//             .content p {
//               font-size: 16px;
//               color: #555555;
//               margin: 10px 0;
//               line-height: 1.6;
//             }
//             .verification-code {
//               display: inline-block;
//               background-color: #dbeafe;
//               color: #ffffff;
//               font-size: 18px;
//               font-weight: bold;
//               padding: 15px 30px;
//               border-radius: 8px;
//               margin: 20px 0;
//               text-decoration: none;
//             }
//             .footer p {
//               font-size: 12px;
//               color: #aaaaaa;
//               margin: 20px 0 0;
//             }
//             .footer p a {
//               color: #ff000d;
//               text-decoration: none;
//             }
//             .expire{
//               color: #ff000d;
//               font-weight : 900;
//             }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <div class="email-wrapper">
//               <!-- Header with Logo -->
//               <div class="header">
//                 <img src="https://res.cloudinary.com/durkh1c9d/image/upload/v1739381552/416200583_777597704382658_5573574209946949939_n_1_lejsre.jpg" alt="Duaria Abdul Gafoor Model Academy Logo">
//               </div>

//               <!-- Main Content -->
//               <div class="content">
//                 <h1>Verify Your Email</h1>
//                 <p>Hello,</p>
//                 <p>Thank you for signing up for <strong>Duaria Abdul Gafoor Model Academy</strong>. Please use the following code to verify your email address:</p>
//                 <div class="verification-code">${verifiedEmailLink}</div>
//                 <div class="expire">This code will expire in 5 minutes</div>
//                 <p>If you did not request this verification, you can safely ignore this email.</p>
//               </div>

//               <!-- Footer -->
//               <div class="footer">
//                 <p>Thank you for joining Duaria Abdul Gafoor Model Academy!</p>
//                 <p>&copy; ${new Date().getFullYear()} Duaria Abdul Gafoor Model Academy. All rights reserved.</p>
//               </div>
//             </div>
//           </div>
//         </body>
//         </html>`
//     };

//     const info = await sendMail(sendMailData);
//     if (info.accepted) {
//         // await resetPasswordModel.create(data)
//         return {
//             message: 'Reset Password mail sent successfully!',
//         }
//     }

//     return {
//         message: 'something went wrong!',
//     }

// }

export const userService = {
    createNewUserIntoDB,
    getAllUserCountIntoDB,
    getAllUserIntoDB,
    updateUserDataIntoDB,
    addFollowerIntoDB,
    updateUserPremiumStatusIntoDB,
    removeFollowerIntoDB,
    getFollowerDataIntoDB,
    getFollowingDataIntoDB,
    getTopFiveFollowersIntoDB,
    deleteUserIntoDB,
    blockUserIntoDB
}