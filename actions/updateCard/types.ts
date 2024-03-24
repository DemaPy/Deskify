import { Board, CardModel } from "@prisma/client";
import { z } from "zod";
import { ActionState } from "../../lib/createSafeAction";
import { UpdateCardSchema } from "./schema";


export type InputType = z.infer<typeof UpdateCardSchema>
export type ReturnType = ActionState<InputType, CardModel>
