import { z } from 'zod';

const creteGalleryValidationSchema = z.object({
    body: z.object({
        galleryName: z.string().min(1, 'Name is require'),
        galleryDescription: z.string().min(5, 'Name is require'),
        photos: z.array(z.string().min(1, "Photos are required")),
    })
});

const updateGalleryValidationSchema = z.object({
    body: z.object({
        galleryName: z.string().min(1, 'Name is require').optional(),
        galleryDescription: z.string().min(5, 'Name is require').optional(),
        photos: z.array(z.string().min(1, "Photos are required")).optional()
    })
});

export const galleryValidationSchema = {
    creteGalleryValidationSchema,
    updateGalleryValidationSchema
}
