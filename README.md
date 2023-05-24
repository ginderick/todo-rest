# TODO Rest API

A todo app rest api

## Local

There are 2 ways to get a local development env running:

### Method 1: Install From Source

```
$ git clone https://github.com/ginderick/todo-rest.git
$ npm install
$ npm run dev
```

### Method 2: Docker Compose

```
$ git clone https://github.com/ginderick/todo-rest.git
$ docker compose up --build -d
```

## Testing

```
$ npm run test
```

## Built With

- [Express](https://expressjs.com/) - Node.js web application framework used
- [Zod](https://zod.dev/) - TypeScript-first schema validation with static type inference
- [Passportjs](https://www.passportjs.org/) - An authentication middleware
- [Typedi](https://github.com/typestack/typedi) - Dependency injection
- [Prisma](https://www.prisma.io/) - ORM and database migration tool
- [Jest](https://jestjs.io/) - Testing framework
- [Supertest](https://www.npmjs.com/package/supertest) - For http assertions
