const ROLE = {
  ADMIN: 'admin',
  BASIC: 'basic',
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
    role: ROLE.BASIC,
  },
  {
    first_name: 'Bob',
    last_name: 'Joe',
    email: 'bobby89@gmail.com',
    password: 'qwerty',
    tags: ['Coding', 'Game', 'Music'],
    role: ROLE.ADMIN,
  },
  {
    first_name: 'Charlie',
    last_name: 'Junior',
    email: 'kingcharles@gmail.com',
    password: 'hello',
    tags: ['Game', 'Dance', 'Youtuber', 'Skate', 'Travel'],
    role: ROLE.BASIC,
  },
  {
    first_name: 'Frodo',
    email: 'frofro@yahoo.com',
    password: 'lotr',
    tags: ['Programming', 'Cycling'],
    role: ROLE.BASIC,
  },
];

module.exports = users;
