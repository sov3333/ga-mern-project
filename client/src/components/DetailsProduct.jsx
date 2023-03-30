import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  FormControl,
  FormLabel,
  Select,
  Textarea,
} from '@chakra-ui/react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { motion } from 'framer-motion';

import styles from '../styles';
import { staggerContainer, fadeIn } from '../utils/motion';
import { AddIcon } from '@chakra-ui/icons';

// Template used is "Simple" from https://chakra-templates.dev/page-sections/productDetails

// TODO / QUESTION:
// -> should we combine reviews and ratings into one array in the db, since "1 Rating" will have both things, a star rating and a written review.

// BUG - after add review, reviews data doesnt update on page
// Why? - because `ratings` & `reviews` come from parent component via props. when new review is added, your received state in this component will remain same, because there's no way to call the fetch function in parent to get ratings&reviews and pass it down again While being on this page.
// Solution - useEffect(() => {}, [someTriggerToKnowNewRatingAdded])
// this will fetch data on first render, and also when the someTriggerToKn.. is changed (i.e. a new rating was added)
// since we get the img/brand/model/etc from the parent, we can use one of props to fetch the `/products/ratings/...` etc to get the data you need direct from mongo, instead of from the state.
// since u get data from mongodb directly, you can fetch the data again when something changes, so u can re-render that new data.

let features = [
  "Chronograph",
  "Master Chronometer Certified",
  "Tachymeter",
  "Anti-magnetic",
  "Chronometer",
  "Small seconds",
];

let specifications = [
  { name: "Between lugs", stat: "20 mm" },
  { name: "Bracelet", stat: "leather strap" },
  { name: "Case", stat: "Steel" },
  { name: "Case diameter", stat: "42 mm" },
  { name: "Dial color", stat: "Black" },
  { name: "Crystal", stat: "Domed, scratch‑resistant sapphire crystal with anti‑reflective treatment inside" },
  { name: "Water resistance", stat: "5 bar (50 metres / 167 feet)" },
];

let reviews = []

