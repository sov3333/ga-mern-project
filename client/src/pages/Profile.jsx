import { Link } from 'react-router-dom';
import { useState } from 'react'
import { Button, Flex } from '@chakra-ui/react';

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
        <Link to="/profile/edit">
          <Button>EDIT PROFILE</Button>
        </Link>
        <Button onClick={() => setIsMobile(!isMobile)}>
          {isMobile ? 'SEE FULL VIEW' : 'SEE MOBILE VIEW' }
        </Button>
      </Flex>
      <Flex flexDirection="column" justifyContent="center" alignItems="center" >
        <h3>TODO:</h3>
        <div>Create New Post</div>
        <div>Likes - Setups that user 'swiped right' on</div>
        <div>Favourites - User can click Star icon on setups & products to save to favs</div>
        <div>Ratings & Reviews (of products)</div>
        <div>Stats e.g. # Posts, # Likes</div>
        <div>Follow other users?</div>
      </Flex>
    </div>
  )
}

export default Profile