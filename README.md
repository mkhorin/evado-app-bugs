# Bug Tracking System

A tracking web application of reported project defects
built on [Evado Declarative Framework](https://github.com/mkhorin/evado).

- Admin user creates bug tracking projects.
- Manager user creates tasks describing project defects.
- Executor user takes new task to fix errors.
- Manager checks the work done.

[![Web app built on Evado declarative framework](doc/evado-app.png)](https://mkhorin.github.io/evado-site/)

## Docker installation

Clone application to `/app`
```sh
cd /app
docker-compose up -d mongo
docker-compose up --build installer
docker-compose up -d server
```

## Typical installation

#### Install environment
- [Node.js](https://nodejs.org) (version 20)
- [MongoDB](https://www.mongodb.com/download-center/community) (version 5)

#### Linux
Clone application to `/app`
```sh
cd /app
npm install
NODE_ENV=development node console/install
NODE_ENV=development node console/start
```

#### Windows
Clone application to `c:/app`
```sh
cd c:/app
npm install
set NODE_ENV=development
node console/install
node console/start
```

## Usage

Web interface `http://localhost:3000`

Sign in as executor:
```sh
Email: b@b.b
Password: 123456
```
Sign in as manager:
```sh
Email: s@s.s
Password: 123456
```
Sign in as administrator:
```sh
Email: a@a.a
Password: 123456
```

## Tutorial
- [Build an App Without Coding](https://mkhorin.github.io/evado-site/)