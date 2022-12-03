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
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Divider,
  ButtonGroup,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { fetchAllSubmissions, fetchSubmissions } from "../../lib/firebase";

const UserSubmissionTable = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [submissions, setSubmissions] = useState<Array<any>>([]);
  const [currentProduct, setCurrentProduct] = useState({});

  useEffect(() => {
    setSubmissions([]);
    fetchAllSubmissions()
      .then((primeSnapshot) => {
        setSubmissions(() => []);
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
                status: dt.quantity,
              };

              console.log("--- rep ---");
              setSubmissions((prev) => [...prev, temp]);
            }
          });
        });
      })
      .catch((err) => console.log(err));
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

      <Flex
        fontFamily="MontserratBold"
        align="center"
        flex={1}
        minH={500}
        p="md"
        w="100%"
        borderWidth={3}
        borderColor="customBlue.500"
        borderRadius={15}
        mt="sm"
        flexDir="column"
      >
        <TableContainer w={"100%"} h={"100%"}>
          <Table variant="striped" colorScheme="customBlue">
            <Thead>
              <Tr>
                <Th>ID</Th>
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
                      <Td>{index + 1}</Td>
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
      </Flex>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>
            {currentProduct.product && currentProduct.product}
          </ModalHeader> */}
          <ModalCloseButton />
          <ModalBody>
            <Card maxW="sm">
              <CardBody>
                <Image
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  alt="Green double couch with wooden legs"
                  borderRadius="lg"
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">Living room Sofa</Heading>
                  <Text>
                    This sofa is perfect for modern tropical spaces, baroque
                    inspired spaces, earthy toned spaces and for people who love
                    a chic design with a sprinkle of vintage design.
                  </Text>
                  <Text color="blue.600" fontSize="2xl">
                    $450
                  </Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="2">
                  <Button variant="solid" colorScheme="blue">
                    Buy now
                  </Button>
                  <Button variant="ghost" colorScheme="blue">
                    Add to cart
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
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
