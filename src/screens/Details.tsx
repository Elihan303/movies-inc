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
  View,
} from "native-base";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState, useContext } from "react";
import Movies from "../services/movies/MoviesServices";
import { MovieDetailModel } from "../models/MovieDetailModel";
import Characters from "../components/DetailsComponents/Characters";

import Loader from "../components/Loader";
import RateMovie from "../components/DetailsComponents/RateMovie";
import ToastComponent from "../components/DetailsComponents/ToastComponent";
import ContextAuth from "../Context/ContextAuth";
import { API_PHOTOS_URL } from "@env";
import SimilarMovie from "../components/DetailsComponents/SimilarMovie";

const Details = ({
  route,
  navigation,
}: {
  route: any;
  navigation: StackNavigationProp<any>;
}) => {
  //estados
  const [movieDetail, setMovieDetail] = useState<MovieDetailModel>();
  const { movieId } = route.params;
  const globalMovieId = movieId;
  const [rate, setRate] = useState<number>(0);
  const { auth } = useContext(ContextAuth);

  useEffect(() => {
    (async () => {
      try {
        const { movieId } = route.params;
        const pelicula = await Movies.ObtenerPeliculaPorId(movieId);

        const calificacion = await Movies.ObtenerCalificacionPelicula(
          auth.guest_session_id
        );
        const calificacionFiltrado = calificacion.data.results.find(
          (peli: any) => peli.id == movieId
        );

        setTimeout(() => {
          setMovieDetail(pelicula.data);
          if (calificacionFiltrado != undefined) {
            setRate(calificacionFiltrado.rating);
          }
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  if (movieDetail == undefined) {
    return <Loader />;
  }

  return (
    <View w={"100%"} h={"100%"}>
      <ScrollView h="80">
        <Center h="100%" alignItems={"center"}>
          <Box
            maxW="80"
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.300"
            borderWidth="1"
            my={3}
          >
            <Box>
              {movieDetail && (
                <AspectRatio w="100%" ratio={16 / 9}>
                  <Image
                    source={{
                      uri: `${API_PHOTOS_URL + movieDetail?.backdrop_path}`,
                    }}
                    alt="image"
                  />
                </AspectRatio>
              )}

              <Center
                bg="violet.500"
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
                {`Media ${movieDetail?.vote_average.toFixed(1)}`}
              </Center>
            </Box>
            <Stack p="4" space={3}>
              <Stack space={2}>
                <Heading size="md" ml="-1">
                  {movieDetail?.title}
                </Heading>
                <Text
                  fontSize="xs"
                  color={"violet.500"}
                  fontWeight="500"
                  ml="-0.5"
                  mt="-1"
                >
                  {movieDetail?.release_date}
                </Text>
                <Text fontWeight="400" textAlign="justify">
                  {movieDetail?.overview}
                </Text>
              </Stack>
              <HStack
                alignItems="center"
                space={4}
                justifyContent="space-between"
              >
                <HStack alignItems="center">
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                    fontWeight="400"
                  >
                    Generos:{" "}
                    {movieDetail?.genres.map((genre) => genre.name).join(", ")}
                  </Text>
                </HStack>
              </HStack>
            </Stack>
          </Box>

          <RateMovie
            rating={rate}
            maxRating={5}
            size={10}
            color="#f5d90f"
            onRateChange={(newRating) => setRate(newRating)}
          />
          <Box maxW="80" minW="80">
            <ToastComponent movieId={globalMovieId} rate={rate} />
          </Box>

          <Characters movieId={globalMovieId} />

          <SimilarMovie movieId={globalMovieId} />
        </Center>
      </ScrollView>
    </View>
  );
};

export default Details;
