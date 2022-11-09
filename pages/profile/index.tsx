import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Input,
  Flex,
  useToast,
} from "@chakra-ui/react";

import Layout from "../../components/Layout/Layout";
import { useRouter } from "next/router";
import useEthersProvider from "../../hooks/useEthersProvider";
import { ethers } from "ethers";

const Profile = () => {
  const toast = useToast();
  const { address: userAddress } = useEthersProvider();
  const router = useRouter();
  const [address, setAddress] = useState("");

  if (!userAddress) {
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
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Search for a <br />
            <Text as={"span"} color={"customBlue.500"}>
              Profile
            </Text>
          </Heading>
          <Flex
            direction={["column", "row"]}
            gap={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <Input
              type="tel"
              minW={"80%"}
              placeholder="Address"
              fontFamily={"sans-serif"}
              fontSize={"sm"}
              fontWeight={"hairline"}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Button
              paddingX={8}
              paddingY={2.5}
              colorScheme={"customBlue"}
              fontFamily={"sans-serif"}
              size={"small"}
              onClick={() => {
                if (ethers.utils.isAddress(address)) {
                  return router.push(`/profile/${address}`);
                }
                setAddress("");
                toast({
                  description: "Enter a valid wallet address",
                  status: "error",
                  duration: 3000,
                  isClosable: true,
                });
              }}
            >
              Search
            </Button>
          </Flex>
        </Stack>
      </Container>
    </Layout>
  );
};

export default Profile;
