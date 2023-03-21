import express from 'express';
import bcrypt from 'bcrypt';
import user from '../mongodb/models/User.js';

const router = express.Router();

router.get('/test', async (req, res) => {
  res.send('THIS ROUTE WORKS');
});

// router.post('/', async (req, res) => {
//   console.log(req.body);
//   try {
//     const createdUser = await user.create(req.body);
//     res.status(200).send(createdUser);
//   } catch (error) {
//     res.status(400).json({ status: 'error', error: error.message });
//   }
// });

router.post('/', async (req, res) => {
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

export default router;
