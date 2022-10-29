import Layout from "../components/Layout/Layout";
import { Text, Flex, Icon, useMediaQuery } from "@chakra-ui/react";
import Block from "../components/Roadmap/Block";
import FooterLink from "../components/Footer/FooterLink";
import { IoPower, IoBulb } from "react-icons/io5";
import { AiFillFund, AiOutlineRocket } from "react-icons/ai";
import { MdOutlineLocalLibrary, MdOutlineAttachMoney } from "react-icons/md";
import Image from "next/image";
import Navbar from "../components/Navbar/Navbar";

const RoadmapPage = () => {
  const [lessThan768] = useMediaQuery("(max-width: 768px)");

  const roadmap = [
    {
      icon: IoPower,
      title: "WELCOME, METABILLIONAIRES",
      description:
        "Welcome to our community. Becoming a METABILLIONAIRE owner introduces you to a PRIVATE MASTERMIND level of elite entrepreneurs.",
    },
    {
      icon: MdOutlineAttachMoney,
      title: "THE HOLDERS' REWARDS",
      description:
        "Those who believe in the project and it’s mission are the most important to us. We will constantly seek new, unique, and interesting methods to reward both early and new holders. Lifetime access to mastermind events, merchandise as well as digital and physical gifts are only just the beginning. Check out our Discord, it’s always filled with surprises!",
    },
    {
      icon: IoBulb,
      title: "THE METABILLIONAIRE OPPORTUNITY",
      description:
        "By being a METABILLIONAIRE holder, you will have access to connect, learn, and grow from real businessmen and entrepreneurs. They come from all horizons : REAL ESTATE - WATCH - ART - E-COMMERCE -STARTUP - STOCKS - CRYPTO - NFTs. You will be introduced to exclusive opportunities such as IDOs, ICOs, and other non-traditional investment strategies. We are organizing EVENTS located in: Dubai, New-York. Entry will be FREE FOR ALL HOLDERS.",
    },
    {
      icon: AiFillFund,
      title: "METABILLIONAIRE FUND CREATION",
      description:
        "We will be investing $50,000 to $500,000 USD each in 2 of our HOLDERS' projects.Our members will choose the projects we are going to invest in (DAO).Our members will also have the possibility to invest.",
    },
    {
      icon: MdOutlineLocalLibrary,
      title: "METABILLIONAIRE CHARITY",
      description:
        "We believe in abundance and the responsibility to give back to others.Our first project involves providing over $150K to build Schools and Water Wells in Africa.We are setting a model and precedence of community-driven charity that will change the world.",
    },
    {
      icon: AiOutlineRocket,
      title: "METAVERSE",
      description:
        "The METAVERSE is REAL, and all of its infinite possibilities are unignorable.As soon as we sold out of public mint, we put our money where our mouth is by immediately purchasing SANDBOX land to begin development of the METABILLIONAIRE HQ.",
    },
  ];
  return (
    // <Layout>
    //   <Text
    //     fontSize={30}
    //     w="100%"
    //     textAlign="center"
    //     textTransform="uppercase"
    //     mt="lg"
    //     mb="md"
    //   >
    //     Roadmap
    //   </Text>
    //   <Flex wrap="wrap" m="30px">
    //     UNDER CONSTRUCTION
    //     {/* {roadmap.map((unit: any) => {
    //       return [
    //         <>
    //           <Block title={unit.title} description={unit.description}>
    //             <Icon
    //               as={unit.icon}
    //               boxSize="10"
    //               bgColor="black"
    //               color="white"
    //               borderRadius="50%"
    //               borderColor="black"
    //               borderWidth="5px"
    //             />
    //           </Block>
    //         </>,
    //       ];
    //     })} */}
    //   </Flex>
    //   <FooterLink />
    // </Layout>
    <>
      <Navbar />
      <div id="crane-content">
        <h1>Roadmap</h1>
        <p> Under Construction </p>
      </div>
      <div id="outerCraneContainer">
        <div className="buildings">
          <div></div>
          <div className="1"></div>
          <div className="2"></div>
          <div className="3"></div>
          <div className="4"></div>
        </div>
        {!lessThan768 && (
          <>
            <div className="crane craneThree">
              <div className="line lineOne"></div>
              <div className="line lineTwo"></div>
              <div className="line lineThree"></div>
              <div className="crane-stand"></div>
              <div className="weight"></div>
              <div className="cabin"></div>
              <div className="arm"></div>
            </div>
            <div className="crane craneTwo">
              <div className="line lineOne"></div>
              <div className="line lineTwo"></div>
              <div className="line lineThree"></div>
              <div className="crane-stand"></div>
              <div className="weight"></div>
              <div className="cabin"></div>
              <div className="arm"></div>
            </div>
          </>
        )}
        <div className="crane craneOne">
          <div className="line lineOne"></div>
          <div className="line lineTwo"></div>
          <div className="line lineThree"></div>
          <div className="crane-stand"></div>
          <div className="weight"></div>
          <div className="cabin"></div>
          <div className="arm"></div>
        </div>
      </div>
    </>
  );
};

export default RoadmapPage;
