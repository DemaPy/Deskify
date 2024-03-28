import { z } from "zod";
import { ActionState } from "../../lib/createSafeAction";
import { _stripeRedirect } from "./schema";

export type InputType = z.infer<typeof _stripeRedirect>;
export type ReturnType = ActionState<InputType, string>;
