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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { fetchAllSubmissions, fetchSubmissions } from "../../lib/firebase";

const UserSubmissionTable = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [submissions, setSubmissions] = useState<Array<any>>([]);

  useEffect(() => {
    fetchAllSubmissions()
      .then((primeSnapshot) => {
        setSubmissions([]);
        const data: Array<any> = [];
        primeSnapshot.docs.forEach(async (doc) => {
          const subs = await fetchSubmissions(doc.id);
          let i = 0;
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

              setSubmissions([temp]);
            }
          });
        });
        console.log(data);
        // setSubmissions(data);
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
                    <Tr key={sub.id} onClick={onOpen}>
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
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor modi
            molestias illum optio aperiam et mollitia laborum. Molestias, quas
            voluptate saepe, laudantium consequatur eius ullam quos praesentium
            animi ex facere aspernatur a!
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
