import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
} from '@chakra-ui/react';
// import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
// "Simple" from https://chakra-templates.dev/page-sections/productDetails
import React, { useState, useEffect } from 'react';
//import { useState }
export default function DetailsProduct({
  img,
  brand,
  model,
  ratings,
  reviews,
}) {
  const textColor = useColorModeValue('gray.500', 'gray.400');
  const boldColor = useColorModeValue('gray.200', 'gray.600');
  const buttonBg = useColorModeValue('gray.900', 'gray.50');
  const buttonColor = useColorModeValue('white', 'gray.900');
  const yellowText = useColorModeValue('yellow.500', 'yellow.300');

  const [showReviews, setShowReviews] = useState(false);

  const [review, setReview] = useState('');
  const [rating, setRating] = useState('');
  const [userRatingReviews, setUserRatingReviews] = useState([]);

  useEffect(() => {
    console.log('Reviews and Ratings:', reviews, ratings);
    console.log('useEffect', userRatingReviews);
    setUserRatingReviews(
      reviews.map((review, index) => ({
        user: review.user,
        rating: ratings[index].rating,
        review: review.review,
      }))
    );
  }, [reviews, ratings]);

  const addReview = async () => {
    const user = 'Alice'; // replace with actual user
    const newRatingReview = {
      user,
      rating,
      review,
    };
    console.log('User Rating Review:', newRatingReview);

    try {
      const response = await fetch(
        `http://localhost:8080/api/product/${user}/reviews/${model}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newRatingReview),
        }
      );

      if (response.ok) {
        console.log('Review added successfully!');
        setRating('');
        setReview('');
        setShowReviews(true); // show updated list of reviews
      } else {
        console.error('Failed to add review:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const updateReview = async () => {
    const user = 'Alice'; // replace with actual user
    const reviewIndex = reviews.findIndex((review) => review.user === user);
    const ratingIndex = ratings.findIndex((rating) => rating.user === user);

    if (reviewIndex !== 1 && ratingIndex !== 1) {
      const updatedReviews = [...reviews];
      const updatedRatings = [...ratings];
      updatedReviews[reviewIndex] = {
        ...updatedReviews[reviewIndex],
        review,
      };
      updatedRatings[ratingIndex] = {
        ...updatedRatings[ratingIndex],
        rating,
      };
      const newRatingReview = {
        user,
        rating,
        review,
      };
      console.log('User Rating Review:', newRatingReview);
      // call a function to update the reviews and ratings in the database or state
      try {
        const response = await fetch(
          `http://localhost:8080/api/product/${user}/reviews/${model}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRatingReview),
          }
        );

        if (response.ok) {
          console.log('Review updated successfully!');
        } else {
          console.error('Failed to update review:', response.statusText);
        }
      } catch (error) {
        console.error('Error updating review:', error);
      }
    } else {
      console.log(`No review found for ${user}`);
    }
  };

  const deleteReview = async () => {
    const user = 'Alice'; // replace with actual user
    const newRatingReview = {
      user,
      rating,
      review,
    };
    console.log('User Rating Review:', newRatingReview);
    try {
      const response = await fetch(
        `http://localhost:8080/api/product/${user}/reviews/${model}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        console.log('Review deleted successfully!');
      } else {
        console.error('Failed to delete review:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <Container maxW={'7xl'}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={'md'}
            alt={'product image'}
            src={img}
            fit={'cover'}
            align={'center'}
            w={'100%'}
            h={{ base: '100%', sm: '400px', lg: '500px' }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
            >
              {model}
            </Heading>
            <Text color={textColor} fontWeight={300} fontSize={'2xl'}>
              {brand}
            </Text>
            <Text color={textColor} fontWeight={300} fontSize={'2xl'}>
              <p key={reviews.length}>
                {reviews.length} review{reviews.length > 1 && 's'}
              </p>
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
              <Button
                onClick={() => {
                  setShowReviews(!showReviews);
                  console.log('Button clicked, showReviews:', showReviews);
                }}
              >
                {showReviews ? 'Hide reviews' : 'Show reviews'}
              </Button>
              {showReviews && (
                <Text color={textColor} fontWeight={300} fontSize={'2xl'}>
                  {reviews
                    .filter(
                      (review) =>
                        review.user === review.user &&
                        review.model === review.model
                    )
                    .map((review) => (
                      <p key={review._id}>
                        <b>{review.user}:</b> {review.review}
                      </p>
                    ))}
                </Text>
              )}

              {/* update review form */}
              <Box my='4'>
                <p>
                  <label htmlFor='rating'>Rating</label>
                  <select
                    id='rating'
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value=''>Select</option>
                    <option value='1'>1- Poor</option>
                    <option value='2'>2- Fair</option>
                    <option value='3'>3- Good</option>
                    <option value='4'>4- Very good</option>
                    <option value='5'>5- Excelent</option>
                  </select>
                </p>
                <p>
                  <label htmlFor='review'>Review</label>
                  <textarea
                    id='review'
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                  ></textarea>
                </p>
                <Button onClick={addReview}>Add</Button>
                <Button onClick={updateReview}>Update Review</Button>
                <Button onClick={deleteReview}>Delete</Button>
              </Box>
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={<StackDivider borderColor={boldColor} />}
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text color={textColor} fontSize={'2xl'} fontWeight={'300'}>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore
              </Text>
              <Text fontSize={'lg'}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                aliquid amet at delectus doloribus dolorum expedita hic, ipsum
                maxime modi nam officiis porro, quae, quisquam quos
                reprehenderit velit? Natus, totam.
              </Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={yellowText}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}
              >
                Features
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <ListItem>Chronograph</ListItem>
                  <ListItem>Master Chronometer Certified</ListItem>{' '}
                  <ListItem>Tachymeter</ListItem>
                </List>
                <List spacing={2}>
                  <ListItem>Anti‑magnetic</ListItem>
                  <ListItem>Chronometer</ListItem>
                  <ListItem>Small seconds</ListItem>
                </List>
              </SimpleGrid>
            </Box>
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={yellowText}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}
              >
                Product Details
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Between lugs:
                  </Text>{' '}
                  20 mm
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Bracelet:
                  </Text>{' '}
                  leather strap
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Case:
                  </Text>{' '}
                  Steel
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Case diameter:
                  </Text>{' '}
                  42 mm
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Dial color:
                  </Text>{' '}
                  Black
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Crystal:
                  </Text>{' '}
                  Domed, scratch‑resistant sapphire crystal with anti‑reflective
                  treatment inside
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Water resistance:
                  </Text>{' '}
                  5 bar (50 metres / 167 feet){' '}
                </ListItem>
              </List>
            </Box>
          </Stack>

          <Button
            rounded={'none'}
            w={'full'}
            mt={8}
            size={'lg'}
            py={'7'}
            bg={buttonBg}
            color={buttonColor}
            textTransform={'uppercase'}
            _hover={{
              transform: 'translateY(2px)',
              boxShadow: 'lg',
            }}
          >
            Purchase
          </Button>

          <Stack direction='row' alignItems='center' justifyContent={'center'}>
            <MdLocalShipping />
            <Text>You will be redirected to an external website</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
