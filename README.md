# Evado Bug Tracking System

Built on [Evado Declarative Framework](https://github.com/mkhorin/evado) 
this application keeps track of reported defects in projects.

- Admin user creates a bug tracking project.
- Producer user creates a task describing a project defect.
- Executor user takes new task to fix errors.
- Producer checks the work done.

## Docker installation

Clone application to /app
```sh
cd /app
docker-compose up -d mongo
docker-compose up --build installer
docker-compose up -d server
```

## Typical installation

#### Install environment
- [Node.js](https://nodejs.org)
- [MongoDB](https://www.mongodb.com/download-center/community)

#### Linux
Clone application to /app
```sh
cd /app
npm install
NODE_ENV=development node console/install
NODE_ENV=development node console/start
```

#### Windows
Clone application to c:/app
```sh
cd c:/app
npm install
set NODE_ENV=development
node console/install
node console/start
```

## Usage
 
Web interface: [http://localhost:3000](http://localhost:3000)

Sign in as task executor:
```sh
Email: b@b.b
Password: 123456
```
Sign in as task producer:
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
- [Build an App Without Coding](http://nervebit.com)