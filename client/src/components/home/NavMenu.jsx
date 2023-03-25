import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  Icon,
  Link,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
} from '@chakra-ui/icons';

// "With Sub-Navigation & CTA" from https://chakra-templates.dev/navigation/navbar
// Only uses the Hamburger icon and dropdown

const NavMenu = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <IconButton
        onClick={onToggle}
        icon={
          isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
        }
        aria-label={'Toggle Navigation'}
      />
      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  // {
  //   label: 'Inspiration',
  //   children: [
  //     {
  //       label: 'Explore Design Work',
  //       subLabel: 'Trending Design to inspire you',
  //       href: '#',
  //     },
  //     {
  //       label: 'New & Noteworthy',
  //       subLabel: 'Up-and-coming Designers',
  //       href: '#',
  //     },
  //   ],
  // },
  // {
  //   label: 'Find Work',
  //   children: [
  //     {
  //       label: 'Job Board',
  //       subLabel: 'Find your dream design job',
  //       href: '#',
  //     },
  //     {
  //       label: 'Freelance Projects',
  //       subLabel: 'An exclusive list for contract work',
  //       href: '#',
  //     },
  //   ],
  // },
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Swipe',
    href: '/swipe',
  },
  {
    label: 'Setups',
    href: '/setups',
  },
  {
    label: 'Products',
    href: '/products',
  },
];

export default NavMenu;