import type { Column } from "@/types/Column";
import type { Expense } from "@/types/Expense";
import { dec, num, ph } from "@/utilities/utils";
import { Button, HStack, Table } from "@chakra-ui/react";
import NoRecordsFound from "../NoRecordsFound";

interface Props {
  columns: Column[];
  items?: Expense[];
  onEdit: (item: Expense) => void;
  onDelete: (item: Expense) => void;
}

const ExpenseTable = ({ columns, items, onEdit, onDelete }: Props) => {
  if (!items || items.length === 0) return <NoRecordsFound />;

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
            <Table.Cell>{num.format(item.kmEnd)}</Table.Cell>
            <Table.Cell>{num.format(item.kmStart)}</Table.Cell>
            <Table.Cell>{num.format(item.kmEnd - item.kmStart)}</Table.Cell>
            <Table.Cell>{dec.format(item.liters)}</Table.Cell>
            <Table.Cell>
              {dec.format((item.kmEnd - item.kmStart) / item.liters)}
            </Table.Cell>
            <Table.Cell textAlign="end">{ph.format(item.gasPrice)}</Table.Cell>
            <Table.Cell textAlign="end">
              {ph.format(item.gasPrice * item.liters)}
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
