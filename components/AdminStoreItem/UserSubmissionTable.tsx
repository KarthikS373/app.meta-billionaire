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
import React, { useEffect, useState } from "react";
import { fetchAllSubmissions, fetchSubmissions } from "../../lib/firebase";
import CreateUserSubmittedProduct from "../CreateNewProduct/CreatePrePopulatedProduct";

interface Submission {
  id: string;
  generate: string;
  address: string;
  product: string;
  description: string;
  image: string;
  maxPerUser: number;
  quantity: number;
  price: number;
  status: string;
}

const UserSubmissionTable = () => {
  const [isLessThan768] = useMediaQuery("(max-width: 768px)");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [submissions, setSubmissions] = useState<Array<Submission>>([]);
  const [currentProduct, setCurrentProduct] = useState<Submission | null>(null);
  const [createMode, setCreateMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const _submissions: Array<Submission> = [];
    setSubmissions(() => []);

    fetchAllSubmissions()
      .then((primeSnapshot) => {
        primeSnapshot.docs.forEach(async (doc) => {
          const subs = await fetchSubmissions(doc.id);
          subs.forEach(async (sub) => {
            if (sub.exists()) {
              const dt = sub.data();
              const temp = {
                generate: sub.id,
                address: dt.address,
                description: dt.description,
                id: dt.id,
                image: dt.image,
                maxPerUser: dt.maxPerUser,
                price: dt.price,
                product: dt.product,
                quantity: dt.quantity,
                status: dt.status,
              };

              if (dt.status != "approved") {
                _submissions.push(temp);
                console.log(_submissions);
                // setSubmissions((prev) => [...prev, temp]);
              }
            }
          });
          setTimeout(() => {
            setSubmissions(_submissions);
          }, 1500);
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
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
        User Submissions
      </Text>

      {createMode ? (
        <CreateUserSubmittedProduct
          setCreateMode={setCreateMode}
          id={(currentProduct && currentProduct.generate) || undefined}
          img={(currentProduct && currentProduct.image) || undefined}
          address={(currentProduct && currentProduct.address) || undefined}
          name={(currentProduct && currentProduct.product) || undefined}
          maxperuser={(currentProduct && currentProduct.maxPerUser) || 1}
          price={(currentProduct && currentProduct.price) || 0}
          spot={(currentProduct && currentProduct.quantity) || 0}
        />
      ) : (
        <Flex
          fontFamily="MontserratBold"
          align="center"
          flex={1}
          minH={500}
          py="md"
          w="100%"
          borderWidth={3}
          borderColor="customBlue.500"
          borderRadius={15}
          mt="sm"
          flexDir="column"
        >
          {isLessThan768 ? (
            <Accordion>
              {submissions.map((sub, index) => {
                return (
                  <AccordionItem key={sub.id}>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          {(sub.product && sub.product) || ""}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} fontFamily={"sans-serif"}>
                      <Image
                        textAlign={"center"}
                        src={sub.image}
                        alt={(sub.product && sub.product) || ""}
                      />
                      <Box>
                        <Text textAlign={"center"} mt={5}>
                          <strong>Description</strong> <Spacer />{" "}
                          {sub.description}
                        </Text>
                      </Box>

                      <Box>
                        <Text textAlign={"center"} mt={5}>
                          <strong>Price</strong> <Spacer /> $MBUC {sub.price}
                        </Text>
                      </Box>

                      <Box>
                        <Text textAlign={"center"} mt={5}>
                          <strong>Quantity</strong> <Spacer /> {sub.quantity}
                        </Text>
                      </Box>

                      <Box>
                        <Text textAlign={"center"} mt={5}>
                          <strong>Max per user</strong> <Spacer /> $MBUC{" "}
                          {sub.maxPerUser}
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
                            setCurrentProduct(sub);
                            setCreateMode(true);
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
          ) : (
            <TableContainer w={"100%"} h={"100%"}>
              <Table variant="striped" colorScheme="customBlue" fontSize={14}>
                <Thead>
                  <Tr fontSize={14}>
                    <Th>User</Th>
                    <Th>Product Name</Th>
                    <Th>Product Price ($MBUC)</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {submissions.map((sub, index) => {
                    return (
                      <>
                        <Tr
                          key={sub.id}
                          onClick={(e) => {
                            setCurrentProduct(sub);
                            onOpen();
                          }}
                        >
                            <Td>{sub.address}</Td>
                          <Td>{sub.product}</Td>
                          <Td>{sub.price}</Td>
                        </Tr>
                      </>
                    );
                  })}
                  {/* {submissions.map((submission, index) => {
                  return (
                    <Tr key={submission.id}>
                      <Td>{index + 1}</Td>
                      <Td>{submission.product}</Td>
                      <Td>{submission.quantity}</Td>
                      <Td>{submission.price}</Td>
                      <Td>
                        <div
                          style={{
                            height: "10px",
                            width: "10px",
                            backgroundColor: submission.color,
                            borderRadius: "50%",
                            display: "inline-block",
                            marginRight: "10px",
                            marginLeft: "2px",
                          }}
                        />
                        {submission.status}
                      </Td>
                    </Tr>
                  );
                })} */}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </Flex>
      )}
      <Modal onClose={onClose} isOpen={isOpen} isCentered size={"3xl"}>
        <ModalOverlay />
        <ModalContent p={0} m={0}>
          <ModalHeader
            fontFamily={"sans-serif"}
            textAlign={"center"}
            display={"flex"}
            justifyContent={"center"}
          >
            <Image
              src={(currentProduct && currentProduct.image) || ""}
              alt={(currentProduct && currentProduct.product) || ""}
            />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              bgColor={"#eef"}
              border={"1px solid black"}
              p={"25px"}
              borderRadius={15}
            >
              <Table>
                <Tr>
                  <Td textAlign={"left"}>Name</Td>
                  <Td textAlign={"right"}>
                    {(currentProduct &&
                      currentProduct.product &&
                      currentProduct.product) ||
                      ""}
                  </Td>
                </Tr>
                <Tr>
                  <Td textAlign={"left"}>Desc</Td>
                  <Td textAlign={"right"}>
                    {(currentProduct &&
                      currentProduct.description &&
                      currentProduct.description) ||
                      ""}
                  </Td>
                </Tr>
                <Tr>
                  <Td textAlign={"left"}>Quantity</Td>
                  <Td textAlign={"right"}>
                    {(currentProduct &&
                      currentProduct.quantity &&
                      currentProduct.quantity) ||
                      ""}
                  </Td>
                </Tr>
                <Tr>
                  <Td textAlign={"left"}>Price</Td>
                  <Td textAlign={"right"}>
                    $MBUC{" "}
                    {(currentProduct &&
                      currentProduct.price &&
                      currentProduct.price) ||
                      ""}
                  </Td>
                </Tr>
                <Tr>
                  <Td textAlign={"left"}>Max per user</Td>
                  <Td textAlign={"right"}>
                    {(currentProduct &&
                      currentProduct.maxPerUser &&
                      currentProduct.maxPerUser) ||
                      ""}
                  </Td>
                </Tr>
              </Table>
            </Box>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup mt={5}>
              <Button
                fontFamily={"sans-serif"}
                fontSize={16}
                bgColor={"customBlue.500"}
                color={"white"}
                onClick={() => {
                  setCreateMode(true);
                  onClose();
                }}
              >
                Approve
              </Button>
              <Button onClick={onClose} fontFamily={"sans-serif"} fontSize={16}>
                Close
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default UserSubmissionTable;

{
  /* <Button onClick={onOpen}>Trigger modal</Button>

 */
}
