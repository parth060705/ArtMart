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
    price: z.string().optional(),
    category: z.string().min(1, { message: 'Category is required' }),
    // images: z.array(z.string()).min(1, { message: 'At least one image is required' }),
    images: z.array(z.any()).refine(
        (images) => images.length > 0,
        { message: 'At least one image is required' }
    ),
    tags: z.string().min(1, { message: 'At least one tag is required for better search' }),
    quantity: z.string().optional(),
    forSale: z.boolean().default(false).optional(),
}).refine((data) => {
    if (data.forSale) {
        return data.price && data.price.trim() !== '' && data.quantity && data.quantity.trim() !== '';
    }
    return true;
}, {
    message: 'Price and quantity are required when the artwork is for sale',
    path: ['price']
}).refine((data) => {
    if (data.forSale) {
        const quantity = parseInt(data.quantity || '0', 10);
        return !isNaN(quantity) && quantity > 0;
    }
    return true;
}, {
    message: 'Quantity must be greater than 0',
    path: ['quantity']
});