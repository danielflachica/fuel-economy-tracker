import { Box, Text } from "@chakra-ui/react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Box as="footer" p={4} mt="auto">
      <Text fontSize="xs" opacity="65%" textAlign="center">
        &copy; {year + " "}
        <a
          href="https://github.com/danielflachica/wordle-clone"
          target="_blank"
        >
          danielflachica
        </a>
      </Text>
    </Box>
  );
};

export default Footer;
