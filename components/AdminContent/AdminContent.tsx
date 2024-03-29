import {
  Button,
  Flex,
  Spacer,
  Spinner,
  Text,
  chakra,
  TableContainer,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import useEthersProvider from "../../hooks/useEthersProvider";
import contractABI from "../../artifacts/contracts/MarketplaceERC20.sol/Marketplace.json";
import { useEffect, useState } from "react";
import CreateNewProduct from "../CreateNewProduct/CreateNewProduct";
import AdminStoreList from "../AdminStoreList/AdminStoreList";
import { Table, Thead, Tbody, Tr, Th, Td } from "../../components/CustomTable";
import UserSubmissionTable from "../AdminStoreItem/UserSubmissionTable";
import AdminTraitRequest from "../Trait/AdminTraitRequest";
import Link from "next/link";

const AdminContent = ({ products, raffleWinner }: any) => {
  const [isLessThan600, setIsLessThan600] = useState(false);
  const [activeProducts, setActiveProducts] = useState<any>(null);
  const [createNewMode, setCreateNewMode] = useState<boolean>(false);
  const [loadingName, setLoadingName] = useState<boolean>(false);
  const [productNameArray, setProductNameArray] = useState<any>(null);
  const { provider } = useEthersProvider();

  const getActiveProduct = async () => {
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT!,
      contractABI.abi,
      provider
    );
    try {
      const getProduct = await contract.getActiveProducts();
      setActiveProducts(getProduct);
    } catch (err) {
      console.log("error when fetching store content on contract");
      console.log(err);
    }
  };

  const getProductNamePromise = async () => {
    let arrayData = [];

    for (let i = 0; i < products.length - 1; i++) {
      const contract = new ethers.Contract(
        products[i].oldContract
          ? process.env.NEXT_PUBLIC_OLD_MARKETPLACE_CONTRACT!
          : process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT!,
        contractABI.abi,
        provider
      );

      if (typeof products[i].id === "number") {
        try {
          const getProduct = await contract.products(products[i].productId);
          arrayData[products[i].productId] = getProduct[1];
        } catch (err) {
          console.log("error when fetching name user on contract");
          console.log(err);
        }
      }
    }

    setProductNameArray(arrayData);
  };

  const getProductName = async () => {
    setLoadingName(true);
    await Promise.all([getProductNamePromise()]).then(() => {
      setLoadingName(false);
    });
  };

  useEffect(() => {
    if (provider && activeProducts === null) {
      getActiveProduct();
    }

    if (provider && productNameArray === null) {
      getProductName();
    }
  }, [provider]);

  useEffect(() => {
    const manageResize = () => {
      if (window.innerWidth < 600) {
        setIsLessThan600(true);
      } else {
        setIsLessThan600(false);
      }
    };

    manageResize();
    window.addEventListener("resize", manageResize);

    return () => {
      window.removeEventListener("resize", manageResize);
    };
  }, []);

  const sortProduct = [...products].sort(
    (a, b) => Number(a.productId) - Number(b.productId)
  );

  // Table
  const ProductColumns = [
    {
      key: "id",
      label: "#",
      primary: true,
    },
    {
      key: "name",
      label: "Name",
    },
    {
      key: "wallet",
      label: "Wallet",
    },
    {
      key: "quantity",
      label: "Quantity",
    },
    {
      key: "product",
      label: "Product",
    },
  ];

  const ProductData = sortProduct.map((x: any, i: number) => {
    return {
      id: i,
      name: x.owner.name,
      wallet: x.authorId,
      quantity: x.qunatity,
      product:
        loadingName != null ? (
          <Spinner m="0 auto" size="md" color="customBlue.500" />
        ) : productNameArray === null ? (
          <Text fontSize={12}>Please connect wallet</Text>
        ) : (
          productNameArray[x.productId]
        ),
    };
  });

  return (
    <Flex
      align="center"
      flexDir="column"
      justify="flex-start"
      my="sm"
      px={["2px", "xs"]}
      w="100%"
      flex={1}
    >
      <Flex align="center" justify="center" w="100%">
        <Flex align="flex-start" justify="center" flexDir="column">
          <Text fontSize={35} color="black">
            ADMIN
          </Text>
        </Flex>
        <Spacer />
      </Flex>
      <Flex
        flex={1}
        mt="md"
        align="center"
        w="100%"
        flexDir="column"
        justify="center"
      >
        {createNewMode ? (
          <CreateNewProduct setCreateNewMode={setCreateNewMode} />
        ) : (
          <>
            <Flex
              w="100%"
              align="center"
              justify="center"
              flexDir={["column", null, "row"]}
            >
              <Text
                fontSize={30}
                fontFamily="MontserratBold"
                textAlign="left"
                w="100%"
                color="customBlue.500"
              >
                Manage Marketplace
              </Text>
              <Spacer />

              <Button
                fontSize={15}
                size="md"
                w="100%"
                borderRadius="full"
                colorScheme="customBlue"
                shadow="md"
                textTransform="uppercase"
                fontFamily="METAB"
                mt={1}
                onClick={() => setCreateNewMode(true)}
              >
                Create new product
              </Button>
            </Flex>
            <Link href={"#trait-request"} passHref>
              <Button
                mt={5}
                display={["block", "block", "none", "none"]}
                fontFamily={"sans-serif"}
                rounded={"full"}
              >
                Go to Trait Requests
              </Button>
            </Link>

            {activeProducts ? (
              activeProducts.length > 0 ? (
                <AdminStoreList
                  activeProducts={activeProducts}
                  getActiveProduct={getActiveProduct}
                  raffleWinner={raffleWinner}
                />
              ) : (
                <Flex align="center" justify="center" flex={1}>
                  <Text
                    fontSize={25}
                    fontFamily="MontserratBold"
                    color="customBlue.500"
                    textAlign="center"
                  >
                    There is no active product
                    <br /> on Marketplace actually
                  </Text>
                </Flex>
              )
            ) : (
              <Spinner m="0 auto" size="xl" mt="lg" color="customBlue.500" />
            )}
          </>
        )}
      </Flex>

      <Flex w="100%" align="center" mt="md" justify="center" flexDir="column">
        <Text
          fontSize={30}
          fontFamily="MontserratBold"
          textAlign="left"
          w="100%"
          color="customBlue.500"
        >
          All Buy Products
        </Text>

        <TableContainer
          overflowY="scroll"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#294BF5 #ffffff",
          }}
          maxHeight="450px"
          w="100%"
          shadow="md"
          my={["sm", "md"]}
        >
          <Table
            variant="simple"
            colorScheme="customBlue"
            size="md"
            style={{
              border: isLessThan600 ? "" : "1px solid #ccc",
              borderCollapse: "collapse",
              margin: "0",
              padding: "0",
              width: "100%",
              tableLayout: "auto",
            }}
          >
            {!isLessThan600 && (
              <Thead position="sticky" top={0} bgColor="#ffffff">
                <Tr>
                  <Th fontFamily="Montserrat" fontSize={15}>
                    #
                  </Th>
                  <Th fontFamily="Montserrat" fontSize={15}>
                    Name
                  </Th>
                  <Th fontFamily="Montserrat" fontSize={15}>
                    Wallet
                  </Th>
                  <Th fontFamily="Montserrat" fontSize={15}>
                    Quantity
                  </Th>
                  <Th fontFamily="Montserrat" fontSize={15}>
                    Product
                  </Th>
                </Tr>
              </Thead>
            )}
            {!isLessThan600 && (
              <Tbody fontFamily="Montserrat" bgColor="#f7f7f7">
                {sortProduct.map((x: any, i: number) => {
                  return (
                    <Tr
                      cursor="pointer"
                      transition="all ease 0.3s"
                      key={i}
                      _hover={{
                        bgColor: "customBlue.500",
                        color: "white",
                        borderRadius: "15px",
                      }}
                      borderRadius={10}
                    >
                      <Td textAlign={"left"}>{i}</Td>
                      <Td>{x.owner.name}</Td>
                      <Td>{x.authorId}</Td>
                      <Td>{x.quantity}</Td>

                      <Td>
                        {loadingName ? (
                          <Spinner
                            m="0 auto"
                            size="md"
                            color="customBlue.500"
                          />
                        ) : productNameArray === null ? (
                          <Text fontSize={12}>Please connect wallet</Text>
                        ) : (
                          productNameArray[x.productId]
                        )}
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            )}
            {isLessThan600 && (
              <>
                <Accordion
                  className="border rounded-xl py-2 px-1 shadow"
                  w={"full"}
                  allowToggle
                  mt={4}
                  onChange={(e) => {}}
                >
                  {sortProduct.map((x: any, i: number) => {
                    return (
                      <AccordionItem key={i} className="border-0 outline-none">
                        <h2>
                          <AccordionButton className="h-16 center w-full justify-between border-0 outline-none">
                            <Flex gap={3} flex="1" textAlign="left">
                              <Text>{x.owner.name}</Text>
                            </Flex>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} overflow={"hidden"}>
                          <Flex gap={3}>
                            Name:
                            <Text fontFamily={"sans-serif"}>
                              {x.owner.name}
                            </Text>
                          </Flex>
                          <Text fontFamily={"sans-serif"}>{x.authorId}</Text>
                          <Flex gap={3}>
                            Quantity:
                            <Text fontFamily={"sans-serif"}>{x.quantity}</Text>
                          </Flex>

                          <Box mt={4}>
                            {loadingName ? (
                              <Spinner
                                m="0 auto"
                                size="md"
                                color="customBlue.500"
                              />
                            ) : productNameArray === null ? (
                              <Text fontSize={12}>Please connect wallet</Text>
                            ) : (
                              productNameArray[x.productId]
                            )}
                          </Box>
                        </AccordionPanel>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </>
            )}
          </Table>
        </TableContainer>
      </Flex>
      <UserSubmissionTable />
      <Box w={"full"} id="trait-request">
        <AdminTraitRequest />
      </Box>
    </Flex>
  );
};

export default AdminContent;
