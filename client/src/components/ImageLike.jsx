import { useState } from "react";
import { Box, Image, Button } from "@chakra-ui/react";

const ImageLike = ({ src, handleLiked }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    console.log("Liked!");
    handleLiked(); // from props
    setLiked(true);
  };

  const handleNext = () => {
    console.log("Next!");
    setLiked(false);
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={src} alt="example" />

      <Box p="6">
        <Button
          onClick={handleLike}
          disabled={liked}
          colorScheme="green"
          mr={3}
        >
          {liked ? "Liked!" : "Like"}
        </Button>
        <Button onClick={handleNext} colorScheme="red">
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default ImageLike;
