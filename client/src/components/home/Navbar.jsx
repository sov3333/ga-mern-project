import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Avatar, Button, IconButton, Link } from '@chakra-ui/react';
import { AddIcon, ViewIcon } from '@chakra-ui/icons';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

import styles from '../../styles';
import NavMenu from './NavMenu';

const Navbar = () => {
  const { logInOut, setLogInOut } = useContext(UserContext);
  const { role, setRole } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    fetch('http://localhost:8080/api/user/logout', {
      method: 'POST',
      credentials: 'include', // include cookies in the request
    })
      .then((response) => {
        setLogInOut(!logInOut);
        setRole(null);
        localStorage.clear();
        console.log(response.status, response.statusText);
        window.scrollTo(0, 0);
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <nav className={`${styles.xPaddings} py-8 relative`}>
      {/* // <div className="absolute w-[50%] inset-0 gradient-01 z-0" />  */}
      {/* TODO / BUG: gradient is blocking some parts of nav from being clickable even though added z-0 to gradient, and higher z e.g. z-10 to items i want to click. Commented out gradient for now  */}
      {/* https://tailwindcss.com/docs/z-index */}
      <div
        className={`${styles.innerWidth} mx-auto flex justify-between gap-8 z-50`}
      >
        <div>
          <NavMenu />
        </div>
        <Link href='/'>
          <h2 className='font-extrabold text-[24px] leading-[30px] text-white z-50'>
            SWIPE SETUPS
          </h2>
        </Link>
        <div className='flex items-center'>
          {logInOut ? (
            <>
              {/* TODO / BUG: remove underline from text when hover over button  */}
              <Link href='/create'>
                <Button size='sm' colorScheme='green' leftIcon={<AddIcon />}>
                  Post
                </Button>
              </Link>
              <Link href='/profile'>
                {/* https://chakra-ui.com/docs/components/avatar#avatar-fallbacks */}
                {/* If name prop is passed to Avatar, default image will be replaced with initials and random bg color */}
                <Avatar name={''} size='sm' className='ml-5' />
              </Link>
              <Link className='no-underline'>
                <Button
                  size='sm'
                  colorScheme='pink'
                  onClick={() => {
                    handleSignOut();
                  }}
                >
                  Sign Out
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href='/signin'>
                <p className='text-white mr-5 font-bold no-underline sm:block hidden'>
                  Sign In
                </p>
              </Link>
              {/* TODO / BUG: remove underline from text when hover over button  */}
              <Link href='/signup' className='no-underline'>
                <Button size='sm' colorScheme='pink'>
                  Sign Up
                </Button>
              </Link>
            </>
          )}
          {/* TEMPORARY - Toggle button to see SignIn / SignOut state */}
          <IconButton
            icon={<ViewIcon />}
            size='sm'
            onClick={() => setLogInOut(!logInOut)}
            className='ml-5'
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
