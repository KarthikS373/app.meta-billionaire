import { Container, Box, Grid, SimpleGrid } from "@chakra-ui/react";

import { postsData as courses } from "./course.data";
import Card from "./CourseCard";
import Category from "./Category";

const CourseHome = () => {
  return (
    <Container maxW="7xl" px={{ base: 5, md: 8 }} py={16} mx="auto">
      <SimpleGrid columns={[1, 1, 4, 3]} spacing={6}>
        <Box>
          <Category />
        </Box>
        <Box
          borderRadius="md"
          className="rounded shadow-sm space-y-8 px-2 col-span-2"
        >
          {courses.map((course, index: number) => (
            <Card
              key={course.id}
              type={course.type}
              size={course.size}
              title={course.title}
              speaker={course.speaker}
              duration={course.duration}
              postLink={course.video}
              publishedDate={course.publishedDate}
              banner={course.banner}
              video=""
            />
          ))}
        </Box>
      </SimpleGrid>
    </Container>
  );
};

export default CourseHome;
