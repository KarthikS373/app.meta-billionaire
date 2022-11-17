import React, { useEffect, useState } from "react";
import { BsTwitter } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import NextImage from "next/image";
import {
  Heading,
  Avatar,
  Box,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
  Icon,
  HStack,
  Image,
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
  Spinner,
} from "@chakra-ui/react";

import NFTCard from "./NFTCard";
import backdrop from "../../assets/backdrop.jpeg";
import { fetchFirestoreData } from "../../lib/firebase";
import { useRouter } from "next/router";

const UserProfile = ({
  username = "cyberpunk373",
  userId = "",
  products = [],
  balance = 0,
  stakedNfts = [],
  holding = "0",
  claims = "0",
  haveNFT = true,
  haveStaked = true,
  visitor = false,
}) => {
  const [profileImage, setProfileImage] = useState("");
  const [user, setUser] = useState({
    about: "",
    email: "",
    discord: null,
    website: "",
    twitter: null,
  });

  useEffect(() => {
    fetchFirestoreData(userId)
      .then((res) => {
        if (res) {
          setProfileImage(res.dp);
          setUser({
            about: res.about,
            email: res.email,
            // discord: res.discord,
            discord: null,
            website: res.website,
            twitter: null,
          });
        }
      })
      .catch((err) => console.log(err));
  }, [userId]);

  useEffect(() => {
    if (!profileImage) {
      if (products.length > 0) {
        // @ts-ignore
        setProfileImage(products[0].image);
      } else if (stakedNfts.length > 0) {
        // @ts-ignore
        setProfileImage(stakedNfts[0].image);
      } else {
        // @ts-ignore
        setProfileImage(null);
      }
    }
  }, [products, profileImage, stakedNfts]);

  const TABS = [
    {
      id: 1,
      title: "NFTs",
      content: (
        <>
          {haveNFT ? (
            products.length != 0 ? (
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
                h={["20vh", null, "40vh"]}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Spinner m="0 auto" size="xl" mt="lg" color="customBlue.500" />
              </Box>
            )
          ) : (
            <Box
              w={"100%"}
              h={["20vh", null, "40vh"]}
              display={"flex"}
              justifyContent={"center"}
              textAlign={"center"}
              alignItems={"center"}
            >
              You don&apos;t have any MBs in your wallet
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
          {haveStaked ? (
            stakedNfts.length != 0 ? (
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
                <Spinner m="0 auto" size="xl" mt="lg" color="customBlue.500" />
              </Box>
            )
          ) : (
            <Box
              w={"100%"}
              h={["10vh", null, "40vh"]}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              textAlign={"center"}
            >
              You haven&apos;t staked any NFTs
            </Box>
          )}
        </>
      ),
    },
  ];

  const statData = visitor
    ? [
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
      ]
    : [
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
          score: Number.parseFloat(claims).toFixed(2).toString(),
          content:
            claims == "0" ? (
              <>Claimable </>
            ) : (
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

  const router = useRouter();

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
        // maxH={"850px"}
        maxH={"80vh"}
      >
        <Box
          maxW={"320px"}
          maxH={"80vh"}
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
          <NextImage
            height={4000}
            width={10000}
            src={backdrop}
            alt="Abstract background"
            objectFit={"cover"}
          />
          <Flex justify={"center"} mt={-12}>
            <Avatar
              size={"xl"}
              src={
                profileImage ? profileImage : "/assets/default-profile-pic.jpeg"
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
              <Text color={"gray.500"} fontSize="small">
                {userId.slice(0, 3)}....{userId.slice(-8)}
              </Text>
            </VStack>
            <Flex justifyContent={"space-evenly"} mt={4} flex={1}>
              {!visitor && (
                <Button
                  fontSize={["12px", null, "14px"]}
                  mb={"12%"}
                  fontFamily={"sans-serif"}
                  onClick={() => router.push("./edit")}
                >
                  Edit profile
                </Button>
              )}
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
              {/* <Button
                color="secondary"
                fontFamily={"sans-serif"}
                fontSize={"small"}
                aria-pressed="true"
                onClick={(e) => e.preventDefault()}
              >
                Edit Profile
              </Button> */}
            </Flex>
            <Text
              pt="16px"
              fontWeight="light"
              fontFamily="sans-serif"
              textAlign={user.about.length > 40 ? "justify" : "center"}
            >
              {user.about && user.about}
            </Text>

            <VStack mt={8} direction={"row"} spacing={4}>
              {user.twitter && (
                <Button
                  flex={1}
                  py={1}
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
                  <Icon as={BsTwitter} boxSize={8} />
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
              )}
              {user.discord && (
                <Button
                  flex={1}
                  py={1}
                  px={14}
                  fontSize={"md"}
                  rounded={"full"}
                  onClick={() =>
                    window.open(`https://discordapp.com/users/${user.discord}`)
                  }
                  _focus={{
                    bg: "gray.200",
                  }}
                >
                  <Icon as={FaDiscord} boxSize={8} />
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
              )}
              {user.website && (
                <div>
                  <Icon as={CgWebsite} boxSize={5} mr={5} />
                  <a
                    href={
                      user.website.startsWith("http")
                        ? user.website
                        : `https://${user.website}`
                    }
                    target="__blank"
                  >
                    <Text color="customBlue.500" display={"inline"}>
                      {user.website.slice(0, 10)}...
                    </Text>
                  </a>
                </div>
              )}
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
        flex={2}
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
                  fontSize={{ base: "14px", md: "40px", lg: "md" }}
                  fontWeight={"light"}
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
                    // fontFamily={""}
                    fontSize="md"
                    fontWeight={"semibold"}
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
