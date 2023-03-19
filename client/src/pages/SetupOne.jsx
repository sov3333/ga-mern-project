import { Flex } from '@chakra-ui/react';
import React from 'react'
import { useLocation } from 'react-router-dom';
import { DetailsSetup } from '../components';

const SetupOne = () => {
    const location = useLocation();
    const { setupId, img, user, heading, description, products } = location.state;
  return (
    <div>
        <h1>A Desk Setup</h1>
        <h2>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id totam nisi facere nesciunt, similique explicabo nobis tenetur ratione harum nulla sequi aspernatur minima aliquam doloribus?</h2>
        <Flex flexDirection="column" justifyContent="center" alignItems="center" >
            <h3>TODO:</h3>
            <p></p>
        </Flex>
        <DetailsSetup 
          img={img}
          user={user}
          heading={heading}
          description={description}
          products={products}
        />
    </div>
  )
}

export default SetupOne