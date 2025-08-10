import { z } from 'zod';

// Zod schema for login form validation
export const loginFormSchema = z.object({
    username: z.string().min(1, { message: 'Username is required' }),
    password: z.string().min(1, { message: 'Password is required' }),
});

export const registerFormSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    username: z.string().min(1, { message: 'Username is required' }),
    location: z.string().min(1, { message: 'Location is required' }),
    gender: z.string().min(1, { message: 'Gender is required' }),
    age: z.string().min(1, { message: 'Age is required' }),
    pincode: z.string().min(1, { message: 'Pincode is required' }),
    phone: z.string()
        .regex(/^(\+91)?\d{10}$/, { message: 'Phone number must be 10 digits, optionally prefixed with +91' }),
    password: z.string().min(1, { message: 'Password is required' }),
    confirmPassword: z.string().min(1, { message: 'Confirm password is required' }),
});

export const emailSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
});

export const resetPasswordFormSchema = z.object({
    password: z.string().min(1, { message: 'Password is required' }),
    confirmPassword: z.string().min(1, { message: 'Confirm password is required' }),
});

export const uploadProductSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    price: z.string().min(1, { message: 'Price is required' }),
    category: z.string().min(1, { message: 'Category is required' }),
    images: z.array(z.string()).min(1, { message: 'At least one image is required' }),
    tags: z.array(z.string()).min(1, { message: 'At least one tags for better search' }),
});