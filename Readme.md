# Welcome to WarehousY - Manage warehouses like a PRO ⭐️
![Screenshot 2024-05-20 at 18 20 05](https://github.com/Milen-Donchev/warehouse-code-challenge/assets/93256125/824e48ba-5c21-46ff-a8f4-b0da329b50fc)


## Features

- 📋 Master products list with quick option to add a new product
- 🚮 Delete a product
- ↔️ Quickly switch between warehouses
- 🗂️ Import / Export archive
- 📆 Quick import / export actions with option to do it in the future / past
- 👮🏻‍♂️ Validation
- 🚨 Error Handling & more...

-----

## Project setup

#### 1. Clone the repo and install packages

```bash
  git clone "https://github.com/Milen-Donchev/warehouse-code-challenge"
```

#### 2. Apollo server setup
##### 2.1. Install dependencies
```bash
  cd apollo && npm install
```
##### 2.2 Create a .env file in the root of `/apollo` following the `example.env` file
##### 2.3. Add PostgreSQL connection string in `.env` file (I've provided mine, but feel free to use Your own local instance)
```bash
  DATABASE_URL=(connection string)
```
##### 2.4 Setup Prisma ORM
```bash
  npx prisma db push
  npx prisma generate
```
##### 2.4.1 (❗️Important) - If using Your own connection string, make sure to run the seed script, which I've provided, so that warehouses can be populated in Your database.
```bash
  npm run db:seed
```
##### 2.5 Run the Apollo server
```bash
  npm run start
```

#### 3. NextJS & Api Routes setup
##### 3.1. Install dependencies
```bash
  cd next-fe-api && npm install
```
##### 3.2 Run the app
```bash
  npm run dev
```
----

## Tech Stack
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)![Apollo-GraphQL](https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql)![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
