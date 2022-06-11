import { Image } from "@chakra-ui/image";
import { Heading, Text, Stack, Code } from "@chakra-ui/layout";
import fs from "fs";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Head from "next/head";
import Link from "next/link";
import path from "path";
import { Container } from "../../components/Container";
import { Footer } from "../../components/Footer";
import { Main } from "../../components/Main";
import Navbar from "../../components/Navbar";
import { projectFilePath, PROJECTS_PATH } from "../../lib/mdxUtils";

const components = {
  Head,
};

export default function PostPage({ source, frontMatter }) {
  return (
    <>
      <Container>
        <Navbar />
        <Main>
          <Heading as="h1">{frontMatter.title}</Heading>
          {frontMatter.Image != "" ? (
            <Image src={frontMatter.image} alt={frontMatter.alt} />
          ) : null}
          {/* {frontMatter.description && <Text>{frontMatter.description}</Text>} */}
          <Heading as="h2">Project description</Heading>
          <MDXRemote {...source} />
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
    // Optionally pass remark/rehype plugins
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
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
