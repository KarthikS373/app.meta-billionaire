import React from "react";
import { Badge, Box, Flex, Slider, Text } from "@chakra-ui/react";
import Image from "next/image";

import CourseCard from "./CourseCard";
import ContentCard from "./ContentCard";
import Row from "./Rows";

const temp = [
  {
    id: 0,
    name: "Course",
    banner:
      "https://images.unsplash.com/photo-1572177812156-58036aae439c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvamVjdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, dolorem.",
  },
  {
    id: 1,
    name: "Course",
    banner:
      "https://images.unsplash.com/photo-1572177812156-58036aae439c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvamVjdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, dolorem.",
  },
  {
    id: 2,
    name: "Course",
    banner:
      "https://images.unsplash.com/photo-1572177812156-58036aae439c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvamVjdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, dolorem.",
  },
  {
    id: 3,
    name: "Course",
    banner:
      "https://images.unsplash.com/photo-1572177812156-58036aae439c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvamVjdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, dolorem.",
  },
  {
    id: 4,
    name: "Course",
    banner:
      "https://images.unsplash.com/photo-1572177812156-58036aae439c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvamVjdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, dolorem.",
  },
  {
    id: 5,
    name: "Course",
    banner:
      "https://images.unsplash.com/photo-1572177812156-58036aae439c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvamVjdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, dolorem.",
  },
  {
    id: 6,
    name: "Course",
    banner:
      "https://images.unsplash.com/photo-1572177812156-58036aae439c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvamVjdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, dolorem.",
  },
  {
    id: 7,
    name: "Course",
    banner:
      "https://images.unsplash.com/photo-1572177812156-58036aae439c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvamVjdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, dolorem.",
  },
];

const ContentMain = () => {
  return (
    <>
      <Box w={"full"}>
        <Row data={temp} title={"Courses"} />
        {/* <Box fontSize="14px" px={[null, "10px", "5%", "10%"]} m="10px 0 50px 0">
          <Box
            textAlign="center"
            className="center flex-col"
            p="10px"
            mb="20px"
          >
            <Text
              fontSize="20px"
              fontWeight="700"
              color="brand.900"
              lineHeight="40px"
              my="10px"
            >
              {"Courses"}
            </Text>
            <Text className="md:w-2/3 font-sans text-center">
              {
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, repudiandae iste tenetur nisi, hic magni unde dolorem eos odit, enim excepturi nam iusto!"
              }
            </Text>
          </Box>
          <Flex
            justify="space-between"
            flexWrap="wrap"
            px={["20px", "20px", null]}
          >
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
          </Flex>
        </Box>
        <Box fontSize="14px" px={[null, "10px", "5%", "10%"]} m="10px 0 50px 0">
          <Box
            textAlign="center"
            className="center flex-col"
            p="10px"
            mb="20px"
          >
            <Text
              fontSize="20px"
              fontWeight="700"
              color="brand.900"
              lineHeight="40px"
              my="10px"
            >
              {"Podcast"}
            </Text>
            <Text className="md:w-2/3 font-sans text-center">
              {
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, repudiandae iste tenetur nisi, hic magni unde dolorem eos odit, enim excepturi nam iusto!"
              }
            </Text>
          </Box>
          <Flex
            className="center flex-col"
            px={["20px", "20px", null]}
          >
            <ContentCard />
            <ContentCard />
            <ContentCard />
            <ContentCard />
          </Flex>
        </Box> */}
      </Box>
    </>
  );
};

export default ContentMain;
