import { Flex } from "@chakra-ui/react";

export const Container = (props, { children }) => (
  <Flex
    direction="column"
    alignItems="center"
    minHeight="100vh"
    bg="gray.50"
    color="black"
    _dark={{
      bg: "gray.900",
      color: "white",
    }}
    transition="all 0.15s ease-out"
    {...props}
    {...children}
  />
);
