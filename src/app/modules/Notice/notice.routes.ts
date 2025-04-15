import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { noticeValidationSchema } from './notice.validation';
import { noticeController } from './notice.controller';
import verifyToken from '../../middleware/verifyToken';

const router = express.Router();
// add verifyToken('admin') for create notice
router.post('/create', verifyToken('admin'), validateRequest(noticeValidationSchema.creteNoticeValidationSchema), noticeController.createNotice)
router.get('/admin', verifyToken('admin'), noticeController.getAllNoticeAdmin)
router.get('/user', noticeController.getAllNoticeUser)
router.put('/update/:id', verifyToken('admin'), validateRequest(noticeValidationSchema.updateNoticeValidationSchema), noticeController.updateNoticeStatus)
router.delete('/delete/:id', verifyToken('admin'), noticeController.deleteNotice)
router.get('/count', noticeController.countNotice)


export const noticeRoute = router