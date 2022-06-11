import { useColorMode, Button, Flex, Box } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { DarkModeSwitch } from "./DarkModeSwitch";

const Navbar = () => {
  const { colorMode } = useColorMode();
  const router = useRouter();

  const navHoverBg = {
    light: "pink.500",
    dark: "pink.200",
  };
  const navHoverTxt = {
    light: "white",
    dark: "black",
  };

  return (
    <Flex
      flexDirection="row"
      justifyContent="space-between"
      maxWidth="70rem"
      width="100%"
      as="nav"
      px={4}
      my={8}
      mx="auto"
    >
      <Box>
        <NextLink href="/" passHref>
          <Button
            as="a"
            variant="ghost"
            p={[2, 2, 4]}
            mx={[1, 2]}
            _hover={{
              backgroundColor: navHoverBg[colorMode],
              textColor: navHoverTxt[colorMode],
            }}
            textColor={router.pathname === "/" ? navHoverTxt[colorMode] : null}
            backgroundColor={
              router.pathname === "/" ? navHoverBg[colorMode] : null
            }
            aria-label="Home"
          >
            Home
          </Button>
        </NextLink>
        <NextLink href="/projects" passHref>
          <Button
            as="a"
            variant="ghost"
            p={[1, 2, 4]}
            _hover={{
              backgroundColor: navHoverBg[colorMode],
              textColor: navHoverTxt[colorMode],
            }}
            textColor={
              router.pathname === "/projects" ? navHoverTxt[colorMode] : null
            }
            backgroundColor={
              router.pathname === "/projects" ? navHoverBg[colorMode] : null
            }
            aria-label="projects"
          >
            Projects
          </Button>
        </NextLink>
      </Box>
      <DarkModeSwitch />
    </Flex>
  );
};

export default Navbar;
