import type { Expense, ExpenseFormValues } from "@/types/Expense";
import { numberRules } from "@/utilities/utils";
import {
  Button,
  CloseButton,
  Drawer,
  Field,
  Input,
  InputGroup,
  Kbd,
  Portal,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaCarAlt, FaGasPump } from "react-icons/fa";
import { TbCurrencyPeso } from "react-icons/tb";

interface Props {
  formID: string;
  title: string;
  expense: Expense;
  open: boolean;
  setOpen: (open) => void;
  onEditExpense: (data: Expense) => void;
}

const ExpenseDrawer = ({
  formID,
  title,
  expense,
  open,
  setOpen,
  onEditExpense,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormValues>({
    defaultValues: {
      date: expense.date,
      kmStart: String(expense.kmStart),
      kmEnd: String(expense.kmEnd),
      liters: String(expense.liters),
      gasPrice: String(expense.gasPrice),
    },
  });

  useEffect(() => {
    reset({
      date: expense.date,
      kmStart: String(expense.kmStart),
      kmEnd: String(expense.kmEnd),
      liters: String(expense.liters),
      gasPrice: String(expense.gasPrice),
    });
  }, [expense, open]);

  const onSubmit = (data: ExpenseFormValues) => {
    const expense: Expense = {
      id: data.id,
      date: data.date,
      kmStart: Number(data.kmStart),
      kmEnd: Number(data.kmEnd),
      liters: Number(data.liters),
      gasPrice: Number(data.gasPrice),
    };

    onEditExpense(expense);
  };

  return (
    <Drawer.Root
      size="md"
      open={open}
      onOpenChange={setOpen}
      closeOnEscape={true}
    >
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>{title}</Drawer.Title>
            </Drawer.Header>

            <Drawer.Body>
              Press the <Kbd>esc</Kbd> key to close the drawer.
              <form id={formID} onSubmit={handleSubmit(onSubmit)}>
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
                        defaultValue={
                          expense.kmEnd ? expense.kmEnd.toString() : ""
                        }
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
                        defaultValue={
                          expense.liters ? expense.liters.toString() : ""
                        }
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
                        defaultValue={
                          expense.gasPrice ? expense.gasPrice.toString() : ""
                        }
                      />
                    </InputGroup>
                    {errors.gasPrice && (
                      <Field.ErrorText>
                        {errors.gasPrice.message}
                      </Field.ErrorText>
                    )}
                  </Field.Root>
                </VStack>
              </form>
            </Drawer.Body>

            <Drawer.Footer>
              <Drawer.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Drawer.ActionTrigger>
              <Button type="submit" form={formID}>
                Save
              </Button>
            </Drawer.Footer>

            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default ExpenseDrawer;
