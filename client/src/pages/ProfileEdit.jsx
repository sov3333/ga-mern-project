import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  //   HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// "User Profile Edit" from https://chakra-templates.dev/forms/authentication

export default function ProfileEdit() {
  const [userId, setUserId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/api/user/id`, {
      method: `GET`,
      credentials: `include`,
    })
      .then((res) => res.json())
      .then((data) => {
        setUserId(data);
        console.log(userId);
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
        console.log(data);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
        if (data.username) {
          setUsername(data.username);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }, [userId]);

  const handleCancel = (e) => {
    navigate('/profile');
  };

  const handleSubmit = (e) => {
    const updatedProfile = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
    };

    fetch(`http://localhost:8080/api/user/${userId}`, {
      method: `PUT`,
      credentials: `include`,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProfile),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
          throw new Error('Network response was not ok.');
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.error(e);
      });
    navigate('/profile');
    window.scrollTo(0, 0);
  };

  return (
    <>
      <h1 className='mt-[8px] font-bold md:text-[40px] text-[28px] text-white text-center'>
        Edit Profile
      </h1>
      <h2 className='mt-[8px] font-normal sm:text-[28px] text-[18px] text-center text-secondary-white  mb-6'>
        Edit your profile
      </h2>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            User Profile Edit
          </Heading>
          <FormControl id='userName'>
            <FormLabel>User Icon</FormLabel>
            <Stack direction={['column', 'row']} spacing={6}>
              <Center>
                <Avatar size='xl' src='https://bit.ly/sage-adebayo'>
                  <AvatarBadge
                    as={IconButton}
                    size='sm'
                    rounded='full'
                    top='-10px'
                    colorScheme='red'
                    aria-label='remove Image'
                    icon={<SmallCloseIcon />}
                  />
                </Avatar>
              </Center>
              <Center w='full'>
                <Button w='full'>Change Icon</Button>
              </Center>
            </Stack>
          </FormControl>
          <FormControl id='userName' isRequired>
            <FormLabel>First Name</FormLabel>
            <Input
              value={firstName}
              _placeholder={{ color: 'gray.500' }}
              type='text'
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </FormControl>
          <FormControl id='userName' isRequired>
            <FormLabel>Last Name</FormLabel>
            <Input
              value={lastName}
              _placeholder={{ color: 'gray.500' }}
              type='text'
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </FormControl>
          <FormControl id='userName' isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              value={username}
              _placeholder={{ color: 'gray.500' }}
              type='text'
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </FormControl>
          <FormControl id='email' isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              value={email}
              _placeholder={{ color: 'gray.500' }}
              type='email'
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </FormControl>
          {/* <FormControl id='password' isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder='Password'
            _placeholder={{ color: 'gray.500' }}
            type='password'
            // onChange={(e) => {
            //   setPassword(e.target.value);
            // }}
          />
        </FormControl> */}
          <Stack spacing={6} direction={['column', 'row']}>
            <Button
              bg={'red.400'}
              color={'white'}
              w='full'
              _hover={{
                bg: 'red.500',
              }}
              onClick={() => {
                handleCancel();
              }}
            >
              Cancel
            </Button>
            <Button
              bg={'blue.400'}
              color={'white'}
              w='full'
              _hover={{
                bg: 'blue.500',
              }}
              onClick={() => {
                handleSubmit();
              }}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
}
