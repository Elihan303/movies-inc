import React, { useContext, useEffect } from "react";
import { Box, Text, Heading, VStack, Button, Center, Image } from "native-base";
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Movies from "../services/movies/MoviesServices";
import ContextAuth from "../Context/ContextAuth";

const Login = ({ navigation }: { navigation: StackNavigationProp<any> }) => {
  const { auth, setAuth } = useContext(ContextAuth);

  useEffect(() => {
    checkLoggedIn();
  }, [auth]);

  const checkLoggedIn = async () => {
    // Comprobar si el usuario ya ha iniciado sesión
    if (auth != undefined) {
      navigation.navigate("home");
    }
  };

  const handleGuestLogin = async () => {
    // Iniciar sesión como invitado
    const response = await Movies.CrearSesionInvitado();

    //crear data en el loca storage
    await AsyncStorage.setItem(
      "guest_session_id",
      `${response.data.guest_session_id}`
    );
    await AsyncStorage.setItem("expires_at", `${response.data.expires_at}`);
    //almacenar en el contexto
    setAuth(response.data);

    // Navegar a la pantalla de inicio de la aplicación
    navigation.navigate("home");
  };

  return (
    <Center w="100%" h="100%" alignContent={"center"} bgColor={"gray.200"}>
      <Image
        source={require("../../assets/home_cinema.png")}
        //style={{ width: 200, height: 200 }}
        w={300}
        h={300}
        alt="imagen-login"
        justifyItems={"center"}
      />

      <Box safeArea w="100%" maxW="80" rounded={"xl"}>
        <Heading
          size="lg"
          fontWeight="800"
          color="coolGray.800"
          textAlign={"center"}
          mb={5}
        >
          Movie Inc 🍿
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
          textAlign={"center"}
        >
          ¡Descubre la magia de la peliculas!
        </Heading>

        <VStack space={3} mt="5" alignItems={"center"} textAlign={"center"}>
          <Button
            mt="2"
            colorScheme={"violet"}
            w={"70%"}
            rounded={"xl"}
            onPress={handleGuestLogin}
          >
            <Text fontWeight="medium" color="white">
              Iniciar sesion como invitado
            </Text>
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default Login;
