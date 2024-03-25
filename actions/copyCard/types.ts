import { CardModel, List } from "@prisma/client";
import { z } from "zod";
import { ActionState } from "../../lib/createSafeAction";
import { CopyCardSchema } from "./schema";

export type InputType = z.infer<typeof CopyCardSchema>;
export type ReturnType = ActionState<InputType, CardModel>;
