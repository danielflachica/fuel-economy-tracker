import { Box, Text } from "@chakra-ui/react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Box as="footer" p={4} mt="auto">
      <Text fontSize="xs" color="fg.subtle" textAlign="center">
        &copy; {year + " "}
        <a
          href="https://github.com/danielflachica/fuel-economy-tracker"
          target="_blank"
        >
          danielflachica
        </a>
      </Text>
    </Box>
  );
};

export default Footer;
