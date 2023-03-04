import {
  Box,
  Heading,
  Spacer,
  Button,
  VStack,
  HStack,
  Grid,
  Text,
  Link,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaClock } from "react-icons/fa";

interface CardProps {
  title: string;
  type: string;
  size: string;
  speaker: string;
  publishedDate: string;
  banner: string;
  postLink: string;
  video: string;
  duration: number;
}

const Card = ({
  title,
  speaker,
  publishedDate,
  banner,
  postLink,
  duration,
  video,
  type,
  size,
}: CardProps) => {
  return (
    <Box
      as="article"
      bg="white"
      borderRadius="md"
      overflow="hidden"
      border="1px solid #08090a1a"
    >
      {banner ? (
        <Image
          alt="header image"
          src={banner}
          className="object-cover w-full h-44"
        />
      ) : (
        ""
      )}

      <Grid
        templateColumns={{ base: "1fr", sm: "max-content 1fr" }}
        gap={2}
        p={4}
        bg={useColorModeValue("gray.100", "gray.800")}
      >
        <HStack d={{ base: "flex", sm: "block" }}>
          <VStack
            align="flex-start"
            spacing={0}
            d={{ base: "flex", sm: "none" }}
          >
            <Text color="#4d5760" fontSize="14px" fontWeight="500">
              {speaker}
            </Text>
            <Text color="#4d5760" fontSize="12px">
              {publishedDate}
            </Text>
          </VStack>
        </HStack>
        <Box>
          <HStack alignItems={"end"} mt="3" fontSize="16px" color="#64707d">
            <VStack
              align="flex-start"
              spacing={0}
              d={{ base: "none", sm: "flex" }}
            >
              <Text
                className="font-sans"
                color="#4d5760"
                fontSize="14px"
                fontWeight="500"
              >
                {speaker}
              </Text>
              <Text className="font-sans" color="#4d5760" fontSize="12px">
                {publishedDate}
              </Text>
              <Heading fontSize={{ base: "xl", sm: "3xl" }} mt="3">
                <Link
                  href={postLink}
                  _hover={{ color: "#323ebe", textDecoration: "none" }}
                  isExternal
                >
                  {title}
                </Link>
              </Heading>
            </VStack>
            <Spacer />
            <Text
              fontSize="14px"
              className="text-black flex items-center gap-1 font-sans font-medium"
            >
              <FaClock className="inline" />
              {duration} min{" "}
            </Text>
            {type.toLowerCase() === "pdf" && (
              <Button
                bg={"gray.300"}
                _hover={{
                  bg: "gray.200",
                }}
                height="auto"
                fontWeight="normal"
                fontSize="14px"
                rounded="md"
                className="px-6 py-3 rounded shadow-sm"
              >
                Download
              </Button>
            )}
            {type.toLowerCase() === "mp4" && (
              <Button
                bg={"black"}
                _hover={{
                  bg: "blackAlpha.700",
                }}
                height="auto"
                fontWeight="normal"
                fontSize="14px"
                rounded="md"
                className="px-6 py-3 rounded shadow-sm  text-white"
              >
                Watch
              </Button>
            )}
          </HStack>
        </Box>
      </Grid>
    </Box>
  );
};

export default Card;
