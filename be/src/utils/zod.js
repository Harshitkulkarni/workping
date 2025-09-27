import { z } from "zod";

export const userValidationSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(6, "password should be of min 6 char")
    .max(20, "password must  be below 20 char"),
  photoUrl: z.string(),
  phone: z
    .number()
    .min(9, "give the correct phone number")
    .max(11, "give the correct phone number"),
  role: z.enum(["admin", "manager", "employee"]),
  type: z.enum(["developer", "tester"]),
});
