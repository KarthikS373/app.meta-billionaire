import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { memo } from "react";
import { MdEdit } from "react-icons/md";

const NFTCard = ({
  nftImage = "",
  nftName = "#",
  visitor = false,
  address = "",
}) => {
  const router = useRouter();
  let boxBg = useColorModeValue("white !important", "#111c44 !important");
  let secondaryBg = useColorModeValue("gray.50", "whiteAlpha.100");
  let mainText = useColorModeValue("gray.800", "white");
  let iconBox = useColorModeValue("gray.100", "whiteAlpha.200");
  let iconColor = useColorModeValue("brand.200", "white");

  return (
    <Flex
      mt={["12", null, "8"]}
      mb={4}
      borderRadius="20px"
      height={"320px"}
      borderColor={"gray.100"}
      bg={boxBg}
      h="345px"
      w={{ base: "315px", md: "345px" }}
      direction="column"
    >
      <Box p="20px">
        <Flex w="100%" mb="10px">
          <Image
            src={nftImage}
            me="auto"
            alt=""
            flex={2}
            backgroundPosition={"center"}
            backgroundSize={"contain"}
          />
        </Flex>
        <Flex>
          <Text
            fontWeight="100"
            color={mainText}
            textAlign="left"
            w="100%"
            pl={2}
            fontSize={["sm", null, "sm"]}
            fontFamily={"sans-serif"}
          >
            {nftName}
          </Text>
          {!visitor && (
            <Button
              w="38px"
              h="38px"
              borderRadius="12px"
              me="12px"
              bg={iconBox}
              onClick={(e) => {
                e.preventDefault();
                router.push(
                  {
                    pathname: `/profile/modify/${nftName.substring(1)}`,
                    query: {
                      image: nftImage,
                      address: address,
                    },
                  },
                  `/profile/modify/${nftName.substring(1)}`
                );
              }}
            >
              <Icon w="24px" h="24px" as={MdEdit} color={iconColor} />
            </Button>
          )}
        </Flex>
      </Box>
      <Flex
        flex={1}
        bg={secondaryBg}
        w="100%"
        p="20px"
        borderBottomLeftRadius="inherit"
        borderBottomRightRadius="inherit"
        height="100%"
        direction="column"
      >
        <Text
          fontSize="12"
          color="gray.500"
          lineHeight="24px"
          pe="40px"
          pl={"2"}
          fontWeight="hairline"
          mb="auto"
          fontFamily={"sans-serif"}
        >
          {""}
        </Text>
      </Flex>
    </Flex>
  );
};

export default memo(NFTCard);
