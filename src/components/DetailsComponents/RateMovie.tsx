import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Box, Heading, View } from "native-base";
import { Icon } from "native-base";
import { FontAwesome } from "@expo/vector-icons";

interface StarRatingProps {
  rating: number;
  maxRating: number;
  size?: number;
  color?: string;
  onRateChange?: (rating: number) => void;
}

const RateMovie = ({
  rating,
  maxRating,
  size = 20,
  color = "gold",
  onRateChange,
}: StarRatingProps) => {
  const [stars, setStars] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const fullStar = (
      <Icon as={FontAwesome} name="star" size={size} color={color} />
    );
    const mediumStar = (
      <Icon as={FontAwesome} name="star-half-o" size={size} color={color} />
    );
    const emptyStar = (
      <Icon as={FontAwesome} name="star-o" size={size} color={color} />
    );

    const newStars: JSX.Element[] = [];

    for (let i = 1; i <= maxRating; i++) {
      if (i <= rating) {
        newStars.push(fullStar);
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        newStars.push(mediumStar);
      } else {
        newStars.push(emptyStar);
      }
    }

    setStars(newStars);
  }, [rating, maxRating, size, color]);

  const handleRateChange = (newRating: number) => {
    if (onRateChange) {
      onRateChange(newRating);
    }
  };

  const handleStarPress = (index: number) => {
    const newRating = index + 1;
    handleRateChange(newRating);
  };

  return (
    <Box>
      <Heading my={5} textAlign={"center"}>
        Calificar pelicula
      </Heading>
      <View flexDirection={"row"} alignItems={"center"}>
        {stars.map((star, index) => (
          <TouchableOpacity key={index} onPress={() => handleStarPress(index)}>
            <View>{star}</View>
          </TouchableOpacity>
        ))}
      </View>
    </Box>
  );
};

export default RateMovie;
