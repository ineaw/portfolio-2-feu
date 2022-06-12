import {
  Link as ChakraLink,
  Text,
  SimpleGrid,
  Code,
  Box,
  List,
  ListIcon,
  ListItem,
  Stack,
  Heading,
} from "@chakra-ui/react";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import { Hero } from "../components/Hero";
import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { projectFilePath, PROJECTS_PATH } from "../lib/mdxUtils";

const Index = ({ projects }) => (
  <>
    <Container>
      <Navbar />
      <Hero />
      <Main>
        <Box as="section" px={2}>
          <Heading
            letterSpacing="tight"
            mt={8}
            size="lg"
            fontWeight={700}
            as="h2"
            mb={8}
          >
            Who am I?
          </Heading>
          <Text>
            Hi 👋, my name is Ine and I enjoy creating things for both web and
            on the stage. I am a proffesional artist, with a background in
            Graphic Design recently gone Frontend Developer. I am currently
            finishing my studies at{" "}
            <ChakraLink
              color="pink.500"
              href="https://www.noroff.no/"
              isExternal
            >
              Noroff school of technology and digital media
            </ChakraLink>{" "}
            where I have been studying Frontend development. This is my personal
            portfolio site where I showcase projects from my studies.
          </Text>
        </Box>
        <Box as="section">
          <Heading
            letterSpacing="tight"
            mt={8}
            size="lg"
            fontWeight={700}
            as="h2"
            mb={8}
          >
            My Featured Projects 🎨
          </Heading>
          <SimpleGrid columns={[1, 2, 3]} spacing={6} py={4} mb={10}>
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
        </Box>
        <Box as="section">
          <List spacing={3} textAlign="center">
            <ListItem>
              <Text fontWeight="600" fontSize="lg">
                Feel free to check me out and also don´t hesitate to get in
                touch!
              </Text>
            </ListItem>
            <ListItem>
              <ListIcon as={BsLinkedin} color="green.500" />
              <ChakraLink
                isExternal
                href="https://www.linkedin.com/"
                flexGrow={1}
                mr={2}
              >
                LinkdIn
              </ChakraLink>
            </ListItem>
            <ListItem alignItems="center">
              <ListIcon as={BsGithub} fontSize="1.5rem" color="green.500" />
              <ChakraLink
                isExternal
                href="https://github.com/ineaw"
                flexGrow={1}
                mr={2}
              >
                Github
              </ChakraLink>
            </ListItem>
          </List>
        </Box>
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

export default Index;
