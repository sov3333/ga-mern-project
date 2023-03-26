import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  Home,
  HomeOld,
  Setups,
  SetupOne,
  Products,
  ProductOne,
  SignIn,
  SignUp,
  PasswordReset,
  Profile,
  ProfileEdit,
  Create,
  MernStarter,
  CreatePost,
  UpdatePost,
  Swipe,
} from './pages';
import { Nav } from './components';
import { Navbar, Footer } from './components/home';

import './App.css';
import { UserContext } from './context/UserContext';
import AuthContext from './context/AuthContext';

const App = () => {
  const [logInOut, setLogInOut] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const loginStatus = window.localStorage.getItem('secretKey');
    if (loginStatus !== null) {
      setLogInOut(JSON.parse(loginStatus));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('secretKey', JSON.stringify(logInOut));
  }, [logInOut]);

  return (
    <AuthContext.Provider value={{}}>
      <UserContext.Provider value={{ logInOut, setLogInOut }}>
        <BrowserRouter>
          <div className='bg-primary-black overflow-hidden'>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/home' element={<HomeOld />} />
              <Route path='/setups' element={<Setups />} />
              <Route path='/setups/:id' element={<SetupOne />} />
              <Route path='/products' element={<Products />} />
              <Route path='/products/:id' element={<ProductOne />} />
              <Route path='/signin' element={<SignIn />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/reset' element={<PasswordReset />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/profile/edit' element={<ProfileEdit />} />
              <Route path='/create' element={<Create />} />
              <Route path='/swipe' element={<Swipe />} />

              {/* MERN Starter code */}
              <Route path='/starter' element={<MernStarter />} />
              <Route path='/create' element={<CreatePost />} />
              <Route path='/update/:id' element={<UpdatePost />} />
            </Routes>
            <Footer />
          </div>
          <Nav />
        </BrowserRouter>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
