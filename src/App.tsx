import { useState } from "react";
import { Button, Container, Flex } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
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
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

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
    setOpenAdd(false);
  };

  const openEditForm = (expense: Expense) => {
    setExpense(expense);
    setOpenEdit(true);
  };

  const editExpense = (data: Expense) => {
    const newExpenses = expenses.map((expense) =>
      expense.id == data.id ? data : expense
    );
    setExpenses(newExpenses);
    setOpenEdit(false);
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
          <Container
            maxW="container.xl"
            display={{ base: "none", lg: "block" }}
          >
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
            open={openEdit}
            setOpen={(e) => setOpenEdit(e.open)}
          >
            <EditExpenseForm
              formID="edit-expense-form"
              expense={expense}
              onEditExpense={editExpense}
            />
          </ExpenseDrawer>
        )}

        <ExpenseDrawer
          formID="add-expense-form"
          title="Add Expense"
          open={openAdd}
          setOpen={(e) => setOpenAdd(e.open)}
        >
          <AddExpenseForm kmStart={kmStart} onSubmitExpense={addExpense} />
        </ExpenseDrawer>

        <Button
          display={{ base: "block", lg: "none" }}
          rounded="full"
          width="50px"
          height="50px"
          bottom={5}
          right={5}
          position="fixed"
          onClick={() => setOpenAdd(true)}
        >
          <IoMdAdd />
        </Button>

        <Footer />
      </Flex>
    </>
  );
};

export default App;
