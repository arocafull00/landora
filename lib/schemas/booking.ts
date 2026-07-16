import { z } from "zod";

export const bookingSlugSchema = z.string().trim().min(1).max(120);
export const bookingIdSchema = z.uuid();
export const bookingEmployeeIdSchema = z.union([z.uuid(), z.literal("any")]);
export const bookingDateSchema = z.iso.date();
export const bookingPublicTokenSchema = z
  .string()
  .trim()
  .min(32)
  .max(128)
  .regex(/^[A-Za-z0-9_-]+$/);

export const createBookingSchema = z.object({
  slug: bookingSlugSchema,
  serviceId: bookingIdSchema,
  employeeId: bookingEmployeeIdSchema,
  startsAt: z.iso.datetime(),
  customerName: z.string().trim().min(1).max(120),
  customerPhone: z.string().trim().min(5).max(30),
  customerEmail: z.email().optional().or(z.literal("")),
  notes: z.string().trim().max(500).optional(),
  turnstileToken: z.string().trim().min(1).max(2048),
  honeypot: z.string().max(200).optional(),
});

export const publicBookingServicesSchema = z.object({
  slug: bookingSlugSchema,
});

export const publicBookingEmployeesSchema = z.object({
  slug: bookingSlugSchema,
  serviceId: bookingIdSchema,
});

export const publicBookingSlotsSchema = z.object({
  slug: bookingSlugSchema,
  serviceId: bookingIdSchema,
  employeeId: bookingEmployeeIdSchema,
  date: bookingDateSchema,
});
