import { z } from 'zod';

export const registerSchema = z
    .object({
        username: z
            .string()
            .min(3, { message: 'Username must be at least 3 characters long' }),
        email: z.string().email({ message: 'Invalid email address' }),
        password: z
            .string()
            .min(6, { message: 'Password must be at least 6 characters long' }),
        passwordConf: z
            .string()
            .min(6, { message: 'Password must be at least 6 characters long' }),
        free_membership: z.boolean(), // field for free membership checkbox
        standard_monthly: z.boolean(), // field for pro membership checkbox
    })
    .refine((data) => data.password === data.passwordConf, {
        message: "Passwords don't match",
        path: ['passwordConf'], // specify the path of the error
    })
    .refine((data) => data.free_membership !== data.standard_monthly, {
        message:
            'Please select either Free Membership or Pro Membership, not both.',
        path: ['free_membership'], // specify path for error display
    });

export const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(1, { message: 'Password is required' }),
});
