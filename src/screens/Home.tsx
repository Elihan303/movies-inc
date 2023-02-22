import { useEffect, useState } from "react";
import Movies from "../services/movies/MoviesServices";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  Center,
  HStack,
  Stack,
  ScrollView,
  List,
  Container,
} from "native-base";
import { MovieModel } from "../models/MovieModel";
import { API_PHOTOS_URL } from "@env";

const Home = ({ navigation }: { navigation: StackNavigationProp<any> }) => {
  //estados
  const [moviesList, setMoviesList] = useState<MovieModel[]>([]);

  //metodo para cargar data
  const cargarMovies = () => {
    Movies.ObtenerPeliculasEnReproduccion()
      .then((res) => {
        setMoviesList(
          res.data.results.sort((orden1: any, orden2: any) => {
            if (orden1.title < orden2.title) {
              return -1;
            } else if (orden1.title > orden2.title) {
              return 1;
            } else {
              return 0;
            }
          })
        );
      })
      .catch((err) => {
        console.log("Err", err);
      });
  };

  useEffect(() => {
    cargarMovies();
  }, []);

  return (
    <Center h="100%">
      <ScrollView h="80">
        <List px={3} py={0} borderWidth={0}>
          {moviesList.map((movie) => (
            <List.Item
              key={movie.id}
              onPress={() =>
                navigation.navigate("movieDetail", { movieId: movie.id })
              }
              _hover={{ bg: "coolGray.300" }}
            >
              <Box alignItems="center">
                <Box
                  rounded="lg"
                  overflow="hidden"
                  borderColor="coolGray.200"
                  borderWidth="1"
                  mr={1}
                  maxW={80}
                  minW={80}
                >
                  <Box>
                    <AspectRatio w="100%" ratio={16 / 9}>
                      <Image
                        source={{
                          uri: `${API_PHOTOS_URL + movie.backdrop_path}`,
                        }}
                        alt="image"
                      />
                    </AspectRatio>
                    <Center
                      bg="violet.500"
                      _dark={{
                        bg: "violet.400",
                      }}
                      _text={{
                        color: "warmGray.50",
                        fontWeight: "700",
                        fontSize: "xs",
                      }}
                      position="absolute"
                      bottom="0"
                      px="3"
                      py="1.5"
                    >
                      {`Media ${movie.vote_average}`}
                    </Center>
                  </Box>
                  <Stack p="4" space={3}>
                    <Stack space={2}>
                      <Heading size="md" ml="-1">
                        {movie.title}
                      </Heading>
                      <Text
                        fontSize="xs"
                        color={"violet.500"}
                        fontWeight="500"
                        ml="-0.5"
                        mt="-1"
                      >
                        {movie.release_date}
                      </Text>
                    </Stack>
                  </Stack>
                </Box>
              </Box>
            </List.Item>
          ))}
        </List>
      </ScrollView>
    </Center>
  );
};

export default Home;
