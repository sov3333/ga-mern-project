import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

// import { logo, logo_full } from './assets';
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
      {/* <div>
        <header>
          <Link to='/'>
            <img src={logo} alt='logo' />
          </Link>
        </header>
        <main> */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/setups' element={<Setups />} />
            <Route path='/setups/:id' element={<SetupOne />} />
            <Route path='/products' element={<Products />} />
            <Route path='/products/:id' element={<ProductOne />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/starter' element={<MernStarter />} />
            <Route path='/create' element={<CreatePost />} />
            <Route path='/update/:id' element={<UpdatePost />} />
          </Routes>
        {/* </main> */}
        {/* <footer>
          <img src={logo_full} alt='logo' />
        </footer> */}
      {/* </div> */}
    </BrowserRouter>
  );
};

export default App;
