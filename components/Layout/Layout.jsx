import React from "react";
import { Flex } from "@chakra-ui/layout";
import NextHeadSeo from "next-head-seo";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

const Layout = (props) => {
  return (
    <>
      <NextHeadSeo
        title="METABILLIONAIRE"
        description="METABILLIONAIRE"
        canonical="https://metabillionaire-vip-demo.netlify.app/logo.webp"
        robots="index, follow"
        og={{
          title: "METABILLIONAIRE",
          type: "website",
          url: "https://metabillionaire-vip-demo.netlify.app/logo.webp",
          image: "https://metabillionaire-vip-demo.netlify.app/logo.webp",
          siteName: "METABILLIONAIRE",
        }}
        twitter={{
          card: "summary",
        }}
      />
      <Flex
        w="100%"
        h="100%"
        minH="100vh"
        color="white"
        fontFamily="Montserrat, sans-serif"
        flexDir="column"
        alignItems="stretch"
      >
        <Flex bgColor="#191920">
          <Navbar isAdmin={props.isAdmin} />
        </Flex>
        <Flex
          align="center"
          justify="center"
          flexDir="column"
          w="100%"
          alignItems="stretch"
          flex={1}
        >
          {props.children}
        </Flex>
        {props.showFooter && <Footer />}
      </Flex>
    </>
  );
};

export default Layout;
