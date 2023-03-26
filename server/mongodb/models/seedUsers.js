const ROLE = {
  ADMIN: 'admin',
  USER: 'user',
};

const users = [
  {
    firstName: 'Lindsey',
    lastName: 'James',
    email: 'lindseyJ@gmail.com',
    password: 'abcd',
    tags: ['Programming', 'Photography'],
    role: ROLE.ADMIN,
  },
  {
    firstName: 'Alice',
    lastName: 'Drew',
    email: 'alice123@gmail.com',
    password: 'abcddefgh',
    tags: ['Gaming', 'Photography', 'Art', 'Food'],
    role: ROLE.USER,
  },
  {
    firstName: 'Bob',
    lastName: 'Joe',
    email: 'bobby89@gmail.com',
    password: 'qwerty',
    tags: ['Coding', 'Game', 'Music'],
    role: ROLE.USER,
  },
  {
    firstName: 'Charlie',
    lastName: 'Junior',
    email: 'kingcharles@gmail.com',
    password: 'hello',
    tags: ['Game', 'Dance', 'Youtuber', 'Skate', 'Travel'],
    role: ROLE.USER,
  },
  {
    firstName: 'Frodo',
    lastName: 'Mordor',
    email: 'frofro@yahoo.com',
    password: 'lotr',
    tags: ['Programming', 'Cycling'],
    role: ROLE.USER,
  },
];

export default users;
