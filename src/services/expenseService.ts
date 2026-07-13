import type {
  Expense,
  NewExpense,
  ExpenseDatabaseRow,
  NewExpenseDatabaseRow,
} from "@/types/Expense";
import createSupabaseService from "./supabaseService";

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

const toDB = (expense: NewExpense): NewExpenseDatabaseRow => {
  return {
    expense_date: expense.date.toISOString(),
    km_start: expense.kmStart,
    km_end: expense.kmEnd,
    liters_consumed: expense.liters,
    gas_price: expense.gasPrice,
  };
};

export default createSupabaseService("expenses", fromDB, toDB);