export default function DetailsProduct({
  img,
  type,
  brand,
  model,
  title,
  description,
  features,
  specifications,
  ratings,
}) {
  const textColor = useColorModeValue('gray.400');
  const buttonBg = useColorModeValue('gray.700');
  const buttonColor = useColorModeValue('gray.200');
  const yellowText = useColorModeValue('yellow.500');

  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');

  const [showReviews, setShowReviews] = useState(false);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('');
  const [userRatingReviews, setUserRatingReviews] = useState([]);
  console.log(title);

  useEffect(() => {
    fetch(`http://localhost:8080/api/user/id`, {
      method: `GET`,
      credentials: `include`,
    })
      .then((res) => res.json())
      .then((data) => {
        setUserId(data);
      })
      .catch((e) => {
        console.error(e);
      });

    fetch(`http://localhost:8080/api/user/${userId}`, {
      method: `GET`,
      credentials: `include`,
    })
      .then((res) => res.json())
      .then((data) => {
        setUsername(data.username);
      })
      .catch((e) => {
        console.error(e);
      });
    console.log(userId, `is this user's userId`);
  }, [userId]);

  useEffect(() => {
    console.log(
      'useEffect - Reviews, Ratings - from Parent component (ProductOne.jsx):',
      reviews,
      ratings
    );
    console.log(
      'useEffect - userRatingReviews - from state in this component',
      userRatingReviews
    );

    // set the userRatingReviews state with data from component props (ratings and reviews)
    setUserRatingReviews(
      reviews.map((review, index) => ({
        user: review.user,
        rating: ratings[index].rating, // are we sure that reviews[i] & ratings[i] are both for the same product?
        review: review.review,
      }))
    );
  }, [reviews, ratings]);

  const addReview = async (e) => {
    e.preventDefault();
    const user = username; // use username of logged-in user
    const newRatingReview = {
      user,
      inputRating,
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
        setRating(newRatingReview.inputRating);
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
    const user = username; // use username of logged-in user
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
          // setRating;
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
    const user = username; // use username of logged-in user
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
  console.log(ratings);
  return (
    <>
    {/* Show 5-star Rating & no. of Reviews */}
    <Flex direction="column" align="center" fontWeight={300}>
      {reviews.length === 0 ? (
        <>
        <Flex color={'yellow.500'} fontSize={'4xl'}>
          {Array(5)
            .fill('')
            .map((_, i) => {
              return <BsStar key={i} style={{ marginLeft: '5' }} />;
            }
          )}
        </Flex>
        <Text color={textColor} mt="0.5rem" fontSize={'lg'}>
          <i>No ratings & reviews yet!</i>
        </Text>
        </>
      ) : (
        <>
        <Flex color={'yellow.500'} fontSize={'4xl'}>
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
                    style={{ marginLeft: '5' }}
                    color={i < roundedRating ? 'teal.500' : 'gray.300'}
                  />
                );
              }
              if (roundedRating - i === 0.5) {
                return <BsStarHalf key={i} style={{ marginLeft: '5' }} />;
              }
              return <BsStar key={i} style={{ marginLeft: '5' }} />;
            }
          )}
        </Flex>
        <Text color={textColor} mt="0.5rem" fontSize={'lg'}>
          <i>Rated & reviewed by {reviews.length} trusted peer{reviews.length > 1 && 's'}</i>
        </Text>
        </>
      )}
    </Flex>

    {/* Container for rest of component */}
    <Container maxW={'7xl'}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >

        {/* Div on the left half of grid */}
        <Flex direction='column'>
          <Image
            rounded={'md'}
            alt={'product image'}
            src={img}
            fit={'cover'}
            align={'center'}
            w={'100%'}
            h={{ base: '100%', sm: '400px', lg: '500px' }}
          />

          {/* Section with Title(Slogan), Description, Features, Specifications */}
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={<StackDivider />}
            mt="2rem"
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text color={textColor} fontSize={'2xl'} fontWeight={'600'}>
                Best {type} In The World
              </Text>
              <Text fontSize={'lg'} className="text-secondary-white">
                This {brand} {type} is the best in the world, with its powerful processing capabilities and sleek design that caters to both professional and casual users alike.
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
              <List spacing={2} className="text-secondary-white">
                {features.map((feature, i) => <ListItem key={i}>{feature}</ListItem>)}
              </List>
            </Box>
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={yellowText}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}
              >
                Product Specifications
              </Text>
              <List spacing={2} className="text-secondary-white">
                {specifications.map((spec, i) => (
                  <ListItem key={i}>
                    <Text as={'span'} fontWeight={'bold'}>
                      {spec.name}
                    </Text>{' '}
                    {spec.stat}
                  </ListItem>
                ))}
              </List>
            </Box>
          </Stack>

          {/* Section with Purchase Button */}
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
          <Stack direction='row' alignItems='center' justifyContent={'center'} mt="1rem">
            <Text className="text-secondary-white">You will be redirected to an external website</Text>
          </Stack>

        </Flex>

        {/* Stack on the right half of grid */}
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box>

            {/* Add review form */}
            <Box my='4'>
            <Text
              as={'h3'}
              lineHeight={1.1}
              bgGradient='linear(to-r, pink.400,purple.400)'
              bgClip='text'
              className="font-bold md:text-[28px] text-[25px] text-center"
            >
              Rate and review this product!
            </Text>

            {/* Form to submit new Rating & Review */}
            <form>
              <VStack spacing={4} align="stretch" color={'gray.300'}>
                <FormControl isRequired>
                  <FormLabel htmlFor="rating">Rating</FormLabel>
                  <Select
                    id="rating"
                    placeholder="Select a rating"
                    border='1px' 
                    borderColor='gray.600'
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    {[1,2,3,4,5].map((value) => (
                      <option key={value} value={value}>
                        {value} stars
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="review">Review</FormLabel>
                  <Textarea
                    id="review"
                    placeholder="Write your review here"
                    border='1px' 
                    borderColor='gray.600'
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                  />
                </FormControl>
                <Button 
                  type="submit" 
                  onClick={addReview}
                  fontFamily={'heading'}
                  mt={2}
                  w={'half'}
                  bgGradient='linear(to-r, blue.400,pink.400)'
                  color={'white'}
                  _hover={{
                    bgGradient: 'linear(to-r, red.400,pink.400)',
                    boxShadow: 'xl',
                  }}
                  leftIcon={<AddIcon />}
                >
                  Submit
                </Button>
                {/* TODO Let ADMIN role be able to see Update & Delete buttons */}
                {/* <Button onClick={updateReview}>Update Review</Button> */}
                {/* <Button onClick={deleteReview}>Delete</Button> */}
              </VStack>
            </form>

          </Box>

            {/* REVIEW CARDS */}
            <section className={`relative z-10`}>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: 'false', amount: 0.25 }}
                className={`${styles.innerWidth} mx-auto flex flex-col gap-6`}
              >
                <div className="flex flex-col justify-between">
                  {/* map over all reviews and render a card for each */}
                  {reviews
                    .filter(
                      (review) =>
                        review.user === review.user &&
                        review.model === review.model
                    )
                    .map((review, i) => (
                      <motion.div
                        key={i}
                        variants={fadeIn('left', 'tween', 0.2, 1)}
                        className="flex-[0.5] flex justify-end flex-col gradient-05 sm:p-[2rem] p-[1rem] rounded-[32px] border-[1px] border-[#6a6a6a] relative mb-[1rem]"
                        // className="flex-[0.5] flex justify-end flex-col gradient-05 sm:p-8 p-4 lg:mt-0 sm:mt-3 lg:ml-3 ml-0 mt-3 rounded-[32px] border-[1px] border-[#6a6a6a] relative"
                      >
                        {/* <div className="feedback-gradient" /> */}
                        <div>
                          <Text
                            as={'h4'}
                            lineHeight={1.1}
                            bgGradient='linear(to-r, purple.400,blue.400)'
                            bgClip='text'
                            className="font-bold sm:text-[24px] text-[20px] sm:leading-[40px] leading-[36px]"
                          >
                            @{review.user}
                          </Text>
                          <p className="mt-[6px] font-normal sm:text-[14px] text-[12px] sm:leading-[22px] leading-[16px] text-secondary-white">#gamer #programmer</p>
                        </div>
                        <p className="mt-[18px] font-normal sm:text-[20px] text-[16px] sm:leading-[45px] leading-[39px] text-white italic">
                          "{review.review}"
                        </p>
                      </motion.div>
                    ))
                  }  
                </div>
              </motion.div>
            </section>
          </Box>
        </Stack>
      </SimpleGrid>
    </Container>
    </>
  );
}
