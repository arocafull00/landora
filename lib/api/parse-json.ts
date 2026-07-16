import "server-only";

import type { z } from "zod";

export async function parseJsonBody<TSchema extends z.ZodType>(
  request: Request,
  schema: TSchema,
): Promise<
  | { success: true; data: z.output<TSchema> }
  | { success: false; response: Response }
> {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return {
      success: false,
      response: Response.json(
        { error: "Invalid request body" },
        { status: 400 },
      ),
    };
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return {
      success: false,
      response: Response.json(
        { error: "Invalid request body" },
        { status: 400 },
      ),
    };
  }

  return { success: true, data: parsed.data };
}
