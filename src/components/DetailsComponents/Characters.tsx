import React, { PropsWithChildren } from "react";
import { useEffect, useState } from "react";
import { MovieCastModel } from "../../models/MovieCastModel";
import {
  Box,
  Heading,
  Avatar,
  HStack,
  VStack,
  Text,
  Spacer,
  List,
} from "native-base";
import Movies from "../../services/movies/MoviesServices";
import { API_PHOTOS_URL } from "@env";

interface IChareacters extends PropsWithChildren<any> {
  movieId: number;
}

const Characters = ({ ...props }: IChareacters) => {
  //estados
  const [actores, setActores] = useState<MovieCastModel[]>([]);

  useEffect(() => {
    Movies.ObtenerCastPelicula(props.movieId)
      .then((res) => {
        setActores(res.data.cast);
      })
      .catch((err) => {
        console.log("Err", err);
      });
  }, []);

  return (
    <Box w={"100%"} my={5} alignItems={"center"}>
      <Heading mb={3}>Actores y personajes</Heading>
      <List px={3} py={0} borderWidth={0} w="100%" alignItems={"center"}>
        {actores.map((actor) => (
          <List.Item key={actor.order}>
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
                {actor.profile_path ? (
                  <Avatar
                    size="48px"
                    source={{
                      uri: `${API_PHOTOS_URL + actor.profile_path}`,
                    }}
                  />
                ) : (
                  <Avatar size="48px" />
                )}

                <VStack>
                  <Text color="coolGray.800" bold>
                    {actor.name}
                  </Text>
                  <Text maxW={"98%"} color="coolGray.600">
                    {actor.character}{" "}
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

export default Characters;
