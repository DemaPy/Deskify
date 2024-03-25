import { z } from "zod";

export const UpdateCardSchema = z.object({
  id: z.string(),
  description: z.optional(
    z
      .string({
        required_error: "Description is required",
        invalid_type_error: "Description is required",
      })
      .min(3, {
        message: "Minimum value is 3",
      })
  ),
  title: z.optional(
    z.string().min(3, {
      message: "Title too short",
    })
  ),
  boardId: z.string(),
});
