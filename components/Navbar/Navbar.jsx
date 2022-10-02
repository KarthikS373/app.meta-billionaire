import React, { useState } from "react";
import { Button, Flex, useToast, Text, Spinner, Box } from "@chakra-ui/react";
import useEthersProvider from "../../hooks/useEthersProvider";
import Image from "next/image";
import { useRouter } from "next/router";

const Navbar = ({ isAdmin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { address, connect } = useEthersProvider();
  const toast = useToast();
  const router = useRouter();

  const connectWallet = async () => {
    setIsLoading(true);
    try {
      await connect();
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      toast({
        description: "Please switch to Main Ethereum Network",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      w="100%"
      align="center"
      justify="flex-start"
      my="xs"
      flexDir={["column", "column", "row", "row"]}
      px={["sm", "sm", "lg", "lg"]}
    >
      <Box onClick={() => router.push("/")} w={200} cursor="pointer">
        <Image
          layout="responsive"
          width={200}
          src="/logo.png"
          height={80}
          alt="metabillionaire logo"
        />
      </Box>
      <Flex align="center" justify="flex-end" flex={1}>
        {isLoading ? (
          <Spinner color="customGray" />
        ) : address ? (
          <Text fontSize={15}>
            Connected Wallet : {address.substring(0, 6)}...
            {address.substring(address.length - 4, address.length)}
          </Text>
        ) : isAdmin ? (
          <></>
        ) : (
          <Button
            bgColor="customBlue.500"
            onClick={() => connectWallet()}
            fontSize={15}
            fontWeight={300}
            mt={["sm", "sm", 0, 0]}
          >
            Connect Wallet
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default Navbar;
