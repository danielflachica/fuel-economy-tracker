import type { Expense } from "@/types/Expense";
import { SimpleGrid } from "@chakra-ui/react";
import ExpenseCard from "./Card";
import NoRecordsFound from "../NoRecordsFound";

interface Props {
  items: Expense[];
  onDelete: (expense: Expense) => void;
}

const ExpenseList = ({ items, onDelete }: Props) => {
  if (!items || items.length === 0) return <NoRecordsFound />;

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={5} w="100%">
      {items.map((item) => (
        <ExpenseCard key={item.id} expense={item} onDelete={onDelete} />
      ))}
    </SimpleGrid>
  );
};

export default ExpenseList;
