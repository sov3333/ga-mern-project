import {Link} from 'react-router-dom';
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Wrap,
} from '@chakra-ui/react';

// "Product Simple" from https://chakra-templates.dev/components/cards

export default function CardSetup({
  img,
  user,
  title,
  description,
  products,
  slug,
}) {
  return (
    <Center py={12} m={-8} className='p-16'>
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
          <Stack pt={10} align={'center'}>
            <Text
              color={'gray.400'}
              fontSize={'sm'}
              textTransform={'uppercase'}
            >
              @{user}
            </Text>
            <Heading
              fontSize={'2xl'}
              fontFamily={'body'}
              fontWeight={500}
              color={'gray.300'}
            >
              {title}
            </Heading>
            <Stack direction={'row'} align={'center'}>
              <Wrap>
                {products.map((product, index) => (
                  <Text
                    key={index}
                    fontWeight={400}
                    fontSize={'sm'}
                    color={
                      // change color of #hashtag per product
                      product.type === 'desk'
                        ? 'teal'
                        : product.type === 'monitor'
                        ? 'green'
                        : product.type === 'chair'
                        ? 'orange'
                        : product.type === 'keyboard'
                        ? 'peru'
                        : product.type === 'mouse'
                        ? 'red'
                        : product.type === 'mousepad'
                        ? 'aqua'
                        : product.type === 'speaker'
                        ? 'blue'
                        : product.type === 'headphone'
                        ? 'lightgreen'
                        : product.type === 'pc'
                        ? 'purple'
                        : product.type === 'laptop'
                        ? 'pink'
                        : product.type === 'light'
                        ? 'plum'
                        : product.type === 'riser'
                        ? 'tomato'
                        : 'darkgrey' // fallback color
                    }
                  >
                    #{product.type}
                  </Text>
                ))}
              </Wrap>
            </Stack>
          </Stack>
        </Box>
      </Link>
    </Center>
  );
}
