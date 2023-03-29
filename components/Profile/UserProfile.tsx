import { useEffect, useState } from "react";
import { BsTwitter } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { BiEdit } from "react-icons/bi";

import NextImage from "next/image";
import { Trait } from "@prisma/client";
import { ethers } from "ethers";
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
  VStack,
  Image,
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
  useToast,
  Input,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import NFTCard from "./NFTCard";
import backdrop from "../../assets/backdrop.jpeg";
import { fetchFirestoreData } from "../../lib/firebase";
import axios from "../../lib/api";
import useEthersProvider from "../../hooks/useEthersProvider";
import contractABI from "../../contracts/mbuc/MbucABI.json";

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
  const { address, provider, chainId } = useEthersProvider();

  const [profileImage, setProfileImage] = useState("");
  const [user, setUser] = useState({
    about: "",
    email: "",
    discord: "",
    website: "",
    twitter: "",
  });
  const [verifToken, setVerifToken] = useState<string | null>(null);
  const [traitRequests, setTraitRequests] = useState<any[] | null>(null);
  const [current, setCurrent] = useState<number>(-1);
  const [collection, setCollection] = useState<Trait[]>([]);

  useEffect(() => {
    const temp: Trait[] = [];
    if (traitRequests)
      if (current !== -1) {
        traitRequests[current]?.request?.map((request: any) => {
          axios
            .get(`https://app.metabillionaire.com/api/getTraits?id=${request}`)
            .then((res) => {
              console.log(res.data);
              temp.push(res.data.data);
              setCollection(temp);
            });
        });
      }
  }, [traitRequests, current]);

  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    fetchFirestoreData(userId)
      .then((res) => {
        if (res) {
          setProfileImage(res.dp);
          setUser({
            about: res.about,
            email: res.email,
            discord: res.discord,
            website: res.website,
            twitter: res.twitter,
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
  const [usernameEditMode, setUsernameEditMode] = useState(false);
  const [newUserNickName, setNewUserNickName] = useState<string>("");

  const updateNickName = async (e: any) => {
    e.preventDefault();
    if (!executeRecaptcha) {
      toast({
        description:
          "An error occured with the robots verification, please try again...",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }
    const result = await executeRecaptcha("updateUser");
    if (result) {
      setVerifToken(result);
    } else {
      toast({
        description:
          "An error occured with the robots verification, please try again...",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (verifToken) {
      updateFinalUser();
    }
  }, [verifToken]);

  useEffect(() => {
    if (userId) {
      console.clear();
      axios
        .get(
          `https://app.metabillionaire.com/api/getTraitRequests?address=${userId}`
        )
        .then((res) => {
          console.log(res.data);
          setTraitRequests(res.data.data);
        })
        .catch((err) => console.log(err));
    }
  }, [userId]);

  const updateFinalUser = async () => {
    const { data } = await axios.post(`/updateNickname`, {
      address: address,
      token: verifToken,
      nickname: newUserNickName,
    });

    if (data) {
      setUsernameEditMode(false);

      toast({
        description: "Nickname updated successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      setUsernameEditMode(false);
      toast({
        description: "An error occured",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const transact = async (order: string, amount: string, items: string[]) => {
    if (address) {
      if (chainId === 137) {
        try {
          const signer = provider.getSigner();
          const wei = ethers.utils.parseEther(amount.toString());
          console.log("WEI: ", wei);

          const tx = {
            //TODO: Address to transfer
            to: "0x08749FFE5CDAe2fa83B0419f3C15AAC9335fd476",
            value: wei.toString(),
          };

          const receipt = await signer.sendTransaction(tx);
          await receipt.wait(2);

          console.log(receipt);

          await axios.post(
            "https://app.metabillionaire.com/api/setTraitPaymentStats",
            {
              order: order,
              address: address,
              paymentStatus: "paid",
              items: items,
            }
          );

          toast({
            description: "Successfully payed " + amount,
            status: "success",
            duration: 1500,
            isClosable: true,
          });
        } catch (e: any) {
          if (e.message.includes("insufficient funds")) {
            toast({
              description: "Insufficient Funds",
              status: "error",
              duration: 1500,
              isClosable: true,
            });
          } else {
            toast({
              description: "Something went wrong",
              status: "error",
              duration: 1500,
              isClosable: true,
            });
          }

          await axios
            .post("https://app.metabillionaire.com/api/setTraitPaymentStats", {
              order: order,
              address: address,
              paymentStatus: "failed",
              items: [],
            })
            .then((res) => {})
            .catch((err) => {});
        }
      } else {
        toast({
          description: "Please switch to Polygon network",
          status: "error",
          duration: 1500,
          isClosable: true,
        });
      }
    } else {
      toast({
        description: "Please connect your wallet",
        status: "error",
        duration: 1500,
        isClosable: true,
      });
    }
  };

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
                      address={address}
                      visitor={visitor}
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
                      address={address}
                      visitor={visitor}
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
    !visitor
      ? {
          id: 3,
          title: "Trait shop",
          content:
            traitRequests && traitRequests?.length > 0 ? (
              <Box w={"100%"} minH={["10vh", null, "40vh"]}>
                <Accordion
                  w={"full"}
                  h={"full"}
                  allowToggle
                  mt={4}
                  onChange={(e) => {
                    setCurrent(e as number);
                  }}
                >
                  {traitRequests?.map((trait, index) => {
                    return (
                      <AccordionItem
                        h={"full"}
                        key={trait.order}
                        className="border-0 outline-none"
                      >
                        <h2>
                          <AccordionButton className="min-h-16 center w-full whitespace-pre-wrap justify-between border-0 outline-none">
                            <Box flex="1" textAlign="left">
                              Trait change request: #{trait.token} :{" "}
                              <>
                                {trait.isApproved === null ? (
                                  <Text
                                    color="yellow.300"
                                    className="md:inline-block"
                                  >
                                    {" "}
                                    Under review
                                  </Text>
                                ) : trait.isApproved ? (
                                  <Text
                                    color="green.500"
                                    className="md:inline-block"
                                  >
                                    Approved
                                  </Text>
                                ) : (
                                  <Text
                                    color="red.500"
                                    className="md:inline-block"
                                  >
                                    Rejected
                                  </Text>
                                )}
                              </>
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          {trait.adminNote && (
                            <Text fontSize={16} fontFamily={"sans-serif"}>
                              Admin remarks: {trait.adminNote}
                            </Text>
                          )}{" "}
                          <Grid
                            templateColumns={[
                              "repeat(1, 1fr)",
                              "repeat(2, 1fr)",
                              "repeat(4, 1fr)",
                              "repeat(6, 1fr)",
                            ]}
                            my={4}
                            justifyContent={"flex-start"}
                            alignItems={"flex-end"}
                            flexDirection={"row"}
                            gap={4}
                          >
                            {collection.map((item, index) => (
                              <GridItem
                                key={item.asset}
                                w={"full"}
                                h={"full"}
                                className={
                                  "group relative rounded border shadow md:!h-64 sm:!w-32 md:!w-64 !w-full overflow-hidden"
                                }
                              >
                                <Box h={"full"} w={"full"}>
                                  <Image
                                    src={`/assets/layers/${item.category
                                      .split("-")
                                      .join(" ")
                                      .replace(
                                        /(^\w{1})|(\s+\w{1})/g,
                                        (letter: string) => letter.toUpperCase()
                                      )}/${item.imagePath}`}
                                    alt={item.asset}
                                    className={
                                      "w-full object-cover object-center"
                                    }
                                  />
                                </Box>
                              </GridItem>
                            ))}
                          </Grid>
                          <Flex w={"full"} justifyContent={"flex-end"}>
                            <Button
                              colorScheme="blue"
                              variant="solid"
                              fontFamily={"sans-serif"}
                              disabled={!trait.isApproved}
                              onClick={() => {
                                transact(
                                  trait.order,
                                  trait.total,
                                  trait.request
                                );
                              }}
                            >
                              Pay {trait.total} MB
                            </Button>
                          </Flex>
                        </AccordionPanel>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </Box>
            ) : (
              <Box
                w={"100%"}
                h={["10vh", null, "40vh"]}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                color={"black"}
                textAlign={"center"}
              >
                You currently have no active requests
              </Box>
            ),
        }
      : undefined,
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
  const toast = useToast();

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
              {usernameEditMode ? (
                <form onSubmit={updateNickName}>
                  <Input
                    required
                    colorScheme="customBlue"
                    fontSize={15}
                    w={"100%"}
                    type="text"
                    my="xs"
                    value={newUserNickName}
                    onChange={(e) => setNewUserNickName(e.target.value)}
                  />
                  <Flex align="center" justify="center" w="90%">
                    <Button
                      fontSize={[12, 12, 15, 15]}
                      px="sm"
                      onClick={() => setUsernameEditMode(false)}
                      borderRadius="full"
                      borderWidth={1}
                      borderColor="customBlue.500"
                      colorScheme="customBlue"
                      variant="outline"
                      _hover={{
                        color: "white",
                        bgColor: "customBlue.500",
                        borderColor: "white",
                      }}
                      shadow="md"
                      fontWeight={400}
                      ml="sm"
                    >
                      Cancel
                    </Button>

                    <Button
                      fontSize={[12, 12, 15, 15]}
                      px="sm"
                      type="submit"
                      borderRadius="full"
                      borderWidth={1}
                      borderColor="customBlue.500"
                      colorScheme="customBlue"
                      _hover={{
                        color: "customBlue.500",
                        bgColor: "white",
                        borderColor: "customBlue.500",
                      }}
                      shadow="md"
                      fontWeight={400}
                      ml="sm"
                    >
                      Save
                    </Button>
                  </Flex>
                </form>
              ) : (
                <Heading fontSize={"sm"} whiteSpace="nowrap">
                  {username}{" "}
                  {!visitor && (
                    <Icon
                      cursor="pointer"
                      as={BiEdit}
                      color="customBlue.500"
                      w={5}
                      h={5}
                      onClick={() => setUsernameEditMode(true)}
                    />
                  )}
                </Heading>
              )}
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
              {user.twitter && user.twitter.length > 0 && (
                <Button
                  flex={1}
                  py={1}
                  px={14}
                  fontSize={"sm"}
                  rounded={"full"}
                  bg={"blue.400"}
                  color={"white"}
                  onClick={() => {
                    window.open(`https://twitter.com/${user.twitter}`);
                  }}
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
              {user.discord && user.discord.length > 0 && (
                <Button
                  flex={1}
                  py={1}
                  px={14}
                  fontSize={"sm"}
                  rounded={"full"}
                  maxW={"218.42px "}
                  onClick={() => {
                    //   window.open(`https://discordapp.com/users/${user.discord}`)
                    navigator.clipboard.writeText(
                      (user.discord || "").toString()
                    );

                    toast({
                      title: "",
                      description: "Discord username copied to clipboard",
                      status: "info",
                      duration: 3000,
                      isClosable: true,
                    });
                  }}
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
              {/* {user.website && user.website.length > 0 && (
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
              )} */}
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
              if (tab)
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
              {TABS.map((tab) =>
                tab ? (
                  <Tab key={tab.id}>
                    <Text
                      // fontFamily={""}
                      fontSize="md"
                      fontWeight={"semibold"}
                    >
                      {tab.title}
                    </Text>
                  </Tab>
                ) : (
                  <></>
                )
              )}
            </TabList>
            <TabPanels>
              {TABS.map((tab) =>
                tab ? <TabPanel key={tab.id}>{tab.content}</TabPanel> : <></>
              )}
            </TabPanels>
          </Tabs>
        )}
        <Box w="100%"></Box>
      </Box>
    </Flex>
  );
};

export default UserProfile;
