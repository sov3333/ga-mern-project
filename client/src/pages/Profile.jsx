import { Button, Flex } from '@chakra-ui/react';
import React, { useState } from 'react'
import { SocialProfileSimple, SocialProfileHorizontal } from '../components'

const Profile = () => {
  const [isMobile, setIsMobile] = useState(true);

  return (
    <div>
      <h1>Profile</h1>
      <h2>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium omnis impedit modi voluptates, atque aliquam sed nam. Eos rem eligendi provident qui voluptatibus aperiam architecto?</h2>
      <div>
        {isMobile ? (
          <SocialProfileSimple />
          ) : (
          <SocialProfileHorizontal />
        )}
      </div>
      <Flex justifyContent="center">
        <Button onClick={() => setIsMobile(!isMobile)}>
          {isMobile ? 'SEE FULL VIEW' : 'SEE MOBILE VIEW' }
        </Button>
      </Flex>
    </div>
  )
}

export default Profile