import { useState } from "react";
import { Container, Flex } from "@chakra-ui/react";
import type { Column } from "@/types/Column";
import type { Expense } from "@/types/Expense";
import AddExpenseForm from "./components/expenses/AddForm";
import EditExpenseForm from "./components/expenses/EditForm";
import ExpenseTable from "./components/expenses/Table";
import ExpenseDrawer from "./components/expenses/ExpenseDrawer";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  const [kmStart, setKmStart] = useState(0);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expense, setExpense] = useState<Expense | null>(null);
  const [open, setOpen] = useState(false);

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

  const addExpense = (data: Expense) => {
    setExpenses([...expenses, data]);
    setKmStart(data.kmEnd || 0);
  };

  const openEditForm = (expense: Expense) => {
    setExpense(expense);
    setOpen(true);
  };

  const editExpense = (data: Expense) => {
    const newExpenses = expenses.map((expense) =>
      expense.id == data.id ? data : expense
    );
    setExpenses(newExpenses);
    setOpen(false);
  };

  const deleteExpense = (expense: Expense) => {
    const filteredExpenses = [...expenses].filter((e) => e.id !== expense.id);
    setExpenses(filteredExpenses);
    setKmStart(Math.max(...filteredExpenses.map((e) => e.kmEnd), 0));
  };

  return (
    <>
      <Flex direction="column" minH="100dvh">
        <Navbar />

        <Flex
          as="main"
          direction="column"
          flex="1"
          justifyContent="space-between"
        >
          <Container maxW="container.xl">
            <Flex
              direction="column"
              align="center"
              textAlign="center"
              py={5}
              gap={8}
            >
              <AddExpenseForm kmStart={kmStart} onSubmitExpense={addExpense} />
              <ExpenseTable
                columns={columns}
                items={expenses}
                onEdit={openEditForm}
                onDelete={deleteExpense}
              />
            </Flex>
          </Container>
        </Flex>

        {expense && (
          <ExpenseDrawer
            formID="edit-expense-form"
            title="Edit Expense"
            open={open}
            setOpen={(e) => setOpen(e.open)}
          >
            <EditExpenseForm
              formID="edit-expense-form"
              expense={expense}
              onEditExpense={editExpense}
            />
          </ExpenseDrawer>
        )}

        <Footer />
      </Flex>
    </>
  );
};

export default App;
