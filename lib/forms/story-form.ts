import { z } from "zod";

export const storyFormSchema = z.object({
  statement: z.string(),
});

export type StoryFormValues = z.infer<typeof storyFormSchema>;
