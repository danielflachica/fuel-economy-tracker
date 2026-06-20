import type { Column } from "@/types/Column";
import type { Expense } from "@/types/Expense";
import { Button, HStack, Table, Text } from "@chakra-ui/react";

interface Props {
  columns: Column[];
  items?: Expense[];
  onEdit: (item: Expense) => void;
  onDelete: (item: Expense) => void;
}

const ExpenseTable = ({ columns, items, onEdit, onDelete }: Props) => {
  if (!items || items.length === 0)
    return (
      <Text color="fg.muted" fontSize="sm">
        No records found.
      </Text>
    );

  return (
    <Table.Root size="sm" variant="outline">
      <Table.Header>
        <Table.Row>
          {columns.map((col) => (
            <Table.ColumnHeader key={col.label} textAlign={col.align}>
              {col.label}
            </Table.ColumnHeader>
          ))}
          <Table.ColumnHeader></Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {items.map((item) => (
          <Table.Row key={item.id}>
            <Table.Cell>{item.date.toDateString()}</Table.Cell>
            <Table.Cell>{item.kmEnd}</Table.Cell>
            <Table.Cell>{item.kmStart}</Table.Cell>
            <Table.Cell>{item.kmEnd - item.kmStart}</Table.Cell>
            <Table.Cell>{item.liters}</Table.Cell>
            <Table.Cell>
              {((item.kmEnd - item.kmStart) / item.liters).toFixed(2)}
            </Table.Cell>
            <Table.Cell textAlign="end">₱{item.gasPrice.toFixed(2)}</Table.Cell>
            <Table.Cell textAlign="end">
              ₱{(item.gasPrice * item.liters).toFixed(2)}
            </Table.Cell>
            <Table.Cell>
              <HStack justify="flex-end">
                <Button
                  type="button"
                  colorPalette="blue"
                  size="xs"
                  variant="ghost"
                  onClick={() => onEdit(item)}
                >
                  Edit
                </Button>
                <Button
                  type="button"
                  colorPalette="red"
                  size="xs"
                  variant="ghost"
                  onClick={() => onDelete(item)}
                >
                  Delete
                </Button>
              </HStack>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default ExpenseTable;
