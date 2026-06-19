import type { Column } from "@/types/Column";
import type { Expense } from "@/types/Expense";
import { Table, Text } from "@chakra-ui/react";

interface Props {
  columns: Column[];
  items?: Expense[];
}

const ExpenseTable = ({ columns, items }: Props) => {
  if (!items || items.length === 0) return <Text>No records found.</Text>;

  return (
    <Table.Root size="sm" variant="outline">
      <Table.Header>
        <Table.Row>
          {columns.map((col) => (
            <Table.ColumnHeader key={col.label} textAlign={col.align}>
              {col.label}
            </Table.ColumnHeader>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {items.map((item) => (
          <Table.Row key={item.id}>
            <Table.Cell>{item.date.toDateString()}</Table.Cell>
            <Table.Cell>{item.kilometers.end}</Table.Cell>
            <Table.Cell>{item.kilometers.start}</Table.Cell>
            <Table.Cell>
              {item.kilometers.end - item.kilometers.start}
            </Table.Cell>
            <Table.Cell>{item.liters}</Table.Cell>
            <Table.Cell>
              {(
                (item.kilometers.end - item.kilometers.start) /
                item.liters
              ).toFixed(2)}
            </Table.Cell>
            <Table.Cell textAlign="end">{item.gasPrice.toFixed(2)}</Table.Cell>
            <Table.Cell textAlign="end">
              {(item.gasPrice * item.liters).toFixed(2)}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default ExpenseTable;
