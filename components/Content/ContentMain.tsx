import React from "react";
import { Badge, Box, Flex, Slider, Text } from "@chakra-ui/react";
import Image from "next/image";

import courses from "../../data/courses.json";

import Row from "./Rows";

const podcast = [
  {
    id: 0,
    name: "Podcast name",
    duration: "2.45hr",
    banner:
      "https://images.unsplash.com/photo-1572177812156-58036aae439c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvamVjdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, dolorem.",
  },
];

const ContentMain = () => {
  return (
    <>
      <Box w={"full"} className="pt-4">
        <Row data={courses.categories} popupText="Number of lessons" title={"Courses"} />
        <Row data={podcast} title={"Podcast"} />
        {/* <Row data={temp} title={"AMA"} /> */}
      </Box>
    </>
  );
};

export default ContentMain;
