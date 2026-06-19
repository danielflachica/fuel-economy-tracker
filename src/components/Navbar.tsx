import { HStack, Heading } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <HStack as="header" p={4} pb={0} justifyContent="space-between">
      <Heading as="h1" marginLeft={2} fontSize="2xl">
        Fuel Expense Tracker
      </Heading>
    </HStack>
  );
};

export default Navbar;
