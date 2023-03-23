import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  Home,
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

import './App.css';
import { UserContext } from './context/UserContext';

const App = () => {
  const [logInOut, setLogInOut] = useState(false);

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
    <UserContext.Provider value={{ logInOut, setLogInOut }}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
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
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
