import { z } from "zod";

export const signalContactFieldsSchema = z.strictObject({
  name: z.string().trim().min(2, "Introduce tu nombre").max(100),
  company: z.string().trim().max(120),
  email: z.email("Introduce un email válido").max(254),
  phone: z.string().trim().max(40),
  message: z.string().trim().min(10, "Cuéntame un poco más sobre el caso").max(2000),
  honeypot: z.string().max(100).optional(),
});

export const signalContactSubmissionSchema = signalContactFieldsSchema.extend({
  slug: z.string().trim().min(1).max(100),
});

export type SignalContactFields = z.infer<typeof signalContactFieldsSchema>;
