import { Button, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import CardProduct from './CardProduct'

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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CardProduct />
            <CardProduct />
            <CardProduct />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: '50px' }}>
            <Button colorScheme='green' variant='solid'>See More</Button>
        </div>
    </div>
  )
}

export default Showcase