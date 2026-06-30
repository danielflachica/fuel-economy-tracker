import { HStack, Heading } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <HStack
      as="header"
      position="fixed"
      top={0}
      right={0}
      left={0}
      zIndex={1}
      w="100%"
      h="60px"
      paddingX={{ base: 2, lg: 4 }}
      justifyContent="space-between"
      bg="bg.subtle"
      boxShadow="xs"
    >
      <Heading as="h1" marginLeft={2} fontSize="2xl">
        Fuel Expense Tracker
      </Heading>
    </HStack>
  );
};

export default Navbar;
