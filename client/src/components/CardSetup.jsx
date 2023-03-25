import { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';
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

export default function CardSetup() {
  const [setups, setSetups] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/setup')
      .then(
        (data) => data.json(),
        (err) => console.log(err)
      )
      .then(
        (parsedData) => setSetups(parsedData),
        (err) => console.log(err)
      );
  }, []);

  return (
    <Center py={12} className="p-16">
      {/* <Link 
        to={slug}
        state={{
          img: img,
          user: user,
          title: title,
          description: description,
          products: products,
        }}
      > */}
      {setups.map((setup) => {
        return (
          <Box
            key={setup._id}
            role={'group'}
            p={6}
            maxW={'330px'}
            w={'full'}
            bg={useColorModeValue('gray.600')}
            boxShadow={'2xl'}
            rounded={'lg'}
            pos={'relative'}
            zIndex={1}
            className="m-3"
          >
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
                backgroundImage: `url(${setup.img})`,
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
                src={setup.img}
              />
            </Box>
            <Stack pt={10} align={'center'}>
              <Text
                color={'gray.400'}
                fontSize={'sm'}
                textTransform={'uppercase'}
              >
                @{setup.user}
              </Text>
              <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500} color={'gray.300'}>
                {setup.title}
              </Heading>
              <Stack direction={'row'} align={'center'}>
                <Wrap>
                  {setup.products.map((item, index) => (
                    <Text
                      key={index}
                      fontWeight={400}
                      fontSize={'sm'}
                      color={
                        // change color of #hashtag per product
                        item === 'desk'
                          ? 'teal'
                          : item === 'monitor'
                          ? 'green'
                          : item === 'chair'
                          ? 'orange'
                          : item === 'keyboard'
                          ? 'peru'
                          : item === 'mouse'
                          ? 'red'
                          : item === 'mousepad'
                          ? 'aqua'
                          : item === 'speaker'
                          ? 'blue'
                          : item === 'headphone'
                          ? 'lightgreen'
                          : item === 'pc'
                          ? 'purple'
                          : item === 'laptop'
                          ? 'pink'
                          : item === 'light'
                          ? 'plum'
                          : item === 'riser'
                          ? 'tomato'
                          : 'black' // fallback color
                      }
                    >
                      #{item}
                    </Text>
                  ))}
                </Wrap>

              </Stack>
            </Stack>
          </Box>
        );
      })}
      {/* </Link> */}
    </Center>
  );
}
