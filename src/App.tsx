import type { Expense } from "@/types/Expense";
import ExpenseTable from "./components/ExpenseTable";
import type { Column } from "./types/Column";

const App = () => {
  const expenses: Expense[] = [
    {
      id: 1,
      date: new Date(),
      kilometers: {
        start: 0,
        end: 1000,
      },
      liters: 27,
      gasPrice: 2300,
    },
  ];
  const columns: Column[] = [
    { label: "Date", align: "start" },
    { label: "Km End", align: "start" },
    { label: "Km Start", align: "start" },
    { label: "Km", align: "start" },
    { label: "L", align: "start" },
    { label: "Km/L", align: "start" },
    { label: "Gas Price/L", align: "end" },
    { label: "Total Fuel Cost", align: "end" },
  ];

  return <ExpenseTable columns={columns} items={expenses} />;
};

export default App;
