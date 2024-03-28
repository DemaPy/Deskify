import { z } from "zod";
import { ActionState } from "../../lib/createSafeAction";
import { stripeSchema } from "./schema";

export type InputType = z.infer<typeof stripeSchema>;
export type ReturnType = ActionState<InputType, string>;
