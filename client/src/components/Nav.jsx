
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

const Links = [
  'Setups',
  'Swipe',
  'Products',
];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.600'),
    }}
    href={`/${children.toLowerCase()}`}>
    {children}
  </Link>
);

export default function withAction() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box px={4} className="my-6 xl:mx-[8rem] lg:mx-[5rem] md:mx-[3rem] sm:mx-[1rem] mx-0">
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
              href="/"
              _hover={{
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              <Box className="text-white font-extrabold md:text-[28px] sm:text-[24px] text-[18px]">SWIPE SETUPS</Box>
            </Link>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
              className="text-white font-extrabold text-[18px]"
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Link 
              href="/create"
              _hover={{
                textDecoration: 'none',
              }}
            >
              <Button
                variant={'solid'}
                colorScheme={'whatsapp'}
                size={'sm'}
                mr={4}
                leftIcon={<AddIcon />}>
                Post
              </Button>
            </Link>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                <Link 
                  href="/profile"
                  _hover={{
                    textDecoration: 'none',
                  }}
                >
                  <MenuItem>Profile</MenuItem>
                </Link>
                <Link 
                  href="/profile/edit"
                  _hover={{
                    textDecoration: 'none',
                  }}
                >
                  <MenuItem>Settings</MenuItem>
                </Link>
                <MenuDivider />
                <Link 
                  href="#"
                  _hover={{
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <MenuItem>Sign out</MenuItem>
                </Link>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }} className="text-white font-extrabold text-[18px]">
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