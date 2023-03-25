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

const data = {
  isNew: true,
  imageURL:
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
  name: 'Wayfarer Classic',
  price: 4.5,
  rating: 4.2,
  numReviews: 34,
};

function Rating({ rating, numReviews }) {
  return (
    <Box d="flex" alignItems="center" color="gray.400">
        <Flex>
        {Array(5)
            .fill('')
            .map((_, i) => {
            const roundedRating = Math.round(rating * 2) / 2;
            if (roundedRating - i >= 1) {
                return (
                <BsStarFill
                    key={i}
                    style={{ marginLeft: '1' }}
                    color={i < rating ? 'teal.500' : 'gray.300'}
                />
                );
            }
            if (roundedRating - i === 0.5) {
                return <BsStarHalf key={i} style={{ marginLeft: '1' }} />;
            }
            return <BsStar key={i} style={{ marginLeft: '1' }} />;
        })}
        </Flex>
        <Box as="span" ml="2" color="gray.300" fontSize="sm">
            {numReviews} review{numReviews > 1 && 's'}
        </Box>
    </Box>
  );
}

function CardProduct({ img, type, brand, model, slug }) {
  return (
    <Flex p={50} w="full" alignItems="center" justifyContent="center" className="p-16">
      <Link 
        to={slug}
        state={{
            img: img,
            brand: brand,
            model: model,
        }}
      >
      
      <Box
        bg={useColorModeValue('gray.700')}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative">
        {data.isNew && (
          <Circle
            size="10px"
            position="absolute"
            top={2}
            right={2}
            bg="red.200"
          />
        )}

        <Image
          src={img}
          alt={`Picture of ${data.name}`}
          roundedTop="lg"
          width="100%"
        />

        <Box p="6">
          <Box d="flex" alignItems="baseline">
            {data.isNew && (
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme={
                // change color of brand badge by product type
                type === 'Desk' ? 'green' :
                type === 'Monitor' ? 'blue' :
                type === 'Keyboard' ? 'orange' :
                type === 'Mouse' ? 'red' :
                type === 'Mousepad' ? 'pink' :
                'purple' // fallback color
              }>
                {brand}
              </Badge>
            )}
          </Box>
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
              color={'gray.300'}
            >
              {model}
            </Box>
          </Flex>

          <Flex justifyContent="space-between" alignContent="center">
            <Rating rating={data.rating} numReviews={data.numReviews} />
          </Flex>
        </Box>
      </Box>
      </Link>
    </Flex>
  );
}

export default CardProduct;