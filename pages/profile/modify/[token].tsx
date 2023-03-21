import React, { useEffect, useState } from "react";
import NextImage from "next/image";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  Button,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";

import Layout from "../../../components/Layout/Layout";
import layers from "../../../public/assets/layers";

// https://ipfs.io/ipfs/QmaAUVnbzVtksdRv36XFAiqRwLbnPNrmP6Rhpi4oyGXkdG/166.png

const CustomizeNFT = () => {
  const [checked, setChecked] = useState<
    Array<{ key: string; layer: string; cost: string }>
  >([]);
  const [current, setCurrent] = useState<string | null>(null);
  const [highlight, setHighlight] = useState<{
    key: string;
    layer: string;
  } | null>(null);
  const [requireStateUpdate, setRequireStateUpdate] = useState<boolean>(false);

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

  const toggleItem = (key: string, layer: string, cost: string) => {
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
              <Text
                mt={2}
                fontFamily={"poppins"}
                fontWeight={400}
                lineHeight={"24px"}
                fontSize={[18, 18, 24, 24]}
              >
                Trait shop
              </Text>
              <Accordion w={"full"} allowToggle>
                <Flex flexDirection={"column"} w={"full"}>
                  {Object.keys(layers).map((key, index) => {
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
                            {layers[key].map((layer, i) => {
                              return (
                                <GridItem
                                  key={layer}
                                  w="100%"
                                  onClick={() => {
                                    toggleItem(key, layer, "500");
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
                                          .replace(".jpeg", "")}
                                      </Heading>
                                      <Text
                                        as="p"
                                        fontSize={[12, 12, 14, 14]}
                                        className="text-white/75"
                                      >
                                        500 MBUC
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
                  })}
                </Flex>
              </Accordion>
            </Flex>
          </GridItem>
        </Grid>
      </Box>
      {/* <Flex justifyContent={"center"} my={20} alignItems={"center"} h={"full"}>
        <Box
          m={"auto"}
          border={"0.25px solid gray"}
          rounded={"2xl"}
          w={["full", "full", "80%", "80%"]}
          px={20}
          py={12}
        >
          {Object.keys(layers).map((key, index) => {
            return (
              <Box key={key} my={10}>
                <h1>{key}</h1>
                <Grid templateColumns="repeat(4, 1fr)" gap={6} my={2}>
                  {layers[key].map((layer, i) => {
                    return (
                      <GridItem
                        cursor={"pointer"}
                        _hover={{
                          bg: "rgba(0, 0, 0, 0.5)",
                        }}
                        key={layer}
                        w="100%"
                        bg="transparent"
                        border={"0.25px solid gray"}
                        rounded={20}
                      >
                        <Image
                          src={`/assets/layers/${key}/${layer}`}
                          alt={layer}
                          width={1920}
                          height={1080}
                          style={{
                            objectFit: "cover",
                            objectPosition: "center",
                          }}
                        />
                      </GridItem>
                    );
                  })}
                </Grid>
              </Box>
            );
          })}
        </Box>
      </Flex> */}
    </Layout>
  );
};

export default CustomizeNFT;
