import { EmptyState, VStack } from "@chakra-ui/react";
import { FaCarAlt } from "react-icons/fa";

interface Props {
  title?: string;
  message?: string;
}

const NoRecordsFound = ({
  title = "Ready to hit the road?",
  message = "No records found. Add an expense to get started.",
}: Props) => {
  return (
    <EmptyState.Root mt="-2em">
      <EmptyState.Content>
        <EmptyState.Indicator>
          <FaCarAlt />
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title>{title}</EmptyState.Title>
          <EmptyState.Description>{message}</EmptyState.Description>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
};

export default NoRecordsFound;
