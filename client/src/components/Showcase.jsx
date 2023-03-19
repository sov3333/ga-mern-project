import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Heading, Text } from '@chakra-ui/react'
import CardProduct from './CardProduct'
import { setupsData } from '../constants';
import { setup1, setup2, setup3 } from '../assets/setups';

const Showcase = () => {
  return (
    <div>
        <Heading
            textAlign='center'
            fontWeight={600}
            fontSize={{ base: 'xl', sm: '3xl', md: '5xl' }}
            lineHeight={'110%'}>
            <Text as={'span'} color={'blue.400'}>
            Featured Setups
            </Text>
        </Heading>
        <Text color={'gray.500'} textAlign='center' px={{ base: 20, md: 36 }} py={{ base: 10, md: 15 }}>
            Get inspired by the top-rated trading and gaming desk setups from our community. Discover the latest hardware, lighting, and ergonomic trends, and find the perfect layout for your workflow. Check out our selection of hand-picked setups below, and click 'See More' to explore our full collection.
        </Text>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
            <CardProduct 
                img={setupsData[0].img} 
                brand={`@${setupsData[0].user}`} 
                model={setupsData[0].heading} 
                slug={`/setups/${setupsData[0].setupId}`}
                linkState={{
                    setupId: setupsData[0].setupId,
                    img: setupsData[0].img,
                    user: setupsData[0].user,
                    products: setupsData[0].products,
                }} 
            />
            <CardProduct 
                img={setupsData[1].img} 
                brand={`@${setupsData[1].user}`} 
                model={setupsData[1].heading} 
                slug={`/setups/${setupsData[1].setupId}`}
                linkState={{
                    setupId: setupsData[1].setupId,
                    img: setupsData[1].img,
                    user: setupsData[1].user,
                    products: setupsData[1].products,
                }} 
            />
            <CardProduct 
                img={setupsData[2].img} 
                brand={`@${setupsData[2].user}`} 
                model={setupsData[2].heading} 
                slug={`/setups/${setupsData[2].setupId}`}
                linkState={{
                    setupId: setupsData[2].setupId,
                    img: setupsData[2].img,
                    user: setupsData[2].user,
                    products: setupsData[2].products,
                }} 
            />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: '50px' }}>
            <Link 
                to='/setups'
            >
                <Button colorScheme='green' variant='solid'>See More</Button>
            </Link>
        </div>
    </div>
  )
}

export default Showcase