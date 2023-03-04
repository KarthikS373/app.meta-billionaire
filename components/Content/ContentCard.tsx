import { Box, Flex, Image, Spacer, Text } from "@chakra-ui/react";
import React from "react";

const ContentCard = () => {
  return (
    <Flex
      align="center"
      justify="flex-start"
      w={["100%", "90%", "60%", "60%"]}
      mb="xs"
      direction={["column", "column", "row", "row"]}
      bgColor="#1d1d1d"
      borderRadius={5}
      _hover={{
        transform: "scale(1.02)",
      }}
      className="shadow-md rounded"
      transition="transform ease 0.5s"
      pr={[0, "md"]}
    >
      <Box w={["full", "full", 300, 360]}>
        <Image
          src={"/banner.jpeg"}
          alt={""}
          maxW={1000}
          width={["full", 360]}
          height={[120, 160]}
          className="rounded-img"
        />
      </Box>
      <Flex direction={"column"} className={"items-start justify-start"} p={5}>
        <Text
          ml={["xs", "xs", "sm", "sm"]}
          fontSize={[18, 18, 24, 26]}
          fontWeight={400}
          className="font-sans text-white"
        >
          Lorem ipsum dolor sit.
        </Text>
        <Text
          ml={["xs", "xs", "sm", "sm"]}
          fontSize={[12, 12, 14, 14]}
          fontWeight={400}
          className="font-sans text-white/50 line-clamp-3 w-64"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
          dolore animi accusamus ut quo temporibus accusantium dignissimos?
          Veritatis inventore voluptatibus quasi, voluptate et assumenda nobis
          natus recusandae tempore possimus, porro saepe. Dicta?
        </Text>
      </Flex>
      <Spacer />
    </Flex>
  );
};

export default ContentCard;
