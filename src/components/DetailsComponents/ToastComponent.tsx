import {
  Button,
  Text,
  useToast,
  Alert,
  VStack,
  HStack,
  IconButton,
  CloseIcon,
} from "native-base";
import { PropsWithChildren, useEffect, useState, useContext } from "react";
import Movies from "../../services/movies/MoviesServices";
import ContextAuth from "../../Context/ContextAuth";

interface IToastComponet extends PropsWithChildren<any> {
  movieId: number;
  rate: number;
}

const ToastComponent = ({ ...props }: IToastComponet) => {
  const toast = useToast();
  const [guestSessionId, setGuestSessionId] = useState<any>();
  const { auth } = useContext(ContextAuth);

  useEffect(() => {
    setGuestSessionId(auth.guest_session_id);
  }, []);

  //hacer post
  const crearCalificacion = async () => {
    const data = {
      value: props.rate.toFixed(1),
    };
    await Movies.PostCalificacion(props.movieId, data, guestSessionId);
  };

  return (
    <Button
      my={3}
      size={"lg"}
      bg={"violet.500"}
      fontWeight="500"
      onPress={() => {
        if (props.rate == 0) {
          return;
        }
        crearCalificacion();

        toast.show({
          render: ({ id }) => {
            return (
              <Alert
                maxWidth="90%"
                alignSelf="center"
                flexDirection="row"
                status="success"
                variant="top-accent"
              >
                <VStack space={1} flexShrink={1} w="100%">
                  <HStack
                    flexShrink={1}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <HStack space={2} flexShrink={1} alignItems="center">
                      <Alert.Icon />
                      <Text
                        fontSize="md"
                        fontWeight="medium"
                        flexShrink={1}
                        color="darkText"
                      >
                        Se califico con exito!
                      </Text>
                    </HStack>

                    <IconButton
                      variant="unstyled"
                      icon={<CloseIcon size="3" />}
                      onPress={() => toast.close(id)}
                    />
                  </HStack>
                </VStack>
              </Alert>
            );
          },
        });
      }}
    >
      <Text color={"white"}>Calificar</Text>
    </Button>
  );
};

export default ToastComponent;
