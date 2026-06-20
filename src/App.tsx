import {
  Button,
  CloseButton,
  Container,
  Drawer,
  Flex,
  Portal,
} from "@chakra-ui/react";
import type { Column } from "@/types/Column";
import type { Expense } from "@/types/Expense";
import AddExpenseForm from "./components/expenses/AddForm";
import ExpenseTable from "./components/expenses/Table";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";

const App = () => {
  const [kmStart, setKmStart] = useState(0);
  const [expenses, setExpenses] = useState<Expense[]>([]);
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

  const addExpense = (data: FieldValues) => {
    // Convert all string values to float or Date
    const { date, kmStart, kmEnd, liters, gasPrice } = Object.fromEntries(
      Object.entries(data).map(([key, value]) =>
        key === "date" ? [key, new Date(value)] : [key, parseFloat(value)]
      )
    );
    // TO-DO: Get ID from databse
    const id = Math.floor(Math.random() * 1000) + 1;

    const newExpense: Expense = {
      id,
      date,
      kmStart,
      kmEnd,
      liters,
      gasPrice,
    };

    setExpenses([...expenses, newExpense]);
    setKmStart(kmEnd);
  };

  const editExpense = (expense: Expense) => {
    console.log(expense);
  };

  const deleteExpense = (expense: Expense) => {
    setExpenses([...expenses].filter((e) => e.id !== expense.id));
    // setKmStart(
    //   expenses.findLast((e) => typeof e.kilometers.end === "number").kilometers
    //     .end
    // );
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
              <AddExpenseForm onSubmitExpense={addExpense} />
              <ExpenseTable
                columns={columns}
                items={expenses}
                onEdit={editExpense}
                onDelete={deleteExpense}
              />
            </Flex>
          </Container>
        </Flex>

        <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
          <Drawer.Trigger asChild>
            <Button variant="outline" size="sm">
              Open Drawer
            </Button>
          </Drawer.Trigger>
          <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content>
                <Drawer.Header>
                  <Drawer.Title>Drawer Title</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </Drawer.Body>
                <Drawer.Footer>
                  <Button variant="outline">Cancel</Button>
                  <Button>Save</Button>
                </Drawer.Footer>
                <Drawer.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Drawer.CloseTrigger>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>

        <Footer />
      </Flex>
    </>
  );
};

export default App;
