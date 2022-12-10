import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Icon,
  Image,
  Text,
} from "@chakra-ui/react";
import { BsDiscord, BsMailbox, BsTwitter } from "react-icons/bs";

const NetworkCard = () => {
  return (
    <Box
      textAlign={"center"}
      w={["95vw", null, "70vw"]}
      border={"1px solid"}
      borderColor={"customBlue.500"}
      padding={10}
      borderRadius={20}
      display={"flex"}
      gap={5}
      flexWrap={"wrap"}
    >
      <Flex
        flex={1}
        flexDir={"column"}
        gap={2}
        textAlign={"left"}
        flexWrap={"wrap"}
      >
        <Image
          src={
            "https://images.unsplash.com/photo-1661961110372-8a7682543120?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxzZWFyY2h8MXx8cHJvamVjdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
          }
          alt="Profile"
        />
        <Text>Username</Text>
      </Flex>
      <Flex
        flex={3}
        textAlign={"left"}
        flexDir={"column"}
        gap={10}
        fontFamily={"sans-serif"}
      >
        <Text>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta
          dolorum obcaecati vero nesciunt temporibus nihil minus quam aliquam
          ipsam ratione? Nam, accusantium nemo.
        </Text>
        <Flex gap={1.2} flexWrap={"wrap"}>
          <Tag />
          <Tag />
          <Tag />
          <Tag />
          <Tag />
        </Flex>
        <Flex alignItems={"center"} gap={5} flexWrap={"wrap"}>
          <ButtonGroup>
            <Button>
              <Icon as={BsTwitter} h={5} />
            </Button>
            <Button>
              <Icon as={BsDiscord} h={5} />
            </Button>
            <Button>
              <Icon as={BsMailbox} h={5} />
            </Button>
          </ButtonGroup>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NetworkCard;

const Tag = () => {
  return (
    <Box
      border={"none"}
      borderRadius={5}
      backgroundColor={"black"}
      color={"white"}
      h={"min-content"}
      w={"min-content"}
      fontFamily={"sans-serif"}
      fontSize={"medium"}
      padding={"2px 8px"}
    >
      Hello
    </Box>
  );
};
