import {z} from "zod"

export const loginSchema = z.object({
  email: z.string().email("Invalid email").trim(),
  password: z.string().min(6, "Enter Valid Password"),
});

export type LoginData = z.infer<typeof loginSchema>;