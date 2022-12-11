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
  Text,
} from "@chakra-ui/react";
import { BsDiscord, BsMailbox, BsTwitter } from "react-icons/bs";
import { AddressString } from "@coinbase/wallet-sdk/dist/types";

import { fetchFirestoreData } from "../../lib/firebase";

interface Tags {
  value: string | undefined;
  label: string | undefined;
}

const NetworkCard = ({ address }: { address: AddressString }) => {
  const [userDetails, setUserDetails] = useState({
    discord: "",
    email: "",
    dp: "",
    id: "",
    twitter: "",
    website: "",
    tags: "",
    about: "",
  });

  useEffect(() => {
    fetchFirestoreData(address)
      .then((res) => {
        console.log(res);
        setUserDetails({
          discord: (res && res.discord) || "",
          email: (res && res.email) || "",
          dp: (res && res.dp) || "",
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

  return (
    <Box
      textAlign={"center"}
      w={["95vw", null, "70vw"]}
      border={"1px solid"}
      borderColor={"customBlue.500"}
      padding={10}
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
        <Image
          src={
            (userDetails.dp && userDetails.dp) ||
            "../../assets/default-profile-pic.jpeg"
          }
          alt="Profile"
        />
        <Text>
          <abbr
            title={address}
            style={{ textTransform: "none", textDecoration: "none" }}
          >
            {address.slice(0, 3)}...{address.slice(-3)} | {}
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

export default NetworkCard;

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
