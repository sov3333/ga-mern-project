import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { 
  Home, 
  Setups, 
  SetupOne, 
  Products, 
  ProductOne, 
  SignIn, 
  SignUp, 
  Profile,
  MernStarter,
  CreatePost, 
  UpdatePost 
} from './pages';
import { Nav } from './components';

import './App.css';

const App = () => {
  return (
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
          <Route path='/profile' element={<Profile />} />

          {/* MERN Starter code */}
          <Route path='/starter' element={<MernStarter />} />
          <Route path='/create' element={<CreatePost />} />
          <Route path='/update/:id' element={<UpdatePost />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;
