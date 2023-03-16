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
  Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaClock } from "react-icons/fa";

interface CardProps {
  title: string;
  type: string;
  link: string;
  handleClick: (name: string, src: string) => void;
  duration: number;
}

const Card = ({ title, handleClick, duration, link, type }: CardProps) => {
  const router = useRouter();

  return (
    <Box
      as="article"
      bg="white"
      borderRadius="md"
      overflow="hidden"
      border="1px solid #08090a1a"
    >
      {/* {banner ? (
        <Image
          alt="header image"
          src={banner}
          className="object-cover w-full h-44"
        />
      ) : (
        ""
      )} */}

      <Box w="full" p={4} bg={useColorModeValue("gray.100", "gray.800")}>
        <Flex
          justifyContent={"space-between"}
          alignItems={["start", "end"]}
          wrap={"wrap"}
          w={"full"}
          mt="3"
          direction={["column", "column", "row", "row"]}
          fontSize="16px"
          color="#64707d"
        >
          <VStack
            align="flex-start"
            spacing={0}
            d={{ base: "flex", sm: "flex" }}
          >
            <Text
              fontSize="14px"
              className="text-black flex items-center gap-1 font-sans font-medium"
            >
              <FaClock className="inline" />
              {duration}
            </Text>
            <Heading fontSize={{ base: "xl", sm: "3xl" }} mt="3">
              <Button
                ml={0}
                pl={0}
                onClick={
                  type === "video"
                    ? () => handleClick(title, link)
                    : () => window.open(link)
                }
                _hover={{ color: "#323ebe", textDecoration: "none" }}
              >
                {title}
              </Button>
            </Heading>
          </VStack>

          {type.toLowerCase() === "pdf" && (
            <Link
              bg={"black"}
              _hover={{
                bg: "blackAlpha.700",
              }}
              href={link}
              height="auto"
              fontWeight="normal"
              fontSize="14px"
              rounded="md"
              textColor={"white"}
              w={36}
              className="px-6 py-3 rounded shadow-sm  text-white w-36"
            >
              Download
            </Link>
          )}
          {type.toLowerCase() === "video" && (
            <Button
              bg={"black"}
              _hover={{
                bg: "blackAlpha.700",
              }}
              onClick={() => handleClick(title, link)}
              height="auto"
              fontWeight="normal"
              fontSize="14px"
              rounded="md"
              w={36}
              className="px-6 py-3 rounded shadow-sm  text-white w-36"
            >
              Watch
            </Button>
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default Card;
