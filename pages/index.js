import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Spinner,
  Text,
  useToast,
  Link,
  Icon,
} from "@chakra-ui/react";
import { IoLogoDiscord, IoLogoTwitter } from "react-icons/io5";
import Layout from "../components/Layout/Layout";
import useEthersProvider from "../hooks/useEthersProvider";
import contractABI from "../utils/contract.json";
import { ethers } from "ethers";
import ReplayList from "../components/ReplayList/ReplayList";

const contractAddress = "0xc6C817cd60E17Fed0AF2A759624e02Dd6c812E64";

const Home = () => {
  const {
    // address,
    provider,
  } = useEthersProvider();
  const [isLoading, setIsLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [nftCount, setNftCount] = useState(false);
  const toast = useToast();

  const address = "0x67fe11c921dc44cf0f68e733833abd5bd07dd077";

  useEffect(() => {
    if (address && provider) {
      checkNFT();
    }
  }, [address, provider]);

  const getPrice = async () => {
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );
    try {
      const data = await contract.balanceOf(address);

      if (
        address === "0x36Abb520Ec21444E7Bc785DbE0ACDc1d64c87128" ||
        Number(data._hex) > 0
      ) {
        setNftCount(Number(data._hex));
        setIsOwner(true);
        setIsLoading(false);
      } else {
        setNftCount(Number(data._hex));
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      toast({
        description: "error",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const checkNFT = async () => {
    setIsLoading(true);
    await getPrice();
    setIsLoading(false);
  };

  return (
    <Layout showFooter isAdmin={false}>
      <Flex
        align="center"
        justify="center"
        w="100%"
        minH="90vh"
        alignItems={isOwner ? "stretch" : "center"}
        flex={1}
      >
        {/* {isLoading ? (
          <Spinner color="customGray" mt="lg" />
        ) : isOwner ? ( */}
        <Flex
          align="center"
          justify="flex-start"
          flexDir="column"
          width="100%"
          flex={1}
        >
          <Text
            fontSize={[25, 25, 30, 30]}
            letterSpacing={2}
            fontWeight={600}
            mt={["sm", "sm", 0, 0]}
          >
            MEMBER AREA
          </Text>
          <ReplayList />
        </Flex>
        {/* ) : address ? (
          <Box textAlign="center" px="md">
            <Text
              fontSize={[25, 25, 30, 30]}
              letterSpacing={2}
              fontWeight={600}
            >
              You currently own {nftCount} items
            </Text>
            <Link
              href="https://opensea.io/collection/metabillionaire"
              isExternal
            >
              <Button
                m="0 auto"
                mt="md"
                colorScheme="customGray"
                size="md"
                fontSize={15}
              >
                Buy here
              </Button>
            </Link>
          </Box>
        ) : (
          <Text
            fontSize={[22, 22, 25, 25]}
            color="black"
            textTransform="uppercase"
            letterSpacing={1}
            fontWeight={600}
            textAlign="center"
            px="sm"
          >
            connect your wallet <br />
            to access the content
          </Text>
        )} */}
      </Flex>
      <Flex
        bgColor="customBlue.500"
        w="100%"
        align="center"
        justify="center"
        py="xs"
        px="xs"
        flexDir="column"
        shadow="lg"
      >
        <Flex>
          <Flex
            w="100%"
            as={Link}
            isExternal
            href="https://discord.gg/metabillionaire"
            align="center"
            justify="center"
            bgColor="#ffffff"
            flexDir="column"
            py="xs"
            px="xs"
            mx="20px"
            my="5px"
            borderRadius={10}
            cursor="pointer"
            transition="all ease 0.5s"
            _hover={{
              transform: "scale(1.05)",
            }}
            shadow="lg"
          >
            <Icon as={IoLogoDiscord} color="customBlue.500" w={42} h={42} />
          </Flex>
          <Flex
            w="100%"
            align="center"
            as={Link}
            isExternal
            href="https://twitter.com/metab_nft"
            justify="center"
            bgColor="#ffffff"
            flexDir="column"
            py="xs"
            px="xs"
            mx="20px"
            my="5px"
            borderRadius={10}
            cursor="pointer"
            transition="all ease 0.5s"
            _hover={{
              transform: "scale(1.05)",
            }}
            shadow="lg"
          >
            <Icon as={IoLogoTwitter} color="customBlue.500" w={42} h={42} />
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Home;
