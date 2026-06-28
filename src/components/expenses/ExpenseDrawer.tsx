import { Button, CloseButton, Drawer, Portal } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  formID: string;
  title: string;
  open: boolean;
  setOpen: (open) => void;
}

const ExpenseDrawer = ({ children, formID, title, open, setOpen }: Props) => {
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

            <Drawer.Body>{children}</Drawer.Body>

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
