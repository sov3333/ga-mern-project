import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';

import { UserContext } from '../context/UserContext';
import { AuthContext } from '../context/AuthContext';

const Links = ['Setups', 'Swipe', 'Products'];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.600'),
    }}
    href={`/${children.toLowerCase()}`}
  >
    {children}
  </Link>
);

export default function Nav() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // handle user
  const { logInOut, setLogInOut } = useContext(UserContext);
  const { role, setRole } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    fetch('https://swipe-setups.vercel.app/api/user/logout', {
      method: 'POST',
      credentials: 'include', // include cookies in the request
    })
      .then((response) => {
        setLogInOut(!logInOut);
        setRole(null);
        localStorage.clear();
        console.log(response.status, response.statusText);
        window.scrollTo(0, 0);
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Box
        px={4}
        className='my-6 xl:mx-[8rem] lg:mx-[5rem] md:mx-[3rem] sm:mx-[1rem] mx-0'
      >
        <div className='absolute w-[8%] inset-0 gradient-01' />
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Link
              href='/'
              _hover={{
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              <Box className='text-white font-extrabold md:text-[28px] sm:text-[24px] text-[18px]'>
                SWIPE SETUPS
              </Box>
            </Link>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
              className='text-white font-extrabold text-[18px]'
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            {/* logic for showing logged in vs logged out menu items */}
            {logInOut ? (
              <>
                <Link
                  href='/create'
                  _hover={{
                    textDecoration: 'none',
                  }}
                >
                  <Button
                    variant={'solid'}
                    colorScheme={'whatsapp'}
                    size={'sm'}
                    mr={4}
                    leftIcon={<AddIcon />}
                  >
                    Post
                  </Button>
                </Link>
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}
                  >
                    <Avatar
                      size={'sm'}
                      src={
                        'https://i.imgur.com/pvyr5m1.jpg'
                      }
                    />
                  </MenuButton>
                  <MenuList>
                    <Link
                      href='/profile'
                      _hover={{
                        textDecoration: 'none',
                      }}
                    >
                      <MenuItem>Profile</MenuItem>
                    </Link>
                    <Link
                      href='/profile/edit'
                      _hover={{
                        textDecoration: 'none',
                      }}
                    >
                      <MenuItem>Settings</MenuItem>
                    </Link>
                    <MenuDivider />
                    <MenuItem onClick={() => handleSignOut()}>
                      Sign out
                    </MenuItem>
                  </MenuList>
                </Menu>
              </>
            ) : (
              <>
                <Link href='/signin'>
                  <p className='text-white mr-5 font-bold no-underline sm:block hidden'>
                    Sign In
                  </p>
                </Link>
                <Link href='/signup' _hover={{ textDecoration: 'none' }}>
                  <Button size='sm' colorScheme='pink'>
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </Flex>
        </Flex>
        {isOpen ? (
          <Box
            pb={4}
            display={{ md: 'none' }}
            className='text-white font-extrabold text-[18px]'
          >
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
