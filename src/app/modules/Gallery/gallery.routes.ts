import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { galleryValidationSchema } from './gallery.validation';
import { galleryController } from './gallery.controller';
import verifyToken from '../../middleware/verifyToken';

const router = express.Router();
router.post('/create',verifyToken('admin'),validateRequest(galleryValidationSchema.creteGalleryValidationSchema), galleryController.createGallery)
router.get('/admin', galleryController.getAllGalleryAdmin)
router.get('/user', galleryController.getAllGalleryUser)
router.put('/update/:id', verifyToken('admin'), validateRequest(galleryValidationSchema.updateGalleryValidationSchema), galleryController.updateGallery)
router.delete('/delete/:id', verifyToken('admin'), galleryController.deleteGallery)
router.get('/count', verifyToken('admin'), galleryController.countGallery)


export const galleryRoute = router