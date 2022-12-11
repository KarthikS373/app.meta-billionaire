import React, {
  Component,
  ReactChild,
  ReactNode,
  useEffect,
  useState,
} from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Icon,
  Image,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react";
import NextImage from "next/image";
import { BsDiscord, BsMailbox, BsTwitter } from "react-icons/bs";
import { AddressString } from "@coinbase/wallet-sdk/dist/types";

import { fetchFirestoreData, getProfilePic } from "../../lib/firebase";
import defaultProfilePic from "../../assets/default-profile-pic.jpeg";
import axios from "axios";

interface Tags {
  value: string | undefined;
  label: string | undefined;
}

const TempNetworkCard = ({ address }: { address: AddressString }) => {
  const toast = useToast();

  const [userDetails, setUserDetails] = useState({
    discord: "",
    email: "",
    id: "",
    twitter: "",
    website: "",
    tags: "",
    about: "",
  });

  const [holdings, setHoldings] = useState("0.00");
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    fetchFirestoreData(address)
      .then((res) => {
        setUserDetails({
          discord: (res && res.discord) || "",
          email: (res && res.email) || "",
          id: (res && res.id) || "",
          twitter: (res && res.twitter) || "",
          website: (res && res.website) || "",
          tags: (res && res.tags) || "",
          about: (res && res.about) || "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [address]);

  useEffect(() => {
    axios
      .get(
        // `https://app.metabillionaire.com/api/fetchNickname?address=${address}`
        `http://localhost:3000/api/fetchNickname?address=${address}`
      )
      .then((res) => {
        if (res && res.data && res.data.data && res.data.data[0]) {
          if (res.data.data[0].mbucBalance) {
            setHoldings(
              Number.parseFloat(res.data.data[0].mbucBalance).toFixed(2)
            );
          }

          if (res.data.data[0].name) {
            setNickname(res.data.data[0].name);
          } else {
            setNickname("Guest");
          }
        } else {
          setNickname("Guest");
          setHoldings("0.00");
        }
      })
      .catch((e) => {
        setHoldings("0.00");
        setNickname("Guest");
        toast({
          description: "An error occured",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.log(e);
      });
  }, [address]);

  return (
    <Box
      textAlign={"center"}
      w={["90vw", null, "20vw"]}
      border={"1px solid"}
      borderColor={"customBlue.500"}
      padding={[10, null, null, 10]}
      borderRadius={20}
      display={"flex"}
      gap={5}
      flexWrap={"wrap"}
    >
      <Flex
        flex={1}
        flexDir={"column"}
        gap={2}
        textAlign={"left"}
        flexWrap={"wrap"}
      >
        <Text>
          <abbr
            title={address}
            style={{ textTransform: "none", textDecoration: "none" }}
          >
            {address.slice(0, 7)}...{address.slice(-5)} <Spacer /> {nickname}
          </abbr>
        </Text>
      </Flex>
      <Flex
        flex={3}
        textAlign={"left"}
        flexDir={"column"}
        gap={10}
        fontFamily={"sans-serif"}
      >
        <Text>{userDetails.about && userDetails.about}</Text>
        <Flex gap={1.2} flexWrap={"wrap"}>
          {userDetails.tags &&
            userDetails.tags.length > 0 &&
            JSON.parse(userDetails.tags).map((tag: Tags, index: number) => {
              return <Tag key={index} name={tag.label} />;
            })}
        </Flex>
        <Flex alignItems={"center"} gap={5} flexWrap={"wrap"}>
          <ButtonGroup>
            {userDetails.twitter && (
              <Button
                onClick={() => {
                  //   TODO: twitter
                  //   window.open();
                }}
              >
                <Icon as={BsTwitter} h={5} />
              </Button>
            )}
            {userDetails.discord && (
              <Button
                onClick={() => {
                  //   TODO: Copy discord
                }}
              >
                <Icon as={BsDiscord} h={5} />
              </Button>
            )}
            {userDetails.email && (
              <Button
                onClick={() => {
                  //   TODO: MAIL
                  //   window.open();
                }}
              >
                <Icon as={BsMailbox} h={5} />
              </Button>
            )}
          </ButtonGroup>
        </Flex>
      </Flex>
    </Box>
  );
};

export default React.memo(TempNetworkCard);

const Tag = ({ name = "Hello" }) => {
  return (
    <Box
      border={"none"}
      borderRadius={5}
      backgroundColor={"black"}
      color={"white"}
      h={"min-content"}
      fontFamily={"sans-serif"}
      fontSize={"medium"}
      padding={"2px 8px"}
    >
      {name}
    </Box>
  );
};
