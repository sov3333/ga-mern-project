import { Link } from 'react-router-dom';
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

export default function CardSetup({ img, user, title, description, products, slug }) {
  return (
    <Center py={12}>
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
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}>
        <Box
          rounded={'lg'}
          mt={-12}
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
          }}>
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={img}
          />
        </Box>
        <Stack pt={10} align={'center'}>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            @{user}
          </Text>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            {title}
          </Heading>
          <Stack direction={'row'} align={'center'}>
            {/* <Text fontWeight={800} fontSize={'xl'}> */}
              <Wrap>
                {products.map((item, index) => (
                  <Text key={index} fontWeight={400} fontSize={'sm'} color={
                    // change color of #hashtag per product
                    item === 'desk' ? 'aqua' :
                    item === 'monitor' ? 'red' :
                    item === 'chair' ? 'orange' :
                    item === 'keyboard' ? 'peru' :
                    item === 'mouse' ? 'green' :
                    item === 'mousepad' ? 'teal' :
                    item === 'speaker' ? 'blue' :
                    item === 'headphone' ? 'violet' :
                    item === 'pc' ? 'purple' :
                    item === 'laptop' ? 'pink' :
                    item === 'light' ? 'plum' :
                    item === 'riser' ? 'tomato' :
                    'black' // fallback color
                  }>#{item}</Text>
                ))}
              </Wrap>
              
            {/* </Text> */}
            {/* <Text textDecoration={'line-through'} color={'gray.600'}>
              $199
            </Text> */}
          </Stack>
        </Stack>
      </Box>
      </Link>
    </Center>
  );
}