import { Text } from "@chakra-ui/react";

interface Props {
  message?: string;
}

const NoRecordsFound = ({ message = "No records found." }: Props) => {
  return (
    <Text color="fg.muted" fontSize="sm" mx="auto" textAlign="center">
      {message}
    </Text>
  );
};

export default NoRecordsFound;
