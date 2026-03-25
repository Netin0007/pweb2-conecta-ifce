import { z } from 'zod'

export const registerSchema = z.object({
  firstName: z.string().trim().min(2, 'O nome deve ter pelo menos 2 caracteres'),
  lastName: z.string().min(2, 'O sobrenome deve ter pelo menos 2 caracteres'),
  handle: z.string().trim().min(3, 'O nome de usuário deve ter pelo menos 3 caracteres').max(50)
    .regex(/^[a-zA-Z0-9_]+$/, 'O nome de usuário só pode conter letras, números e underscores') ,
  email: z
    .email('E-mail inválido')
    .optional(),
  role: z.enum(['student', 'professor', 'technician']),
  campus: z.string().nonempty(),
  course: z.string().trim().min(3, 'O nome do curso deve ter pelo menos 3 caracteres').optional(),
  password: z
    .string()
    .min(8, 'A senha deve conter pelo menos 8 caracteres')
    .regex(/[A-Za-z]/, 'A senha deve conter letras')
    .regex(/[0-9]/, 'A senha deve conter números')
})

export type RegisterFormData = z.infer<typeof registerSchema>
