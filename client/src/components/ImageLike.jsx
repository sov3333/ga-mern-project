import { useEffect, useState } from "react";
import { Box, Image, Button } from "@chakra-ui/react";

const ImageLike = ({ src, handleLiked, onChildStateChange }) => {
  const [liked, setLiked] = useState(null);

  useEffect(() => {
    const handleChildStateChange = () => {
      console.log(`sending props to parent as liked =`, liked);
      onChildStateChange(liked);
    }
    
    handleChildStateChange(liked);

  }, [liked])
  

  const handleLike = () => {
    console.log("Liked!");
    handleLiked(); // from props
    // handleChildStateChange(true);

    setLiked(true);
  };

  const handleNext = () => {
    console.log("Next!");
    handleLiked(); // from props
    // handleChildStateChange(false);
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
