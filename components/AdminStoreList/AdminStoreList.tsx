import { Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AdminStoreItem from "../AdminStoreItem/AdminStoreItem";

const AdminStoreList = ({
  activeProducts,
  getActiveProduct,
  raffleWinner,
}: any) => {
  const [marketplace, setMarketplace] = useState<any>([]);
  const [raffle, setRaffle] = useState<any>([]);

  useEffect(() => {
    const _market: any[] = [];
    const _raffle: any[] = [];

    // @ts-ignore
    activeProducts.filter((product) => {
      if (product[1].toString().toLowerCase().includes("raffle")) {
        _raffle.push(product);
      } else {
        _market.push(product);
      }
    });

    setMarketplace(_market);
    setRaffle(_raffle);
  }, [activeProducts]);

  return (
    <Flex align="center" mt={20} flexDir={"column"} justify="center" flex={1}>
      <Text
        fontSize={[20, 20, 30, 40]}
        color="customBlue.500"
        fontFamily="METAB"
      >
        MarketPlace
      </Text>
      <Flex mt="md" w="100%" flexDir="column" align="center" justify="center">
        {marketplace.map((item: any, key: number) => {
          return (
            <AdminStoreItem
              getActiveProduct={getActiveProduct}
              key={key}
              data={item}
              raffleWinner={raffleWinner}
            />
          );
        })}
      </Flex>
      <Text
        fontSize={[20, 20, 30, 40]}
        color="customBlue.500"
        fontFamily="METAB"
      >
        Raffle
      </Text>
      <Flex mt="md" w="100%" flexDir="column" align="center" justify="center">
        {raffle.map((item: any, key: number) => {
          return (
            <AdminStoreItem
              getActiveProduct={getActiveProduct}
              key={key}
              data={item}
              raffleWinner={raffleWinner}
            />
          );
        })}
      </Flex>
    </Flex>
  );
};

export default AdminStoreList;
