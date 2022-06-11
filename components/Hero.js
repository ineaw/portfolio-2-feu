import { Flex, Heading, Text } from "@chakra-ui/react";

export const Hero = ({ title, subtitleTop, subtitleBtm }) => (
  <Flex
    justifyContent="center"
    alignItems="center"
    height="35vh"
    direction="column"
    bgGradient="linear(to-l, heroGradientStart, heroGradientEnd)"
    bgClip="text"
  >
    <Text fontSize="lg">{subtitleTop}</Text>
    <Heading as="h1" fontSize={["3xl", "5xl", "6xl", "8xl"]}>
      {title}
    </Heading>
    <Text fontSize={["xs", "md", "lg", "lg"]}>{subtitleBtm}</Text>
  </Flex>
);

Hero.defaultProps = {
  subtitleTop: "Hello, I am",
  title: "Ine Wilhelmsen",
  subtitleBtm: "I design and develop for the web",
};
