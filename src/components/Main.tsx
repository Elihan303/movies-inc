import React from "react";
import { RootStack } from "../navigators/Navigator";
import { ContextAuthProvider } from "../Context/ContextAuth";

const Main = () => {
  return (
    <ContextAuthProvider>
      <RootStack />
    </ContextAuthProvider>
  );
};

export default Main;
