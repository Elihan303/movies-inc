import {
  Avatar,
  Box,
  HStack,
  Heading,
  List,
  Spacer,
  VStack,
  Text,
} from "native-base";
import React, { PropsWithChildren, useEffect, useState } from "react";
import Movies from "../../services/movies/MoviesServices";
import { MovieModel } from "../../models/MovieModel";
import { API_PHOTOS_URL } from "@env";

interface ISimilarMovie extends PropsWithChildren<any> {
  movieId: number;
}

const SimilarMovie = ({ ...props }: ISimilarMovie) => {
  //estados
  const [movieList, setMovieList] = useState<MovieModel[]>([]);

  useEffect(() => {
    (async () => {
      const response = await Movies.ObtenerPeliculasRecomendadas(props.movieId);
      console.log(response.data.results);
      setMovieList(response.data.results);
    })();
  }, []);

  return (
    <Box w={"100%"} my={5} alignItems={"center"}>
      <Heading mb={3}>Peliculas Similares</Heading>
      <List px={3} py={0} borderWidth={0} w="100%" alignItems={"center"}>
        {movieList.map((movie) => (
          <List.Item key={movie.id}>
            <Box
              borderBottomWidth="0"
              borderColor="muted.800"
              pl={["0", "4"]}
              pr={["0", "5"]}
              py="2"
              maxW="80"
              minW="80"
            >
              <HStack space={[2, 4]} justifyContent="space-between">
                {movie.poster_path ? (
                  <Avatar
                    size="48px"
                    source={{
                      uri: `${API_PHOTOS_URL + movie.poster_path}`,
                    }}
                  />
                ) : (
                  <Avatar size="48px" />
                )}

                <VStack>
                  <Text maxW={"98%"} color="coolGray.800" bold>
                    {movie.title}
                  </Text>
                  <Text maxW={"98%"} color="coolGray.600">
                    {movie.release_date}{" "}
                  </Text>
                </VStack>
                <Spacer />
              </HStack>
            </Box>
          </List.Item>
        ))}
      </List>
    </Box>
  );
};

export default SimilarMovie;
