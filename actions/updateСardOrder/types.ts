import {CardModel, List } from "@prisma/client";
import { z } from "zod";
import { ActionState } from "../../lib/createSafeAction";
import { UpdateСardOrder } from "./schema";


export type InputType = z.infer<typeof UpdateСardOrder>
export type ReturnType = ActionState<InputType, CardModel[]>
