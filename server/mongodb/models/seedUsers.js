const ROLE = {
  ADMIN: 'admin',
  USER: 'user',
};

const users = [
  {
    first_name: 'Lindsey',
    last_name: 'James',
    email: 'lindseyJ@gmail.com',
    password: 'abcd',
    tags: ['Programming', 'Photography'],
    role: ROLE.ADMIN,
  },
  {
    first_name: 'Alice',
    email: 'alice123@gmail.com',
    password: 'abcddefgh',
    tags: ['Gaming', 'Photography', 'Art', 'Food'],
    role: ROLE.USER,
  },
  {
    first_name: 'Bob',
    last_name: 'Joe',
    email: 'bobby89@gmail.com',
    password: 'qwerty',
    tags: ['Coding', 'Game', 'Music'],
    role: ROLE.USER,
  },
  {
    first_name: 'Charlie',
    last_name: 'Junior',
    email: 'kingcharles@gmail.com',
    password: 'hello',
    tags: ['Game', 'Dance', 'Youtuber', 'Skate', 'Travel'],
    role: ROLE.USER,
  },
  {
    first_name: 'Frodo',
    email: 'frofro@yahoo.com',
    password: 'lotr',
    tags: ['Programming', 'Cycling'],
    role: ROLE.USER,
  },
];

module.exports = users;
