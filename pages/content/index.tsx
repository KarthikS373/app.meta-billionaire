import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../../components/Layout/Layout";
import { ethers, providers } from "ethers";
import { Text, Flex, useToast, Icon, Spinner } from "@chakra-ui/react";
import { IoLogoDiscord, IoLogoTwitter } from "react-icons/io5";

import FooterLink from "../../components/Footer/FooterLink";
import useEthersProvider from "../../hooks/useEthersProvider";

import StakingContract from "../../utils/ABIs/Staking";
import ERC721Contract from "../../utils/ABIs/ERC721";
import ReplayList from "../../components/ReplayList/ReplayList";

const ContentPage = () => {
  const router = useRouter();

  const { provider: walletProvider, chainId, address } = useEthersProvider();
  const toast = useToast();

  const [provider, setProvider] = useState<providers.JsonRpcProvider | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [isNFT, setisNFT] = useState(false);
  const [isStakedNFT, setIsStakedNFT] = useState(false);

  useEffect(() => {
    if (provider) {
      if (address) {
        const checkNFT = async () => {
          setChecking(true);

          const ERC721 = new ethers.Contract(
            ERC721Contract.address,
            ERC721Contract.abi,
            provider
          );

          // console.log(await ERC721.balanceOf(address));

          try {
            let balance = (await ERC721.balanceOf(address)).toString();
            // console.clear();
            console.log("Balance : ", balance);

            setisNFT(balance !== "0");

            if (balance === "0") {
              checkStakedNFT();
            }
          } catch (e) {
            console.warn(e);
          } finally {
            setChecking(false);
          }
        };

        const checkStakedNFT = async () => {
          setChecking(true);

          const stakingContract = new ethers.Contract(
            StakingContract.address,
            StakingContract.abi,
            provider
          );

          try {
            let balance = (
              await stakingContract.depositedTokenAmounts(address)
            ).toString();
            console.log("Staked :", balance);

            setIsStakedNFT(balance !== "0");
          } catch (e) {
            console.warn(e);
          } finally {
            setChecking(false);
          }
        };

        checkNFT();
      }
    }
  }, [address, provider]);

  useEffect(() => {
    setProvider(
      new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_INFURA_MAIN_API
      )
    );
  }, []);

  if (address === null) {
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

  if (checking) {
    return (
      <Layout>
        <Flex align="center" justify="center">
          <Text fontSize={25} color="customBlue.500">
            Checking...
          </Text>
        </Flex>
      </Layout>
    );
  }

  if (!isNFT && !isStakedNFT) {
    return (
      <Layout>
        <Flex align="center" justify="center">
          <Flex direction={"column"} align="center" justify="center">
            <Text fontSize={25} color="customBlue.500">
              No MB Found
            </Text>
            <a
              href={"https://opensea.io/collection/metabillionaire"}
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              View Collection
            </a>
            <Text
              as={"em"}
              fontWeight={"hairline"}
              mt={10}
              textAlign={"center"}
            >
              Note: Buy or Stake MB to view Content Page
            </Text>
          </Flex>
        </Flex>
      </Layout>
    );
  }

  return (
    <Layout>
      <Flex
        align="center"
        justify="center"
        w="100%"
        minH="90vh"
        alignItems={"center"}
        flex={1}
      >
        {isLoading ? (
          <Spinner color="customGray" mt="lg" />
        ) : (
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
              color={"black"}
              mt={["sm", "sm", 0, 0]}
            >
              MEMBER AREA
            </Text>
            <ReplayList />
          </Flex>
        )}
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
      <FooterLink />
    </Layout>
  );
};

export default ContentPage;
