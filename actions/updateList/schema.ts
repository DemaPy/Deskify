import { z } from "zod";

export const UpdateList = z.object({
  id: z.string(),
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(3, {
      message: "Title too short",
    }),
  boardId: z.string(),
});
