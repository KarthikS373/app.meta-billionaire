import React, { useEffect, useRef, useState } from "react";
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import useEthersProvider from "../../hooks/useEthersProvider";
import { uploadProfilePic } from "../../lib/firebase";

interface UserInterface {
  image: File;
  preview: string | ArrayBuffer | null;
  email: string;
  about: string;
  website: string;
}

const user = {} as UserInterface;

const Form1 = () => {
  const { address } = useEthersProvider();

  const [dp, setDp] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (user.preview) {
      setDp(user.preview.toString());
    }

    if (user.email) {
      setEmail(user.email);
    }
  }, []);

  const showPreview = (event: any) => {
    if (event.target.files[0]) {
      user.image = event.target.files[0];
      console.log(user);
      const reader = new FileReader();
      reader.onload = () => {
        // @ts-ignore
        setDp(reader.result);
        user.preview = reader.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleEmail = (event: { target: { value: string } }) => {
    setEmail(event.target.value);
    user.email = event.target.value;
  };

  return (
    <>
      <Heading
        w="100%"
        textAlign={"center"}
        fontWeight="normal"
        fontSize={["32px", null, "45px"]}
        mb="2%"
      >
        Personal
      </Heading>
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Text fontSize={["10px", null, "14px"]}>
          {address ? address.slice(0, 5) + "..." + address.slice(-5) || "" : ""}
        </Text>
      </Box>
      <Flex wrap={"wrap"} alignItems="center" justifyContent={"center"}>
        <div
          style={{
            backgroundImage: `url(${dp})`,
            objectFit: "contain",
            backgroundSize: "250px 250px",
            height: dp ? "250px" : "0",
            width: dp ? "250px" : "0",
            zIndex: 100,
          }}
        />
        <FormControl mt={"12px"}>
          <FormLabel
            htmlFor="profile-image"
            fontSize={["16px", null, "18px"]}
            fontWeight={"normal"}
          >
            Image
          </FormLabel>
          <Input
            id="profile-image"
            border={"none"}
            background={"transparent"}
            type={"file"}
            accept="image/*"
            onChange={showPreview}
            fontFamily={"sans-serif"}
            fontSize={["16px", null, "18px"]}
          />
        </FormControl>
      </Flex>
      <FormControl mt="5%">
        <FormLabel
          htmlFor="email"
          fontWeight={"normal"}
          fontSize={["16px", null, "18px"]}
        >
          Email address
        </FormLabel>
        <Input
          id="email"
          value={email}
          onChange={handleEmail}
          type="email"
          fontSize={["16px", null, "18px"]}
          fontFamily={"sans-serif"}
        />
      </FormControl>
    </>
  );
};

const Form2 = () => {
  const [about, setAbout] = useState("");

  useEffect(() => {
    if (user.about) {
      setAbout(user.about);
    }
  }, []);

  const handleBio = (event: { target: { value: string } }) => {
    setAbout(event.target.value);
    user.about = event.target.value;
  };

  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Bio
      </Heading>
      <FormControl id="email" mt={1}>
        <FormLabel
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
        >
          About
        </FormLabel>
        <Textarea
          placeholder="I am ..."
          rows={10}
          value={about}
          onChange={handleBio}
          resize={"none"}
          shadow="sm"
          fontSize={["16px", null, "18px"]}
          fontFamily={"sans-serif"}
          focusBorderColor="brand.400"
        />
        <FormHelperText fontSize={["10px", null, "14px"]}>
          Brief description for your profile
        </FormHelperText>
      </FormControl>
    </>
  );
};

const Form3 = () => {
  const [website, setWebsite] = useState("");

  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal">
        Social
      </Heading>
      <SimpleGrid columns={1} spacing={6}>
        <FormControl as={GridItem} colSpan={[3, 2]}>
          <FormLabel
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: "gray.50",
            }}
          >
            Website
          </FormLabel>
          <InputGroup size="sm">
            <InputLeftAddon
              bg="gray.50"
              _dark={{
                bg: "gray.800",
              }}
              color="gray.500"
              rounded="md"
              fontSize={["16px", null, "18px"]}
              fontFamily={"sans-serif"}
            >
              http://
            </InputLeftAddon>
            <Input
              fontSize={["16px", null, "18px"]}
              fontFamily={"sans-serif"}
              type="tel"
              placeholder="www.example.com"
              focusBorderColor="brand.400"
              rounded="md"
            />
          </InputGroup>
        </FormControl>
        <FormControl>
          <Button
            fontSize={["16px", null, "18px"]}
            fontFamily={"sans-serif"}
            w={"105%"}
            mt={"5%"}
          >
            Connect Twitter
          </Button>
          <Button
            fontSize={["16px", null, "18px"]}
            fontFamily={"sans-serif"}
            w={"105%"}
            mt={"5%"}
          >
            Connect Discord
          </Button>
        </FormControl>
      </SimpleGrid>
    </>
  );
};

const ProfileEdit = () => {
  const { address } = useEthersProvider();
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log(user);

    try {
      if (address) {
        const url = await uploadProfilePic(user.image, address.toString());
        console.log("URL : " + url);
      }
      toast({
        title: "Profile updated",
        description: "We've updated the profile for you",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: "An error occured",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        minW={["95%", null, 660]}
        p={6}
        m="10px auto"
        as="form"
      >
        <Progress
          hasStripe
          value={progress}
          mb="5%"
          mx="5%"
          isAnimated
        ></Progress>
        {step === 1 ? <Form1 /> : step === 2 ? <Form2 /> : <Form3 />}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(progress - 33.33);
                }}
                isDisabled={step === 1}
                colorScheme="customBlue"
                variant="solid"
                w={["5rem", null, "7rem"]}
                mr="5%"
                fontSize={["14px", null, "18px"]}
              >
                Back
              </Button>
              <Button
                w={["5rem", null, "7rem"]}
                isDisabled={step === 3}
                onClick={() => {
                  setStep(step + 1);
                  if (step === 3) {
                    setProgress(100);
                  } else {
                    setProgress(progress + 33.33);
                  }
                }}
                colorScheme="customBlue"
                variant="outline"
                fontSize={["14px", null, "18px"]}
              >
                Next
              </Button>
            </Flex>
            {step === 3 ? (
              <Button
                w="7rem"
                colorScheme="red"
                variant="solid"
                fontSize={["16px", null, "18px"]}
                fontFamily={"sans-serif"}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  );
};

export default ProfileEdit;
