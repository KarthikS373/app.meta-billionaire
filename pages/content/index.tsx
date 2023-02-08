import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../../components/Layout/Layout";
import { ethers, providers } from "ethers";
import { Text, Flex, useToast } from "@chakra-ui/react";

import FooterLink from "../../components/Footer/FooterLink";
import useEthersProvider from "../../hooks/useEthersProvider";

import StakingContract from "../../utils/ABIs/Staking";
import ERC721Contract from "../../utils/ABIs/ERC721";

const ContentPage = () => {
  const router = useRouter();

  const { provider: walletProvider, chainId, address } = useEthersProvider();
  const toast = useToast();

  const [provider, setProvider] = useState<providers.JsonRpcProvider | null>(
    null
  );
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

          try {
            let balance = (await ERC721.balanceOf(address)).toString();
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
        process.env.NEXT_PUBLIC_INFURA_MAIN_NET
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
      <Text
        fontSize={30}
        w="80%"
        textAlign="center"
        textTransform="uppercase"
        mx="auto"
        mt="lg"
        mb="md"
      >
        Content
        <div>Address : {address}</div>
        <div>NFT : {isNFT ? "yes" : "no"}</div>
        {!isNFT && <div>Staked : {isStakedNFT ? "yes" : "no"}</div>}
      </Text>
      <Flex direction="column" className={"md:px-[20%] px-7"}></Flex>
      <FooterLink />
    </Layout>
  );
};

export default ContentPage;
