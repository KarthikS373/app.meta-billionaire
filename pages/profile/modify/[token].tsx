import React from "react";
import Image from "next/image";
import { Box, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react";

import Layout from "../../../components/Layout/Layout";
import layers from "../../../public/assets/layers";

const CustomizeNFT = () => {
  return (
    <Layout>
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
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection="column"
        gap={2}
      >
        <Heading>Coming soon</Heading>
        <Text>Trait Shop</Text>
      </Flex>
    </Layout>
  );
};

export default CustomizeNFT;
