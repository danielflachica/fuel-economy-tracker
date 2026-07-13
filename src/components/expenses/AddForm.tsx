import {
  SimpleGrid,
  Input,
  InputGroup,
  Button,
  Field,
  Flex,
} from "@chakra-ui/react";
import { TbCurrencyPeso } from "react-icons/tb";
import { FaCarAlt, FaGasPump } from "react-icons/fa";
import { useForm } from "react-hook-form";
import type { NewExpense, ExpenseFormValues } from "@/types/Expense";
import { useEffect } from "react";
import { numberRules } from "@/utilities/utils";

interface Props {
  formID: string;
  kmStart: number;
  isLoading: boolean;
  onSubmitExpense: (data: NewExpense) => void;
}

const AddExpenseForm = ({
  formID,
  kmStart,
  isLoading = false,
  onSubmitExpense,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormValues>({
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      kmStart: String(kmStart),
      kmEnd: "",
      liters: "",
      gasPrice: "",
    },
  });

  useEffect(() => {
    reset((formValues) => ({
      ...formValues,
      kmStart: String(kmStart),
    }));
  }, [kmStart]);

  const onSubmit = (data: ExpenseFormValues) => {
    const newExpense: NewExpense = {
      date: new Date(data.date),
      kmStart: Number(data.kmStart),
      kmEnd: Number(data.kmEnd),
      liters: Number(data.liters),
      gasPrice: Number(data.gasPrice),
    };

    onSubmitExpense(newExpense);

    reset({
      date: new Date().toISOString().split("T")[0],
      kmStart: String(data.kmEnd), // next kmStart = submitted kmEnd
      kmEnd: "",
      liters: "",
      gasPrice: "",
    });
  };

  return (
    <form id={formID} onSubmit={handleSubmit(onSubmit)}>
      <SimpleGrid columns={{ base: 1, lg: 3 }} gap={4} alignItems="start">
        <Field.Root invalid={!!errors.kmEnd}>
          <InputGroup startElement={<FaCarAlt />}>
            <Input
              {...register("kmEnd", numberRules)}
              placeholder="Kilometer Reading"
              variant="subtle"
              inputMode="decimal"
            />
          </InputGroup>
          {errors.kmEnd && (
            <Field.ErrorText>{errors.kmEnd.message}</Field.ErrorText>
          )}
        </Field.Root>

        <Field.Root invalid={!!errors.liters}>
          <InputGroup startElement={<FaGasPump />}>
            <Input
              {...register("liters", numberRules)}
              placeholder="Liters Consumed"
              variant="subtle"
              inputMode="decimal"
            />
          </InputGroup>
          {errors.liters && (
            <Field.ErrorText>{errors.liters.message}</Field.ErrorText>
          )}
        </Field.Root>

        <Flex alignItems="flex-start" gap={0}>
          <Field.Root invalid={!!errors.gasPrice} flex="1">
            <InputGroup startElement={<TbCurrencyPeso />}>
              <Input
                {...register("gasPrice", numberRules)}
                borderRightRadius={{ base: "md", lg: 0 }}
                placeholder="Gas Price/Liter"
                variant="subtle"
                inputMode="decimal"
              />
            </InputGroup>
            {errors.gasPrice && (
              <Field.ErrorText>{errors.gasPrice.message}</Field.ErrorText>
            )}
          </Field.Root>
          <Button
            type="submit"
            colorPalette="brand"
            variant="solid"
            borderLeftRadius={{ base: "md", lg: 0 }}
            flexShrink={0}
            display={{ base: "none", lg: "flex" }}
            loading={isLoading}
          >
            Submit
          </Button>
        </Flex>
      </SimpleGrid>
    </form>
  );
};

export default AddExpenseForm;
