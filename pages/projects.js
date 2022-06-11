import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { projectFilePath, PROJECTS_PATH } from "../lib/mdxUtils";
import {
  Heading,
  SimpleGrid,
  Code,
  Stack,
  Text,
} from "@chakra-ui/react";
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
          <Heading as="h1" textAlign="center">
            Things I´ve built 👩🏼‍💻
          </Heading>
          {/* <SimpleGrid columns={[1, 2, 3]} spacing={6} py={8} mt={10} mb={20}>
            {projects.map((project) => (
              <Flex
                maxW="320px"
                key={project.filePath}
                flexDir="column"
                _hover={{
                  transform: "scale(1.05)",
                }}
                transition="transform .5s ease-in-out, border .5s ease-in-out"
                boxShadow={boxShadowColor[colorMode]}
                borderRadius={5}
              >
                <Link
                  as={`/projects/${project.filePath.replace(/\.mdx?$/, "")}`}
                  href={`/projects/[slug]`}
                >
                  <a>{project.data.title}</a>
                </Link>
                <Flex
                  p={[5, 15, 25]}
                  flexDir="column"
                  justify="space-between"
                  h="100%"
                >
                  <Box>
                    {project.Image != "" ? (
                      <Image
                        src={project.data.image}
                        width={800}
                        height={500}
                        objectFit="cover"
                        alt={project.data.title}
                      />
                    ) : null}
                  </Box>
                  <Box>
                    <Heading as="h3" size="md" fontWeight="semibold" mb={2}>
                      {" "}
                      {project.data.title}{" "}
                    </Heading>
                  </Box>
                  <Box>
                    <Text color={"gray.500"}>{project.data.description}</Text>
                  </Box>
                  <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                    <Link href={"https://www.github.com"} isExternal>
                      <IconButton icon={<ExternalLinkIcon />} variant="ghost" />
                    </Link>
                  </Stack>
                  <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
                    <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                      <Text color="text" fontSize="xs">
                        <Code fontSize="0.7rem">{project.data.tags}</Code>
                      </Text>{" "}
                    </Stack>
                  </Stack>
                </Flex>
              </Flex>
            ))}
          </SimpleGrid> */}
          <SimpleGrid columns={[1, 2, 3]} spacing={6} py={8} mt={10} mb={20}>
            {projects.map((project) => (
              <ProjectCard
                key={project.filePath}
                href={`${project.filePath.replace(/\.mdx?$/, "")}`}
                title={project.data.title}
                description={project.data.description}
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
