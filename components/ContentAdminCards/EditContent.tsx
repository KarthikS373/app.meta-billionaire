import { Button, Container, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";

const EditContent = ({ handleSubmit: submit }: any) => {
  const [field, setField] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit(e);
  };

  const renderInput = (
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    placeholder = "...",
    type = "text"
  ) => (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type={type}
      placeholder={placeholder}
      fontSize={15}
      letterSpacing={2}
      fontWeight={600}
      w="100%"
      mt="md"
      required
    />
  );

  return (
    <Container>
      <Flex>
        <Text
          textTransform="uppercase"
          fontSize={22}
          fontWeight={500}
          mb="md"
        ></Text>
        <form onSubmit={handleSubmit} className="w-full">
          <Flex direction={"column"} w="full">
            {renderInput(field, setField, "Enter field value...")}
            {renderInput(field, setField, "Enter field value...")}
            {renderInput(field, setField, "Enter field value...")}
            {renderInput(field, setField, "Enter field value...")}
            {renderInput(field, setField, "Enter field value...")}
            <Flex
              wrap={"wrap"}
              direction={["column", "row"]}
              justifyContent={"end"}
              gap={2}
              mt="md"
            >
              <Button
                colorScheme="customGray"
                variant={"outline"}
                fontSize={15}
                fontWeight={100}
                letterSpacing={1.2}
                type="reset"
                minW={36}
              >
                Back
              </Button>
              <Button
                colorScheme="customGray"
                fontSize={15}
                fontWeight={100}
                letterSpacing={1.2}
                type="submit"
                minW={36}
              >
                Create
              </Button>
            </Flex>
          </Flex>
        </form>
      </Flex>
    </Container>
  );
};

export default EditContent;
