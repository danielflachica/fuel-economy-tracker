import type { Expense } from "@/types/Expense";
import { dec, num, ph } from "@/utilities/utils";
import {
  Button,
  ButtonGroup,
  Card,
  HStack,
  Separator,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa6";

interface Props {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (expense: Expense) => void;
}

const ExpenseCard = ({ expense, onEdit, onDelete }: Props) => {
  const distance = expense.kmEnd - expense.kmStart;
  const fuelEfficiency = distance / expense.liters;
  const totalFuelCost = expense.liters * expense.gasPrice;

  return (
    <Card.Root bg="bg.surface">
      <Card.Header>
        <HStack justifyContent="space-between" alignItems="flex-start" w="100%">
          <VStack
            alignItems="flex-start"
            fontSize="xs"
            fontWeight="bold"
            color="fg.subtle"
            gap="0"
            mb="-1"
          >
            <Text color="fg.muted">{expense.date.toDateString()}</Text>
            <HStack gap={0.5}>
              <Text>{num.format(expense.kmStart)}</Text>
              <Text>
                <FaArrowRight />
              </Text>
              <Text>{num.format(expense.kmEnd)} km</Text>
            </HStack>
          </VStack>
          <ButtonGroup gap={2} size="xs" variant="outline">
            <Button color="brand.300" onClick={() => onEdit(expense)}>
              Edit
            </Button>
            <Button color="red.400" onClick={() => onDelete(expense)}>
              Delete
            </Button>
          </ButtonGroup>
        </HStack>
      </Card.Header>
      <Card.Body>
        <HStack
          gap="4"
          w="100%"
          p={4}
          bg="bg.muted"
          rounded="md"
          justifyContent="space-between"
          alignItems="center"
        >
          <VStack alignItems="flex-start" gap={0} width="auto" bg="">
            <Text fontSize="2xs" fontWeight="bold" color="fg.muted">
              FUEL EFFICIENCY
            </Text>
            <HStack alignItems="flex-end" gap={1.5}>
              <Text
                fontSize="3xl"
                fontWeight="bold"
                color="brand.500"
                mb="-8px"
              >
                {dec.format(fuelEfficiency)}
              </Text>
              <Text fontSize="sm" fontWeight="bold" color="fg.subtle" mb="-1px">
                km/L
              </Text>
            </HStack>
          </VStack>
          <Separator orientation="vertical" height="14" />
          <VStack alignItems="flex-start" gap={2} width="auto" flex={1}>
            <HStack justifyContent="space-between" alignItems="center" w="100%">
              <Text fontSize="xs" fontWeight="bold" color="fg.muted">
                Distance
              </Text>
              <Text fontSize="xs" fontWeight="bold">
                {num.format(distance)} km
              </Text>
            </HStack>
            <HStack justifyContent="space-between" alignItems="center" w="100%">
              <Text fontSize="xs" fontWeight="bold" color="fg.muted">
                Liters
              </Text>
              <Text fontSize="xs" fontWeight="bold">
                {dec.format(expense.liters)} L
              </Text>
            </HStack>
          </VStack>
        </HStack>
      </Card.Body>
      <Card.Footer>
        <HStack justifyContent="space-between" w="100%">
          <VStack alignItems="flex-start" gap="0.25" width="auto">
            <Text fontSize="2xs" fontWeight="bold" color="fg.muted">
              GAS PRICE
            </Text>
            <Text fontSize="md" fontWeight="bold">
              {ph.format(expense.gasPrice)}/L
            </Text>
          </VStack>
          <VStack alignItems="flex-end" gap="0.25" width="auto">
            <Text fontSize="2xs" fontWeight="bold" color="fg.muted">
              TOTAL FUEL COST
            </Text>
            <Text fontSize="md" fontWeight="bold">
              {ph.format(totalFuelCost)}
            </Text>
          </VStack>
        </HStack>
      </Card.Footer>
    </Card.Root>
  );
};

export default ExpenseCard;
