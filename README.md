# MERN Project #3 for SEIF-12



## Setup - Install and Run

Frontend:
1. In the `client` directory, `npm i`.
2. `npm run dev` to start react app.

Backend:
1. In the `server` directory, `npm i`.
2. rename `.env.example` to `.env`.
3. Run `mongod` with `brew services start mongodb-community@6.0` and check connection with `mongosh`.
4. `npm start` to start express server.

## Explanations of the technologies used

- MERN
- [Chakra UI](https://chakra-ui.com/getting-started) + [Chakra Templates](https://chakra-templates.dev/)

## A couple paragraphs about the general approach you took



## Installation instructions for any dependencies

Frontend:
1. `mkdir client`
2. `cd client`
3. `npm create vite@latest ./` then choose React framework and JavaScript variant.
4. Install dependencies: `npm i react-router-dom`
5. Install Chakra UI: `npm i @chakra-ui/react @chakra-ui/icons @emotion/react @emotion/styled framer-motion`

Backend:
1. In root, type `mkdir server`
2. `cd server`
3. `npm init -y`
4. In the package.json file:
- Add to scripts: `"start": "nodemon index"`.
- Add below description: `"type": "module",` so that we can use ES6 import/exports instead of require statements.
5. Install dependencies: `npm i cors dotenv express mongoose nodemon method-override`

## Link to your user stories – who are your users, what do they want, and why?



## Link to your wireframes – sketches of major views / interfaces in your application



## Descriptions of any unsolved problems or major hurdles your team had to overcome
