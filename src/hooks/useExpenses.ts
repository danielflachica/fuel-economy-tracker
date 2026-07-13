import { useEffect, useState } from "react";
import type { Expense } from "@/types/Expense";
import expenseService from "@/services/expenseService";

const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [kmStart, setKmStart] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    setLoading(true);
    setError(null);

    try {
      const expenses = await expenseService.getAll();
      setExpenses(expenses);
      setKmStart(Math.max(...expenses.map((e) => e.kmEnd), 0));
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Could not fetch expenses. Please try again later.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    expenses,
    setExpenses,
    kmStart,
    setKmStart,
    error,
    setError,
    isLoading,
    setLoading,
  };
};

export default useExpenses;
