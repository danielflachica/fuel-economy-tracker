import { z } from "zod";

const numberField = (msg = "Must be a number.") =>
  z.coerce
    .number()
    .refine((val) => !isNaN(val), { message: msg })
    .refine((val) => val > 0, { message: "Must be greater than 0." });

export const ExpenseSchema = z.object({
  id: z.number(),
  date: z.coerce
    .date()
    .refine((val) => !isNaN(val.getTime()), {
      message: "Must be a valid date.",
    })
    .refine(
      (val) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return val >= today;
      },
      { message: "Date cannot be before today." }
    ),
  kmStart: numberField(),
  kmEnd: numberField(),
  liters: numberField(),
  gasPrice: numberField(),
});

// Derive the TypeScript type from the schema — no need for a separate interface
export type Expense = z.infer<typeof ExpenseSchema>;
