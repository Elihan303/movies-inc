import "react-native-gesture-handler";
import Main from "./src/components/Main";
import { NativeBaseProvider, Container, Center } from "native-base";

export default function App() {
  return (
    <NativeBaseProvider>
      <Main />
    </NativeBaseProvider>
  );
}
