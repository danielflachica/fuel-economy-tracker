import { Box, Flex, For, Skeleton, VStack } from "@chakra-ui/react";

interface Props {
  rows?: number;
}

const SkeletonTable = ({ rows = 1 }: Props) => {
  return (
    <>
      <Flex direction="column" width="full">
        <Box width="full" px={2} py={4} bg="bg.muted" borderWidth="1px">
          <Skeleton bg="gray.subtle" height="16px" width="full" />
        </Box>
        <Box width="full" px={2} py={6} borderWidth="1px" borderTop="none">
          <VStack width="full" gap={6}>
            <For each={Array(rows).fill(null)}>
              {(_, rowIndex) => (
                <Skeleton
                  key={rowIndex}
                  bg="bg.muted"
                  height="16px"
                  width="full"
                />
              )}
            </For>
          </VStack>
        </Box>
      </Flex>
    </>
  );
};

export default SkeletonTable;
