import { useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar, Button, IconButton, Link } from '@chakra-ui/react';
import { AddIcon, ViewIcon } from '@chakra-ui/icons';

import styles from '../../styles';
import NavMenu from './NavMenu';

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <nav
      className={`${styles.xPaddings} py-8 relative`}
    >
      {/* // <div className="absolute w-[50%] inset-0 gradient-01 z-0" />  */}
      {/* TODO / BUG: gradient is blocking some parts of nav from being clickable even though added z-0 to gradient, and higher z e.g. z-10 to items i want to click. Commented out gradient for now  */}
      {/* https://tailwindcss.com/docs/z-index */}
      <div className={`${styles.innerWidth} mx-auto flex justify-between gap-8 z-50`}>
        <div>
          <NavMenu />
        </div>
        <Link href="/">
          <h2 className="font-extrabold text-[24px] leading-[30px] text-white z-50">
            SWIPE SETUPS
          </h2>
        </Link>
        <div className="flex items-center">
          {loggedIn ? (
            <>
            {/* TODO / BUG: remove underline from text when hover over button  */}
            <Link href="/create">
              <Button size="sm" colorScheme="green" leftIcon={<AddIcon />}>
                Post
              </Button>
            </Link>
            <Link href="/profile">
              <Avatar size="sm" className="ml-5" />
            </Link>
            </>
          ) : (
            <>
            <Link href="/signin">
              <p className="text-white mr-5 font-bold no-underline sm:block hidden">
                Sign In
              </p>
            </Link>
            {/* TODO / BUG: remove underline from text when hover over button  */}
            <Link href="/signup" className="no-underline">
              <Button size="sm" colorScheme="pink">Sign Up</Button>
            </Link>
            </>
          )}
        </div>
        {/* TEMPORARY - Toggle button to see SignIn / SignOut state */}
        <IconButton icon={<ViewIcon />} size="sm" onClick={() => setLoggedIn(!loggedIn)} />
      </div>
    </nav>
  )
};

export default Navbar;