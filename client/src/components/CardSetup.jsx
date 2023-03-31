import {Link} from 'react-router-dom';
import {
  Box,
  Center,
  useColorModeValue,
  Text,
  Stack,
  Image,
  Wrap,
  Badge,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { FaHeart } from "react-icons/fa";

// "Product Simple" from https://chakra-templates.dev/components/cards

export default function CardSetup({
  img,
  user,
  title,
  description,
  products,
  slug,
  likedCount,
}) {
  return (
    <Center py={12} m={-3} my={-7} className='p-16'>
      <Link
        to={slug}
        state={{
          img: img,
          user: user,
          title: title,
          description: description,
          products: products,
        }}
      >
        <Box
          role={'group'}
          p={6}
          mx={-6}
          my={2}
          //maxW={'330px'}
          w={'330px'}
          h={'450px'}
          bg={useColorModeValue('gray.600')}
          boxShadow={'2xl'}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}
          className='m-3'
        >
          <Box
            rounded={'lg'}
            m={1}
            pos={'relative'}
            height={'230px'}
            _after={{
              transition: 'all .3s ease',
              content: '""',
              w: 'full',
              h: 'full',
              pos: 'absolute',
              top: 5,
              left: 0,
              backgroundImage: `url(${img})`,
              filter: 'blur(15px)',
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: 'blur(20px)',
              },
            }}
          >
            <Image
              rounded={'lg'}
              height={230}
              width={282}
              objectFit={'cover'}
              src={img}
            />
          </Box>
          
          <Stack pt={10}>
            <Flex justify="space-between" align="center">
              {/* username badge */}
              <Text
                color={'gray.400'}
                fontSize={'sm'}
                textTransform={'uppercase'}
                mb={"0.5rem"}
              >
                <Badge colorScheme='purple'>@{user}</Badge>
              </Text>
              {/* likes badge */}
              <Flex alignItems="center">
                <Box>
                  <Badge colorScheme="pink" variant="solid" px="0.6rem">
                    <Text fontSize="sm">
                      {likedCount}
                    </Text>
                  </Badge>
                </Box>
                <Icon as={FaHeart} ml="0.5rem" color="red.500" boxSize="1.5rem" />
              </Flex>
            </Flex>
            {/* title of setup */}
            <Text
              fontSize={'2xl'}
              lineHeight={1.1}
              bgGradient='linear(to-r, pink.400, purple.400)'
              bgClip='text'
              className='mt-[8px] font-bold md:text-[40px] text-[28px] text-white'
            >
              {title}
            </Text>
            {/* hashtags */}
            <Stack direction={'row'} align={'center'} pt={2}>
              <Wrap>
                {products.map((product, index) => (
                  <Badge
                    key={index}
                    rounded={'xl'}
                    px={2}
                    fontWeight={600}
                    variant="outline"
                    fontSize={'xs'}
                    textTransform={'lowercase'}
                    colorScheme={
                      // change color of #hashtag per product
                      product.type === 'Desk'
                        ? 'blue'
                        : product.type === 'Monitor'
                        ? 'green'
                        : product.type === 'Chair'
                        ? 'orange'
                        : product.type === 'Keyboard'
                        ? 'yellow'
                        : product.type === 'Mouse'
                        ? 'red'
                        : product.type === 'Mousepad'
                        ? 'pink'
                        : product.type === 'Speaker'
                        ? 'teal'
                        : product.type === 'Light'
                        ? 'purple'
                        : product.type === 'Other'
                        ? 'gray'
                        : 'gray' // fallback color
                    }
                  >
                    {product.type}
                  </Badge>
                ))}
              </Wrap>
            </Stack>
          </Stack>
        </Box>
      </Link>
    </Center>
  );
}
