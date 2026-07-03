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
      h={{ base: "50px", lg: "60px" }}
      paddingX={{ base: 2, lg: 4 }}
      justifyContent={{ base: "center", lg: "space-between" }}
      alignItems="center"
      bg="bg.subtle"
      boxShadow="bottom-xs"
    >
      <Heading as="h1" marginLeft={2} fontSize={{ base: "lg", lg: "2xl" }}>
        Fuel Economy Tracker
      </Heading>
    </HStack>
  );
};

export default Navbar;
