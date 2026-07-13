export interface Expense {
  id: number;
  date: Date;
  kmStart: number;
  kmEnd: number;
  liters: number;
  gasPrice: number;
}

export type NewExpense = Omit<Expense, "id">;

export interface ExpenseFormValues {
  id: number;
  date: string;
  kmStart: string;
  kmEnd: string;
  liters: string;
  gasPrice: string;
}

export interface ExpenseDatabaseRow {
  id: number;
  expense_date: string;
  km_start: number;
  km_end: number;
  liters_consumed: number;
  gas_price: number;
}

export type NewExpenseDatabaseRow = Omit<ExpenseDatabaseRow, "id">;
