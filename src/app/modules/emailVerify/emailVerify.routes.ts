import express from 'express';
import { emailVerifyValidationSchema } from './emailVerify.validation';
import { validateRequest } from '../../middleware/validateRequest';
import { emailVerifyController } from './emailVerify.controller';
import verifyToken from '../../middleware/verifyToken';


const router = express.Router();

router.post('/sendMail', validateRequest(emailVerifyValidationSchema.emailVerifyMailSend), emailVerifyController.emailVerifyMailSend)
router.put('/', verifyToken('user', 'admin'), validateRequest(emailVerifyValidationSchema.updateEmailVerifyStatus), emailVerifyController.updateUserVerifiedStatus)

export const emailVerifyRoute = router