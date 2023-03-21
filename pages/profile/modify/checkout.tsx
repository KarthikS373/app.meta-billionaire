import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  ModalFooter,
  useToast,
  Textarea,
} from "@chakra-ui/react";

import Layout from "../../../components/Layout/Layout";
import useEthersProvider from "../../../hooks/useEthersProvider";

const CheckoutPage = () => {
  const { address, balance } = useEthersProvider();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const router = useRouter();

  const [description, setDescription] = useState<string>("");
  const [data, setData] = useState<
    Array<{ key: string; layer: string; cost: number }>
  >([]);
  const [cost, setCost] = useState<number>(0.0);

  const { token, data: content, length } = router.query;

  useEffect(() => {
    if (!token) {
      const timeout = setTimeout(() => {
        router.replace(`/`);
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [router, token]);

  useEffect(() => {
    if (content) {
      const temp = JSON.parse(content as string);
      setData(temp);
    } else {
    }
  }, [content]);

  useEffect(() => {
    if (data) {
      let temp = 0.0;
      data.forEach((item) => {
        temp += item.cost;
      });
      setCost(temp);
    }
  }, [data]);

  if (!token) {
    return (
      <Layout>
        <Flex justifyContent={"center"} alignItems={"center"} w="full">
          <Text>Access Forbidden</Text>
        </Flex>
      </Layout>
    );
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontFamily={"poppins"}>Order confirmation</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection={"column"}>
              <Text>
                Request once placed cannot be cancelled. Are you sure you want
                to continue?
              </Text>
              <Text fontFamily={"sans-serif"} fontSize={[10, 10, 12, 12]}>
                *Request will be processed only after confirmation from admin
              </Text>
            </Flex>
          </ModalBody>

          <ModalFooter fontFamily={"poppins"} fontWeight={200}>
            <Button
              colorScheme="red"
              mr={3}
              onClick={onClose}
              fontSize={[12, 12, 16, 20]}
            >
              cancel
            </Button>
            <Button
              colorScheme="blue"
              variant="outline"
              fontSize={[12, 12, 16, 20]}
            >
              confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Layout>
        <Box>
          <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            w="100%"
          >
            <Box gap={6} w="100%" h="100%" p={6}>
              <Box>
                <Box
                  w="100%"
                  h="100%"
                  px={[2, 2, 4, 8]}
                  py={[4, 4, 6, 10]}
                  border="1px"
                  borderColor="gray.200"
                  borderRadius="md"
                >
                  <Heading size="md">Order Summary</Heading>
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
                    {data.map((item, index) => (
                      <GridItem key={item.key} w={"full"} textAlign={"left"}>
                        <Text px={[1, 2, 4, 4]}>
                          {item.key} - {item.cost} MBUC
                        </Text>
                        <Box
                          my={1}
                          mx={"auto"}
                          className={
                            "group relative rounded border shadow md:!h-64 sm:!w-32 md:!w-64 !w-full"
                          }
                        >
                          <Image
                            loading="eager"
                            src={`/assets/layers/${item.key}/${item.layer}`}
                            alt={item.layer}
                            width={1920}
                            height={1080}
                            className="!w-full !h-full"
                            style={{
                              objectFit: "cover",
                              objectPosition: "center",
                            }}
                          />
                        </Box>
                      </GridItem>
                    ))}
                  </Grid>
                  <Flex
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    w="100%"
                    h="100%"
                  >
                    <Box
                      w="100%"
                      h="100%"
                      p={6}
                      border="1px"
                      borderColor="gray.200"
                      borderRadius="md"
                    >
                      <Heading size="md">Details</Heading>
                      <Text className="tracking-wider font-semibold mt-1">
                        Address:
                      </Text>
                      <Text className="font-sans">{address}</Text>
                      <Text className="tracking-wider font-semibold mt-2">
                        Balance:
                      </Text>
                      <Text className="font-sans">{balance || 0.0}</Text>
                      <Text className="tracking-wider font-semibold mt-2">
                        Cost:
                      </Text>
                      <Text className="font-sans">{cost}</Text>
                    </Box>
                  </Flex>
                  <Textarea
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    my={4}
                    _placeholder={{
                      fontFamily: "sans",
                    }}
                    fontSize={[12, 12, 16, 20]}
                    fontWeight={200}
                    fontFamily={"monospace"}
                    rounded={[0, 5]}
                    placeholder="Enter a note with this order"
                    size="sm"
                  />
                  <Button
                    fontSize={[12, 12, 15, 15]}
                    w={"full"}
                    px="md"
                    mt={4}
                    colorScheme="customBlue"
                    shadow="md"
                    textTransform="uppercase"
                    fontFamily="METAB"
                    disabled={Number(length) === 0}
                    onClick={() => {
                      if (Number(balance) >= cost) {
                        onOpen();
                      } else {
                        toast({
                          title: "No enough balance",
                          status: "warning",
                          variant: "top-accent",
                        });
                      }
                    }}
                  >
                    Continue
                  </Button>
                </Box>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Layout>
    </>
  );
};

export default CheckoutPage;
