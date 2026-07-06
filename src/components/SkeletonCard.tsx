import { Box, HStack, Skeleton, Stack } from "@chakra-ui/react";

const SkeletonCard = () => {
  return (
    <Stack
      width="full"
      gap={6}
      p={6}
      bg="bg.subtle"
      border="0.5px solid"
      borderColor="bg.emphasized"
      borderRadius="md"
    >
      <HStack
        width="full"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box width="45%" gap={2} display="flex" flexDirection="column">
          <Skeleton bg="gray.subtle" height="10px" width="60%" />
          <Skeleton bg="gray.subtle" height="10px" width="80%" />
        </Box>
        <HStack gap={2}>
          <Skeleton bg="gray.subtle" height="32px" width="45px" />
          <Skeleton bg="gray.subtle" height="32px" width="60px" />
        </HStack>
      </HStack>

      <Skeleton bg="gray.subtle" height="88px" />

      <HStack width="full" justifyContent="space-between" alignItems="flex-end">
        <Box width="35%" gap={2} display="flex" flexDirection="column">
          <Skeleton bg="gray.subtle" height="10px" width="60%" />
          <Skeleton bg="gray.subtle" height="20px" width="80%" />
        </Box>
        <Box
          width="35%"
          display="flex"
          flexDirection="column"
          alignItems="flex-end"
          gap={2}
        >
          <Skeleton bg="gray.subtle" height="10px" width="80%" />
          <Skeleton bg="gray.subtle" height="20px" width="60%" />
        </Box>
      </HStack>
    </Stack>
  );
};

export default SkeletonCard;
