import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { logo, logo_full } from './assets';
import { Home, CreatePost, UpdatePost } from './pages';
import { Nav } from './components';
import { Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <div>
        <header>
          <Link to='/'>
            <img src={logo} alt="logo" />
          </Link>
          <Link to='/create'>
            <Button colorScheme='green' variant='solid' leftIcon={<AddIcon />}>
              Create a Post
            </Button>
          </Link>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/update/:id" element={<UpdatePost />} />
          </Routes>
        </main>
        <footer>
          <img src={logo_full} alt="logo" />
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App