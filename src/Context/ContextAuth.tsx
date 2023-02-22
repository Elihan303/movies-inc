import { PropsWithChildren, createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  auth: {
    expires_at: undefined,
    guest_session_id: undefined,
  },
  setAuth: (t: any) => {},
};

const ContextAuth = createContext(initialState);

const ContextAuthProvider = ({ ...props }: PropsWithChildren) => {
  const [auth, setAuth] = useState<any>();

  useEffect(() => {
    (async () => {
      try {
        //obtener session id de local storage
        const session_id = await AsyncStorage.getItem("guest_session_id");
        //validar que haya una sesion en local storage
        if (session_id == null) {
          return setAuth(undefined);
        }

        //verificar fecha de espiracion
        const expiration_date = await AsyncStorage.getItem("expires_at");
        const time = Date.now();
        const today = new Date(time);

        if (expiration_date != null) {
          if (expiration_date > today.toISOString()) {
            setAuth({
              guest_session_id: session_id,
              expires_at: expiration_date,
            });
          }
        } else {
          //remove of localstorage
          await AsyncStorage.removeItem("guest_session_id");
          await AsyncStorage.removeItem("expires_at");
        }
      } catch (error) {
        throw error;
      }
    })();
  }, []);

  return (
    <ContextAuth.Provider value={{ auth: auth, setAuth: setAuth as any }}>
      {props.children}
    </ContextAuth.Provider>
  );
};

export { ContextAuthProvider, ContextAuth as default };
