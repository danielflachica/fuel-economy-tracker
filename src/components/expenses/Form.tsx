import {
  SimpleGrid,
  Input,
  InputGroup,
  Button,
  DatePicker,
  Portal,
  Group,
} from "@chakra-ui/react";
import { LuCalendar } from "react-icons/lu";
import { TbCurrencyPeso } from "react-icons/tb";
import { FaCarAlt, FaGasPump } from "react-icons/fa";

const ExpenseForm = () => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        // if (ref.current) onSearch(ref.current.value);
      }}
    >
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }} gap={4}>
        <InputGroup>
          <DatePicker.Root variant="subtle" placeholder="Date (mm/dd/yyyy)">
            <DatePicker.Label />
            <DatePicker.Control>
              <DatePicker.Input />
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
            // ref={ref}
            placeholder="Kilometers (End)"
            variant="subtle"
          />
        </InputGroup>
        <InputGroup startElement={<FaCarAlt />}>
          <Input
            // ref={ref}
            placeholder="Kilometers (Start)"
            variant="subtle"
          />
        </InputGroup>
        <InputGroup startElement={<FaGasPump />}>
          <Input
            // ref={ref}
            placeholder="Liters Consumed"
            variant="subtle"
          />
        </InputGroup>
        <Group attached w="full" maxW="sm">
          <InputGroup startElement={<TbCurrencyPeso />}>
            <Input
              // ref={ref}
              flex="1"
              placeholder="Gas Price/Liter"
              variant="subtle"
            />
          </InputGroup>
          <Button bg="bg.subtle" variant="subtle">
            Submit
          </Button>
        </Group>
      </SimpleGrid>
    </form>
  );
};

export default ExpenseForm;
