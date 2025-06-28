// eventSchema.ts
import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  location: z.string().min(1, "Location is required"),
  date: z
    .string()
    .refine((val) => new Date(val) > new Date(), {
      message: "Date must be in the future",
    }),
});

export type EventFormData = z.infer<typeof eventSchema>;
