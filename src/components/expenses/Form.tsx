import {
  SimpleGrid,
  Input,
  InputGroup,
  Button,
  DatePicker,
  Portal,
  Group,
  parseDate,
} from "@chakra-ui/react";
import { LuCalendar } from "react-icons/lu";
import { TbCurrencyPeso } from "react-icons/tb";
import { FaCarAlt, FaGasPump } from "react-icons/fa";
import { useForm, type FieldValues } from "react-hook-form";

interface Props {
  onSubmitExpense: (data: FieldValues) => void;
}

const ExpenseForm = ({ onSubmitExpense }: Props) => {
  const { register, handleSubmit, reset } = useForm();
  const todayISO = new Date().toISOString().split("T")[0];

  const onSubmit = (data: FieldValues) => {
    onSubmitExpense(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }} gap={4}>
        <InputGroup>
          <DatePicker.Root
            defaultValue={[parseDate(todayISO)]}
            placeholder="Date (mm/dd/yyyy)"
            variant="subtle"
          >
            <DatePicker.Label />
            <DatePicker.Control>
              <DatePicker.Input {...register("date")} />
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
        </InputGroup>

        <InputGroup startElement={<FaCarAlt />}>
          <Input
            {...register("kmEnd")}
            placeholder="Kilometers (End)"
            variant="subtle"
          />
        </InputGroup>

        <InputGroup startElement={<FaCarAlt />}>
          <Input
            {...register("kmStart")}
            placeholder="Kilometers (Start)"
            variant="subtle"
          />
        </InputGroup>

        <InputGroup startElement={<FaGasPump />}>
          <Input
            {...register("liters")}
            placeholder="Liters Consumed"
            variant="subtle"
          />
        </InputGroup>

        <Group attached w="full" maxW="sm">
          <InputGroup startElement={<TbCurrencyPeso />}>
            <Input
              {...register("gasPrice")}
              flex="1"
              placeholder="Gas Price/Liter"
              variant="subtle"
            />
          </InputGroup>
          <Button type="submit" bg="bg.subtle" variant="subtle">
            Submit
          </Button>
        </Group>
      </SimpleGrid>
    </form>
  );
};

export default ExpenseForm;
