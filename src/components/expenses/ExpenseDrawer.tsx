import { Button, CloseButton, Drawer, Portal } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  formID: string;
  action?: string;
  title: string;
  open: boolean;
  setOpen: (open: any) => void;
}

const ExpenseDrawer = ({
  children,
  formID,
  action = "Save",
  title,
  open,
  setOpen,
}: Props) => {
  return (
    <Drawer.Root
      size="xs"
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
                {action}
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
