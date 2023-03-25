import { Link } from 'react-router-dom';
import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';

// "Product with Add to Cart" from https://chakra-templates.dev/components/cards

function CardProduct({ img, type, brand, model, ratings, reviews, slug }) {
  return (
    <Flex
      p={50}
      w='full'
      alignItems='center'
      justifyContent='center'
      className='p-16'
    >
      <Link
        to={slug}
        state={{
          img: img,
          brand: brand,
          model: model,
          ratings: ratings,
          reviews: reviews,
        }}
      >
        <Box
          bg={useColorModeValue('gray.700')}
          maxW='sm'
          borderWidth='1px'
          rounded='lg'
          shadow='lg'
          position='relative'
        >
          {/* {data.isNew && (
            <Circle
              size='10px'
              position='absolute'
              top={2}
              right={2}
              bg='red.200'
            />
          )} */}

          <Image
            src={img}
            alt={`Picture of ${model}`}
            roundedTop='lg'
            width='100%'
          />

          <Box p='6'>
            <Box d='flex' alignItems='baseline'>
              <Badge
                rounded='full'
                px='2'
                fontSize='0.8em'
                colorScheme={
                  // change color of brand badge by product type
                  type === 'Desk'
                    ? 'green'
                    : type === 'Monitor'
                    ? 'blue'
                    : type === 'Keyboard'
                    ? 'orange'
                    : type === 'Mouse'
                    ? 'red'
                    : type === 'Mousepad'
                    ? 'pink'
                    : 'purple' // fallback color
                }
              >
                {brand}
              </Badge>
            </Box>
            <Flex mt='1' justifyContent='space-between' alignContent='center'>
              <Box
                fontSize='2xl'
                fontWeight='semibold'
                as='h4'
                lineHeight='tight'
                isTruncated
                color={'gray.300'}
              >
                {model}
              </Box>
            </Flex>
            <Flex>
              {Array(5)
                .fill('')
                .map((_, i) => {
                  const roundedRating =
                    Math.round(
                      (ratings
                        .map((rating) => rating.rating)
                        .reduce((a, b) => a + b, 0) /
                        ratings.length) *
                        2
                    ) / 2;
                  if (roundedRating - i >= 1) {
                    return (
                      <BsStarFill
                        key={i}
                        style={{ marginLeft: '1' }}
                        color={i < roundedRating ? 'teal.500' : 'gray.300'}
                      />
                    );
                  }
                  if (roundedRating - i === 0.5) {
                    return <BsStarHalf key={i} style={{ marginLeft: '1' }} />;
                  }
                  return <BsStar key={i} style={{ marginLeft: '1' }} />;
                })}
            </Flex>
            <Flex justifyContent='space-between' alignContent='center'>
              <Box as='span' ml='2' color='gray.300' fontSize='sm'>
                {reviews.length} review{reviews.length > 1 && 's'}
              </Box>
            </Flex>
          </Box>
        </Box>
      </Link>
    </Flex>
  );
}

export default CardProduct;
