import {useContext, useState, useEffect} from 'react';
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
// import { MdLocalShipping } from 'react-icons/md';
import {useNavigate} from 'react-router-dom';
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
  swipes,
}) {
  const navigate = useNavigate();
  const {role, setRole} = useContext(AuthContext);
  const [thisUserId, setThisUserId] = useState(null);
  const [creator, setCreator] = useState(null);
  console.log(role);

  console.log(`products`, products);

  useEffect(() => {
    fetch(`http://localhost:8080/api/user/id`, {
      method: `GET`,
      credentials: `include`,
    })
      .then((res) => res.json())
      .then((data) => {
        setThisUserId(data);
        console.log(thisUserId);
            if (setup.userId === thisUserId) {
      })
      .catch((e) => {
        console.error(e);
      });
  }, [thisUserId]);

  const currentID = location.pathname.slice(7);

  useEffect(() => {
    fetch(`http://localhost:8080/api/setup${currentID}`, {
      method: `GET`,
    })
      .then((res) => res.json())
      .then((setup) => {
          setCreator(true);
        } else {
          setCreator(false);
        }
      })
      .catch((err) => console.error({error: err}));
  }, [thisUserId]);

  //console.log('id', currentID);
  const handleDelete = () => {
    fetch('http://localhost:8080/api/setup' + currentID, {
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

          <Stack
            spacing={{base: 4, sm: 6}}
            direction={'column'}
            divider={
              <StackDivider borderColor={useColorModeValue('gray.600')} />
            }
          >
            <VStack spacing={{base: 4, sm: 6}}>
              <Text
                color={useColorModeValue('gray.300')}
                fontSize={'xl'}
                fontWeight={'300'}
              >
                {description}
              </Text>
              {/* <Text fontSize={'lg'} color={useColorModeValue('gray.400')}>
                {description}
              </Text> */}
            </VStack>
            <Box>
              <Text
                fontSize={{base: '16px', lg: '18px'}}
                color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}
              >
                Features
              </Text>

              <SimpleGrid columns={{base: 1, md: 2}} spacing={10}>
                <List spacing={2}>
                  {products.map((product, index) => (
                    <ListItem key={index} className='text-secondary-white'>
                      {product.type}
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
