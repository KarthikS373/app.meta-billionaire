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
} from "@chakra-ui/react";
import axios from "axios";

const AdminTraitRequest = () => {
  const [isLessThan768] = useMediaQuery("(max-width: 768px)");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [traits, setTraits] = useState<
    {
      order: string;
      address: string;
      request: string[];
      description: string | null;
      adminNote: string | null;
      total: number;
      isApproved: boolean;
    }[]
  >([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/getTraitRequests").then((res) => {
      console.log(res.data);
      setTraits(res.data.data);
    });
  }, []);

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
        <Accordion w={"full"} allowToggle mt={4}>
          {traits.map((trait, index) => {
            return (
              <AccordionItem key={trait.order}>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      {trait.order}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} fontFamily={"sans-serif"}>
                  {/* <Image
                    textAlign={"center"}
                    src={sub.image}
                    alt={(sub.product && sub.product) || ""}
                  /> */}
                  <Box>
                    <Text textAlign={"center"} mt={5}>
                      {/* <strong>Description</strong> <Spacer /> {trait} */}
                    </Text>
                  </Box>

                  <Box>
                    <Text textAlign={"center"} mt={5}>
                      {/* <strong>Price</strong> <Spacer /> $MBUC {trait} */}
                    </Text>
                  </Box>

                  <Box>
                    <Text textAlign={"center"} mt={5}>
                      {/* <strong>Quantity</strong> <Spacer /> {trait} */}
                    </Text>
                  </Box>

                  <Box>
                    <Text textAlign={"center"} mt={5}>
                      {/* <strong>Max per user</strong> <Spacer /> $MBUC {trait} */}
                    </Text>
                  </Box>

                  <ButtonGroup
                    mt={5}
                    textAlign={"center"}
                    display={"flex"}
                    justifyContent={"center"}
                  >
                    <Button
                      fontFamily={"sans-serif"}
                      fontSize={16}
                      bgColor={"customBlue.500"}
                      color={"white"}
                      onClick={() => {
                        // setCurrentProduct(sub);
                        // setCreateMode(true);
                      }}
                    >
                      Approve
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
