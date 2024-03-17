import { z } from "zod";

export const UpdateBoardSchema = z.object({
  id: z.string(),
  title: z.string().min(3, {
    message: "Title too short",
  }),
});
