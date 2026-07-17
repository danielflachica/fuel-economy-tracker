import { Field, Input, InputGroup, VStack } from "@chakra-ui/react";
import type { Expense, ExpenseFormValues } from "@/types/Expense";
import { numberRules } from "@/utilities/utils";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { FaCalendar, FaCarAlt, FaGasPump } from "react-icons/fa";
import { TbCurrencyPeso } from "react-icons/tb";

interface Props {
  formID: string;
  expense: Expense;
  onEditExpense: (data: Expense) => void;
}

const EditExpenseForm = ({ formID, expense, onEditExpense }: Props) => {
  const defaultExpense = useMemo(() => {
    return {
      id: expense.id,
      date: expense.date ? expense.date.toISOString().split("T")[0] : "",
      kmStart: String(expense.kmStart),
      kmEnd: String(expense.kmEnd),
      liters: String(expense.liters),
      gasPrice: String(expense.gasPrice),
    };
  }, [expense]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormValues>({
    defaultValues: defaultExpense,
  });

  const onUpdate = (data: ExpenseFormValues) => {
    onEditExpense({
      id: data.id,
      date: new Date(data.date),
      kmStart: Number(data.kmStart),
      kmEnd: Number(data.kmEnd),
      liters: Number(data.liters),
      gasPrice: Number(data.gasPrice),
    });
  };

  useEffect(() => {
    reset(defaultExpense);
  }, [expense]);

  return (
    <form id={formID} onSubmit={handleSubmit(onUpdate)}>
      <VStack>
        <Field.Root invalid={!!errors.date}>
          <Field.Label>
            Date
            <Field.RequiredIndicator />
          </Field.Label>
          <InputGroup startElement={<FaCalendar />}>
            <Input
              {...register("date", { required: "This field is required" })}
              variant="subtle"
              type="date"
            />
          </InputGroup>
          {errors.date && (
            <Field.ErrorText>{errors.date.message}</Field.ErrorText>
          )}
        </Field.Root>

        <Field.Root invalid={!!errors.kmStart}>
          <Field.Label>
            Kilometer Reading (Start) <Field.RequiredIndicator />
          </Field.Label>
          <InputGroup startElement={<FaCarAlt />}>
            <Input
              {...register("kmStart", numberRules)}
              variant="subtle"
              inputMode="decimal"
            />
          </InputGroup>
          {errors.kmStart && (
            <Field.ErrorText>{errors.kmStart.message}</Field.ErrorText>
          )}
        </Field.Root>

        <Field.Root invalid={!!errors.kmEnd}>
          <Field.Label>
            Kilometer Reading (End)
            <Field.RequiredIndicator />
          </Field.Label>
          <InputGroup startElement={<FaCarAlt />}>
            <Input
              {...register("kmEnd", numberRules)}
              variant="subtle"
              inputMode="decimal"
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
