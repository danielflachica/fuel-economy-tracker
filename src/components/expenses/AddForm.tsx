import {
  SimpleGrid,
  Input,
  InputGroup,
  Button,
  DatePicker,
  Portal,
  parseDate,
  Field,
  Flex,
} from "@chakra-ui/react";
import { LuCalendar } from "react-icons/lu";
import { TbCurrencyPeso } from "react-icons/tb";
import { FaCarAlt, FaGasPump } from "react-icons/fa";
import { useForm } from "react-hook-form";
import type { Expense } from "@/types/Expense";

interface Props {
  onSubmitExpense: (data: Expense) => void;
}

const AddExpenseForm = ({ onSubmitExpense }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Expense>();
  const todayISO = new Date().toISOString().split("T")[0];
  const errorMsg = "This field is required.";

  const onSubmit = (data: Expense) => {
    onSubmitExpense(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
        gap={4}
        alignItems="start"
      >
        <Field.Root invalid={!!errors.date}>
          <DatePicker.Root
            defaultValue={[parseDate(todayISO)]}
            placeholder="Date (mm/dd/yyyy)"
            variant="subtle"
            invalid={!!errors.date}
          >
            <DatePicker.Control>
              <DatePicker.Input
                {...register("date", {
                  required: errorMsg,
                  valueAsDate: true,
                })}
              />
              <DatePicker.IndicatorGroup>
                <DatePicker.Trigger>
                  <LuCalendar />
                </DatePicker.Trigger>
              </DatePicker.IndicatorGroup>
            </DatePicker.Control>
            <Portal>
              <DatePicker.Positioner>
                <DatePicker.Content>
                  <DatePicker.View view="day">
                    <DatePicker.Header />
                    <DatePicker.DayTable />
                  </DatePicker.View>
                  <DatePicker.View view="month">
                    <DatePicker.Header />
                    <DatePicker.MonthTable />
                  </DatePicker.View>
                  <DatePicker.View view="year">
                    <DatePicker.Header />
                    <DatePicker.YearTable />
                  </DatePicker.View>
                </DatePicker.Content>
              </DatePicker.Positioner>
            </Portal>
          </DatePicker.Root>
          {errors.date?.type === "required" && (
            <Field.ErrorText>{errors.date.message}</Field.ErrorText>
          )}
        </Field.Root>

        <Field.Root invalid={!!errors.kmEnd}>
          <InputGroup startElement={<FaCarAlt />}>
            <Input
              {...register("kmEnd", {
                required: errorMsg,
                valueAsNumber: true,
              })}
              placeholder="Kilometers (End)"
              variant="subtle"
            />
          </InputGroup>
          {errors.kmEnd?.type === "required" && (
            <Field.ErrorText>{errors.kmEnd.message}</Field.ErrorText>
          )}
        </Field.Root>

        <Field.Root invalid={!!errors.kmStart}>
          <InputGroup startElement={<FaCarAlt />}>
            <Input
              {...register("kmStart", {
                required: errorMsg,
                valueAsNumber: true,
              })}
              placeholder="Kilometers (Start)"
              variant="subtle"
            />
          </InputGroup>
          {errors.kmStart?.type === "required" && (
            <Field.ErrorText>{errors.kmStart.message}</Field.ErrorText>
          )}
        </Field.Root>

        <Field.Root invalid={!!errors.liters}>
          <InputGroup startElement={<FaGasPump />}>
            <Input
              {...register("liters", {
                required: errorMsg,
                valueAsNumber: true,
              })}
              placeholder="Liters Consumed"
              variant="subtle"
            />
          </InputGroup>
          {errors.liters?.type === "required" && (
            <Field.ErrorText>{errors.liters.message}</Field.ErrorText>
          )}
        </Field.Root>

        <Flex alignItems="flex-start" gap={0}>
          <Field.Root invalid={!!errors.gasPrice} flex="1">
            <InputGroup startElement={<TbCurrencyPeso />}>
              <Input
                {...register("gasPrice", {
                  required: errorMsg,
                  valueAsNumber: true,
                })}
                placeholder="Gas Price/Liter"
                variant="subtle"
                borderRightRadius={0}
              />
            </InputGroup>
            {errors.gasPrice && (
              <Field.ErrorText>{errors.gasPrice.message}</Field.ErrorText>
            )}
          </Field.Root>
          <Button
            type="submit"
            bg="bg.subtle"
            variant="subtle"
            borderLeftRadius={0}
            flexShrink={0}
          >
            Submit
          </Button>
        </Flex>
      </SimpleGrid>
    </form>
  );
};

export default AddExpenseForm;
