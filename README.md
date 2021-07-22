### Node / TypeScript, MicroORM, MySQL, Koa.js  CRUD REST API
### Setup
#### Create the '.env' file and fill it
```
cp .env.example .env
```
#### Install Dependencies
```
npm install
```
<!-- #### run migrations
```
npx mikro-orm migration:create -i  
``` -->
#### push migrations to Database
```
npx mikro-orm migration:up
```
#### Start the dev Server
``` 
npm run dev
```
