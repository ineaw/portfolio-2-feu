import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { projectFilePath, PROJECTS_PATH } from "../lib/mdxUtils";
import { Heading, SimpleGrid, Code, Stack, Text, Flex } from "@chakra-ui/react";
import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";

export default function Projects({ projects }) {
  return (
    <>
      <Container>
        <Navbar />
        <Main>
          <Flex flexDir="column">
          <Heading
            as="h1"
            textAlign="center"
            letterSpacing="tight"
            fontWeight={700}
            mb={16}
          >
            Things I´ve built 👩🏼‍💻
          </Heading>
          <SimpleGrid columns={[1, 2, 3]} spacing={6} pb={8} mb={10}>
            {projects.map((project) => (
              <ProjectCard
                key={project.filePath}
                href={`${project.filePath.replace(/\.mdx?$/, "")}`}
                title={project.data.title}
                excerpt={project.data.excerpt}
                repoLink={project.data.repoLink}
                demoLink={project.data.demoLink}
                languageColor={project.data.languageColor}
                language={project.data.language}
                ui={project.data.ui}
                uiColor={project.data.uiColor}
                image={project.data.image}
              />
            ))}
          </SimpleGrid>
          </Flex>
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

export function getStaticProps() {
  const projects = projectFilePath.map((filePath) => {
    const source = fs.readFileSync(path.join(PROJECTS_PATH, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data,
      filePath,
    };
  });

  return { props: { projects } };
}
