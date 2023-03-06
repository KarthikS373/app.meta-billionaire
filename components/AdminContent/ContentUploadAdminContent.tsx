import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  Box,
  Spacer,
  useToast,
  Spinner,
  Input,
  Button,
  Select,
  Stack,
  Checkbox,
  Image,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import API from "../../lib/api";
import ContentCard from "../ContentAdminCards/ContentCard";
import EditContent from "../ContentAdminCards/EditContent";

// import { addContent } from "../../lib/firebase";

// const platforms = ["youtube", "wistia"];

// const AdminContent = ({
//   videoListData,
//   fetchAllItem,
//   userPassword,
//   user,
// }: any) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [actualProject, setActualProject] = useState<any | null>(null);
//   const [itemImage, setItemImage] = useState("");
//   const [itemName, setItemName] = useState("");
//   const [itemVideo, setItemVideo] = useState("");
//   const [itemType, setItemType] = useState<"podcast" | "ama" | "value">(
//     "podcast"
//   );
//   const [moneyMakerHere, setMoneyMakerHere] = useState(false);
//   const [robotomHere, setRobotomHere] = useState(false);
//   const [speaker, setSpeaker] = useState("");
//   const [platform, setPlatform] = useState(platforms[0]);
//   const toast = useToast();
//   const router = useRouter();
//   const types = ["Podcast", "AMA", "Value"];
//   // const speakersList = ["MONEYMAKER", "ROBOTOM"];

//   const checkValueCheckBox = (actualProjectData: string) => {
//     if (actualProject) {
//       if (actualProjectData === "MONEYMAKER") {
//         if (actualProject.isMoneyMaker) {
//           return moneyMakerHere;
//         } else {
//           return moneyMakerHere;
//         }
//       } else if (actualProjectData === "ROBOTOM") {
//         if (actualProject.isRobotom) {
//           return robotomHere;
//         } else {
//           return robotomHere;
//         }
//       }
//     }
//   };

//   const deleteItem = async (item: { image?: any; name?: any; id?: any }) => {
//     // setIsLoading(true);
//     // await API.post("/item", {
//     //   itemId: item.id,
//     //   action: "delete",
//     //   userPassword,
//     // })
//     //   .then((response) => {
//     //     fetchAllItem();
//     //     setIsLoading(false);
//     //     toast({
//     //       description: response.data.msg || "Item was removed successfully",
//     //       status: "success",
//     //       duration: 4000,
//     //       isClosable: true,
//     //     });
//     //   })
//     //   .catch((err) => {
//     //     setIsLoading(false);
//     //     toast({
//     //       description:
//     //         err.response.data.msg ||
//     //         "An error occured, please try again later...",
//     //       status: "error",
//     //       duration: 4000,
//     //       isClosable: true,
//     //     });
//     //   });
//   };

//   const updateItem = async () => {
//     // setIsLoading(true);
//     // await API.post("/item", {
//     //   image: itemImage,
//     //   name: itemName,
//     //   url: itemVideo,
//     //   type: itemType,
//     //   moneyMakerHere,
//     //   robotomHere,
//     //   action: "update",
//     //   itemId: actualProject?.id,
//     //   userPassword,
//     // })
//     //   .then((response) => {
//     //     setIsLoading(false);
//     //     fetchAllItem();
//     //     setEditMode(false);
//     //     setItemImage("");
//     //     setItemName("");
//     //     setItemVideo("");
//     //     setItemType("podcast");
//     //     setRobotomHere(false);
//     //     setMoneyMakerHere(false);
//     //     toast({
//     //       description: response.data.msg || "Item was updated successfully",
//     //       status: "success",
//     //       duration: 4000,
//     //       isClosable: true,
//     //     });
//     //   })
//     //   .catch((err) => {
//     //     setIsLoading(false);
//     //     toast({
//     //       description:
//     //         err.response.data.msg ||
//     //         "An error occured, please try again later...",
//     //       status: "error",
//     //       duration: 4000,
//     //       isClosable: true,
//     //     });
//     //   });
//   };

