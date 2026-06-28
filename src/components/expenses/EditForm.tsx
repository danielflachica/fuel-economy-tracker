import { Field, Input, InputGroup, VStack } from "@chakra-ui/react";
import type { Expense, ExpenseFormValues } from "@/types/Expense";
import { numberRules } from "@/utilities/utils";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaCarAlt, FaGasPump } from "react-icons/fa";
import { TbCurrencyPeso } from "react-icons/tb";

interface Props {
  formID: string;
  expense: Expense;
  onEditExpense: (data: Expense) => void;
}

const EditExpenseForm = ({ formID, expense, onEditExpense }: Props) => {
  const defaultExpense = {
    id: expense.id,
    date: expense.date,
    kmStart: String(expense.kmStart),
    kmEnd: String(expense.kmEnd),
    liters: String(expense.liters),
    gasPrice: String(expense.gasPrice),
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormValues>({
    defaultValues: defaultExpense,
  });

  const onUpdate = (data: ExpenseFormValues) => {
    const expenseEntries = Object.entries(data).map(([key, value]) => [
      key,
      key === "id" || key === "date" ? value : Number(value),
    ]);
    const expense = Object.fromEntries(expenseEntries);
    onEditExpense(expense);
  };

  useEffect(() => {
    reset(defaultExpense);
  }, [expense]);

  return (
    <form id={formID} onSubmit={handleSubmit(onUpdate)}>
      <VStack>
        <Field.Root invalid={!!errors.kmEnd}>
          <Field.Label>
            Kilometer Reading <Field.RequiredIndicator />
          </Field.Label>
          <InputGroup startElement={<FaCarAlt />}>
            <Input
              {...register("kmEnd", numberRules)}
              variant="subtle"
              inputMode="decimal"
              defaultValue={expense.kmEnd ? expense.kmEnd.toString() : ""}
            />
          </InputGroup>
          {errors.kmEnd && (
            <Field.ErrorText>{errors.kmEnd.message}</Field.ErrorText>
          )}
        </Field.Root>

        <Field.Root invalid={!!errors.liters}>
          <Field.Label>
            Liters Consumed <Field.RequiredIndicator />
          </Field.Label>
          <InputGroup startElement={<FaGasPump />}>
            <Input
              {...register("liters", numberRules)}
              variant="subtle"
              inputMode="decimal"
              defaultValue={expense.liters ? expense.liters.toString() : ""}
            />
          </InputGroup>
          {errors.liters && (
            <Field.ErrorText>{errors.liters.message}</Field.ErrorText>
          )}
        </Field.Root>

        <Field.Root invalid={!!errors.gasPrice}>
          <Field.Label>
            Gas Price/Liter <Field.RequiredIndicator />
          </Field.Label>
          <InputGroup startElement={<TbCurrencyPeso />}>
            <Input
              {...register("gasPrice", numberRules)}
              variant="subtle"
              inputMode="decimal"
              defaultValue={expense.gasPrice ? expense.gasPrice.toString() : ""}
            />
          </InputGroup>
          {errors.gasPrice && (
            <Field.ErrorText>{errors.gasPrice.message}</Field.ErrorText>
          )}
        </Field.Root>
      </VStack>
    </form>
  );
};

export default EditExpenseForm;
