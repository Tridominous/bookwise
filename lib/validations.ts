
import { z } from "zod";

export const signUpSchema = z.object({
    fullName: z.string().min(3, 'Fullname must be at least 3 characters long').max(255, 'Fullname must be at most 255 characters long'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long').max(255, 'Password must be at most 255 characters long'),
    universityId: z.coerce.number(),
    universityCard: z.string().min(4, 'University card must be at least 4 characters long').max(255, 'University card must be at most 255 characters long'),
});

export const signInSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long').max(255, 'Password must be at most 255 characters long'),
});