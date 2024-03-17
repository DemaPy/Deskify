import { Board } from "@prisma/client";
import { z } from "zod";
import { ActionState } from "../../lib/createSafeAction";
import { UpdateBoardSchema } from "./schema";


export type InputType = z.infer<typeof UpdateBoardSchema>
export type ReturnType = ActionState<InputType, Board>
