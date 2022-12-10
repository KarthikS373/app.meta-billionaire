import { Box, Flex } from "@chakra-ui/react";
import React from "react";

import Layout from "../components/Layout/Layout";
import NetworkCard from "../components/Network/NetworkCards";

const network = () => {
  return (
    <Layout>
      <Flex w={"100vw"} justifyContent={"center"}>
        <NetworkCard />
      </Flex>
    </Layout>
  );
};

export default network;
