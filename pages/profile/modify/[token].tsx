import React, { useEffect, useState } from "react";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import axios from "axios";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Button,
} from "@chakra-ui/react";

import ERC721Contract from "../../../utils/ABIs/ERC721";
import Layout from "../../../components/Layout/Layout";
import layers from "../../../public/assets/layers";

// https://ipfs.io/ipfs/QmaAUVnbzVtksdRv36XFAiqRwLbnPNrmP6Rhpi4oyGXkdG/166.png

const CustomizeNFT: NextPage<
  InferGetServerSidePropsType<GetServerSideProps>
> = ({ data }) => {
  const [checked, setChecked] = useState<
    Array<{ id: string; key: string; layer: string; cost: number }>
  >([]);
  const [current, setCurrent] = useState<string | null>(null);
  const [highlight, setHighlight] = useState<{
    key: string;
    layer: string;
  } | null>(null);
  const [requireStateUpdate, setRequireStateUpdate] = useState<boolean>(false);
  const [nft, setNft] = useState<{
    attributes: { trait_type: string; value: string }[];
    image: string;
    name: string;
    description: string;
    dna: string;
  } | null>(null);

  const router = useRouter();

  const { token, image, address } = router.query;

  const fetchMetadata = async (token: string) => {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_INFURA_MAIN_API
    );
    console.log(provider);
    if (provider && token) {
      try {
        const ERC721 = new ethers.Contract(
          ERC721Contract.address,
          ERC721Contract.abi,
          provider
        );
        const ipfs = await ERC721.tokenURI(token);
        console.log(`https://ipfs.io/ipfs/${ipfs.split("ipfs://")[1]}`);
        const meta = await fetch(
          `https://ipfs.io/ipfs/${ipfs.split("ipfs://")[1]}`
        );
        return meta;
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    console.clear();
    console.log(token);

    fetchMetadata(token as string).then(async (res) => {
      const text = await (await res?.blob())?.text();
      console.log(text);
      if (text) {
        const data = JSON.parse(text);
        console.log(data);
        let img;
        if (!image && data.image.startsWith("ipfs://")) {
          img = `https://ipfs.io/ipfs/${data.image.split("ipfs://")[1]}`;
        }
        setNft({
          image: (image as string) || (img as string),
          attributes: data.attributes,
          name: data.name,
          description: data.description,
          dna: "179d040de4be3fcb4c0c8653728e07671b24f292",
        });
      }
    });
  }, [token]);

  useEffect(() => {
    if (current) {
      const check = checked.filter((item) => item.key === current)[0];
      if (check) {
        setHighlight({
          key: check.key,
          layer: check.layer,
        });
      } else {
        setHighlight(null);
      }
    } else {
      setHighlight(null);
    }
  }, [current, checked, requireStateUpdate]);

  const toggleItem = (id: string, key: string, layer: string, cost: number) => {
    const ifExist = checked.findIndex((item) => item.key === key);

    if (highlight !== null && checked[ifExist]?.layer === highlight?.layer) {
      const temp = checked;
      temp.splice(ifExist, 1);
      setChecked(temp);
      setHighlight(null);
      setRequireStateUpdate((prev: boolean) => !prev);
    } else {
      if (ifExist !== -1) {
        const temp = checked;
        temp[ifExist] = {
          id: id,
          key: key,
          layer: layer,
          cost: cost,
        };
        setChecked(temp);
        setRequireStateUpdate((prev: boolean) => !prev);
      } else {
        setChecked((prev) => [...prev, { id, key, layer, cost }]);
        setRequireStateUpdate((prev: boolean) => !prev);
      }
    }
  };

  if (!address) {
    return (
      <Layout>
        <Flex align="center" justify="center">
          <Text fontSize={25} color="customBlue.500">
            Connect your wallet
            <br /> to access this page
          </Text>
        </Flex>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box
        height={"full"}
        px={[0, 8, 12, 16]}
        py={[2, 2, 8, 16]}
        w={["full", "full"]}
      >
        <Grid
          templateColumns={["repeat(1, 1fr)", "repeat(3, 1fr)"]}
          gap={6}
          w={"full"}
        >
          <GridItem
            position={"sticky"}
            className={"md:top-32 left-0 self-start"}
          >
            <Flex
              gap={2}
              flexDirection={"column"}
              alignItems={"start"}
              w={"full"}
              px={4}
            >
              <Heading
                fontSize={[20, 20, 20, 30]}
                px={4}
                _hover={{ color: "customBlue.500", cursor: "pointer" }}
              >
                MB # {token as string}
              </Heading>
              <Image
                rounded={[5, 20]}
                maxHeight={600}
                w={"full"}
                src={nft?.image || (image as string)}
                alt={"NFT"}
              />
              <Box
                rounded={[5, 20]}
                className="shadow border border-gray-500/25"
                w={"full"}
                px={2}
                py={4}
              >
                <Flex
                  justifyContent={"space-between"}
                  w={"full"}
                  my={1}
                  alignItems={"center"}
                >
                  <Text
                    mt={2}
                    fontFamily={"poppins"}
                    fontWeight={600}
                    lineHeight={"24px"}
                    fontSize={[16, 16, 20, 20]}
                  >
                    Attributes
                  </Text>
                </Flex>
                <Grid
                  templateColumns={["repeat(1, 1fr)", "repeat(3, 1fr)"]}
                  gap={3}
                >
                  {nft?.attributes.map((attribute, index) => (
                    <GridItem
                      key={attribute.trait_type}
                      className="center flex-col px-4 py-6 text-center border-2 border-blue-700/75 rounded md:rounded-md shadow-md"
                    >
                      <Text fontFamily={"sans-serif"} className="text-blue-600">
                        {attribute.trait_type}
                      </Text>
                      <Box mt={1}>
                        <Text className="">{attribute.value}</Text>
                      </Box>
                    </GridItem>
                  ))}
                </Grid>
              </Box>
            </Flex>
          </GridItem>
          <GridItem colSpan={[1, 2]} fontFamily={"poppins"} h={"fit-content"}>
            <Flex
              flexDirection={"column"}
              gap={4}
              justifyContent={"flex-start"}
              alignItems={"flex-start"}
              h={"full"}
              py={[1, 2, 4, 4]}
              px={[2, 2, 4, 8]}
              className={"border rounded-sm md:rounded-3xl"}
            >
              <Flex
                flexDirection={["column", "row"]}
                gap={4}
                w="full"
                justifyContent={"space-between"}
              >
                <Text
                  mt={2}
                  fontFamily={"poppins"}
                  fontWeight={400}
                  lineHeight={"24px"}
                  fontSize={[20, 22, 26, 28]}
                >
                  Trait shop
                </Text>
                <Button
                  fontSize={[12, 12, 15, 15]}
                  px="md"
                  colorScheme="customBlue"
                  shadow="md"
                  textTransform="uppercase"
                  fontFamily="METAB"
                  disabled={checked.length === 0}
                  onClick={() => {
                    if (checked.length === 0) return;

                    router.push(
                      {
                        pathname: `/profile/modify/checkout`,
                        query: {
                          data: JSON.stringify(checked),
                          length: checked.length,
                          token: token,
                        },
                      },
                      "/profile/modify/checkout"
                    );
                  }}
                >
                  Continue
                </Button>
              </Flex>
              <Accordion w={"full"} allowToggle>
                <Flex flexDirection={"column"} w={"full"}>
                  {layers?.map(
                    (
                      key: { id: number; title: string; slug: string },
                      index: number
                    ) => {
                      return (
                        <AccordionItem w={"full"} key={key.id}>
                          <AccordionButton
                            onClick={(e) => {
                              if (current !== null && current === key.title) {
                                setCurrent(null);
                              } else {
                                setCurrent(key.title);
                              }
                            }}
                          >
                            <Flex
                              justifyContent={"space-between"}
                              w={"full"}
                              h={[10, 10, 12, 16]}
                              alignItems={"center"}
                            >
                              <h1>{key.title}</h1>
                              <AccordionIcon />
                            </Flex>
                          </AccordionButton>
                          <AccordionPanel>
                            <Grid
                              templateColumns={[
                                "repeat(2, 1fr)",
                                "repeat(4, 1fr)",
                              ]}
                              gap={6}
                              my={2}
                            >
                              {data?.data
                                ?.filter(
                                  (item: {
                                    id: number;
                                    category: string;
                                    asset: string;
                                    cost: number;
                                    shopQuantity: number;
                                    imagePath: string;
                                  }) => item.category === key.slug
                                )
                                .map(
                                  (layer: {
                                    id: string;
                                    category: string;
                                    asset: string;
                                    cost: number;
                                    shopQuantity: number;
                                    imagePath: string;
                                  }) => {
                                    return (
                                      <GridItem
                                        key={layer.id}
                                        w="100%"
                                        onClick={() => {
                                          if (layer.shopQuantity > 0) {
                                            toggleItem(
                                              layer.id,
                                              key.title,
                                              layer.imagePath,
                                              layer.cost
                                            );
                                          }
                                        }}
                                      >
                                        <Box
                                          w={"full"}
                                          overflow="hidden"
                                          cursor={"pointer"}
                                          className={
                                            "group relative rounded-3xl border shadow " +
                                            (highlight?.key === key.title &&
                                            highlight?.layer === layer.imagePath
                                              ? "bg-[#294BF5]/25 border border-[#294BF5]"
                                              : "bg-black/10")
                                          }
                                        >
                                          <Image
                                            loading="eager"
                                            src={`/assets/layers/${key.title}/${layer.imagePath}`}
                                            alt={layer.asset}
                                            width={1920}
                                            height={1080}
                                            className="!h-32 md:!h-64"
                                            style={{
                                              objectFit: "cover",
                                              objectPosition: "center",
                                            }}
                                          />
                                          <Box className="absolute flex-col top-96 opacity-0 group-hover:opacity-100 group-hover:top-0 transition-all duration-300 center h-full w-full bg-black/75 text-white">
                                            <Heading
                                              fontSize={[12, 16, 18, 20]}
                                              px={1}
                                              className="text-xl text-white/75 text-center"
                                            >
                                              {layer.asset}
                                            </Heading>
                                            <Text
                                              as="p"
                                              fontSize={[12, 12, 14, 14]}
                                              className="text-white/75"
                                            >
                                              {layer.cost} MBUC
                                            </Text>
                                            <Text
                                              as="p"
                                              fontSize={[12, 12, 14, 14]}
                                              className="text-white/75"
                                            >
                                              {layer.shopQuantity} Items left
                                            </Text>
                                          </Box>
                                        </Box>
                                      </GridItem>
                                    );
                                  }
                                )}
                            </Grid>
                          </AccordionPanel>
                        </AccordionItem>
                      );
                    }
                  )}
                </Flex>
              </Accordion>
            </Flex>
          </GridItem>
        </Grid>
      </Box>
    </Layout>
  );
};

export default CustomizeNFT;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { token } = query;

  try {
    const data = await axios.get(
      `https://app.metabillionaire.com/api/getTraits`
    );

    return {
      props: {
        data: data.data,
      },
    };
  } catch (e) {
    return {
      props: {
        data: null,
      },
      redirect: "/",
    };
  }

  return {
    props: {
      data: null,
    },
    redirect: "",
  };
};
