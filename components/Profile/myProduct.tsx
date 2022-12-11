import {
  Box,
  Flex,
  IconButton,
  Image,
  Link,
  SimpleGrid,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { AiFillTwitterCircle } from "react-icons/ai";

const MyProductCard = ({ name, image, price }: any) => {
  return (
    <Flex
      align="center"
      justify="center"
      maxW="350px"
      h="300px"
      w="100%"
      mx="auto"
      my="20px"
      p="20px"
      borderColor="customBlue.500"
      borderWidth={3}
      borderStyle="solid"
      bgColor="#ffffff"
      flexDir={["column", "column", "row", "row"]}
      shadow="xl"
      borderRadius={15}
    >
      <Flex align="center" justify="center" flexDir="column" w="100%">
        <Flex align="center" justify="center" w="100%" flexDir="column">
          <Image
            src={image}
            alt={name}
            h={100}
            mx="auto"
            mb="7px"
            borderRadius={10}
            shadow="lg"
          />
          <Text
            fontSize={[16]}
            textAlign="center"
            fontFamily="METAB"
          >
            {name}
          </Text>
          <Spacer />
        </Flex>
        <SimpleGrid
          justifyItems="center"
          alignItems="center"
          textAlign={"center"}
          spacingX={2}
          spacingY={4}
          mt="md"
          w="100%"
        >
          <Box>
            <Text fontSize={[18]} fontFamily="Montserrat">
              Price
            </Text>
            <Text
              fontSize={[16]}
              color="customBlue.500"
              fontFamily="METAB"
            >
              {Number(price).toFixed(0)} MBUC/ticket
            </Text>
          </Box>
        </SimpleGrid>

        {/* <Flex align="center" w="100%" justify="center" mt="md">
          <Button
            color="customBlue.500"
            fontSize={[15, 15, 18, 18]}
            boxShadow="none"
            bgColor="#e7e7e7"
            _hover={{
              bgColor: "#fff",
            }}
            _focus={{
              bgColor: "#fff",
            }}
          >
            -
          </Button>
          <Input
            boxShadow="none"
            fontSize={[15, 15, 18, 18]}
            w="65px"
            readOnly
            isDisabled
            type="number"
            min={1}
            max={data.wlSpot}
            _disabled={{
              opacity: 1,
            }}
            borderWidth={0}
            borderColor="transparent"
            _focus={{
              borderColor: "transparent",
            }}
            {...input}
          />
          <Button
            color="customBlue.500"
            fontSize={[15, 15, 18, 18]}
            {...inc}
            boxShadow="none"
            bgColor="#e7e7e7"
            _hover={{
              bgColor: "#fff",
            }}
            _focus={{
              bgColor: "#fff",
            }}
          >
            +
          </Button>
          <Spacer />
          {Number(finalStockResult) > 1 ? (
            <Button
              fontSize={[15, 15, 17, 17]}
              fontFamily="Montserrat"
              colorScheme="customBlue"
              w="50%"
              shadow="lg"
              onClick={() => buyProduct()}
              isLoading={isLoading}
              isDisabled={
                new Date(Number(finalEndResult) * 1000).getTime() -
                  new Date().getTime() <
                0
              }
            >
              Buy
            </Button>
          ) : (
            <Button
              fontSize={[15, 15, 17, 17]}
              fontFamily="Montserrat"
              colorScheme="customBlue"
              w="50%"
              shadow="lg"
              disabled
              isLoading={isLoading}
            >
              Sold out
            </Button>
          )}
        </Flex> */}
      </Flex>
    </Flex>
  );
};

export default MyProductCard;
