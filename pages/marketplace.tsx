import { Flex, Spacer, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { isMobile} from 'react-device-detect';
import Layout from "../components/Layout/Layout";
import StoreItem from "../components/StoreItem/StoreItem";
import contractABI from "../artifacts/contracts/MarketplaceERC20.sol/Marketplace.json";
import { ethers } from "ethers";
import RaffleItem from "../components/RaffleItem/RaffleItem";
import { GetServerSideProps } from "next";
import prisma from "../lib/prisma";

const Marketplace = ({ raffleWinner }: any) => {
  const [activeProducts, setActiveProducts] = useState<any>(null);
  const [activeRaffle, setActiveRaffle] = useState<any>(null);

  const getActiveProduct = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_POLYGON_API_KEY
    );

    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT!,
      contractABI.abi,
      provider
    );
    try {
      const getProduct = await contract.getActiveProducts();

      let productsArray: any = [];
      let raffleArray: any = [];

      await getProduct.forEach((element: any) => {
        if (element.name.toLowerCase().includes("raffle")) {
          raffleArray.push(element);
        } else {
          productsArray.push(element);
        }
      });

      setActiveProducts(productsArray);
      setActiveRaffle(raffleArray);
    } catch (err) {
      console.log("error when fetching store content on contract");
      console.log(err);
    }
  };
  useEffect(() => {
    getActiveProduct();
  }, []);
  return (
    <Layout>
      <Flex
        align="center"
        justify="flex-start"
        w="100%"
        alignItems="stretch"
        maxW="container.lg"
        flex={1}
        py={["md", "md", "lg", "lg"]}
        px="sm"
        flexDir="column"
        m="0 auto"
      >
        <Flex mb="md" align="center" justify="center" w="100%">
          <Flex align="flex-start" justify="center" flexDir="column">
            <Text fontSize={35} color="black">
              MARKETPLACE
            </Text>
          </Flex>
          <Spacer display={["none", "none", "flex", "flex"]} />
        </Flex>
        {activeProducts ? (
          activeProducts.length > 0 ? (
            isMobile ? (
              activeProducts.slice(0,2).map((product: any, key: number) => {
                return (
                  <StoreItem
                    key={key}
                    data={product}
                    getActiveProduct={getActiveProduct}
                  />
                );
              })
            ) : (
              activeProducts.slice(0,4).map((product: any, key: number) => {
                return (
                  <StoreItem
                    key={key}
                    data={product}
                    getActiveProduct={getActiveProduct}
                  />
                );
              })
            )
          ) : (
            <Flex align="center" justify="center" flex={1}>
              <Text
                fontSize={25}
                fontFamily="MontserratBold"
                color="customBlue.500"
                textAlign="center"
              >
                There is no active product
                <br /> on Marketplace actually
              </Text>
            </Flex>
          )
        ) : (
          <Spinner m="0 auto" size="xl" mt="lg" color="customBlue.500" />
        )}
        <Flex align="flex-start" justify="center" my="md" flexDir="column">
          <Text fontSize={35} color="black">
            RAFFLE
          </Text>
        </Flex>
        {activeRaffle ? (
          activeRaffle.length > 0 ? (
            isMobile ? (
            activeRaffle.slice(0,2).map((product: any, key: number) => {
                return (
                  <RaffleItem
                    key={key}
                    data={product}
                    getActiveProduct={getActiveProduct}
                    raffleWinner={raffleWinner}
                  />
                );
              })
            ) : (
            activeRaffle.slice(0,4).map((product: any, key: number) => {
                return (
                  <RaffleItem
                    key={key}
                    data={product}
                    getActiveProduct={getActiveProduct}
                    raffleWinner={raffleWinner}
                  />
                );
              })
            )
          ) : (
            <Flex align="center" justify="center" flex={1}>
              <Text
                fontSize={30}
                fontFamily="MontserratBold"
                color="customBlue.500"
                textAlign="center"
                mt="md"
              >
                COMING SOON
              </Text>
            </Flex>
          )
        ) : (
          <Spinner m="0 auto" size="xl" mt="lg" color="customBlue.500" />
        )}
      </Flex>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const raffleWinner = await prisma.raffleWinner.findMany();

  return {
    props: { raffleWinner },
  };
};

export default Marketplace;
