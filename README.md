# SwipeSetups 

A rating and review website for computer desk setups (gaming/trading/programming).

## Explanations of the technologies used

- MERN
- [Vite](https://vitejs.dev/) development tool for faster and smoother workflow
- [Chakra UI](https://chakra-ui.com/getting-started) + [Chakra Templates](https://chakra-templates.dev/) for styling and pre-made components and templates
- [Tailwind CSS](https://tailwindcss.com/docs/guides/vite) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations

### Tools

- [SVG Icons from SVG Repo](https://www.svgrepo.com/)

### Tutorials

- [Landing page tutorial with Framer Motion and Tailwind CSS](https://youtu.be/ugCN_gynFYw)

## A couple paragraphs about the general approach you took



## Link to your user stories – who are your users, what do they want, and why?



## Link to your wireframes – sketches of major views / interfaces in your application

![SwipeSetups Homepage Hero and Setups](https://user-images.githubusercontent.com/8282076/226174478-d799bf70-8c83-4586-bcbb-a23e9aac4363.png)
![SwipeSetups Homepage Products](https://user-images.githubusercontent.com/8282076/226174481-b2148a56-46d3-4d35-a488-41824abc01c1.png)


## Descriptions of any unsolved problems or major hurdles your team had to overcome



## Installation instructions for any dependencies

### Install and run

Frontend:
1. In the `client` directory, `npm i`.
2. `npm run dev` to start react app.

Backend:
1. In the `server` directory, `npm i`.
2. rename `.env.example` to `.env`.
3. Run `mongod` with `brew services start mongodb-community@6.0` and check connection with `mongosh`.
4. `npm start` to start express server.

### Setup from scratch

Frontend:
1. `mkdir client`
2. `cd client`
3. `npm create vite@latest ./` then choose React framework and JavaScript variant.
4. Install dependencies: `npm i react-router-dom`
5. Install Chakra UI: `npm i @chakra-ui/react @chakra-ui/icons @emotion/react @emotion/styled framer-motion`
6. Install Tailwind CSS: `npm install -D tailwindcss postcss autoprefixer` then `npx tailwindcss init -p`. Then, add the Tailwind directives to root CSS file:
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Backend:
1. In root, type `mkdir server`
2. `cd server`
3. `npm init -y`
4. In the package.json file:
- Add to scripts: `"start": "nodemon index"`.
- Add below description: `"type": "module",` so that we can use ES6 import/exports instead of require statements.
5. Install dependencies: `npm i cors dotenv express mongoose nodemon method-override`