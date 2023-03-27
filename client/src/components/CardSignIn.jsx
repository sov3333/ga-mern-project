import { useState, useContext, useEffect } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import ModalWithForm from './ModalWithForm';
import { UserContext } from '../context/UserContext';
import { AuthContext } from '../context/AuthContext';

// "Simple Login Card" from https://chakra-templates.dev/forms/authentication

// TODO:
// - consider using "Split Screen with Image" from chakra template
// - add social signIn buttons from https://chakra-templates.dev/components/social-media-buttons

export default function CardSignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { logInOut, setLogInOut } = useContext(UserContext);
  const { role, setRole } = useContext(AuthContext);
  const navigate = useNavigate();

  const signInUser = async (e) => {
    e.preventDefault();

    const signInURL = `http://localhost:8080/api/user/login`;
    const response = await fetch(signInURL, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    const user = Promise.resolve(data);
    user.then((user) => {
      // setAuthenticated(true);

      if (user.message !== 'Login Successful') {
        navigate('/signin');
      }
      window.localStorage.setItem('role', JSON.stringify(user.role));
      setRole(user.role);
      setLogInOut(true);
    });
    window.scrollTo(0, 0);
    navigate('/');
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      // bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} color={'gray.100'}>
            Sign in to your account
          </Heading>
          <Text fontSize={'lg'} color={'gray.200'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <form onSubmit={signInUser}>
            <Stack spacing={4} color={'gray.300'}>
              <FormControl id='email'>
                <FormLabel>Email address</FormLabel>
                <Input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type='email'
                />
              </FormControl>
              <FormControl id='password'>
                <FormLabel>Password</FormLabel>
                <Input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type={'password'}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Checkbox>Remember me</Checkbox>
                  <ModalWithForm />
                  {/* <Link color={'blue.400'}>Forgot password?</Link> */}
                </Stack>

                <Button
                  type='submit'
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
