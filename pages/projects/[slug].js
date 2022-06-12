import { Image } from "@chakra-ui/image";
import {
  Heading,
  Text,
  Stack,
  Code,
  Box,
  Flex,
  List,
  ListItem,
  useColorMode,
  ListIcon,
} from "@chakra-ui/react";
import fs from "fs";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import path from "path";
import { Container } from "../../components/Container";
import { Footer } from "../../components/Footer";
import { Main } from "../../components/Main";
import Navbar from "../../components/Navbar";
import { projectFilePath, PROJECTS_PATH } from "../../lib/mdxUtils";
import { BsGithub } from "react-icons/bs";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const components = {
  Head,
};

export default function PostPage({ source, frontMatter }) {
  const { colorMode } = useColorMode();

  const boxShadowColor = {
    light: "0px 8px 24px rgba(0, 0, 0, 0.2)",
    dark: "0px 8px 24px rgba(0, 0, 0, 0.6)",
  };

  return (
    <>
      <Container>
        <Navbar />
        <Main>
          <Heading as="h1">{frontMatter.title}</Heading>
          {frontMatter.Image != "" ? (
            <Image
              src={frontMatter.image}
              alt={frontMatter.alt}
              borderRadius={3}
              boxShadow={boxShadowColor[colorMode]}
            />
          ) : null}
          <Flex flexDir="column">
            <Heading as="h2" fontSize="2xl">
              Project description
            </Heading>
            <Box maxWidth="35rem" py={4}>
              <MDXRemote {...source} components={components} />
            </Box>
            <Box as="section">
              <List spacing={3}>
                <ListItem>
                  <ListIcon
                    as={ExternalLinkIcon}
                    fontSize="1.5rem"
                    color="green.500"
                  />
                  <Link
                    isExternal
                    href={frontMatter.demoLink}
                    flexGrow={1}
                    mr={2}
                  >
                    Check out the Live site
                  </Link>
                </ListItem>
                <ListItem alignItems="center">
                  <ListIcon as={BsGithub} fontSize="1.5rem" color="green.500" />
                  <Link
                    isExternal
                    href={frontMatter.repoLink}
                    flexGrow={1}
                    mr={2}
                  >
                    Check out the repository
                  </Link>
                </ListItem>
              </List>
            </Box>
          </Flex>
          <Link href="/">
            <a>👈 Go back home</a>
          </Link>
        </Main>
        <Footer>
          <Stack direction="column" textAlign="center" color="text">
            <Text>
              Made with <Code>Next.js</Code> + <Code>Chakra-ui</Code> +{" "}
              <Code>Mdx</Code>.
            </Text>
            <Text>💖 by Ine AW 2022</Text>
          </Stack>
        </Footer>
      </Container>
    </>
  );
}

export const getStaticProps = async ({ params }) => {
  const projectFilePath = path.join(PROJECTS_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(projectFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = projectFilePath
    .map((path) => path.replace(/\.mdx?$/, ""))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
