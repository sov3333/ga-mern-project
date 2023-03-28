import { useState } from "react";
import { motion } from "framer-motion";
import { Box, Image } from "@chakra-ui/react";

const ImageSwipe = ({ src, handleLiked }) => {
  // State for tracking whether the image is being dragged and the current x position of the image
  const [dragging, setDragging] = useState(false);
  const [x, setX] = useState(0);

  // Event handlers for dragging the image and ending the drag
  const handleDrag = (event, info) => {
    setX(info.offset.x);
  };

  const handleDragEnd = () => {
    setDragging(false);
    if (x < -50) {
      // if swipe left, dislike
      console.log("Swiped Left :(");
      // handleDislike();
    } else if (x > 50) {
      // if swipe right, like
      console.log("Swiped Right :)");
      handleLiked(); // from props
      // handleLike();
    }
    setX(0);
  };

  // Variants for the Framer Motion animation
  const variants = {
    left: {
      x: "-100vw",
      opacity: 0,
      transition: { duration: 0.2 },
    },
    right: {
      x: "100vw",
      opacity: 0,
      transition: { duration: 0.2 },
    },
    center: {
      x: x, // The x position of the image is set to the current x state
      opacity: 1,
      transition: { duration: 0.1 },
    },
  };

  return (
    <Box
      position="relative"
      height="400px"
      width="100%"
      onTouchStart={() => setDragging(true)}
    >
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        animate={dragging ? "center" : x < -50 ? "left" : x > 50 ? "right" : "center"} // Determine which variant to animate to based on the x position of the image
        variants={variants}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <Image
          src={src}
          height="100%"
          width="100%"
          objectFit="cover"
          borderRadius="md"
        />
      </motion.div>
    </Box>
  );

};

export default ImageSwipe;