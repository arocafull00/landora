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

export const createUserLandingFormSchema = z.strictObject({
  name: z.string().trim().min(1, "El nombre es requerido").max(100),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "El subdominio es requerido")
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Usa letras minúsculas, números y guiones"),
  template: z.enum([
    "velar",
    "portfolio",
    "floristeria",
    "oficio-pro",
    "signal",
    "pallet-ross",
    "nuvolets",
  ]),
});

export type CreateUserLandingFormValues = z.infer<typeof createUserLandingFormSchema>;

export const createUserLandingSchema = createUserLandingFormSchema.extend({
  userId: z.uuid("ID de usuario inválido"),
});

export type CreateUserLandingValues = z.infer<typeof createUserLandingSchema>;

export const updateUserNameSchema = z.strictObject({
  userId: z.uuid("ID de usuario inválido"),
  name: z.string().trim().min(1, "El nombre es requerido").max(80),
});

export type UpdateUserNameValues = z.infer<typeof updateUserNameSchema>;

export const configureManualAccessSchema = z.strictObject({
  userId: z.uuid("ID de usuario inválido"),
  bookingManualAccess: z.boolean(),
  productsManualAccess: z.boolean(),
});

export type ConfigureManualAccessValues = z.infer<
  typeof configureManualAccessSchema
>;

export const deleteUserSchema = z.strictObject({
  userId: z.uuid("ID de usuario inválido"),
});

export type DeleteUserValues = z.infer<typeof deleteUserSchema>;
