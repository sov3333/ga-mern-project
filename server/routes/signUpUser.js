import express from 'express';
import bcrypt from 'bcrypt';
import User from '../mongodb/models/User.js';

const router = express.Router();

//USER routes
// Get
// Http://localhost:8080/api/signup/user
router.get('/user', async (req, res) => {
  try {
    const showUsers = await User.find({});
    res.status(200).json(showUsers);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Post
// curl -X POST localhost:8080/api/signup/user/seed

router.post('/user/seed', async (req, res) => {
  try {
    const newUsers = await User.create([
      {
        firstName: 'Lindsey',
        lastName: 'James',
        email: 'lindseyJ@gmail.com',
        password: 'abcd',
        tags: ['Programming', 'Photography'],
      },
      {
        firstName: 'Alice',
        email: 'alice123@gmail.com',
        password: 'abcddefgh',
        tags: ['Gaming', 'Photography', 'Art', 'Food'],
      },
      {
        firstName: 'Bob',
        last_name: 'Joe',
        email: 'bobby89@gmail.com',
        password: 'qwerty',
        tags: ['Coding', 'Game', 'Music'],
      },
      {
        firstName: 'Charlie',
        lastName: 'Junior',
        email: 'kingcharles@gmail.com',
        password: 'hello',
        tags: ['Game', 'Dance', 'Youtuber', 'Skate', 'Travel'],
      },
      {
        firstName: 'Frodo',
        email: 'frofro@yahoo.com',
        password: 'lotr',
        tags: ['Programming', 'Cycling'],
      },
    ]);
    console.log(newUsers);
    res.redirect('/');
  } catch (e) {
    console.log(e);
  }
});

// Put
// curl -X PUT -H 'Content-Type: application/json' -d '{"email": "updated.email@example.com",
// "password": "newPassword", "tags": ["tag1", "tag2"]}' http://localhost:8080/api/signup/user/{_id}

router.put('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password, tags } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { email, password, tags },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Delete
// curl -X DELETE http://localhost:8080/api/signup/user/{_id}

router.delete('/user/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleteUser = await User.findOneAndDelete({ _id: id });

    if (!deleteUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/', async (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassword) => {
      const createdUser = new User({
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
