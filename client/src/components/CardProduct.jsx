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

import { placeholder_image } from '../assets';

// "Product with Add to Cart" from https://chakra-templates.dev/components/cards

function CardProduct({
  img,
  type,
  brand,
  model,
  title,
  description,
  features,
  specifications,
  ratings,
  slug,
}) {
  console.log(title);
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
          type: type,
          brand: brand,
          model: model,
          title: title,
          description: description,
          features: features,
          specifications: specifications,
          ratings: ratings,
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
            src={img ? img : placeholder_image}
            alt={`Picture of ${model}`}
            roundedTop='lg'
            width='100%'
          />

          <Box p='6'>
            <Flex justify='space-between' alignContent='center'>
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
                  #{type}
                </Badge>
              </Box>
              <Flex direction='column'>
                <Flex color={'orange.300'}>
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
                            color={
                              i < roundedRating ? 'orange.300' : 'gray.300'
                            }
                          />
                        );
                      }
                      if (roundedRating - i === 0.5) {
                        return (
                          <BsStarHalf key={i} style={{ marginLeft: '1' }} />
                        );
                      }
                      return <BsStar key={i} style={{ marginLeft: '1' }} />;
                    })}
                </Flex>
                <Flex justify='center' mt='1'>
                  <Box as='span' color='gray.300' fontSize='sm'>
                    {ratings.length} review{ratings.length > 1 && 's'}
                  </Box>
                </Flex>
              </Flex>
            </Flex>

            <Flex
              mt='1'
              justifyContent='space-between'
              alignContent='center'
              alignItems='flex-end'
            >
              <Box
                fontSize='2xl'
                fontWeight='medium'
                as='h4'
                lineHeight='tight'
                isTruncated
                color={'gray.300'}
              >
                <span className='font-extrabold'>{brand}</span> {model}
              </Box>
              <Box
                fontSize='sm'
                fontWeight='medium'
                as='h4'
                lineHeight='tight'
                isTruncated
                color={'gray.300'}
              >
                in <span className='font-extrabold'>{6} setups</span>
                {/* replace {6} with total number of setups that this product appears in */}
              </Box>
            </Flex>
          </Box>
        </Box>
      </Link>
    </Flex>
  );
}

export default CardProduct;