//   const createItem = async () => {
//     setIsLoading(true);

//     addContent(itemName, itemImage, itemVideo, platform, itemType, speaker)
//       .then((res) => {
//         console.log(res);
//         setIsLoading(false);
//         setEditMode(false);
//         setItemImage("");
//         setItemName("");
//         setItemVideo("");
//         setItemType("podcast");
//         toast({
//           description: "Item was created successfully",
//           status: "success",
//           duration: 1000,
//           isClosable: true,
//         });
//       })
//       .catch((err) => {
//         console.clear();
//         console.log(err);
//       });
//     // await API.post("/item", {
//     //   itemImage,
//     //   itemName,
//     //   itemVideo,
//     //   itemType,
//     //   moneyMakerHere,
//     //   robotomHere,
//     //   action: "add",
//     //   userPassword,
//     // })
//     //   .then((response) => {
//     //     setIsLoading(false);
//     //     fetchAllItem();
//     //     setEditMode(false);
//     //     setItemImage("");
//     //     setItemName("");
//     //     setItemVideo("");
//     //     setItemType("");
//     //     setRobotomHere(false);
//     //     setMoneyMakerHere(false);
//     //     toast({
//     //       description: response.data.msg || "Item was created successfully",
//     //       status: "success",
//     //       duration: 4000,
//     //       isClosable: true,
//     //     });
//     //   })
//     //   .catch((err) => {
//     //     setIsLoading(false);
//     //     toast({
//     //       description:
//     //         err.response.data.msg ||
//     //         "An error occured, please try again later...",
//     //       status: "error",
//     //       duration: 4000,
//     //       isClosable: true,
//     //     });
//     //   });
//   };

//   const handleSubmit = (e: { preventDefault: () => void }) => {
//     e.preventDefault();
//     if (actualProject) {
//       updateItem();
//     } else {
//       createItem();
//     }
//   };

//   useEffect(() => {
//     if (actualProject) {
//       setItemImage(actualProject.image);
//       setItemName(actualProject.name);
//       setItemVideo(actualProject.url);
//       setItemType(actualProject.type);
//       setRobotomHere(actualProject.isRobotom);
//       setMoneyMakerHere(actualProject.isMoneyMaker);
//     }
//   }, [actualProject]);

//   return (
//     <Flex align="center" justify="center" my="sm" w="100%" flexDir="column">
//       <Text textTransform="uppercase" fontSize={22} fontWeight={500}>
//         CONTENT LIST
//       </Text>

//       <Flex w="100%" flexDir="column" align="center" flex={1} justify="center">
//         {isLoading ? (
//           <Spinner color="customGray" mt="lg" />
//         ) : editMode ? (
//           <>
//             <Button
//               colorScheme="customGray"
//               onClick={() => {
//                 setItemImage("");
//                 setItemName("");
//                 setItemVideo("");
//                 setItemType("podcast");
//                 setRobotomHere(false);
//                 setMoneyMakerHere(false);
//                 setEditMode(false);
//               }}
//               fontSize={15}
//               fontWeight={300}
//               mt="sm"
//               mb="md"
//             >
//               Return to admin panel
//             </Button>
//             <form onSubmit={handleSubmit}>
//               <Text
//                 fontSize={[25, 25, 30, 30]}
//                 letterSpacing={2}
//                 fontWeight={600}
//                 mt={["sm", "sm", 0, 0]}
//               >
//                 ITEM
//               </Text>
//               <Flex align="center" justify="center" flexDir="column">
//                 <Input
//                   value={itemName}
//                   type="text"
//                   onChange={(e) => setItemName(e.target.value)}
//                   placeholder="Content Name..."
//                   fontSize={15}
//                   letterSpacing={2}
//                   fontWeight={600}
//                   w="100%"
//                   mt="md"
//                   required
//                 />
//                 <Input
//                   value={itemImage}
//                   type="text"
//                   onChange={(e) => setItemImage(e.target.value)}
//                   placeholder="Image Path URL..."
//                   fontSize={15}
//                   letterSpacing={2}
//                   fontWeight={600}
//                   w="100%"
//                   mt="md"
//                   required
//                 />
//                 <Input
//                   value={itemVideo}
//                   type="text"
//                   onChange={(e) => setItemVideo(e.target.value)}
//                   placeholder="Video Path URL..."
//                   fontSize={15}
//                   letterSpacing={2}
//                   fontWeight={600}
//                   w="100%"
//                   mt="md"
//                   required
//                 />

