import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface Props<T> {
  children?: ReactNode;
  placement?: "center" | "top" | "bottom";
  title?: string;
  action?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "cover" | "full";
  colorPalette?: "red" | "blue" | "green" | "yellow" | "gray" | "";
  showCancelButton?: boolean;
  item: T;
  open: boolean;
  setOpen: (open: { open: boolean }) => void;
  onConfirm: (item: T) => void;
}

const Modal = <T,>({
  children,
  placement = "center",
  title,
  action = "save",
  size = "md",
  colorPalette = "",
  showCancelButton = true,
  item,
  open,
  setOpen,
  onConfirm,
}: Props<T>) => {
  return (
    <Dialog.Root
      lazyMount
      open={open}
      onOpenChange={(e) => setOpen({ open: e.open })}
      placement={placement}
      size={size}
      motionPreset="slide-in-bottom"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            {title && (
              <Dialog.Header>
                <Dialog.Title>{title}</Dialog.Title>
              </Dialog.Header>
            )}
            {children && <Dialog.Body>{children}</Dialog.Body>}
            <Dialog.Footer>
              {showCancelButton && (
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
              )}
              <Button
                onClick={() => onConfirm(item)}
                textTransform="capitalize"
                colorPalette={colorPalette}
                variant="solid"
              >
                {action}
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default Modal;
