import {useContext, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
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
  Icon,
  Badge,
} from '@chakra-ui/react';
import { FaHeart, FaStar, FaComment } from "react-icons/fa";
import {AuthContext} from '../context/AuthContext';

// "Simple" from https://chakra-templates.dev/page-sections/productDetails

export default function DetailsSetup({
  _id,
  img,
  userId,
  user,
  title,
  description,
  products,
  swipes, // BUG? TODO: received empty props from parent
}) {
  const navigate = useNavigate();
  const {role, setRole} = useContext(AuthContext);
  const [thisUserId, setThisUserId] = useState(null);
  const [creator, setCreator] = useState(null);
  const [thisSwipes, setThisSwipes] = useState([]);
  const [thisLikes, setThisLikes] = useState([]);

  const currentID = location.pathname.slice(7);

  useEffect(() => {
    // get the swipes data of this setup
    fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/setup${currentID}`, {
      method: `GET`,
    })
      .then((res) => res.json())
      .then((setup) => {
        setThisSwipes(setup.swipes);
        // count likes
        let swipesArray = setup.swipes;
        let totalLikes = swipesArray.reduce((acc, obj) => obj.liked ? acc + 1 : acc, 0);
        console.log(`total likes`, totalLikes);
        setThisLikes(totalLikes);
        // then fetch the userId of this logged in user
        fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/user/id`, {
          method: `GET`,
          credentials: `include`,
        })
          .then((res) => res.json())
          .then((userId) => {
            setThisUserId(userId);
            // check if setup is created by user
            if (setup.userId === userId) {
              setCreator(true);
            } else {
              setCreator(false);
            }
          })
          .catch((e) => {
            console.error(e);
          });
      })
      .catch((err) => console.error({error: err}));
  }, [])
  
  useEffect(() => {
    // do we need to change something if thisUserId changes?
  }, [thisUserId]);

  //console.log('id', currentID);
  const handleDelete = () => {
    fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/setup` + currentID, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((deletedSetup) => {
        navigate('/setups');
      })
      .catch((err) => console.error({error: err}));
  };

  return (
    <Container maxW={'7xl'}>
      <SimpleGrid
        columns={{base: 1, lg: 2}}
        spacing={{base: 8, md: 10}}
        py={{base: 18, md: 24}}
      >
        <Flex>
          <Image
            rounded={'md'}
            alt={'product image'}
            src={img}
            fit={'cover'}
            align={'center'}
            w={'100%'}
            h={{base: '100%', sm: '400px', lg: '500px'}}
          />
        </Flex>
        <Stack spacing={{base: 6, md: 10}}>
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{base: '2xl', sm: '4xl', lg: '5xl'}}
              color={useColorModeValue('gray.300')}
            >
              {title}
            </Heading>
            <Text
              color={useColorModeValue('pink.100')}
              fontWeight={300}
              fontSize={'2xl'}
            >
              {`by @${user}`}
            </Text>
          </Box>
          {/* Likes and Rating */}
          <Flex justify="start">
            <Flex alignItems="center">
              <Box>
                <Badge colorScheme="pink" variant="solid" px="1rem">
                  <Text fontSize="lg">
                    {thisLikes ? (
                      thisLikes
                    ) : (
                      "-"
                    )}
                  </Text>
                </Badge>
              </Box>
              <Icon as={FaHeart} ml="1rem" color="red.500" boxSize="2rem" />
            </Flex>
            <Flex alignItems="center">
              <Box>
                <Badge colorScheme="yellow" variant="solid" px="1rem" ml="2rem">
                  <Text fontSize="lg">
                    {thisLikes ? (
                      `${Math.ceil(100 * thisLikes / thisSwipes.length)}%`
                    ) : (
                      "-"
                    )}</Text>
                  {/* <Text fontSize="sm">Rating</Text> */}
                </Badge>
              <Icon as={FaStar} ml="1rem" color="yellow.500" boxSize="2rem" />
              </Box>
            </Flex>
          </Flex>
          <Stack
            spacing={{base: 4, sm: 6}}
            direction={'column'}
            divider={
              <StackDivider borderColor={useColorModeValue('gray.600')} />
            }
          >
            <VStack spacing={{base: 4, sm: 6}}>
              <Text
                fontSize={{base: '16px', lg: '18px'}}
                color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}
              >
                Description<br /><br />
                <span className="text-secondary-white font-normal lowercase">{description}</span>
              </Text>
            </VStack>
            <Box>
              <Text
                fontSize={{base: '16px', lg: '18px'}}
                color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}
              >
                Featured Products
              </Text>

              <SimpleGrid columns={{base: 1, md: 2}} spacing={10}>
                <List spacing={2}>
                  {products.map((product, index) => (
                    <ListItem key={index} className='text-secondary-white'>
                      <Badge colorScheme="green" fontSize="16px">{product.type}</Badge>
                    </ListItem>
                  ))}
                  {/* <ListItem>Chronograph</ListItem>
                  <ListItem>Master Chronometer Certified</ListItem>{' '}
                  <ListItem>Tachymeter</ListItem> */}
                </List>
                <List spacing={2}>
                  {/* <ListItem>Anti‑magnetic</ListItem>
                  <ListItem>Chronometer</ListItem>
                  <ListItem>Small seconds</ListItem> */}
                </List>
              </SimpleGrid>
            </Box>
            <Box>
              <Text
                fontSize={{base: '16px', lg: '18px'}}
                color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}
              >
                Product Details
              </Text>

              <List spacing={2}>
                {products.map((product, index) => (
                  <ListItem key={index}>
                    <Flex>
                      <Text
                        as={'span'}
                        className='text-secondary-white font-bold'
                      >
                        {product.type}:{' '}
                        <span className='font-normal'>
                          {product.brand} ({product.model})
                        </span>
                      </Text>
                    </Flex>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Stack>

          {/* <Button
            rounded={'none'}
            w={'full'}
            mt={8}
            size={'lg'}
            py={'7'}
            bg={useColorModeValue('gray.900', 'gray.50')}
            color={useColorModeValue('white', 'gray.900')}
            textTransform={'uppercase'}
            _hover={{
              transform: 'translateY(2px)',
              boxShadow: 'lg',
            }}
          >
            Swipe
          </Button> */}
          {role === 'admin' || creator === true ? (
            <>
              <Button
                onClick={handleDelete}
                fontFamily={'heading'}
                mt={8}
                w={'full'}
                bgGradient='linear(to-r, red.400,pink.400)'
                color={'white'}
                _hover={{
                  bgGradient: 'linear(to-r, red.400,pink.400)',
                  boxShadow: 'xl',
                }}
              >
                Delete Setup
              </Button>
            </>
          ) : (
            <></>
          )}

          {/* <Stack direction="row" alignItems="center" justifyContent={'center'}>
            <MdLocalShipping />
            <Text>2-3 business days delivery</Text>
          </Stack> */}
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
