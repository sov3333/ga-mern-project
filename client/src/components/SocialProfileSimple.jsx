import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Box,
  Center,
  Flex,
  Text,
  Stack,
  Button,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import { AuthContext } from '../context/AuthContext';

// "Social User Profile Simple" from https://chakra-templates.dev/components/cards

export default function SocialProfileSimple() {
  const [userId, setUserId] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [username, setUsername] = useState(null);
  const [tags, setTags] = useState(null);
  const { role, setRole } = useContext(AuthContext);

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
        setUsername(data.username);
        setRole(data.role);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [userId]);

  return (
    <Center py={6} px={3} minH={'70vh'}>
      <Box
        maxW={'420px'}
        w={'full'}
        bg={useColorModeValue('gray.700')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}
      >
        <Avatar
          size={'xl'}
          src={
            'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
          }
          alt={'Avatar Alt'}
          mb={4}
          pos={'relative'}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: 'green.300',
            border: '2px solid white',
            rounded: 'full',
            pos: 'absolute',
            bottom: 0,
            right: 3,
          }}
        />
        <Text
          as={'h1'}
          lineHeight={1.1}
          bgGradient='linear(to-r, red.400,pink.400)'
          bgClip='text'
          className="font-bold text-[28px] text-white text-center"
        >
          {firstName} {lastName}
        </Text>
        <Text
          lineHeight={1.5}
          bgGradient='linear(to-r, purple.300,pink.300)'
          bgClip='text'
          className="font-bold text-[16px] text-white text-center mt-2"
        >
          @{username}
        </Text>
        <Badge fontWeight={600} colorScheme="gray" mt={3} mb={4} className="uppercase">
          {role}
        </Badge>
        <Text
          textAlign={'center'}
          color={useColorModeValue('gray.400')}
          px={3}
        >
          Full-stack programmer, crypto trader, and gamer. PM for work inquires or{' '}
          <Link href={'#'} color={'blue.400'}>
            #tag
          </Link>{' '}
          me in your posts
        </Text>

        <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
          {arrray.map((item) => (
            <Badge
              px={2}
              py={1}
              colorScheme="green"
              variant="outline"
              fontWeight={'600'}
              textTransform={'lowercase'}
              rounded="full"
            >
              #{item}
            </Badge>
            
          ))}
        </Stack>

        {/* <Stack mt={8} direction={'row'} spacing={4}> */}
          <Flex mt={8} mb={3} justify='center' align='center'>
            <Flex mx='2'>
              <Link to='/profile/edit'>
                <Button
                  // width={'100%'}
                  fontSize={'sm'}
                  rounded={'full'}
                  _focus={{
                    bg: 'gray.200',
                  }}
                  >
                  Edit Profile
                </Button>
              </Link>
            </Flex>
            <Flex mx='2'>
              <Link to='/profile/setups'>
                <Button
                  // width={'100%'}
                  fontSize={'sm'}
                  rounded={'full'}
                  bg={'blue.400'}
                  color={'white'}
                  boxShadow={
                    '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                  }
                  _hover={{
                    bg: 'blue.500',
                  }}
                  _focus={{
                    bg: 'blue.500',
                  }}
                >
                  Your Setups
                </Button>
              </Link>
            </Flex>
          </Flex>
        {/* </Stack> */}
      </Box>
    </Center>
  );
}

const arrray = ["programmer", "trader", "gamer"];