import { Flex, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex align="center" justify="center" my="sm" fontStyle="italic" w="100%">
      <Text fontSize={12} fontWeight={100} textAlign="center" color="customBlue.500">
        Copyright © {new Date().getFullYear()}, All rights reserved -
        METABILLIONAIRE -{" "}
        <a
          href="https://www.instagram.com/misterjuiice"
          target="_blank"
          rel="noreferrer"
        >
          @misterjuiice
        </a>
      </Text>
    </Flex>
  );
};

export default Footer;
