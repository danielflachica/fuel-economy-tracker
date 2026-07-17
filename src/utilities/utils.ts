import type { Column } from "@/types/Column";
import type { Expense } from "@/types/Expense";

export const skeletonCount = 3;

export const columns: Column[] = [
  { label: "Date", align: "start" },
  { label: "Km Start", align: "start" },
  { label: "Km End", align: "start" },
  { label: "Km", align: "start" },
  { label: "L", align: "start" },
  { label: "Km/L", align: "start" },
  { label: "Gas Price/L", align: "end" },
  { label: "Total Fuel Cost", align: "end" },
];

export const numberRules = {
  required: "This field is required",
  validate: (val: string) => {
    if (isNaN(Number(val))) return "Must be a number";
    if (Number(val) <= 0) return "Must be greater than 0";
    return true;
  },
};

export const ph = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const dec = new Intl.NumberFormat("en-PH", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const num = new Intl.NumberFormat("en-PH");

export const calcDistance = (expense: Expense): number => {
  return expense.kmEnd - expense.kmStart;
};

export const calcFuelEfficiency = (expense: Expense): number => {
  return calcDistance(expense) / expense.liters;
};

export const calcFuelCost = (expense: Expense): number => {
  return expense.gasPrice * expense.liters;
};
