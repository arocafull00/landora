import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().trim().min(1, "El nombre es requerido").max(80),
  email: z.email("Email inválido").max(254),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(128)
    .regex(/[A-Z]/, "La contraseña debe incluir una mayúscula")
    .regex(/[a-z]/, "La contraseña debe incluir una minúscula")
    .regex(
      /[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/,
      "La contraseña debe incluir un número o símbolo",
    ),
});

export type CreateUserValues = z.infer<typeof createUserSchema>;
