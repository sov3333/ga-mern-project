import { createContext } from 'react';

const AuthContext = createContext({
  isAuthenticated: true,
  setAuthenticated: () => {},
});

export default AuthContext;
