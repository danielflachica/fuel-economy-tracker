import { supabase } from "./supabase";
import type { Expense, ExpenseDatabaseRow } from "@/types/Expense";

// Helper functions to convert between the database representation of an expense and the application's representation.
const fromDB = (row: ExpenseDatabaseRow): Expense => {
  return {
    id: row.id,
    date: new Date(row.expense_date),
    kmStart: row.km_start,
    kmEnd: row.km_end,
    liters: row.liters_consumed,
    gasPrice: row.gas_price,
  };
};

// const toDB = (expense: Expense): ExpenseDatabaseRow => {
//   return {
//     id: expense.id,
//     expense_date: expense.date.toISOString(),
//     km_start: expense.kmStart,
//     km_end: expense.kmEnd,
//     liters_consumed: expense.liters,
//     gas_price: expense.gasPrice,
//   };
// };

export const getExpenses = async (): Promise<Expense[]> => {
  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .order("expense_date", { ascending: false });

  if (error) throw error;
  return data.map((row) => fromDB(row));
};
