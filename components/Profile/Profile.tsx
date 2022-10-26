// Firstly I need access to some things... (I did ask Abhinay, he said he dont have those)
// 1. Access to Database and access tokens for same
// 2. API endpoints or API docs of staking.metabillionaire.com/ as the requests are of cross origin I also need them to enable CORs requests
// 3. Does the user twitter profile or any URI connected to the wallet or anywhere in the profile (coz I couldnt find them over the current user schema. if yes I need access to those else do u want me to create a schema or a seperate form where user can actually create one??)

import React from "react";
import { BsTwitter } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";
import {
  Heading,
  Avatar,
  Box,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
  Icon,
  HStack,
  VStack,
  useMediaQuery,
  SimpleGrid,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { MdAttachMoney } from "react-icons/md";

interface StatData {
  label: string;
  score: string;
}

const statData: StatData[] = [
  {
    label: "Current Holdings",
    score: "3.2M",
  },
  {
    label: "Staked",
    score: "77k",
  },
  {
    label: "Raffle Entried",
    score: "2544",
  },
];

const UserProfile = ({
  username = "cyberpunk373",
  nftData = [],
  products = [],
}) => {
  const TABS = [
    {
      id: 1,
      title: "NFTs",
      content: (
        <SimpleGrid>
          {/* {nftData
            ? nftData.map((nft: any) => {
                return <>{nft.name}</>;
              })
            : "Nothing to display"} */}
          {products.length != 0
            ? products.map((nft: any) => {
                return <>{nft.name}</>;
              })
            : "Nothing to display"}
        </SimpleGrid>
      ),
    },
    {
      id: 2,
      title: "Title 2",
      content: <div>Content 2</div>,
    },
    {
      id: 3,
      title: "Title 3",
      content: <div>Content 3</div>,
    },
    {
      id: 4,
      title: "Title 4",
      content: <div>Content 4</div>,
    },
  ];

  const [isLessThan550] = useMediaQuery("(max-width: 550px)");
  const [isLessThan360] = useMediaQuery("(max-width: 360px)");

  return (
    <Flex
      py={6}
      px={isLessThan550 ? 2 : 28}
      gap={"md"}
      flexWrap="wrap"
      alignItems={"stretch"}
      m="auto"
    >
      <Box
        maxW={"320px"}
        minW={isLessThan360 ? "160px" : "320px"}
        alignItems={"flex-start"}
        maxH={"min-content"}
        m="auto"
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
        flex={1}
      >
        <Image
          h={"120px"}
          w={"full"}
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgThQ2FqJAPuOzIQnx5rzOskzlldJWcA_TTQ&usqp=CAU"
          }
          alt="Abstract background"
          objectFit={"cover"}
        />
        <Flex justify={"center"} mt={-12}>
          <Avatar
            size={"xl"}
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ2jOmIfUnjeE35drnm9qtmql4vDCdphjXEL1FG5TO_yTb-cRdpA1qmgzqO6CtCEjV53c&usqp=CAU"
            }
            css={{
              border: "5px solid white",
            }}
          />
        </Flex>

        <Box p={6}>
          <VStack textAlign={"center"} w="min-content" m="auto">
            <Heading fontSize={"sm"} whiteSpace="nowrap">
              {username}
            </Heading>
            <Text color={"gray.500"} fontSize="x-small">
              Account number
            </Text>
          </VStack>
          <Text
            pt="16px"
            fontWeight="light"
            fontFamily="sans-serif"
            textAlign="justify"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
            ipsa. Repudiandae similique numquam saepe aliquam provident veniam
            eveniet, quis cupiditate vitae minima unde nobis. Ut sit totam,
            vitae saepe voluptas voluptates unde.
          </Text>

          <VStack mt={8} direction={"row"} spacing={4}>
            <Button
              flex={1}
              py={1.5}
              px={14}
              fontSize={"sm"}
              rounded={"full"}
              bg={"blue.400"}
              color={"white"}
              boxShadow={
                "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
              }
              _hover={{
                bg: "blue.500",
              }}
              _focus={{
                bg: "blue.500",
              }}
            >
              <Icon as={BsTwitter} boxSize={10} />
              &nbsp;
              <Text
                fontFamily={"sans-serif"}
                fontWeight="200"
                fontSize={"22"}
                pt="1"
              >
                Twitter
              </Text>
            </Button>
            <Button
              flex={1}
              py={1.5}
              px={14}
              fontSize={"md"}
              rounded={"full"}
              _focus={{
                bg: "gray.200",
              }}
            >
              <Icon as={FaDiscord} boxSize={10} />
              &nbsp;
              <Text
                fontFamily={"sans-serif"}
                fontWeight="200"
                fontSize={"22"}
                pt="1"
              >
                Discord
              </Text>
            </Button>
          </VStack>
        </Box>
      </Box>
      <Box
        flex={3}
        textAlign={"justify"}
        minW={isLessThan550 ? "98vw" : "60vw"}
      >
        <Stack minW={"320px"} m="auto">
          <SimpleGrid
            columns={isLessThan550 ? 2 : 4}
            spacing={5}
            pt={4}
            pl={{ base: 0, md: 10 }}
            margin="auto 0"
          >
            {statData.map((data, index) => (
              <Stack
                key={index}
                pl={3}
                py={1}
                pr={1}
                borderLeft="2px solid"
                borderLeftColor="blue.400"
                justifyContent="space-between"
              >
                <Box
                  fontSize="md"
                  fontWeight="bold"
                  color="blue.400"
                  fontFamily={"sans-serif"}
                >
                  {data.score}
                </Box>
                <Text
                  whiteSpace={"nowrap"}
                  fontSize="sm"
                  fontFamily={"sans-serif"}
                >
                  {data.label}
                </Text>
              </Stack>
            ))}
            <Button
              fontSize={[12, 12, 15, 15]}
              px="sm"
              borderRadius="full"
              colorScheme="customBlue"
              _hover={{
                color: "white",
                bgColor: "customBlue.500",
                borderColor: "customBlue.500",
              }}
              w={[150, 150, 200, 200]}
              shadow="md"
              fontWeight={400}
              ml={["xs", "xs", "sm", "md"]}
            >
              CLAIM MBUC
            </Button>
          </SimpleGrid>
        </Stack>
        <Tabs
          mt={"8"}
          isFitted
          isLazy
          variant="enclosed"
          defaultIndex={0}
          w={isLessThan550 ? "95vw" : "70vw"}
        >
          <TabList>
            {TABS.map((tab) => (
              <Tab key={tab.id}>
                <Text
                  fontFamily={"sans-serif"}
                  fontSize="md"
                  fontWeight={"hairline"}
                >
                  {tab.title}
                </Text>
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {TABS.map((tab) => (
              <TabPanel key={tab.id}>{tab.content}</TabPanel>
            ))}
          </TabPanels>
        </Tabs>
        <Box w="100%"></Box>
      </Box>
    </Flex>
  );
};

export default UserProfile;
