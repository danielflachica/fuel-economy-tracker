import { Container, Flex } from "@chakra-ui/react";
import type { Column } from "@/types/Column";
import type { Expense } from "@/types/Expense";
import ExpenseForm from "./components/expenses/Form";
import ExpenseTable from "./components/expenses/Table";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
              <ExpenseForm />
              <ExpenseTable columns={columns} items={expenses} />
            </Flex>
          </Container>
        </Flex>

        <Footer />
      </Flex>
    </>
  );
};

export default App;
