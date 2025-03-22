import { sendMail } from "../../utils/sendMail"
import { emailVerifyModel } from "./emailVerify.model"
import AppError from "../../error/AppError"
import { userModel } from "../user/user.model"
import { createToken } from "../auth/auth.utils"
import config from "../../config"

const EmailVerifyMailSendIntoDB = async (email: string) => {
  const isExistUser = await userModel.findOne({ email: email })
  if (!isExistUser) {
    throw new AppError(401, 'User not found')
  }
  const jwtPayload = {
    email: email
  }
  const generateToken = createToken(jwtPayload, config.emailVerifySecrete as string, '5m')

  const verifiedEmailLink = `http://localhost:3000/emailVerify/verify?token=${generateToken}`

  const data = {
    token: generateToken,
    email: email
  }
  const sendMailData = {
    to: email,
    subject: 'Verify Your Email - Duaria Abdul Gafoor Model Academy',
    text: `Hello,
    
        Thank you for signing up for Duaria Abdul Gafoor Model Academy. Please verify your email address using the following 6-digit code:
    
        Verification Code: ${verifiedEmailLink}
    
        This code will expire in 5 minutes. If you did not request this verification, please ignore this email.
    
        Best regards,
        Duaria Abdul Gafoor Model Academy Support Team`,
    html: `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
              font-family: Arial, sans-serif;
            }
            .container {
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              background-color: #f5f5f5;
            }
            .email-wrapper {
              width: 100%;
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
              text-align: center;
              padding: 20px;
              box-sizing: border-box;
            }
            .header {
              background-color: #dbeafe;
              padding: 20px 0;
            }
            .header img {
              width: 100px;
              border-radius: 50%;
              background-color: white;
            }
            .content h1 {
              font-size: 24px;
              color: #333333;
              margin: 20px 0;
            }
            .content p {
              font-size: 16px;
              color: #555555;
              margin: 10px 0;
              line-height: 1.6;
            }
            .verification-code {
              display: inline-block;
              background-color: #dbeafe;
              color: #ffffff;
              font-size: 18px;
              font-weight: bold;
              padding: 15px 30px;
              border-radius: 8px;
              margin: 20px 0;
              text-decoration: none;
            }
            .footer p {
              font-size: 12px;
              color: #aaaaaa;
              margin: 20px 0 0;
            }
            .footer p a {
              color: #ff000d;
              text-decoration: none;
            }
            .expire{
              color: #ff000d;
              font-weight : 900;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="email-wrapper">
              <!-- Header with Logo -->
              <div class="header">
                <img src="https://res.cloudinary.com/durkh1c9d/image/upload/v1739381552/416200583_777597704382658_5573574209946949939_n_1_lejsre.jpg" alt="Duaria Abdul Gafoor Model Academy Logo">
              </div>
    
              <!-- Main Content -->
              <div class="content">
                <h1>Verify Your Email</h1>
                <p>Hello,</p>
                <p>Thank you for signing up for <strong>Duaria Abdul Gafoor Model Academy</strong>. Please use the following code to verify your email address:</p>
                <div class="verification-code">${verifiedEmailLink}</div>
                <div class="expire">This code will expire in 5 minutes</div>
                <p>If you did not request this verification, you can safely ignore this email.</p>
              </div>
    
              <!-- Footer -->
              <div class="footer">
                <p>Thank you for joining Duaria Abdul Gafoor Model Academy!</p>
                <p>&copy; ${new Date().getFullYear()} Duaria Abdul Gafoor Model Academy. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
        </html>`
  };

  const info = await sendMail(sendMailData);
  if (info.accepted) {
    await emailVerifyModel.create(data)
    return {
      message: 'Reset Password mail sent successfully!',
    }
  }

  return {
    message: 'something went wrong!',
  }
}

const updateUserVerifiedStatusIntoDB = async (token: string) => {
  const isExistToken = await emailVerifyModel.findOne({ token: token });
  if (!isExistToken) {
    throw new AppError(404, 'Your are not allowed to verify your email')
  }

  const isUserExist = await userModel.findOneAndUpdate({ email: isExistToken.email }, { emailVerified: true }, { new: true })
  if (!isUserExist) {
    throw new AppError(404, 'User not found')
  }
  return isUserExist
}

export const emailVerifyService = {
  EmailVerifyMailSendIntoDB,
  updateUserVerifiedStatusIntoDB
}