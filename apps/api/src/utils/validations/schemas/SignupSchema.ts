import { z } from 'zod';

export const SignupSchema = z
	.object({
		email: z.string().email('Invalid email address'),
		password: z.string().min(8, 'Password must be at least 8 characters long'),
		confirmPassword: z.string().min(8, 'Password must be at least 8 characters long'),
	})
	.superRefine((data, ctx) => {
		if (data.password !== data.confirmPassword) {
			ctx.addIssue({
				code: 'custom',
				path: ['confirmPassword'],
				message: 'Passwords do not match',
			});
		}
	});
