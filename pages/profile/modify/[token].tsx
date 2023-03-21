import React, { useEffect, useState } from "react";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
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
import axios from "axios";

import Layout from "../../../components/Layout/Layout";
import layers from "../../../public/assets/layers";

// https://ipfs.io/ipfs/QmaAUVnbzVtksdRv36XFAiqRwLbnPNrmP6Rhpi4oyGXkdG/166.png

const CustomizeNFT: NextPage<
  InferGetServerSidePropsType<GetServerSideProps>
> = ({ data }) => {
  const [checked, setChecked] = useState<
    Array<{ key: string; layer: string; cost: number }>
  >([]);
  const [current, setCurrent] = useState<string | null>(null);
  const [highlight, setHighlight] = useState<{
    key: string;
    layer: string;
  } | null>(null);
  const [requireStateUpdate, setRequireStateUpdate] = useState<boolean>(false);

  const router = useRouter();

  const { token } = router.query;

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

  const toggleItem = (key: string, layer: string, cost: number) => {
    const ifExist = checked.findIndex((item) => item.key === key);

    if (ifExist !== -1) {
      const temp = checked;
      temp[ifExist] = {
        key: key,
        layer: layer,
        cost: cost,
      };
      setChecked(temp);
      setRequireStateUpdate((prev: boolean) => !prev);
    } else {
      setChecked((prev) => [...prev, { key, layer, cost }]);
      setRequireStateUpdate((prev: boolean) => !prev);
    }
  };

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
              <Image
                rounded={[5, 20]}
                maxHeight={600}
                w={"full"}
                src={
                  "https://ipfs.io/ipfs/QmaAUVnbzVtksdRv36XFAiqRwLbnPNrmP6Rhpi4oyGXkdG/166.png"
                }
                alt={"NFT"}
              />
              <Box
                rounded={[5, 20]}
                className="shadow border border-gray-500/25"
                w={"full"}
                px={2}
                py={4}
              >
                <Heading
                  fontSize={[20, 20, 20, 30]}
                  px={4}
                  _hover={{ color: "customBlue.500", cursor: "pointer" }}
                >
                  MB # 166
                </Heading>
                <hr />
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
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
                    (attribute, index) => (
                      <GridItem
                        key={attribute}
                        className="center flex-col px-4 py-6 text-center border-2 border-blue-700/75 rounded md:rounded-md shadow-md"
                      >
                        <Text
                          fontFamily={"sans-serif"}
                          className="text-blue-600"
                        >
                          {"Feature"}
                        </Text>
                        <Box mt={1}>
                          <Text className="">{"Feature"}</Text>
                          <Text
                            as={"p"}
                            fontFamily={"sans-serif"}
                            className="font-light text-gray-500 text-xs"
                          >
                            lorem ipsum,lorem ipsum
                          </Text>
                        </Box>
                      </GridItem>
                    )
                  )}
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
                                    id: number;
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
                                          toggleItem(
                                            key.title,
                                            layer.imagePath,
                                            layer.cost
                                          );
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
                                          </Box>
                                        </Box>
                                      </GridItem>
                                    );
                                    // <Box key={layer.id}>{layer.asset}</Box>;
                                  }
                                )}
                            </Grid>
                          </AccordionPanel>
                        </AccordionItem>
                      );
                    }
                  )}
                  {/* {Object.keys(layers).map((key, index) => {
                    return (
                      <AccordionItem key={key} w={"full"}>
                        <AccordionButton
                          onClick={(e) => {
                            if (current !== null && current === key) {
                              setCurrent(null);
                            } else {
                              setCurrent(key);
                            }
                          }}
                        >
                          <Flex
                            justifyContent={"space-between"}
                            w={"full"}
                            h={[10, 10, 12, 16]}
                            alignItems={"center"}
                          >
                            <h1>{key}</h1>
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
                            {Object.keys(layers[key]).map((layer, i) => {
                              return (
                                <GridItem
                                  key={layer}
                                  w="100%"
                                  onClick={() => {
                                    toggleItem(key, layer, layers[key][layer]);
                                  }}
                                >
                                  <Box
                                    w={"full"}
                                    overflow="hidden"
                                    cursor={"pointer"}
                                    className={
                                      "group relative rounded-3xl border shadow " +
                                      (highlight?.key === key &&
                                      highlight?.layer === layer
                                        ? "bg-[#294BF5]/25 border border-[#294BF5]"
                                        : "bg-black/10")
                                    }
                                  >
                                    <Image
                                      loading="eager"
                                      src={`/assets/layers/${key}/${layer}`}
                                      alt={layer}
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
                                        {layer
                                          .replace(".png", "")
                                          .replace(".jpg", "")
                                          .replace(".jpeg", "")
                                          .replace("-", "")
                                          .replace(/[0-9]/g, "")}
                                      </Heading>
                                      <Text
                                        as="p"
                                        fontSize={[12, 12, 14, 14]}
                                        className="text-white/75"
                                      >
                                        {layers[key][layer]} MBUC
                                      </Text>
                                    </Box>
                                  </Box>
                                </GridItem>
                              );
                            })}
                          </Grid>
                        </AccordionPanel>
                      </AccordionItem>
                    );
                  })} */}
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
    const data = await axios.get(`http://localhost:3000/api/getTraits`);

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
