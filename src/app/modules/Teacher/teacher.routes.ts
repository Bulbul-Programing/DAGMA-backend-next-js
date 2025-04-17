import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { teacherValidationSchema } from './teacher.validation';
import { teacherController } from './teacher.controller';
import verifyToken from '../../middleware/verifyToken';

const router = express.Router();
router.post('/create', verifyToken('admin'), validateRequest(teacherValidationSchema.creteTeacherValidationSchema), teacherController.createTeacher)
router.get('/admin', teacherController.getAllTeacherAdmin)
router.get('/user', teacherController.getAllTeacherUser)
router.put('/update/:id', verifyToken('admin'), validateRequest(teacherValidationSchema.updateTeacherValidationSchema), teacherController.updateTeacher)
router.delete('/delete/:id', verifyToken('admin'), teacherController.deleteTeacher)
router.get('/count', verifyToken('admin'), teacherController.countTeacher)


export const teacherRoute = router