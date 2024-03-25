import { CardModel, List } from "@prisma/client";
import { z } from "zod";
import { ActionState } from "../../lib/createSafeAction";
import { DeleteCardSchema } from "./schema";

export type InputType = z.infer<typeof DeleteCardSchema>;
export type ReturnType = ActionState<InputType, CardModel>;