//                 <Select
//                   fontSize={15}
//                   letterSpacing={2}
//                   fontWeight={600}
//                   mt="md"
//                   bg="customGray.500"
//                   className="select-container"
//                   value={platform}
//                   onChange={(e) => {
//                     console.log(e.target.value);
//                     setPlatform(e.target.value);
//                   }}
//                   required
//                 >
//                   {platforms.map((e, i) => (
//                     <option key={i} value={e}>
//                       {e}
//                     </option>
//                   ))}
//                 </Select>
//                 <Select
//                   fontSize={15}
//                   letterSpacing={2}
//                   fontWeight={600}
//                   mt="md"
//                   bg="customGray.500"
//                   className="select-container"
//                   value={itemType}
//                   onChange={(e) => {
//                     setItemType(e.target.value as any);
//                   }}
//                   required
//                 >
//                   {types.map((e, i) => (
//                     <option key={i} value={e}>
//                       {e}
//                     </option>
//                   ))}
//                 </Select>
//                 <Text textAlign="center" w="100%" my="md">
//                   <div>Speakers :</div>
//                   <em>Comma seperated</em>
//                 </Text>
//                 <Stack
//                   spacing={5}
//                   direction="column"
//                   className="checkbox-container"
//                 >
//                   <Input
//                     value={speaker}
//                     type="text"
//                     onChange={(e) => setSpeaker(e.target.value)}
//                     placeholder="Speakers (comma seperated)"
//                     fontSize={15}
//                     letterSpacing={2}
//                     fontWeight={600}
//                     w="100%"
//                     mt="md"
//                     required
//                   />
//                   {/* {speakersList.map((actualProjectData, i) => {
//                     return (
//                       <Checkbox
//                         required
//                         key={i}
//                         colorScheme="customGray"
//                         defaultIsChecked
//                         isChecked={checkValueCheckBox(actualProjectData)}
//                         onChange={(e) =>
//                           actualProjectData === "MONEYMAKER"
//                             ? setMoneyMakerHere(e.target.checked)
//                             : setRobotomHere(e.target.checked)
//                         }
//                       >
//                         {actualProjectData === "MONEYMAKER"
//                           ? speakersList[0]
//                           : speakersList[1]}
//                       </Checkbox>
//                     );
//                   })} */}
//                 </Stack>
//                 <Button
//                   colorScheme="customGray"
//                   fontSize={15}
//                   fontWeight={300}
//                   mt="md"
//                   type="submit"
//                 >
//                   {actualProject ? "Update" : "Create"}
//                 </Button>
//               </Flex>
//             </form>
//           </>
//         ) : (
//           <>
//             <Flex
//               flexDir={["column", "column", "row", "row"]}
//               align="center"
//               justify="center"
//               mt="sm"
//               mb="md"
//             >
//               <Button
//                 colorScheme="customGray"
//                 onClick={() => router.push("/content")}
//                 fontSize={15}
//                 fontWeight={300}
//                 mr={[0, 0, "sm", "sm"]}
//               >
//                 Return to website
//               </Button>

