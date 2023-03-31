import { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Button, Flex, Image } from '@chakra-ui/react';

import { eye } from '../assets/home/';
import styles from '../styles';
import { Link } from 'react-router-dom';

const ImageSwipe = ({ _id, src, userId, user, title, description, products, swipes, handleLiked }) => {
// const ImageSwipe = (props, { handleLiked }) => {
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
      console.log('Swiped Left :(');

      handleLiked(false);
    } else if (x > 50) {
      // if swipe right, like
      console.log('Swiped Right :)');
      handleLiked(true); // from props
    }
    setX(0);
  };

  // Variants for the Framer Motion animation
  const variants = {
    left: {
      x: '-100vw',
      opacity: 0,
      transition: { duration: 0.2 },
    },
    right: {
      x: '100vw',
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
    <>
      <Box
        position='relative'
        height='400px'
        width='100%'
        onTouchStart={() => setDragging(true)}
      >
        <motion.div
          drag='x'
          dragConstraints={{ left: 0, right: 0 }}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          animate={
            dragging ? 'center' : x < -50 ? 'left' : x > 50 ? 'right' : 'center'
          } // Determine which variant to animate to based on the x position of the image
          variants={variants}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <Image
            src={src}
            height='100%'
            width='100%'
            objectFit='cover'
            borderRadius='md'
          />

          <div className='absolute bottom-0 p-8 justify-start w-full flex-col bg-[rgba(0,0,0,0.3)] rounded-b-[24px]'>
            <Flex justify="space-between">
              <Flex direction="column">
                <h2 className='mt-[24px] font-semibold sm:text-[32px] text-[24px] text-white'>
                  {title}
                </h2>
                <p className='font-normal text-[16px] leading-[20px] text-white lowercase'>
                  by @{user}
                </p>
              </Flex>
              <Link
              to={`/setups/${_id}`}
                state={{
                  _id: _id,
                  img: src,
                  userId: userId,
                  user: user,
                  title: title,
                  description: description,
                  products: products,
                  swipes: swipes,
                }}
              >
                <div
                  className={`${styles.flexCenter} w-[60px] h-[60px] rounded-[24px] glassmorphism mb-[16px] hover:bg-pink-700 mt-auto`}
                >
                  <img
                    src={eye}
                    alt='view icon'
                    className='w-1/2 h-1/2 object-contain'
                  />
                </div>

              </Link>
            </Flex>
          </div>
        </motion.div>
      </Box>
      <Flex justify='center' className='mt-5'>
        <Button onClick={() => handleLiked(false)} colorScheme='red'>
          Next
        </Button>
        <Button onClick={() => handleLiked(true)} colorScheme='whatsapp' ml={6}>
          Like
        </Button>
      </Flex>
    </>
  );
};

export default ImageSwipe;
