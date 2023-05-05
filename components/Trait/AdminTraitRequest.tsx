import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  useDisclosure,
  ButtonGroup,
  Image,
  useMediaQuery,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Grid,
  GridItem,
  Textarea,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { Trait, TraitShop } from "@prisma/client";
import json2csv from "json2csv";

const AdminTraitRequest = () => {
  const [isLessThan768] = useMediaQuery("(max-width: 768px)");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [traits, setTraits] = useState<TraitShop[]>([]);
  const [collection, setCollection] = useState<Trait[] | null>([]);
  const [current, setCurrent] = useState<number>(-1);
  const [note, setNote] = useState<string | null>(null);

  const handleExport = async () => {
    const response = await axios.get(
      "https://app.metabillionaire.com/api/exportTraits"
      // "http://localhost:3000/api/exportTraits"
    );
    const ordersWithTraits = await response.data;

    const fields = [
      "order",
      "address",
      "description",
      "total",
      {
        label: "traits",
        value: (row: any) => {
          const traits = row.trait.map((t: any) => ({
            category: t.category,
            asset: t.asset,
            cost: t.cost,
          }));
          return JSON.stringify(traits);
        },
      },
    ];

    const opts = { fields };
    const csv = json2csv.parse(ordersWithTraits, opts);

    console.clear();
    console.log(ordersWithTraits);
    console.log(csv);

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "traits.csv");
    link.click();
  };

  useEffect(() => {
    axios
      .get("https://app.metabillionaire.com/api/getTraitRequests")
      .then((res) => {
        // .get("http://localhost:3000/api/getTraitRequests")
        // .then((res) => {
        console.log(res.data);
        const d = [];

        const pdata = res.data.data.filter(
          (item: { isApproved: boolean | null }) => item.isApproved === null
        );
        const adata = res.data.data.filter(
          (item: { isApproved: boolean | null }) => item.isApproved === true
        );
        const rdata = res.data.data.filter(
          (item: { isApproved: boolean | null }) => item.isApproved === false
        );

        d.push(...pdata, ...adata, ...rdata);

        setTraits(d);
      });
  }, [current]);

  useEffect(() => {
    const temp: Trait[] = [];
    if (current !== -1) {
      setCollection(null);
      traits[current].request.map((request) => {
        axios
          .get(`https://app.metabillionaire.com/api/getTraits?id=${request}`)
          // .get(`http://localhost:3000/api/getTraits?id=${request}`)
          .then((res) => {
            console.log(res.data);
            temp.push(res.data.data);
            setCollection(temp);
          })
          .catch(() => {
            setCollection(null);
          });
      });
    } else {
      setCollection(null);
    }
  }, [traits, current]);

  const handleTraitApproval = (order: string, isApproved: boolean) => {
    axios
      .post("https://app.metabillionaire.com/api/getTraitRequests", {
        // .post("http://localhost:3000/api/getTraitRequests", {
        order: order,
        note: note,
        isApproved: isApproved,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

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
          onChange={(e) => {
            setNote(null);
            setCurrent(e as number);
          }}
        >
          {traits.map((trait, index) => {
            console.log("Status", trait.paymentStatus);
            return (
              <AccordionItem
                key={trait.order}
                className="border-0 outline-none"
              >
                <h2>
                  <AccordionButton className="h-16 center w-full justify-between border-0 outline-none">
                    <Flex gap={3} flex="1" textAlign="left">
                      #{trait.token}:{" "}
                      {trait.isApproved === null ? (
                        "pending"
                      ) : trait.isApproved ? (
                        <Flex w={"min"} gap={3} alignItems={"center"}>
                          Approved
                          <Box
                            h={4}
                            w={4}
                            bg={
                              trait.paymentStatus === "paid" ? "green" : "red"
                            }
                            rounded={"full"}
                          />
                        </Flex>
                      ) : (
                        <Flex>Rejected</Flex>
                      )}
                    </Flex>
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
                    <Text fontSize={16} fontFamily={"sans-serif"}>
                      <strong>Total: </strong>
                      {trait.total}
                    </Text>
                    {trait.description && (
                      <>
                        <Text fontSize={16} fontFamily={"sans-serif"}>
                          <strong>Description: </strong>
                          {trait.description}
                        </Text>
                      </>
                    )}
                    {trait.createdAt && (
                      <>
                        <Text fontSize={16} fontFamily={"sans-serif"}>
                          <>
                            <strong>Date: </strong>
                            {new Date(trait?.createdAt || "").toLocaleString()}
                          </>
                        </Text>
                      </>
                    )}
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
                    {collection === null ? (
                      <Flex my={4} mx={6} gap={4}>
                        <Spinner color="black" />
                        <Text>Loading Assets</Text>
                      </Flex>
                    ) : (
                      collection.map((item, index) => (
                        <GridItem
                          key={item?.asset}
                          w={"full"}
                          textAlign={"left"}
                        >
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
                              src={`/assets/layers/${item?.category
                                ?.split("-")
                                .join(" ")
                                .replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                                  letter.toUpperCase()
                                )}/${item?.imagePath}`}
                              alt={item?.asset}
                              width={1920}
                              height={1080}
                              className="!w-full !h-full mb-2 rounded-md"
                              style={{
                                objectFit: "cover",
                                objectPosition: "center",
                              }}
                            />
                            {item?.asset}
                          </Box>
                        </GridItem>
                      ))
                    )}
                  </Grid>
                  {trait.isApproved === null ? (
                    <Textarea
                      onChange={(e) => {
                        if (e.target.value.length > 0) setNote(e.target.value);
                        else setNote(null);
                      }}
                      placeholder="Admin note"
                      className="font-sans text-sm"
                    />
                  ) : (
                    <Text fontSize={18} mt={2} fontFamily={"sans-serif"}>
                      {trait.adminNote}
                    </Text>
                  )}
                  {trait.isApproved === null ? (
                    <ButtonGroup mt={5} display={"flex"}>
                      <Button
                        fontFamily={"sans-serif"}
                        fontSize={16}
                        bgColor={"customBlue.500"}
                        color={"white"}
                        onClick={() => {
                          handleTraitApproval(trait.order, true);
                        }}
                      >
                        Approve
                      </Button>
                      <Button
                        fontFamily={"sans-serif"}
                        fontSize={16}
                        colorScheme={"red"}
                        color={"white"}
                        onClick={() => {
                          handleTraitApproval(trait.order, false);
                        }}
                      >
                        Reject
                      </Button>
                    </ButtonGroup>
                  ) : (
                    <Box mt={4}>
                      Status: {trait.isApproved ? "Approved" : "Rejected"}
                    </Box>
                  )}
                </AccordionPanel>
              </AccordionItem>
            );
          })}
        </Accordion>
      </Box>
      <Button variant="contained" mt={5} onClick={handleExport}>
        Export Data
      </Button>
    </Flex>
  );
};

export default AdminTraitRequest;
