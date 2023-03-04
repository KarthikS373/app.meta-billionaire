import {
  chakra,
  Box,
  Stack,
  Text,
  Image,
  Container,
  Button,
  ButtonProps,
  useColorModeValue,
} from "@chakra-ui/react";
import { PropsWithChildren } from "react";

const Category = () => {
  return (
    <Box
      borderWidth="1px"
      _hover={{ shadow: "lg" }}
      rounded="md"
      overflow="hidden"
      bg={useColorModeValue("white", "gray.800")}
    >
      <Image
        alt=""
        src="https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80"
        objectFit="cover"
        w="100%"
      />
      <Box p={{ base: 3, sm: 5 }}>
        <Box mb={6}>
          <chakra.h3
            fontSize={{ base: "lg", sm: "2xl" }}
            fontWeight="bold"
            lineHeight="1.2"
            mb={2}
          >
            Category
          </chakra.h3>
          <Text
            as="p"
            fontSize={[12, 12, 14, 16]}
            noOfLines={5}
            className="font-sans text-black/50"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
            molestias sed, natus tempore dolore ea blanditiis voluptas veritatis
            nisi repellat aperiam rerum quae voluptatum esse eligendi aut, quam
            culpa porro cum et nihil libero quaerat temporibus! Maiores veniam
            ea, minima iste quisquam dolor molestiae amet nulla consequuntur
            labore totam voluptatum consectetur ad id libero optio delectus
            expedita illo iusto placeat sapiente! Aut commodi omnis nulla libero
            neque assumenda esse doloremque quisquam eaque, perferendis dolore
            nam, in, earum veritatis nisi dolorum quas quidem ab error!
          </Text>
        </Box>
        <Stack justify="space-between" direction={"column"} spacing={5}>
          <CustomButton variant="outline">Option 1</CustomButton>
          <CustomButton colorScheme="blue" variant="solid">
            Option 2
          </CustomButton>
        </Stack>
      </Box>
    </Box>
  );
};

const CustomButton = ({
  children,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <Button
      textTransform="uppercase"
      lineHeight="inherit"
      fontSize={16}
      className="rounded shadow-sm text-md"
      {...props}
    >
      {children}
    </Button>
  );
};

export default Category;
