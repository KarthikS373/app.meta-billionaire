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
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";

const Category = ({ title, description, banner }: any) => {
  const router = useRouter();

  return (
    <Box
      borderWidth="1px"
      _hover={{ shadow: "lg" }}
      rounded="md"
      overflow="hidden"
      bg={useColorModeValue("white", "gray.800")}
      w="full"
    >
      <Image
        alt=""
        src={
          banner ||
          "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80"
        }
        objectFit="cover"
        w="100%"
      />
      <Box p={{ base: 3, sm: 5 }}>
        <Box mb={6}>
          <chakra.h3
            whiteSpace={"nowrap"}
            fontSize={{ base: "lg", sm: "2xl" }}
            fontWeight="bold"
            lineHeight="1.2"
            mb={2}
          >
            {title}
          </chakra.h3>
          <Text
            as="p"
            fontSize={[12, 12, 14, 16]}
            noOfLines={5}
            className="font-sans text-black/50"
          >
            {description}
          </Text>
        </Box>
        <Stack justify="space-between" direction={"column"} spacing={5}>
          <CustomButton
            onClick={() => router.push(`/content`)}
            variant="outline"
          >
            Back to Courses
          </CustomButton>
          {/* <CustomButton colorScheme="blue" variant="solid">
            Option 2
          </CustomButton> */}
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
