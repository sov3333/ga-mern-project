import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  Icon,
  Link,
  FormControl,
  FormLabel,
  Select,
  Wrap,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import FileBase64 from 'react-file-base64';
import { useNavigate } from 'react-router-dom';

// "Join our Team" from https://chakra-templates.dev/forms/authentication

//TODO:
//1) linking to user when submit

const avatars = [
  {
    name: 'Ryan Florence',
    url: 'https://bit.ly/ryan-florence',
  },
  {
    name: 'Segun Adebayo',
    url: 'https://bit.ly/sage-adebayo',
  },
  {
    name: 'Kent Dodds',
    url: 'https://bit.ly/kent-c-dodds',
  },
  {
    name: 'Prosper Otemuyiwa',
    url: 'https://bit.ly/prosper-baba',
  },
  {
    name: 'Christian Nwamba',
    url: 'https://bit.ly/code-beast',
  },
];

export default function Create() {
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8080/api/user/id`, {
      method: `GET`,
      credentials: `include`,
    })
      .then((res) => res.json())
      .then((data) => {
        setUserId(data);
        // console.log(userId);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [userId]);

  useEffect(() => {
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
  }, [userId]);

  console.log(userId, `here`);

  const [newSetup, setNewSetup] = useState({
    userId: '',
    user: '',
    title: '',
    description: '',
    img: '',
  });
  // const [newType, setNewType] = useState([''])
  // const [newBrand, setNewBrand] = useState([''])
  // const [newModel, setNewModel] = useState([''])
  // const [newTitle, setNewTitle] = useState('');
  // const [newDescription, setNewDescription] = useState('');
  const [newProducts, setNewProducts] = useState([
    {
      type: '',
      brand: '',
      model: '',
    },
  ]);
  // const [newImage, setNewImage] = useState('');
  //console.log('show', newProducts);
  const navigate = useNavigate();

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...newProducts];
    list[index][name] = value;
    setNewProducts(list);
  };

  const handleAddProduct = () => {
    setNewProducts([...newProducts, { type: '', brand: '', model: '' }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const productList = [];
    newProducts.forEach((product) => {
      productList.push({
        type: product.type,
        brand: product.brand,
        model: product.model,
      });
    });

    console.log(`productList`, productList);

    fetch('http://localhost:8080/api/setup', {
      method: 'POST',
      body: JSON.stringify({
        userId: userId,
        img: newSetup.img,
        user: username,
        title: newSetup.title,
        description: newSetup.description,
        products: productList,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // setNewSetup([]), 
        console.log(`New setup created:`, data);
      })
      .catch((err) => console.error({ Error: err }));
    
    console.log(`i am here about to fetch products api`);
    
    // add all products in productList to products collection
    productList.map((product) => (
      //send this product to products collection
      fetch('http://localhost:8080/api/product', {
        method: 'POST',
        body: JSON.stringify({
          user: userId,
          type: product.type,
          brand: product.brand,
          model: product.model,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => console.log('New product created:', data.newProduct))
        .catch((err) => console.error('Error creating new product:', err))
    ))

    
    // if (
    //   newSetup.title === '' ||
    //   newSetup.type === '' ||
    //   newSetup.brand === '' ||
    //   newSetup.model === '' ||
    //   newSetup.img === ''
    // ) {
    //   alert('Please input required fields');
    // } else {
    //   navigate('/setups');
    //   navigate(0);
    // }
    // console.log('setup', newSetup);
  };

  return (
    <Box position={'relative'}>
      <h1 className='mt-[8px] font-bold md:text-[40px] text-[28px] text-white text-center'>
        Create a Post
      </h1>
      <h2 className='mt-[8px] font-normal sm:text-[28px] text-[18px] text-center text-secondary-white  mb-6'>
        Showcase your style & inspire productivity
      </h2>
      <Container
        as={SimpleGrid}
        maxW={'7xl'}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}
          >
            Showcase your style
            <Text
              as={'span'}
              bgGradient='linear(to-r, red.400,pink.400)'
              bgClip='text'
            >
              &
            </Text>
            inspire productivity
          </Heading>
          <Stack direction={'row'} spacing={4} align={'center'}>
            <AvatarGroup>
              {avatars.map((avatar) => (
                <Avatar
                  key={avatar.name}
                  name={avatar.name}
                  src={avatar.url}
                  size={useBreakpointValue({ base: 'md', md: 'lg' })}
                  position={'relative'}
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: 'full',
                    height: 'full',
                    rounded: 'full',
                    transform: 'scale(1.125)',
                    bgGradient: 'linear(to-bl, red.400,pink.400)',
                    position: 'absolute',
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
              ))}
            </AvatarGroup>
            <Text fontFamily={'heading'} fontSize={{ base: '4xl', md: '6xl' }}>
              +
            </Text>
            <Flex
              align={'center'}
              justify={'center'}
              fontFamily={'heading'}
              fontSize={{ base: 'sm', md: 'lg' }}
              bg={'gray.800'}
              color={'white'}
              rounded={'full'}
              minWidth={useBreakpointValue({ base: '44px', md: '60px' })}
              minHeight={useBreakpointValue({ base: '44px', md: '60px' })}
              position={'relative'}
              _before={{
                content: '""',
                width: 'full',
                height: 'full',
                rounded: 'full',
                transform: 'scale(1.125)',
                bgGradient: 'linear(to-bl, orange.400,yellow.400)',
                position: 'absolute',
                zIndex: -1,
                top: 0,
                left: 0,
              }}
            >
              YOU
            </Flex>
          </Stack>
        </Stack>
        <Stack
          bg={'gray.50'}
          rounded={'xl'}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: 'lg' }}
        >
          <Stack spacing={4}>
            <Heading
              color={'gray.800'}
              lineHeight={1.1}
              fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
            >
              Share Your Setup
              <Text
                as={'span'}
                bgGradient='linear(to-r, red.400,pink.400)'
                bgClip='text'
              >
                !
              </Text>
            </Heading>
            <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
              Share your own unique workspace with the world and inspire others
              to upgrade their own desks! Upload a photo of your setup, add a
              catchy title and a brief description, and let others rate and
              comment on your creation.
            </Text>
          </Stack>
          <Box as={'form'} mt={10}>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  // value={newTitle}
                  // onChange={(e) => {
                  //   setNewTitle(e.target.value);
                  // }}
                  //value={newSetup.title} -> putting this become undefined error
                  onChange={(e) => {
                    setNewSetup({ ...newSetup, title: e.target.value });
                  }}
                  placeholder='e.g. Productivity Haven'
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  // value={newDescription}
                  // onChange={(e) => {
                  //   setNewDescription(e.target.value);
                  // }}
                  //value={newSetup.description} -> putting this become undefined error
                  onChange={(e) => {
                    setNewSetup({ ...newSetup, description: e.target.value });
                  }}
                  placeholder='Describe your setup'
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                />
                <FormControl isRequired mt={4}>
                  <FormLabel>My Setup Image</FormLabel>
                  <FileBase64
                    type='file'
                    multiple={false}
                    onDone={({ base64 }) =>
                      setNewSetup({ ...newSetup, img: base64 })
                    }
                  />
                </FormControl>
              </FormControl>
              {newProducts.map((product, index) => (
                <FormControl isRequired key={index}>
                  <FormLabel>Products</FormLabel>
                  <Input
                    // value={newDescription}
                    // onChange={(e) => {
                    //   setNewDescription(e.target.value);
                    // }}
                    //value={newSetup.description} -> putting this become undefined error
                    name='type'
                    type='text'
                    id='type'
                    value={product.type}
                    onChange={(e) => handleInputChange(e, index)}
                    required
                    // onChange={(e) => {
                    //   const capitalizedType =
                    //     e.target.value.charAt(0).toUpperCase() +
                    //     e.target.value.slice(1).toLowerCase();
                    //   setNewProducts({ ...newType, type: capitalizedType });
                    // }}
                    placeholder='e.g. Desk'
                    bg={'gray.100'}
                    border={0}
                    color={'gray.500'}
                    _placeholder={{
                      color: 'gray.500',
                    }}
                  />
                  <Input
                    // value={newDescription}
                    // onChange={(e) => {
                    //   setNewDescription(e.target.value);
                    // }}
                    //value={newSetup.description} -> putting this become undefined error
                    name='brand'
                    type='text'
                    id='brand'
                    value={product.brand}
                    onChange={(e) => handleInputChange(e, index)}
                    required
                    // onChange={(e) => {
                    //   const capitalizedBrand =
                    //     e.target.value.charAt(0).toUpperCase() +
                    //     e.target.value.slice(1).toLowerCase();
                    //   setNewSetup({ ...newSetup, brand: capitalizedBrand });
                    // }}
                    placeholder='e.g. Omindesk'
                    bg={'gray.100'}
                    border={0}
                    color={'gray.500'}
                    _placeholder={{
                      color: 'gray.500',
                    }}
                  />
                  <Input
                    // value={newDescription}
                    // onChange={(e) => {
                    //   setNewDescription(e.target.value);
                    // }}
                    //value={newSetup.description} -> putting this become undefined error
                    name='model'
                    type='text'
                    id='model'
                    value={product.model}
                    onChange={(e) => handleInputChange(e, index)}
                    required
                    // onChange={(e) => {
                    //   const capitalizedModel =
                    //     e.target.value.charAt(0).toUpperCase() +
                    //     e.target.value.slice(1).toLowerCase();
                    //   setNewSetup({ ...newSetup, model: capitalizedModel });
                    // }}
                    placeholder='e.g. Ascent Wildwood+'
                    bg={'gray.100'}
                    border={0}
                    color={'gray.500'}
                    _placeholder={{
                      color: 'gray.500',
                    }}
                  />
                  {/* below to control only 1 button is displayed for multiple inputs */}
                  {newProducts.length - 1 === index &&
                    newProducts.length < 4 && (
                      <Button
                        onClick={handleAddProduct}
                        fontFamily={'heading'}
                        mt={2}
                        w={'half'}
                        bgGradient='linear(to-r, blue.400,pink.400)'
                        color={'white'}
                        _hover={{
                          bgGradient: 'linear(to-r, red.400,pink.400)',
                          boxShadow: 'xl',
                        }}
                      >
                        Add New Product
                      </Button>
                    )}
                </FormControl>
              ))}
              {/* <Button fontFamily={'heading'} bg={'gray.200'} color={'gray.800'}>
                Upload Photo
              </Button> */}
            </Stack>
            <Button
              onClick={handleSubmit}
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
              Submit
            </Button>
          </Box>
          form
        </Stack>
      </Container>
      <Blur
        position={'absolute'}
        top={-10}
        left={-10}
        style={{ filter: 'blur(70px)' }}
      />
    </Box>
  );
}

export const Blur = (props) => {
  return (
    <Icon
      width={useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height='560px'
      viewBox='0 0 528 560'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <circle cx='71' cy='61' r='111' fill='#F56565' />
      <circle cx='244' cy='106' r='139' fill='#ED64A6' />
      <circle cy='291' r='139' fill='#ED64A6' />
      <circle cx='80.5' cy='189.5' r='101.5' fill='#ED8936' />
      <circle cx='196.5' cy='317.5' r='101.5' fill='#ECC94B' />
      <circle cx='70.5' cy='458.5' r='101.5' fill='#48BB78' />
      <circle cx='426.5' cy='-0.5' r='101.5' fill='#4299E1' />
    </Icon>
  );
};
