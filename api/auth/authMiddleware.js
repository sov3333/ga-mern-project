import jwt from 'jsonwebtoken';

//Place this in front of any route that requires authentication
export default function requireAuth(req, res, next) {
  const token = req.cookies.jwt;

  //check if jwt exists
  if (token) {
    jwt.verify(token, 'secretid', (err, decodedToken) => {
      if (err) {
        // & verified
        console.log(err);
        console.log('redirecting1');
        res.redirect('http://localhost:5173/signin');
      } else {
        console.log(decodedToken, 'requireAuth working');
        next();
      }
    });
  } else {
    // jwt does not exist
    console.log('redirecting2');
    res.redirect('http://localhost:5173/signin');
  }

  next();
}
