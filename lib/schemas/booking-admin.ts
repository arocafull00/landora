import { z } from "zod";
import { parseEurosToPriceCents } from "@/lib/service-price";

export const resourceIdSchema = z.uuid();
export const resourceIdsSchema = z.array(resourceIdSchema).max(200);

export const bookingServiceSchema = z.object({
  name: z.string().trim().min(1, "Introduce un nombre").max(80),
  durationMinutes: z.number().int().min(5).max(480),
  priceCents: z.number().int().min(0).max(99_999_999),
  bufferAfterMinutes: z.number().int().min(0).max(120),
  isActive: z.boolean(),
});

export const bookingServiceFormSchema = z
  .object({
    name: z.string().trim().min(1, "Introduce un nombre").max(80),
    durationMinutes: z
      .string()
      .regex(/^\d+$/, "Introduce una duración válida")
      .refine((value) => Number(value) >= 5 && Number(value) <= 480, {
        message: "La duración debe estar entre 5 y 480 minutos",
      }),
    priceEuros: z
      .string()
      .refine((value) => parseEurosToPriceCents(value) !== null, {
        message: "Introduce un precio válido",
      }),
    isActive: z.boolean(),
  })
  .transform(({ durationMinutes, priceEuros, ...values }) => ({
    ...values,
    durationMinutes: Number(durationMinutes),
    priceCents: parseEurosToPriceCents(priceEuros) ?? 0,
    bufferAfterMinutes: 0,
  }));

export const employeeNameSchema = z.string().trim().min(1).max(80);

export const employeeFormSchema = z.object({
  name: z.string().trim().min(1, "Introduce un nombre").max(80),
  isActive: z.boolean(),
});

export const employeeHoursSchema = z
  .array(
    z.object({
      dayOfWeek: z.number().int().min(0).max(6),
      isWorking: z.boolean(),
      startTime: z.string().regex(/^\d{2}:\d{2}$/),
      endTime: z.string().regex(/^\d{2}:\d{2}$/),
    }),
  )
  .max(7);

export const blockedPeriodSchema = z.object({
  employeeId: resourceIdSchema.nullable(),
  startsAt: z.iso.datetime(),
  endsAt: z.iso.datetime(),
  reason: z.string().trim().max(200),
});

export const blockedPeriodFormSchema = z
  .object({
    employeeId: z.union([resourceIdSchema, z.literal("global")]),
    startsAt: z.string().min(1, "Selecciona la fecha de inicio"),
    endsAt: z.string().min(1, "Selecciona la fecha de fin"),
    reason: z.string().trim().max(200, "El motivo no puede superar 200 caracteres"),
  })
  .refine(
    ({ startsAt, endsAt }) =>
      !Number.isNaN(Date.parse(startsAt)) &&
      !Number.isNaN(Date.parse(endsAt)) &&
      new Date(startsAt) < new Date(endsAt),
    {
      message: "La fecha de fin debe ser posterior al inicio",
      path: ["endsAt"],
    },
  );

export const bookingSettingsSchema = z.object({
  enabled: z.boolean(),
  timezone: z.string().trim().min(1),
  autoConfirmBookings: z.boolean(),
  minAdvanceHours: z.number().int().min(0).max(168),
  maxAdvanceDays: z.number().int().min(1).max(365),
  slotGranularityMinutes: z
    .number()
    .int()
    .refine((value) => [5, 10, 15, 30, 60].includes(value)),
  notificationEmail: z.email("Introduce un email válido").or(z.literal("")),
});

export type BookingServiceFormInput = z.input<typeof bookingServiceFormSchema>;
export type BookingServiceFormValues = z.output<typeof bookingServiceFormSchema>;
export type EmployeeFormValues = z.infer<typeof employeeFormSchema>;
export type BlockedPeriodFormValues = z.infer<typeof blockedPeriodFormSchema>;
export type BookingSettingsFormValues = z.infer<typeof bookingSettingsSchema>;
