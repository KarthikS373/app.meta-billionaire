import { Box, Button, Flex, Image, Spacer, Text } from "@chakra-ui/react";
import React from "react";

const ContentCard = () => {
  return (
    <Flex
      align="center"
      justify="flex-center"
      w="full"
      mb="xs"
      direction={["column", "column", "row", "row"]}
      bgColor="#1d1d1d"
      borderRadius={5}
      _hover={{
        transform: "scale(1.02)",
      }}
      className="shadow-md center rounded"
      transition="transform ease 0.5s"
    >
      <Flex direction={"column"} className={"center"} p={5}>
        <Box w={"full"} className="center">
          <Image
            src={"/banner.jpeg"}
            alt={""}
            width={"full"}
            className="rounded-img"
          />
        </Box>
        <Text
          fontSize={[18, 18, 24, 26]}
          fontWeight={400}
          className="font-sans text-white"
        >
          Lorem ipsum dolor sit.
        </Text>
        <Text
          fontSize={[12, 12, 14, 14]}
          fontWeight={400}
          className="font-sans text-white/50 line-clamp-3 w-64"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
          dolore animi accusamus ut quo temporibus accusantium dignissimos?
          Veritatis inventore voluptatibus quasi, voluptate et assumenda nobis
          natus recusandae tempore possimus, porro saepe. Dicta?
        </Text>
        <Flex mt={5} gap={4} className="font-sans text-lg">
          <Button colorScheme={"whiteAlpha"}>Edit</Button>
          <Button colorScheme={"red"}>Delete</Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ContentCard;
