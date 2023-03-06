import { Input } from "@chakra-ui/react";
import React from "react";

const CourseEdit = () => {
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
  return <div>CourseEdit</div>;
};

export default CourseEdit;