//               <Button
//                 colorScheme="customGray"
//                 onClick={() => {
//                   setActualProject(null);
//                   setEditMode(true);
//                 }}
//                 fontSize={15}
//                 fontWeight={300}
//                 mt={["md", "md", 0, 0]}
//                 ml={[0, 0, "sm", "sm"]}
//               >
//                 Add new item
//               </Button>
//             </Flex>
//             {videoListData ? (
//               videoListData.length > 0 ? (
//                 videoListData.map(
//                   (
//                     e: { image?: any; name?: any; id?: any },
//                     i: React.Key | null | undefined
//                   ) => {
//                     return (
//                       <Flex
//                         align="center"
//                         justify="flex-start"
//                         key={i}
//                         w={["90%", "90%", "60%", "60%"]}
//                         mb="xs"
//                         boxShadow="md"
//                         bgColor="#1d1d1d"
//                         borderRadius={5}
//                         _hover={{
//                           transform: "scale(1.02)",
//                         }}
//                         transition="transform ease 0.5s"
//                         pr="md"
//                       >
//                         <Box w={[150, 150, 200, 200]}>
//                           <Image
//                             src={e.image}
//                             alt={e.name}
//                             width={200}
//                             height={100}
//                             className="rounded-img"
//                           />
//                         </Box>

//                         <Text
//                           ml={["xs", "xs", "sm", "sm"]}
//                           fontSize={[16, 16, 22, 22]}
//                           fontWeight={400}
//                         >
//                           {e.name}
//                         </Text>
//                         <Spacer />
//                         <Text
//                           onClick={() => {
//                             setActualProject(e);
//                             setEditMode(true);
//                           }}
//                           cursor="pointer"
//                           w={5}
//                           h={5}
//                           color="white"
//                         >
//                           Edit
//                         </Text>
//                         <Text
//                           onClick={() => deleteItem(e)}
//                           cursor="pointer"
//                           w={5}
//                           h={5}
//                           ml="sm"
//                           color="red"
//                         >
//                           Delete
//                         </Text>
//                       </Flex>
//                     );
//                   }
//                 )
//               ) : (
//                 <Text fontSize={[16, 16, 22, 22]} fontWeight={400}>
//                   List is empty
//                 </Text>
//               )
//             ) : (
//               <Spinner color="customGray" mt="lg" />
//             )}
//           </>
//         )}
//       </Flex>
//     </Flex>
//   );
// };

// export default AdminContent;

const AdminContent = ({}: any) => {
  const router = useRouter();

  const [state, setState] = useState<"podcast" | "AMA" | "courses" | null>(
    null
  );
  const [edit, setEdit] = useState<boolean>(true);

  const renderButton = (
    title: string,
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined
  ) => (
    <Button
      colorScheme="customGray"
      _hover={{
        bg: "gray.700",
      }}
      w={"full"}
      onClick={onClick}
      fontSize={15}
      fontWeight={300}
    >
      {title}
    </Button>
  );

  return (
    <>
      <Flex align="center" justify="center" my="sm" w="100%" flexDir="column">
        <Text textTransform="uppercase" fontSize={22} fontWeight={500} mb="md">
          {state ? (edit ? `Edit - ${state}` : state) : "Admin"}
        </Text>
        {/* Admin Main */}
        <Box w={["90%", "25%"]} className="space-y-8">
          {state === null && (
            <>
              {renderButton("Back to website", () => {
                router.push("/content");
              })}
              {renderButton("Podcasts", () => {
                setState("podcast");
                router.push("#podcast");
              })}
              {renderButton("AMA", () => {
                setState("AMA");
                router.push("#ama");
              })}
              {renderButton("Courses", () => {
                setState("courses");
                router.push("#courses");
              })}
            </>
          )}

          {state !== null && edit === false && (
            <>
              {renderButton("Return to Main menu", () => {
                setState(null);
                router.push("#");
              })}
              {renderButton(`Add new ${state}`, () => {})}
              <Text
                textTransform="uppercase"
                fontSize={16}
                fontWeight={200}
                mt="md"
              >
                {"Content"}
              </Text>
              {/* Podcasts */}
              {state === "podcast" && (
                <>
                  <Box w="full">
                    {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
                      <ContentCard key={index} />
                    ))}
                  </Box>
                </>
              )}
            </>
          )}

          {/* Editmode */}
          {state && edit && (
            <>
              <EditContent back={() => setEdit(false)} />
            </>
          )}
        </Box>
      </Flex>
    </>
  );
};
export default AdminContent;
