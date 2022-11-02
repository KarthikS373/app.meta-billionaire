import { Flex, Text, Box } from "@chakra-ui/react";
import Image from "next/image";

const Intervenant = ({ name, image, job, isModal, speakersCount }) => {
  return (
    <Flex
      align="center"
      justify={
        isModal ? (speakersCount > 1 ? "center" : "flex-start") : "flex-start"
      }
      w="100%"
      my="sm"
    >
      <Box boxSize={[isModal ? 10 : 28, isModal ? 10 : 28, 100, 100]}>
        <Image
          src={image}
          alt={name}
          layout="responsive"
          width={100}
          height={100}
        />
      </Box>
      <Flex flexDir="column" align="flex-start" justify="center">
        <Text
          fontSize={[isModal ? 15 : 20, isModal ? 15 : 20, 20, 20]}
          fontWeight={800}
          ml={["xs", "xs", "sm", "sm"]}
          color="black"
        >
          {name}
        </Text>
        <Text
          fontSize={[isModal ? 12 : 15, isModal ? 12 : 15, 15, 15]}
          fontWeight={400}
          ml={["xs", "xs", "sm", "sm"]}
          color="black"
        >
          {job}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Intervenant;
