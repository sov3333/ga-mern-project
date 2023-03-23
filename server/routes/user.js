import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import user from '../mongodb/models/User.js';
import requireAuth from '../auth/authMiddleware.js';

const router = express.Router();

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'secretid', { expiresIn: maxAge });
};

router.get('/testLoggedIn', requireAuth, async (req, res) => {
  res.send('I AM LOGGED IN, I AM SHOWN');
});

router.get('/logout', (req, res) => {
  // Delete JWT Cookie by replacing it with a blank cookie with a super short expiry
  res.cookie('jwt', '', { maxAge: 1 }); //jwt, token value, {maxAge: 1}
  console.log('logging out');
  res.redirect('http://localhost:5173/');
});

router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassword) => {
      const createdUser = new user({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
      });

      createdUser
        .save()
        .then((result) => {
          const token = createToken(result._id);
          res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

          res
            .status(201)
            .send({ message: 'User Successfully Created', result });
        })
        .catch((err) => {
          res.status(500).send({ message: 'Error creating user', err });
        });
    })
    .catch((err) => {
      // Catch error if password hash not successful
      res.status(500).send({
        message: 'Password was not hashed successfully',
        err,
      });
    });
});

router.post('/login', async (req, res) => {
  user
    .findOne({ email: req.body.email })
    .then((user) => {
      bcrypt
        .compare(req.body.password, user.password)
        .then((passwordCheck) => {
          if (!passwordCheck) {
            res.status(400).send({
              message: 'Passwords do not match',
              err,
            });
          }
          //create JWT Token
          // const token = jwt.sign(
          //   {
          //     userId: user._id,
          //     userEmail: user.email,
          //   },
          //   'RANDOM-TOKEN',
          //   { expiresIn: '24h' }
          // );
          const token = createToken(user._id);
          res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
          res.status(200).send({
            message: 'Login Successful',
            user: user._id,
            email: user.email,
            token,
          });
        })
        .catch((err) => {
          res.status(400).send({ message: 'Passwords do not match', err });
        });
    })
    .catch((err) => {
      res.status(404).send({ message: 'Email not found', err });
    });
});

//cookies test
// router.get('/set-cookies', (req, res) => {
//   res.cookie('newUser', false, {
//     maxAge: 1000 * 60 * 60 * 24,
//     httpOnly: true,
//   });
//   res.send('cookies obtained');
// });

// router.get('/read-cookies', (req, res) => {
//   s;
//   const cookies = req.cookies;
//   console.log(cookies);
//   res.json(cookies.newUser);
// });

export default router;
