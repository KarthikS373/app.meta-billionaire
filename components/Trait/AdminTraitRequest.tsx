import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  ButtonGroup,
  Image,
  Spacer,
  useMediaQuery,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import axios from "axios";
import { Trait, TraitShop } from "@prisma/client";

const AdminTraitRequest = () => {
  const [isLessThan768] = useMediaQuery("(max-width: 768px)");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [traits, setTraits] = useState<TraitShop[]>([]);
  const [collection, setCollection] = useState<Trait[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/getTraitRequests").then((res) => {
      console.log(res.data);
      setTraits(res.data.data);
    });
  }, []);

  useEffect(() => {
    const temp: Trait[] = [];
    traits.map((trait) => {
      trait.request.map((request) => {
        axios
          .get(`http://localhost:3000/api/getTraits?id=${request}`)
          .then((res) => {
            console.log(res.data);
            temp.push(res.data.data);
            setCollection(temp);
          });
      });
    });
  }, [traits]);

  return (
    <Flex w="100%" align="center" mt="md" justify="center" flexDir="column">
      <Text
        fontSize={30}
        fontFamily="MontserratBold"
        textAlign="left"
        w="100%"
        color="customBlue.500"
      >
        Trait Request
      </Text>
      <Box w={"full"}>
        <Accordion
          className="border rounded-xl py-2 px-1 shadow"
          w={"full"}
          allowToggle
          mt={4}
        >
          {traits.map((trait, index) => {
            return (
              <AccordionItem
                key={trait.order}
                className="border-0 outline-none"
              >
                <h2>
                  <AccordionButton className="h-16 center w-full justify-between border-0 outline-none">
                    <Box flex="1" textAlign="left">
                      {trait.order}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Flex
                    className="tracking-wider"
                    flexDirection={"row"}
                    flexWrap={"wrap"}
                    gap={4}
                  >
                    <Text fontSize={16} fontFamily={"sans-serif"}>
                      <strong>Address: </strong>
                      {trait.address}
                    </Text>
                    {trait.description && (
                      <>
                        <Text fontSize={16} fontFamily={"sans-serif"}>
                          <strong>Description: </strong>
                          {trait.description}
                        </Text>
                      </>
                    )}
                    <Text fontSize={16} fontFamily={"sans-serif"}>
                      <strong>Total: </strong>
                      {trait.total}
                    </Text>
                  </Flex>
                  <Grid
                    templateColumns={[
                      "repeat(1, 1fr)",
                      "repeat(2, 1fr)",
                      "repeat(4, 1fr)",
                      "repeat(6, 1fr)",
                    ]}
                    my={4}
                    justifyContent={"flex-start"}
                    alignItems={"flex-end"}
                    flexDirection={"row"}
                    gap={4}
                  >
                    {collection.map((item, index) => (
                      <GridItem key={item.asset} w={"full"} textAlign={"left"}>
                        <Text px={[1, 2, 4, 4]}></Text>
                        <Box
                          my={4}
                          mx={"auto"}
                          className={
                            "group relative rounded border shadow md:!h-64 sm:!w-32 md:!w-64 !w-full"
                          }
                        >
                          <Image
                            loading="eager"
                            src={`/assets/layers/${item.category
                              .split("-")
                              .join(" ")
                              .replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                                letter.toUpperCase()
                              )}/${item.imagePath}`}
                            alt={item.asset}
                            width={1920}
                            height={1080}
                            className="!w-full !h-full mb-2"
                            style={{
                              objectFit: "cover",
                              objectPosition: "center",
                            }}
                          />
                          {item.asset}
                        </Box>
                      </GridItem>
                    ))}
                  </Grid>
                  <ButtonGroup mt={5} display={"flex"}>
                    <Button
                      fontFamily={"sans-serif"}
                      fontSize={16}
                      bgColor={"customBlue.500"}
                      color={"white"}
                      onClick={() => {}}
                    >
                      Approve
                    </Button>
                    <Button
                      fontFamily={"sans-serif"}
                      fontSize={16}
                      colorScheme={"red"}
                      color={"white"}
                      onClick={() => {}}
                    >
                      Reject
                    </Button>
                  </ButtonGroup>
                </AccordionPanel>
              </AccordionItem>
            );
          })}
        </Accordion>
      </Box>
    </Flex>
  );
};

export default AdminTraitRequest;
