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
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
} from '@chakra-ui/react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';

// Template used is "Simple" from https://chakra-templates.dev/page-sections/productDetails

// TODO / QUESTION:
// -> should we combine reviews and ratings into one array in the db, since "1 Rating" will have both things, a star rating and a written review.

// BUG - after add review, reviews data doesnt update on page
// Why? - because `ratings` & `reviews` come from parent component via props. when new review is added, your received state in this component will remain same, because there's no way to call the fetch function in parent to get ratings&reviews and pass it down again While being on this page.
// Solution - useEffect(() => {}, [someTriggerToKnowNewRatingAdded])
// this will fetch data on first render, and also when the someTriggerToKn.. is changed (i.e. a new rating was added)
// since we get the img/brand/model/etc from the parent, we can use one of props to fetch the `/products/ratings/...` etc to get the data you need direct from mongo, instead of from the state.
// since u get data from mongodb directly, you can fetch the data again when something changes, so u can re-render that new data.

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

  const [rating, setRating] = useState('');
  const [userRatingReviews, setUserRatingReviews] = useState([]);
  console.log(title);

  // useEffect(() => {
  //   fetch(`http://localhost:8080/api/user/id`, {
  //     method: `GET`,
  //     credentials: `include`,
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setUserId(data);
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     });

  //   fetch(`http://localhost:8080/api/user/${userId}`, {
  //     method: `GET`,
  //     credentials: `include`,
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setUsername(data.username);
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     });
  //   console.log(userId, `is this user's userId`);
  // }, [userId]);

  // useEffect(() => {
  //   console.log(
  //     'useEffect - Reviews, Ratings - from Parent component (ProductOne.jsx):',
  //     reviews,
  //     ratings
  //   );
  //   console.log(
  //     'useEffect - userRatingReviews - from state in this component',
  //     userRatingReviews
  //   );

  //   // set the userRatingReviews state with data from component props (ratings and reviews)
  //   setUserRatingReviews(
  //     reviews.map((review, index) => ({
  //       user: review.user,
  //       rating: ratings[index].rating, // are we sure that reviews[i] & ratings[i] are both for the same product?
  //       review: review.review,
  //     }))
  //   );
  // }, [reviews, ratings]);

  const addReview = async () => {
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
          setRating;
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
              className='text-white'
            >
              {brand} - {model}
            </Heading>
            <Text color={textColor} fontWeight={300} fontSize={'2xl'}>
              {type}
            </Text>
            <Text color={textColor} fontWeight={300} fontSize={'2xl'}>
              <p>
                {ratings.length} review{ratings.length !== 1 && 's'}
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
              <button onClick={() => setShowReviews(!showReviews)}>
                Show Reviews
              </button>
              {showReviews && (
                <div>
                  {ratings.map((rating, index) => (
                    <div key={index}>
                      User: {rating.user}, Rating: {rating.rating}, Review:{' '}
                      {rating.review}
                    </div>
                  ))}
                </div>
              )}
              {/* {showReviews && (
                <Text color={textColor} fontWeight={300} fontSize={'2xl'}>
                  {reviews
                    .filter(
                      (review) =>
                        review.user === review.user &&
                        review.model === review.model
                    )
                    .map((review) => (
                      <p key={review._id}>
                        <b>@{review.user}:</b> <i>"{review.review}"</i>
                      </p>
                    ))}
                </Text>
              )} */}

              {/* update review form */}
              {/* <Box my='4'>
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
                </p> */}
              {/* <p>
                  <label htmlFor='review'>Review</label>
                  <textarea
                    id='review'
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                  ></textarea>
                </p> */}
              {/* <Button onClick={addReview}>Add</Button>
                <Button onClick={updateReview}>Update Review</Button>
                <Button onClick={deleteReview}>Delete</Button> */}
              {/* </Box> */}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={<StackDivider />}
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text color={textColor} fontSize={'2xl'} fontWeight={'300'}>
                {title}
              </Text>
              <Text fontSize={'lg'} className='text-secondary-white'>
                {description}
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

              <SimpleGrid
                columns={{ base: 1, md: 2 }}
                spacing={10}
                className='text-secondary-white'
              >
                <List spacing={2}>
                  {features.map((feature) => (
                    <ListItem key={feature.name}>{feature.name}</ListItem>
                  ))}
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

              <List spacing={2} className='text-secondary-white'>
                {specifications.map((specification) => (
                  <ListItem key={specification.name}>
                    {specification.name} : {specification.stat}
                  </ListItem>
                ))}
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
            <Text className='text-secondary-white'>
              You will be redirected to an external website
            </Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
