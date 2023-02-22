import React from "react";
import { Center, Container, HStack, Spinner, Heading } from "native-base";

const Loader = () => {
  return (
    <Center flex={1}>
      <Container>
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" color={"indigo.500"} />
          <Heading color="indigo.500" fontSize="md">
            Loading
          </Heading>
        </HStack>
      </Container>
    </Center>
  );
};

export default Loader;
