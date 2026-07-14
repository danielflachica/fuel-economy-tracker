import { useEffect, useState } from "react";
import { Button, Container, Flex, For, SimpleGrid } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { columns, skeletonCount } from "./utilities/utils";
import type { Expense, NewExpense } from "@/types/Expense";
import expenseService from "./services/expenseService";
import useExpenses from "./hooks/useExpenses";
import AddExpenseForm from "./components/expenses/AddForm";
import EditExpenseForm from "./components/expenses/EditForm";
import ExpenseTable from "./components/expenses/Table";
import ExpenseList from "./components/expenses/List";
import ExpenseDrawer from "./components/expenses/ExpenseDrawer";
import SkeletonCard from "./components/SkeletonCard";
import SkeletonTable from "./components/SkeletonTable";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  const {
    expenses,
    setExpenses,
    kmStart,
    setKmStart,
    error,
    setError,
    isLoading,
    setLoading,
  } = useExpenses();
  const [expense, setExpense] = useState<Expense | null>(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openError, setOpenError] = useState(false);

  const addExpense = async (expense: NewExpense) => {
    setLoading(true);
    try {
      const newExpense = await expenseService.create(expense);
      setExpenses([newExpense, ...expenses]);
      setKmStart(newExpense.kmEnd || 0);
      setLoading(false);
      setOpenAdd(false);
    } catch (err) {
      setError("Could not create expense. Please try again later.");
      setLoading(false);
      setOpenAdd(false);
    }
  };

  const openEditForm = (expense: Expense) => {
    setExpense(expense);
    setOpenEdit(true);
  };

  const editExpense = async (data: Expense) => {
    setLoading(true);
    try {
      const updatedExpense = await expenseService.update(data);
      const newExpenses = expenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense,
      );
      setExpenses(newExpenses);
      setExpense(null);
      setLoading(false);
      setOpenEdit(false);
    } catch (err) {
      setError("Could not update expense. Please try again later.");
      setExpenses(expenses);
      setExpense(null);
      setLoading(false);
      setOpenEdit(false);
    }
  };

  const openDeleteModal = (expense: Expense) => {
    setExpense(expense);
    setOpenModal(true);
  };

  const deleteExpense = async (expense: Expense) => {
    setLoading(true);
    try {
      await expenseService.delete(expense.id);
      const filteredExpenses = [...expenses].filter((e) => e.id !== expense.id);
      setExpenses(filteredExpenses);
      setKmStart(Math.max(...filteredExpenses.map((e) => e.kmEnd), 0));
      setExpense(null);
      setOpenModal(false);
      setLoading(false);
    } catch (err) {
      setError("Could not delete expense. Please try again later.");
      setExpense(null);
      setOpenModal(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) setOpenError(true);
  }, [error]);

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
                isLoading={isLoading}
                onSubmitExpense={addExpense}
              />
              {isLoading && <SkeletonTable rows={skeletonCount * 2} />}
              {expenses && !isLoading && (
                <ExpenseTable
                  columns={columns}
                  items={expenses}
                  onEdit={openEditForm}
                  onDelete={openDeleteModal}
                />
              )}
            </Flex>
          </Container>

          {/* Mobile layout */}
          <Container
            maxW="container.xl"
            mt={5}
            display={{ base: "block", lg: "none" }}
          >
            {isLoading && (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={5} w="100%">
                <For
                  each={Array(skeletonCount).fill(null)}
                  fallback={<SkeletonCard />}
                >
                  {(_, index) => <SkeletonCard key={index} />}
                </For>
              </SimpleGrid>
            )}
            {expenses && !isLoading && (
              <ExpenseList
                items={expenses}
                onEdit={openEditForm}
                onDelete={openDeleteModal}
              />
            )}
          </Container>
        </Flex>

        {expense && (
          <ExpenseDrawer
            formID="edit-expense-form"
            title="Edit Expense"
            isLoading={isLoading}
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
          isLoading={isLoading}
          open={openAdd}
          setOpen={(e) => setOpenAdd(e.open)}
        >
          <AddExpenseForm
            formID="add-expense-form"
            kmStart={kmStart}
            isLoading={isLoading}
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
          colorPalette="brand"
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

        {error && (
          <Modal
            open={openError}
            setOpen={(e) => setOpenError(e.open)}
            item={null}
            title="Error"
            size="sm"
            action="close"
            colorPalette="red"
            showCancelButton={false}
            onConfirm={() => {
              setError(null);
              setOpenError(false);
            }}
          >
            {error}
          </Modal>
        )}

        <Footer />
      </Flex>
    </>
  );
};

export default App;
