# TODO Rest API

A todo app rest api using Node.js and Typescript

## Local

There are 2 ways to get a local development env running:

### Method 1: Install From Source

```
$ git clone https://github.com/ginderick/todo-rest.git
$ npm install
$ npx prisma migrate dev
$ npx prisma generate
$ npm run dev
```

> This installation method assumes that MySQL server is already running on your local machine and
> the .env DATABASE_URL was updated accordingly

### Method 2: Docker Compose

```
$ git clone https://github.com/ginderick/todo-rest.git
$ docker compose up --build -d
```

> If using docker compose, the servers will be available on the following ip:
>
> - Express server: http://172.21.0.2:{port}
> - MySQL server: http://172.21.0.3:3306

> Update the DATABASE_URL in the .env file accordingly

## Testing

```
$ npm run test
```

## Postman Collection

Postman collection is available as a published collection:

```
https://documenter.getpostman.com/view/15331816/2s93m4ZP9S#ba49026a-3e8b-475f-984c-8c9810073e46
```

and is also available in the /docs folder

## Built With

- [Express](https://expressjs.com/) - Node.js web application framework used
- [Zod](https://zod.dev/) - TypeScript-first schema validation with static type inference
- [Passportjs](https://www.passportjs.org/) - An authentication middleware
- [Typedi](https://github.com/typestack/typedi) - Dependency injection
- [Prisma](https://www.prisma.io/) - ORM and database migration tool
- [Jest](https://jestjs.io/) - Testing framework
- [Supertest](https://www.npmjs.com/package/supertest) - For http assertion
