# Evado Bug Tracking System

Built on [Evado Declarative Framework](https://github.com/mkhorin/evado) 
this application keeps track of reported defects in projects.

- Admin user creates a bug tracking project.
- Producer user creates a task describing a project defect.
- Executor user takes new task to fix errors.
- Producer checks the work done.

## Installation

#### Install environment
- [Node.js](https://nodejs.org)
- [MongoDB](https://www.mongodb.com/download-center/community)

#### Linux
Clone application to /app
```sh
cd /app
npm install
NODE_ENV=development node console/install
```

#### Windows
Clone application to c:/app
```sh
cd c:/app
npm install
set NODE_ENV=development
node console/install
```

## Start app

#### Linux
```sh
cd /app
NODE_ENV=development node console/start
```

#### Windows
```sh
cd c:/app
set NODE_ENV=development
node console/start
```
  
## Usage
 
Web interface: [http://localhost:3000](http://localhost:3000)

Sign in as administrator:
```sh
Email: a@a.a
Password: 123456
```

## Tutorial
- [Build an App Without Coding](http://nervebit.com)