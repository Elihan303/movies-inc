import { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/Home";
import Details from "../screens/Details";
import Login from "../screens/Login";
import { TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ContextAuth from "../Context/ContextAuth";

const Stack = createStackNavigator();

export function RootStack() {
  const { setAuth } = useContext(ContextAuth);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          name="login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="home"
          component={Home}
          options={{
            title: "Peliculas en reproducción",
            headerLeft: ({ onPress }) => {
              return (
                <TouchableOpacity
                  onPress={onPress}
                  onPressOut={() =>
                    (async () => {
                      //remove of localstorage y context
                      setAuth(undefined);
                      await AsyncStorage.removeItem("guest_session_id");
                      await AsyncStorage.removeItem("expires_at");
                    })()
                  }
                >
                  <Image
                    source={require("../../assets/log_out2.png")}
                    style={{ width: 20, height: 20, marginLeft: 10 }}
                  />
                </TouchableOpacity>
              );
            },
          }}
        />
        <Stack.Screen
          name="movieDetail"
          component={Details}
          options={{
            title: "Detalle de pelicula",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
