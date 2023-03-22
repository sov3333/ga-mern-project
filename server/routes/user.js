import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import user from '../mongodb/models/User.js';

const router = express.Router();

router.get('/test', async (req, res) => {
  res.send('working');
});

router.post('/register', async (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassword) => {
      const createdUser = new user({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
      });
      // save the new user
      createdUser
        .save()
        .then((result) => {
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
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            'RANDOM-TOKEN',
            { expiresIn: '24h' }
          );
          res.status(200).send({
            message: 'Login Successful',
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

export default router;
