import { Box, CircularProgress, Flex, Spinner, Text } from "@chakra-ui/react";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";

import contractABI from "../../artifacts/contracts/MarketplaceERC20.sol/Marketplace.json";
import ActiveSaleProducts from "./ActiveSaleProducts";

const AllSaleItems = () => {
  const [inactiveProducts, setInactiveProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllProducts = async () => {
    setIsLoading(true);

    const items = localStorage.getItem("inactive_products");
    const expiry = Number.parseInt(
      localStorage.getItem("inactive_products_expiry") || "0"
    );

    if (items && Date.now() < expiry) {
      const inactiveProductArray = JSON.parse(items);
      setTimeout(() => {
        setInactiveProducts(inactiveProductArray);
      }, 1000);
    } else {
      const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_POLYGON_API_KEY
      );

      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT!,
        contractABI.abi,
        provider
      );
      try {
        const productCount = await contract.getTotalProducts();

        let inactiveProductArray: any = [];

        for (let i = 0; i < productCount; ++i) {
          const product = await contract.products(i);

          console.log(product);

          if (!product.active) {
            inactiveProductArray.push(product);
          }
        }

        setTimeout(() => {
          setInactiveProducts(inactiveProductArray);
        }, 1300);

        localStorage.setItem(
          "inactive_products",
          JSON.stringify(inactiveProductArray)
        );

        localStorage.setItem(
          "inactive_products_expiry",
          (Date.now() + 259200000).toString()
        );
      } catch (err) {
        console.log("error when fetching content from contract");
        console.log(err);
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <Flex align="center" justify="center" my="md" flexDir="column">
        <Text fontSize={35} color="black">
          Previous Sale
        </Text>
      </Flex>

      {isLoading ? (
        <Flex align="center" justify="center" flexDir="column" mb={20}>
          <Spinner m="0 auto" size="xl" mt="lg" color="customBlue.500" />{" "}
        </Flex>
      ) : (
        <ActiveSaleProducts products={inactiveProducts} />
      )}
    </>
  );
};

export default React.memo(AllSaleItems);
