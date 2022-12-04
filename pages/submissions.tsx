import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import CreateNewSubmission from "../components/CreateNewProduct/CreateNewSubmission";
import Layout from "../components/Layout/Layout";
import useEthersProvider from "../hooks/useEthersProvider";

const SubmissionsPage = () => {
  const { address } = useEthersProvider();

  return (
    <Layout>
      {address ? (
        <CreateNewSubmission />
      ) : (
        <Flex align="center" justify="center">
          <Text fontSize={25} color="customBlue.500">
            Connect your wallet
            <br /> to access this page
          </Text>
        </Flex>
      )}
    </Layout>
  );
};

export default SubmissionsPage;
