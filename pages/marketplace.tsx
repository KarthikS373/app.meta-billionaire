import { Box, Button, Flex, Spacer, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import StoreItem from "../components/StoreItem/StoreItem";
import contractABI from "../artifacts/contracts/MarketplaceERC20.sol/Marketplace.json";
import { ethers } from "ethers";
import RaffleItem from "../components/RaffleItem/RaffleItem";
import { GetServerSideProps } from "next";
import prisma from "../lib/prisma";
import { useRouter } from "next/router";
import AllSaleItems from "../components/AllSaleItems/AllSaleItems";

const Marketplace = ({ raffleWinner }: any) => {
  const [activeProducts, setActiveProducts] = useState<any>(null);
  const [activeRaffle, setActiveRaffle] = useState<any>(null);
  const router = useRouter();

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

      const _filteredArray = productsArray.filter(
        (item: Array<any>, index: any) =>
          !(
            item[1].toLowerCase().includes("world cup") ||
            item[1].toLowerCase().includes("goal")
          )
      );

      setActiveProducts(_filteredArray);
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
        flex={1}
        py={["md", "md", "lg", "lg"]}
        px="sm"
        flexDir="column"
      >
        <Flex mx="auto" align="center" justify="center" w="100%">
          <Text fontSize={35} color="black">
            MARKETPLACE
          </Text>
        </Flex>
        <Flex flexWrap="wrap">
          {activeProducts ? (
            activeProducts.length > 0 ? (
              activeProducts.map((product: any, key: number) => {
                return (
                  <StoreItem
                    key={key}
                    data={product}
                    getActiveProduct={getActiveProduct}
                  />
                );
              })
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
        </Flex>
        <Flex align="center" justify="center" my="md" flexDir="column">
          <Text fontSize={35} color="black">
            RAFFLE
          </Text>
        </Flex>
        <Flex flexWrap="wrap">
          {activeRaffle ? (
            activeRaffle.length > 0 ? (
              activeRaffle.map((product: any, key: number) => {
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
      </Flex>
      <AllSaleItems />
      <Box textAlign={"center"}>
        <Button
          fontSize={[15, 15, 17, 17]}
          px="md"
          py={6}
          borderRadius="full"
          colorScheme="customBlue"
          shadow="lg"
          fontFamily="MontserratBold"
          onClick={() => {
            router.push("/submissions");
          }}
          mr="sm"
        >
          Submit your Product
        </Button>
      </Box>
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
