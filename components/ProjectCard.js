import {
  useColorMode,
  Heading,
  Text,
  Flex,
  Link,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import Image from "next/image";
import NextLink from "next/link";
import { BsGithub } from "react-icons/bs";

export default function ProjectCard({
  title,
  description,
  repoLink,
  demoLink,
  languageColor,
  language,
  image,
  href,
  uiColor,
  ui,
}) {
  const { colorMode } = useColorMode();

  const boxShadowColor = {
    light: "0px 8px 24px rgba(0, 0, 0, 0.2)",
    dark: "0px 8px 24px rgba(0, 0, 0, 0.6)",
  };

  return (
    <NextLink href={`/projects/${href}`} passHref>
      <Link w="100%" _hover={{ textDecoration: "none" }}>
        <Flex
          flexDir="column"
          _hover={{ transform: "scale(1.02)" }}
          transition="transform .5s ease-in-out"
          boxShadow={boxShadowColor[colorMode]}
          borderRadius={5}
        >
          <Flex
            p={[5, 15, 25]}
            flexDir="column"
            justify="space-between"
            h="100%"
          >
            {image != "" ? (
              <Image
                src={image}
                width={800}
                height={500}
                objectFit="cover"
                alt={title}
              />
            ) : null}
            <Box>
              <Heading as="h3" size="lg" fontWeight="semibold" my={4}>
                {title}
              </Heading>
              <Box
                h={1}
                w="40%"
                transition="background-color .5s ease-in-out"
                mb={4}
              />
              <Text>{description}</Text>
            </Box>
            <Flex justify="space-between" mt={2}>
              <Flex align="center">
                {demoLink && (
                  <NextLink href={demoLink} isExternal passHref>
                    <IconButton
                      icon={<ExternalLinkIcon />}
                      variant="ghost"
                      transition="opacity .5s ease-in-out"
                    />
                  </NextLink>
                )}
                {repoLink && (
                  <NextLink href={repoLink} isExternal passHref>
                    <IconButton
                      icon={<BsGithub />}
                      variant="ghost"
                      transition="opacity .5s ease-in-out"
                    />
                  </NextLink>
                )}
              </Flex>
              <Flex align="center">
                <Box
                  w={[2, 3]}
                  h={[2, 3]}
                  mr={1}
                  borderRadius="50%"
                  bgColor={languageColor}
                />
                <Text fontSize={["xs", "sm"]} mr={2}>
                  {language}
                </Text>
                <Box
                  w={[2, 3]}
                  h={[2, 3]}
                  mr={1}
                  borderRadius="50%"
                  bgColor={uiColor}
                />
                <Text fontSize={["xs", "sm"]} mr={2}>
                  {ui}
                </Text>
                {/* <Box
                  w={3}
                  h={3}
                  mr={1}
                  borderRadius="50%"
                  bgColor={languageColor}
                /> */}
                {/* <Text fontSize="sm" color={colorSecondary[colorMode]}>
                  {language2}
                </Text> */}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Link>
    </NextLink>
  );
}
