import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import Layout from "../../components/Layout/Layout";
import ProfileEdit from "../../components/Profile/edit";
import useEthersProvider from "../../hooks/useEthersProvider";

const Edit = () => {
  const { address } = useEthersProvider();

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
      <ProfileEdit />
    </Layout>
  );
};

export default Edit;
