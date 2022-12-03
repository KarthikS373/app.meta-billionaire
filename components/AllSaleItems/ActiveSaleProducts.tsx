import { Box, Flex, Text, Image, Spacer } from "@chakra-ui/react";
import { ethers } from "ethers";
import React from "react";

const ActiveSaleProducts = ({ products = [] }) => {
  if (products.length == 0) {
    return (
      <Flex align="center" justify="center" flex={1} mb={20}>
        <Text
          fontSize={30}
          fontFamily="MontserratBold"
          color="customBlue.500"
          textAlign="center"
          mt="md"
        >
          Aww snap :( <br />
          No previous sales data available
        </Text>
      </Flex>
    );
  }

  return (
    <div className="marquee-wrapper">
      <div className="marquee">
        <div className="marquee-group">
          {products.map((product, index) => {
            const priceBigNumber = ethers.BigNumber.from(
              product[7] && product[7].hex
            );
            const price = ethers.utils.formatEther(priceBigNumber);

            let title: string = product[1];

            try {
              title = title.replace("(*RAFFLE*)", "");
            } catch (e) {}

            try {
              title = title.replace("(*FOR SALE*)", "");
            } catch (e) {}

            return (
              <Box
                key={product && product.id}
                display={"flex"}
                h={300}
                w={350}
                minW={350}
                mx={10}
                my={25}
                border={"2px solid"}
                borderColor={"customBlue.500"}
                p={"15px 25px"}
                borderRadius={15}
                flexDir={"column"}
                justifyContent={"flex-start"}
                alignItems={"center"}
              >
                <Image
                  src={product[2]}
                  alt=""
                  height={120}
                  width={120}
                  borderRadius={10}
                  mb={5}
                />
                <Text textAlign={"center"} whiteSpace={"break-spaces"}>
                  {title}
                </Text>
                <Spacer />
                <Text textAlign={"center"} whiteSpace={"break-spaces"}>
                  Price: $MBUC {price}
                </Text>
              </Box>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ActiveSaleProducts;

// [
//     {
//         "type": "BigNumber",
//         "hex": "0x4d"
//     },
//     "Resort 23 - WL Spot",
//     "https://pbs.twimg.com/media/FhsfzcTWIAA2lRM?format=jpg&name=medium",
//     true,
//     {
//         "type": "BigNumber",
//         "hex": "0x63885870"
//     },
//     {
//         "type": "BigNumber",
//         "hex": "0x63a7fc70"
//     },
//     {
//         "type": "BigNumber",
//         "hex": "0x17"
//     },
//     {
//         "type": "BigNumber",
//         "hex": "0x1043561a8829300000"
//     },
//     {
//         "type": "BigNumber",
//         "hex": "0x01"
//     }
// ]
