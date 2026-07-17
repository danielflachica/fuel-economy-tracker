import { useEffect, useMemo, useState } from "react";
import type { Expense, NewExpense } from "@/types/Expense";
import expenseService from "@/services/expenseService";

const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  // Recompute kmStart whenever expenses change
  const kmStart = useMemo(() => {
    return Math.max(...expenses.map((e) => e.kmEnd), 0);
  }, [expenses]);

  // Fetch expenses on first render
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    setLoading(true);
    setError(null);

    try {
      const expenses = await expenseService.getAll("expense_date");
      setExpenses(expenses);
    } catch (err) {
      console.error(err);
      setError("Could not fetch expenses. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expense: NewExpense) => {
    setLoading(true);
    setError(null);

    try {
      const newExpense = await expenseService.create(expense);
      setExpenses([newExpense, ...expenses]);
    } catch (err) {
      setError("Could not create expense. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const editExpense = async (expense: Expense) => {
    setLoading(true);
    setError(null);

    try {
      const updatedExpense = await expenseService.update(expense);
      const newExpenses = expenses.map((e) =>
        e.id === updatedExpense.id ? updatedExpense : e,
      );
      setExpenses(newExpenses);
    } catch (err) {
      setError("Could not update expense. Please try again later.");
      setExpenses(expenses);
    } finally {
      setLoading(false);
    }
  };

  const deleteExpense = async (expense: Expense) => {
    setLoading(true);
    setError(null);

    try {
      await expenseService.delete(expense.id);
      const filteredExpenses = [...expenses].filter((e) => e.id !== expense.id);
      setExpenses(filteredExpenses);
    } catch (err) {
      setError("Could not delete expense. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return {
    expenses,
    kmStart,
    error,
    setError,
    isLoading,
    addExpense,
    editExpense,
    deleteExpense,
  };
};

export default useExpenses;
