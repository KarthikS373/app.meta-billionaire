import React from "react";
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
} from "@chakra-ui/react";

import Layout from "../../../components/Layout/Layout";
import layers from "../../../public/assets/layers";

// https://ipfs.io/ipfs/QmaAUVnbzVtksdRv36XFAiqRwLbnPNrmP6Rhpi4oyGXkdG/166.png

const CustomizeNFT = () => {
  return (
    <Layout>
      <Box
        mx={[2, 2, 12, 20]}
        height={"full"}
        px={[0, 1, 2, 2]}
        py={[2, 2, 8, 16]}
        w={["full", "full"]}
      >
        <Grid templateColumns={["repeat(1, 1fr)", "repeat(3, 1fr)"]} gap={6} w={"full"}>
          <GridItem>
            <Flex gap={2} flexDirection={"column"} alignItems={"start"}>
              <Image
                rounded={20}
                maxHeight={600}
                src={
                  "https://ipfs.io/ipfs/QmaAUVnbzVtksdRv36XFAiqRwLbnPNrmP6Rhpi4oyGXkdG/166.png"
                }
                alt={"NFT"}
              />
              <Box
                className="shadow border border-gray-500/25"
                w={"full"}
                rounded={20}
                px={2}
                py={4}
              >
                <Heading fontSize={[12, 12, 20, 32]}>MB # 166</Heading>
                <hr />
                <Text mt={2}>Attributes</Text>
                <Grid templateColumns="repeat(3, 1fr)" gap={3}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
                    (attribute, index) => (
                      <GridItem
                        key={attribute}
                        className="center flex-col px-4 py-6 text-center border-2 border-blue-700/75 rounded-md shadow-md"
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
          <GridItem colSpan={2}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam a
            culpa dolores, voluptatibus sapiente aperiam nesciunt suscipit!
            Autem quos tempora, dolorum eligendi soluta, adipisci alias
            voluptatibus laborum dolor quia esse veniam ex neque, vel
            temporibus.
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
