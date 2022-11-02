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
} from "@chakra-ui/react";

import Layout from "../../components/Layout/Layout";
import { useRouter } from "next/router";
import useEthersProvider from "../../hooks/useEthersProvider";

const Profile = () => {
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { address: userAddress } = useEthersProvider();
    console.log(userAddress);
  } catch (e) {
    console.warn(e);
  }
  const router = useRouter();
  const [address, setAddress] = useState("");

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
              onChange={(e) => setAddress(e.target.value)}
            />
            <Button
              paddingX={8}
              paddingY={2.5}
              colorScheme={"customBlue"}
              fontFamily={"sans-serif"}
              size={"small"}
              onClick={() => router.push(`/profile/${address}`)}
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
