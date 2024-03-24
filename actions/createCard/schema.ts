import { z } from "zod";

export const CreateCard = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    })
    .min(3, {
      message: "Title is too short",
    }),
  listId: z.string({
    required_error: "List Id is required",
    invalid_type_error: "List Id is required",
  }),
});
