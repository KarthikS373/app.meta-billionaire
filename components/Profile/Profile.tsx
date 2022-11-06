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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import NFTCard from "./NFTCard";

const UserProfile = ({
  username = "cyberpunk373",
  userId = "",
  products = [],
  balance = 0,
  stakedNfts = [],
  holding = "0",
  claims = "0",
}) => {
  const TABS = [
    {
      id: 1,
      title: "NFTs",
      content: (
        <>
          {products.length != 0 ? (
            <SimpleGrid columns={[1, null, 3]} spacing={10}>
              {products.map((nft: any) => {
                return (
                  <NFTCard
                    key={nft.dna}
                    nftName={`#${nft.name}`}
                    nftImage={nft.image}
                  />
                );
              })}
            </SimpleGrid>
          ) : (
            <Box
              w={"100%"}
              h={["10vh", null, "40vh"]}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <>Loading....</>
            </Box>
          )}
        </>
      ),
    },
    {
      id: 2,
      title: "Staked NFT",
      content: (
        <>
          {stakedNfts.length != 0 ? (
            <SimpleGrid columns={[1, null, 3]} spacing={10}>
              {stakedNfts.map((nft: any) => {
                return (
                  <NFTCard
                    key={nft.dna}
                    nftName={nft.name}
                    nftImage={nft.image}
                  />
                );
              })}
            </SimpleGrid>
          ) : (
            <Box
              w={"100%"}
              h={["10vh", null, "40vh"]}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <>Loading....</>
            </Box>
          )}
        </>
      ),
    },
  ];

  const statData = [
    {
      label: "Staked",
      score: `${balance} NFT`,
      content: <></>,
    },
    {
      label: "$MBUC Holdings",
      score: holding,
      content: <></>,
    },
    {
      label: "",
      score: claims,
      content: (
        <Button
          fontFamily={"sans-serif"}
          fontSize={"sm"}
          p={"0 12px"}
          w={"min-content"}
          aria-pressed="true"
          onClick={(e) => {
            e.preventDefault();
            window.open("https://staking.metabillionaire.com/#/staking");
          }}
          colorScheme="customBlue"
          color="white"
          _hover={{
            bgColor: "customBlue.500",
            borderColor: "customBlue.500",
          }}
        >
          Claim $MBUC
        </Button>
      ),
    },
  ];

  const [isLessThan550] = useMediaQuery("(max-width: 550px)");
  const [isLessThan360] = useMediaQuery("(max-width: 360px)");
  const [isLessThan768] = useMediaQuery("(max-width: 768px)");

  return (
    <Flex
      py={6}
      px={isLessThan550 ? 2 : 28}
      gap={"md"}
      flexWrap="wrap"
      alignItems={"stretch"}
      m="auto"
    >
      <Flex
        flexDir={"column"}
        gap={"md"}
        m={isLessThan550 ? "auto" : ""}
        alignItems="flex-start"
        maxH={"850px"}
      >
        <Box
          maxW={"320px"}
          maxH={"720px"}
          minW={isLessThan360 ? "160px" : "320px"}
          alignItems={"flex-start"}
          m="auto"
          p="auto"
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
                {userId.slice(0, 3)}....{userId.slice(-5)}
              </Text>
            </VStack>
            <Flex justifyContent={"space-evenly"} mt={4} flex={1}>
              {/* <Button
                color="primary"
                fontFamily={"sans-serif"}
                fontSize={"sm"}
                aria-pressed="true"
                onClick={(e) => e.preventDefault()}
                colorScheme="customBlue"
                _hover={{
                  color: "white",
                  bgColor: "customBlue.500",
                  borderColor: "customBlue.500",
                }}
              >
                Claim MBUC
              </Button> */}
              <Button
                color="secondary"
                fontFamily={"sans-serif"}
                fontSize={"small"}
                aria-pressed="true"
                onClick={(e) => e.preventDefault()}
              >
                Edit Profile
              </Button>
            </Flex>
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
        {/* <Button
          fontSize={[12, 12, 15, 15]}
          borderRadius="full"
          colorScheme="customBlue"
          _hover={{
            color: "white",
            bgColor: "customBlue.500",
            borderColor: "customBlue.500",
          }}
          // w={[150, 150, 200, 200]}
          shadow="md"
          fontWeight={400}
          ml={["xs", "xs", "sm", "md"]}
        >
          CLAIM MBUC
        </Button> */}
      </Flex>
      <Box
        flex={3}
        textAlign={"justify"}
        minW={isLessThan550 ? "98vw" : "60vw"}
      >
        <Stack minW={"320px"} m="auto">
          <SimpleGrid
            columns={isLessThan768 ? 2 : 4}
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
                borderLeftColor="customBlue.500"
                justifyContent="space-evenly"
              >
                <Box
                  fontSize="md"
                  lineHeight={"shorter"}
                  fontWeight="bold"
                  color="customBlue.500"
                  fontFamily={"sans-serif"}
                >
                  {data.score}
                </Box>
                <Text
                  whiteSpace={"nowrap"}
                  fontSize={{ base: "16px", md: "40px", lg: "md" }}
                  fontFamily={"sans-serif"}
                >
                  {data.label}
                </Text>
                {data.content && data.content}
              </Stack>
            ))}
          </SimpleGrid>
        </Stack>
        {isLessThan768 ? (
          <Accordion mt={"8"} variant="enclosed" defaultIndex={0}>
            {TABS.map((tab) => {
              return (
                <AccordionItem key={tab.id}>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Text
                        fontFamily={"sans-serif"}
                        fontSize="md"
                        color={"customBlue.500"}
                        fontWeight={"hairline"}
                      >
                        {tab.title}
                      </Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>{tab.content}</AccordionPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
        ) : (
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
        )}
        <Box w="100%"></Box>
      </Box>
    </Flex>
  );
};

export default UserProfile;
