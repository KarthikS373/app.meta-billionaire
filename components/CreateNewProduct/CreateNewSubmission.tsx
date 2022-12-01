import {
  Button,
  Flex,
  Input,
  Spacer,
  Text,
  useToast,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Image,
  Box,
  Textarea,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useEthersProvider from "../../hooks/useEthersProvider";
import { fetchSubmissions, uploadSubmissions } from "../../lib/firebase";

interface Submission {
  status: string;
  product: string;
  quantity: number;
  price: number;
  id: string;
  color: string;
}

const CreateNewSubmission = () => {
  const { address } = useEthersProvider();

  const [previewProductImage, setPreviewProductImage] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [productImage, setProductImage] = useState<string>("");
  //   const [productStart, setProductStart] = useState<string>();
  //   const [productEnd, setProductEnd] = useState<string>();
  const [productDesc, setProductDesc] = useState<string>("");
  const [productSpot, setProductSpot] = useState<number>(1);
  const [productPrice, setProductPrice] = useState<number>();
  const [productMaxPerUser, setProductMaxPerUser] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  const [viewSubmissionMode, setViewSubmissionMode] = useState<boolean>(false);
  const [submissions, setSubmissions] = useState<Array<Submission>>([]);

  const fetchUserSubmission = () => {
    setSubmissions([]);

    fetchSubmissions(address)
      .then((docs) => {
        const temporarySubmissions: Array<Submission> = [];

        const subs = docs.forEach((doc) => {
          if (doc.exists()) {
            const sub = doc.data();
            sub.docId = doc.id;

            let color = "white";

            console.log(sub.status)
            switch (sub.status) {
              case "approved":
                color = "green";
                break;
              case "pending":
                color = "yellow";
                break;
              case "rejected":
                color = "red";
                break;

              default:
                color = "white";
                break;
            }

            const data = {
              status: sub.status || "pending",
              product: sub.product || "",
              quantity: sub.quantity || "",
              price: sub.price || "",
              id: sub.id || sub.docId,
              color: color,
            };

            temporarySubmissions.push(data);
          }
        });

        setSubmissions([...temporarySubmissions]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUserSubmission();
  }, [address]);

  const submitNew = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      // TODO: Firebase Store
      const data = {
        address: address,
        product: productName,
        image: productImage,
        description: productDesc,
        quantity: productSpot,
        price: productPrice || 0,
        maxPerUser: productMaxPerUser || 0,
        id: "",
        status: "",
      };

      uploadSubmissions(address, data);

      setIsLoading(false);
      toast({
        description: "New Submission made successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      setProductName("");
      setProductImage("");
      setProductDesc("");
      setProductSpot(1);
      setProductMaxPerUser(undefined);
      setProductPrice(undefined);

      fetchUserSubmission();
    } catch (err) {
      setIsLoading(false);
      toast({
        description: "An error occured",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.log(err);
    }
    // toast({
    //   description: "Please switch to Polygon network",
    //   status: "error",
    //   duration: 9000,
    //   isClosable: true,
    // });
  };

  return (
    <Box w={["98%", null, "80%"]} margin={"auto"} textAlign={"center"} pt={5}>
      <Flex
        w="100%"
        align="center"
        justify="center"
        flexDir={["column", null, "row"]}
      >
        <Text
          fontSize={30}
          fontFamily="MontserratBold"
          textAlign={["center", "left"]}
          w="100%"
          color="customBlue.500"
        >
          {!viewSubmissionMode ? "Submit an Entry" : "My Submissions"}
        </Text>
        <Spacer />
        <Button
          fontSize={[15, 15, 17, 17]}
          px="md"
          mt={[5, 3, 0]}
          py={6}
          borderRadius="full"
          colorScheme="customBlue"
          shadow="lg"
          fontFamily="MontserratBold"
          onClick={() => {
            setViewSubmissionMode((prev) => !prev);
          }}
          mr="sm"
        >
          {!viewSubmissionMode ? "My Submissions" : "New submission"}
        </Button>
      </Flex>

      {!viewSubmissionMode ? (
        <Flex
          fontFamily="MontserratBold"
          align="flex-start"
          justify="flex-start"
          flex={1}
          p="md"
          w="100%"
          borderWidth={3}
          borderColor="customBlue.500"
          borderRadius={15}
          mt="sm"
          flexDir="column"
        >
          <form style={{ width: "100%" }} onSubmit={submitNew}>
            <Flex w="100%" align="center" flexDir="column" justify="center">
              <Text w="100%" fontSize={16} textTransform="uppercase">
                Product Name :
              </Text>
              <Input
                fontFamily={"sans-serif"}
                fontSize={["14px", null, "sm"]}
                w="100%"
                value={productName}
                mt={2}
                required
                onChange={(e) => setProductName(e.target.value)}
                colorScheme="customBlue"
                placeholder="Product name"
              />
            </Flex>

            <Flex
              w="100%"
              mt="sm"
              align={["center", "flex-start", "center"]}
              flexDir="column"
              justify="center"
            >
              {productImage.length > 0 && (
                <Image
                  src={previewProductImage}
                  alt=""
                  objectFit="cover"
                  w={200}
                  h={200}
                  marginY={3}
                  borderRadius={10}
                  shadow="lg"
                />
              )}
              <Text w="100%" fontSize={16} textTransform="uppercase">
                Product Image (URL) :
              </Text>
              <Input
                fontFamily={"sans-serif"}
                fontSize={["14px", null, "sm"]}
                w="100%"
                value={productImage}
                mt={2}
                required
                onChange={(e) => {
                  setPreviewProductImage(e.target.value);
                  setProductImage(e.target.value);
                }}
                colorScheme="customBlue"
                placeholder="Product image"
              />
            </Flex>

            {/* <Flex
            w="100%"
            mt="sm"
            align="center"
            flexDir="column"
            justify="center"
          >
            <Text w="100%" fontSize={16} textTransform="uppercase">
              Product Sale Start Time (Timestamp) :
            </Text>
            <Input
              w="100%"
              mt={2}
              fontFamily={"sans-serif"}
              fontSize={["14px", null, "sm"]}
              type="datetime-local"
              required
              onChange={(e) => {
                setProductStart(
                  Date.parse(e.target.value).toString().slice(0, 10)
                );
              }}
              colorScheme="customBlue"
              placeholder="Product start sale time"
            />
          </Flex>

          <Flex
            w="100%"
            mt="sm"
            align="center"
            flexDir="column"
            justify="center"
          >
            <Text w="100%" fontSize={16} textTransform="uppercase">
              Product Sale End Time (Timestamp) :
            </Text>
            <Input
              fontFamily={"sans-serif"}
              fontSize={["14px", null, "sm"]}
              w="100%"
              mt={2}
              type="datetime-local"
              required
              onChange={(e) => {
                setProductEnd(
                  Date.parse(e.target.value).toString().slice(0, 10)
                );
              }}
              colorScheme="customBlue"
              placeholder="Product end sale time"
            />
          </Flex> */}
            <Flex
              w="100%"
              mt="sm"
              align={["center", "flex-start", "center"]}
              flexDir="column"
              justify="center"
            >
              <Text w="100%" fontSize={16} textTransform="uppercase">
                Product Description :
              </Text>
              <Textarea
                placeholder="Small description about the product..."
                rows={10}
                value={productDesc}
                onChange={(e) => {
                  setProductDesc(e.target.value);
                }}
                resize={"none"}
                shadow="sm"
                fontSize={["16px", null, "18px"]}
                fontFamily={"sans-serif"}
                focusBorderColor="brand.400"
              />
            </Flex>

            <Flex
              w="100%"
              mt="sm"
              align="center"
              flexDir="column"
              justify="center"
            >
              <Text w="100%" fontSize={16} textTransform="uppercase">
                Product Quantity :
              </Text>
              <NumberInput
                w="100%"
                isRequired
                colorScheme="customBlue"
                defaultValue={productSpot}
                min={0}
                mt={2}
                fontFamily={"sans-serif"}
                fontSize={["14px", null, "sm"]}
                onChange={(e: any) => setProductSpot(e)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Flex>

            <Flex
              w="100%"
              mt="sm"
              align="center"
              flexDir="column"
              justify="center"
            >
              <Text w="100%" fontSize={16} textTransform="uppercase">
                Product Price in MBUC :
              </Text>
              <NumberInput
                fontFamily={"sans-serif"}
                fontSize={["14px", null, "sm"]}
                w="100%"
                isRequired
                colorScheme="customBlue"
                defaultValue={productPrice}
                min={0}
                mt={2}
                onChange={(e: any) => setProductPrice(e)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Flex>

            <Flex
              w="100%"
              mt="sm"
              align="center"
              flexDir="column"
              justify="center"
            >
              <Text w="100%" fontSize={16} textTransform="uppercase">
                Max product per user :
              </Text>
              <NumberInput
                w="100%"
                isRequired
                colorScheme="customBlue"
                // fontSize={20}
                fontFamily={"sans-serif"}
                fontSize={["14px", null, "sm"]}
                defaultValue={productMaxPerUser}
                min={1}
                mt={2}
                onChange={(e: any) => setProductMaxPerUser(e)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Flex>
            <Button
              fontSize={15}
              size="md"
              w="100%"
              isLoading={isLoading}
              borderRadius="full"
              colorScheme="customBlue"
              shadow="md"
              mt="sm"
              textTransform="uppercase"
              type="submit"
              fontFamily="METAB"
            >
              Submit
            </Button>
          </form>
        </Flex>
      ) : (
        <Flex
          fontFamily="MontserratBold"
          align="center"
          justify={!viewSubmissionMode ? "flex-start" : "center"}
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
          {submissions.length < 1 ? (
            <Text>You don&apos;t have any Submissions</Text>
          ) : (
            <TableContainer w={"100%"} h={"100%"}>
              <Table variant="striped" colorScheme="customBlue">
                <TableCaption></TableCaption>
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Product Name</Th>
                    <Th>Product Quantity</Th>
                    <Th>Product Price ($MBUC)</Th>
                    <Th>Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {submissions.map((submission, index) => {
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
                  })}
                </Tbody>
                <Tfoot></Tfoot>
              </Table>
            </TableContainer>
          )}
        </Flex>
      )}
    </Box>
  );
};

export default CreateNewSubmission;
