import { AddIcon, CheckIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  Icon,
  FormControl,
  FormLabel,
  Center,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import FileBase64 from 'react-file-base64';
import { useNavigate } from 'react-router-dom';

// "Join our Team" from https://chakra-templates.dev/forms/authentication

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
  const navigate = useNavigate();

  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [newSetup, setNewSetup] = useState({
    userId: '',
    user: '',
    title: '',
    description: '',
    img: '',
  });
  const [newProducts, setNewProducts] = useState([
    {
      type: '',
      brand: '',
      model: '',
    },
  ]);

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

      console.log(userId, `here`);

  }, [userId]);

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
    // console.log(`productList`, productList);
    
    console.log('setup', newSetup);
    if ( newSetup.title === '' || newSetup.img === '' ) {
      console.log(`Submission failed. Fill in the required fields.`);
      alert('Please input required fields');
    } else if (userId === '') {
      console.log(`Submission failed. Login first.`);
      alert('You need to login first!');
    }
    else {
      // submit to databases
      console.log(`all required fields filled, starting submission...`);

      // create new setup in the setups collection
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
          console.log(`New setup created:`, data);
          // TODO:
          // if create setup in db success:
          // 1) show a success Toast,
          // 2) reset the form,
          // setNewSetup([]), 
          // 3) navigate to the newly posted setup
          // navigate('/setups');
          // navigate(0);
        })
        .catch((err) => console.error({ Error: err }));
      
      console.log(`i am here about to fetch products api`);
      

      // add all products in productList to products collection
      productList.map((product, index) => {
        // if all 3 fields are not empty...
        if (product.type !== "" && product.brand !== "" && product.model || "") {
          // ...then send this product to backend to create a new item in products collection
          console.log(`Creating Product #${index+1} in products db`)
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
            .then((data) => console.log(`New Product #${index+1} created:`, data.newProduct))
            .catch((err) => console.error('Error creating new product:', err))
        } else {
          console.log(`Product #${index+1} had empty fields and was not created in products db`)
        }
      })
    }
  };

  return (
    <Box position={'relative'}>
      <h1 className='mt-[8px] font-bold md:text-[40px] text-[28px] text-white text-center'>
        Create a Post
      </h1>
      <h2 className='mt-[8px] font-normal sm:text-[28px] text-[18px] text-center text-secondary-white  mb-6'>
        Showcase your style <span className="text-pink-400">&</span> inspire productivity
      </h2>
      <Center>
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
          <Text fontFamily={'heading'} fontSize={{ base: '4xl', md: '6xl' }} className="text-white">
            +
          </Text>
          <Flex
            align={'center'}
            justify={'center'}
            fontFamily={'heading'}
            fontSize={{ base: 'sm', md: 'lg' }}
            bg={'gray.600'}
            color={'gray.200'}
            className="font-bold"
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
      </Center>
      {/* Start of the create setup card */}
      <Container py={10}>
        <Stack
          bg={'gray.700'}
          rounded={'xl'}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          // maxW={{ lg: '100%' }}
        >
          <Stack spacing={4}>
            <Heading>
              <Text
                as={'span'}
                lineHeight={1.1}
                bgGradient='linear(to-r, red.400,pink.400)'
                bgClip='text'
              >
                Share Your Setup
              </Text>
            </Heading>
            <Text color={'gray.300'} fontSize={{ base: 'sm', sm: 'md' }}>
              Unleash your creativity and inspire others by sharing your unique workspace with the world. Upload a photo of your setup, add a catchy title and brief description, and let the ratings and comments pour in!
            </Text>
          </Stack>
          <Box as={'form'} mt={10}>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel color={'gray.300'}>Title</FormLabel>
                <Input
                  onChange={(e) => {
                    setNewSetup({ ...newSetup, title: e.target.value });
                  }}
                  placeholder='e.g. Productivity Haven'
                  border='1px' 
                  borderColor='gray.600'
                  color={'gray.300'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel color={'gray.300'}>Description</FormLabel>
                <Input
                  onChange={(e) => {
                    setNewSetup({ ...newSetup, description: e.target.value });
                  }}
                  placeholder='Describe your setup'
                  border='1px' 
                  borderColor='gray.600'
                  color={'gray.300'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                />
                <FormControl isRequired mt={4}>
                  <FormLabel color={'gray.300'}>My Setup Image</FormLabel>
                  <FileBase64
                    type='file'
                    multiple={false}
                    onDone={({ base64 }) =>
                      setNewSetup({ ...newSetup, img: base64 })
                    }
                  />
                </FormControl>
              </FormControl>
              {/* 

                STRETCH TODO: Improve the "add product" section form
                - Type field should be dropdown, predefined and include an "Others" option.
                - Brand field if possible, make dropdown, and show brands depending on type. If option don't exist, user can add new.
                - Model field if possible, make dropdown, and show models depenidng on brand. If option don't exist, user can add new.

                STRETCH TODO: Only show the first drop down box. if user selected an option, then the next appear.
              
              */}
              {newProducts.map((product, index) => (
                <FormControl key={index}>
                  <FormLabel color={'gray.300'}>Product #{index+1}</FormLabel>
                  <Input
                    name='type'
                    type='text'
                    id='type'
                    value={product.type}
                    onChange={(e) => handleInputChange(e, index)}
                    required
                    placeholder='e.g. Desk'
                    border='1px' 
                    borderColor='gray.600'
                    color={'gray.300'}
                    _placeholder={{
                      color: 'gray.500',
                    }}
                    mb={2}
                  />
                  <Input
                    name='brand'
                    type='text'
                    id='brand'
                    value={product.brand}
                    onChange={(e) => handleInputChange(e, index)}
                    required
                    placeholder='e.g. Omindesk'
                    border='1px' 
                    borderColor='gray.600'
                    color={'gray.300'}
                    _placeholder={{
                      color: 'gray.500',
                    }}
                    mb={2}
                  />
                  <Input
                    name='model'
                    type='text'
                    id='model'
                    value={product.model}
                    onChange={(e) => handleInputChange(e, index)}
                    required
                    placeholder='e.g. Ascent Wildwood+'
                    border='1px' 
                    borderColor='gray.600'
                    color={'gray.300'}
                    _placeholder={{
                      color: 'gray.500',
                    }}
                    mb={2}
                  />
                  {/* below to control only 1 button is displayed for multiple inputs */}
                  {newProducts.length - 1 === index &&
                    newProducts.length < 4 && (
                      <Flex justifyContent="flex-end">
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
                        leftIcon={<AddIcon />}
                      >
                        Add More Products
                      </Button>

                      </Flex>
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
              leftIcon={<CheckIcon />}
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
      width={useBreakpointValue({ base: '15vw', sm:'12vw' })}
      zIndex={useBreakpointValue({ base: 0, md: 0, lg: 0 })}
      height='560px'
      viewBox='0 0 200 1560'
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
