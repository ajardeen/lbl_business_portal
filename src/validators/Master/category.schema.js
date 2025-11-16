import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().optional(),
  sortOrder: z
    .number({
      required_error: "Sort order is required",
      invalid_type_error: "Sort order must be a number",
    })
    .min(1, "Minimum value is 1"),
  status: z.enum(["active", "inactive"]),
});
