import { useState } from "react";
import { Button, Container, Flex } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { columns } from "./utilities/utils";
import type { Expense } from "@/types/Expense";
import AddExpenseForm from "./components/expenses/AddForm";
import EditExpenseForm from "./components/expenses/EditForm";
import ExpenseTable from "./components/expenses/Table";
import ExpenseList from "./components/expenses/List";
import ExpenseDrawer from "./components/expenses/ExpenseDrawer";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  const [kmStart, setKmStart] = useState(0);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expense, setExpense] = useState<Expense | null>(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);

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
    setExpense(null);
    setOpenEdit(false);
  };

  const openDeleteModal = (expense: Expense) => {
    setExpense(expense);
    setOpenModal(true);
  };

  const deleteExpense = (expense: Expense) => {
    const filteredExpenses = [...expenses].filter((e) => e.id !== expense.id);
    setExpenses(filteredExpenses);
    setKmStart(Math.max(...filteredExpenses.map((e) => e.kmEnd), 0));
    setExpense(null);
    setOpenModal(false);
  };

  return (
    <>
      <Flex direction="column" minH="100dvh" bg="blackAlpha.50">
        <Navbar />

        <Flex
          as="main"
          pt={{ base: "50px", lg: "60px" }}
          direction="column"
          flex="1"
          justifyContent="space-between"
        >
          {/* Desktop layout */}
          <Container
            maxW="container.xl"
            display={{ base: "none", lg: "block" }}
          >
            <Flex
              direction="column"
              align="center"
              textAlign="center"
              py={5}
              gap={5}
            >
              <AddExpenseForm
                formID="add-expense-form-desktop"
                kmStart={kmStart}
                onSubmitExpense={addExpense}
              />
              <ExpenseTable
                columns={columns}
                items={expenses}
                onEdit={openEditForm}
                onDelete={openDeleteModal}
              />
            </Flex>
          </Container>

          {/* Mobile layout */}
          <Container
            maxW="container.xl"
            mt={5}
            display={{ base: "block", lg: "none" }}
          >
            <ExpenseList
              items={expenses}
              onEdit={openEditForm}
              onDelete={openDeleteModal}
            />
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
          action="Submit"
          title="Add Expense"
          open={openAdd}
          setOpen={(e) => setOpenAdd(e.open)}
        >
          <AddExpenseForm
            formID="add-expense-form"
            kmStart={kmStart}
            onSubmitExpense={addExpense}
          />
        </ExpenseDrawer>

        <Button
          display={{ base: "flex", lg: "none" }}
          alignItems="center"
          justifyContent="center"
          rounded="full"
          width="50px"
          height="50px"
          minW="50px"
          padding={0}
          bottom={5}
          right={5}
          position="fixed"
          zIndex={10}
          onClick={() => setOpenAdd(true)}
        >
          <IoMdAdd />
        </Button>

        {expense && (
          <Modal<Expense>
            open={openModal}
            setOpen={(e) => setOpenModal(e.open)}
            item={expense}
            title="Please confirm"
            size="sm"
            action="delete"
            colorPalette="red"
            onConfirm={deleteExpense}
          >
            You are about to delete this expense from{" "}
            <code>{expense.date.toLocaleDateString()}</code>. This action cannot
            be undone. Are you sure you want to proceed?
          </Modal>
        )}

        <Footer />
      </Flex>
    </>
  );
};

export default App;
