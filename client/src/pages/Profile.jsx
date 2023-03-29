import { Link } from 'react-router-dom';
import { useState } from 'react'
import { Button, Flex } from '@chakra-ui/react';

import { SocialProfileSimple } from '../components'

const Profile = () => {

  return (
    <div>
      <h1 className="mt-[8px] font-bold md:text-[40px] text-[28px] text-white text-center">Your Profile</h1>
      <h2 className="mt-[8px] font-normal sm:text-[28px] text-[18px] text-center text-secondary-white  mb-6">Check out your liked setups and product reviews</h2>
      <div>
        <SocialProfileSimple />
      </div>
      <Flex justifyContent="center">
        <Link to="/profile/edit">
          <Button>EDIT PROFILE</Button>
        </Link>

      </Flex>
    </div>
  )
}

export default Profile