## SETPS TO SETUP THE NODE JS BASE FOLDER STRUCTURE:
- Run command `npm init` where you want to setup node project. (Suggestion when package.json file is created, you can remove test property under scripts from package.json and keep it empty).
- To Initalize git on the project folder run command `git init`. 
- Make `.gitignore` file, this help to ignore some file which we don't want to commit.
- Now install some libraries/node modules/packages.
    * `npm install express` -> to install express
    * `npm i dotenv` -> it handles enviroment variables
    * `npm i http-status-codes` -> it helps do the enum mapping of name of the error code and value corresponding to it.
    * `npm i nodemon` -> whenever we make any changes in file or folder, it will restart server automatically.
    * `npm i winston` -> used to handle logging and create log files. 
- Create `.env` file -> to store sensitive data such as passwords, API credentials, and other information that should not be written directly in code. 
- `NOTE:` when we are uploading this to github then we have to avoid some files like `node_modules` and `.env`.
- Create `src` folder inside project folder.

### Folder Structure Inside `src` Folder:
`src` -> Inside the src folder all the actual source code regarding the project will reside, this will not include any kind of tests. (You might want to make separate tests folder)

Lets take a look inside the src folder

`config` -> In this folder anything and everything regarding any configurations or setup of a library or module will be done. For example: setting up dotenv so that we can use the environment variables anywhere in a cleaner fashion, this is done in the server-config.js. One more example can be to setup you logging library that can help you to prepare meaningful logs, so configuration for this library should also be done here.

`routes` -> In the routes folder, we register a route and the corresponding middleware and controllers to it.

`middlewares` -> they are just going to intercept the incoming requests where we can write our validators, authenticators etc.

`controllers` -> they are kind of the last middlewares as post them you call you business layer to execute the budiness logic. In controllers we just receive the incoming requests and data and then pass it to the business layer, and once business layer returns an output, we structure the API response in controllers and send the output.

`repositories` -> this folder contains all the logic using which we interact the DB by writing queries, all the raw queries or ORM queries will go here.

`services` -> contains the buiness logic and interacts with repositories for data from the database

`utils` -> contains helper methods, error classes etc.

`Why we are creating index.js file inside every folder?` For example in controller folder their can be mutliple controller's files and when we import all the controller files inside main index.js (where we have server configuration) then we have to write many import statement for each controller files. So to avoid this we create one index.js in every folder so that first we import all the controller files into controller's index.js and then use controller's by destructring it in main index.js file.

### More about `Routes` Folder: 
- Most of the times we are going to create API driven applications, API versioning is important.
- Inside `routes` we have different routes for different versions. 
- We can create `v1`, `v2` folder inside `routes` fsolder.
- There are two types of routes: API driven routes and Non-API driven routes.
    ```
    server.get('/api/v1/blogs', (req,res)=>{
        //This is API driven routes.
    })

    server.get('/home', (req,res)=>{
        //This is Non-API driven routes.
    })
    ```
- The `Express Router` is a middleware function provided by Express.js that allows you to define routes in a separate file or module. It provides a way to organize your routes and handlers more effectively, especially when you have a large number of routes in your application. It helps in grouping related routes together and improves the maintainability and readability of your code.

### WHAT is `ORM`?
- ORM stands for Object-Relational Mapping. It's a technique used in software development to make it easier to work with databases. 
- Imagine you have a bunch of information stored in a database, like names, ages, and addresses of people. Normally, to access this data, you would need to write complex and specific queries in a language like SQL, which can be difficult and time-consuming. But with ORM, you can think of your data as objects in a programming language, like Python or Java. The ORM tool acts as a bridge between your program and the database. It maps the objects in your program to the tables in the database.
- You can create, read, update, and delete objects just like you would with any other objects in your program.
- ORM makes it easier to interact with databases and reduces the amount of code you have to write. It simplifies the process of working with data, making your development tasks more efficient and less error-prone.

### What is `sequelize`?
- Sequelize is a popular `Object-Relational Mapping (ORM)` library for JavaScript. It helps developers work with relational databases (like MySQL, PostgreSQL, SQLite, etc.) using JavaScript code.
- When you want to store and retrieve data from a database, you usually have to write SQL queries, which can be complex and tricky. Sequelize makes this process easier by providing a set of tools and methods that allow you to work with databases using JavaScript.
- With Sequelize, you can define your database tables as JavaScript classes or objects. These classes or objects are called models. Each model represents a table in the database and has properties that correspond to the columns in that table.
- For example, instead of writing SQL queries to fetch data from a table, you can simply call a method on a Sequelize model to retrieve the data you need. Sequelize will generate the necessary SQL query behind the scenes and return the results as JavaScript objects.
- You'll also have to manually install the driver for your database of choice:
```
One of the following:
$ npm install --save pg pg-hstore # Postgres
$ npm install --save mysql2
$ npm install --save mariadb
$ npm install --save sqlite3
$ npm install --save tedious # Microsoft SQL Server
$ npm install --save oracledb # Oracle Database
```

### What is `sequlize cli`?
- Sequelize CLI (Command Line Interface) is a tool that works alongside the Sequelize ORM library. It provides a set of command-line commands to help you perform common tasks related to database migrations, model generation, and more.
- With Sequelize CLI, you can perform various actions related to your database, such as creating database tables, defining associations between tables, generating models to represent database tables as JavaScript objects, running database migrations to handle schema changes, and generating seed data for your database.
- Running database migrations to handle schema changes" refers to the process of modifying the structure or schema of your database while preserving the existing data. A migration is a set of instructions or code that defines how the database schema should be changed or updated.
- By using Sequelize CLI, you can save time and effort by automating common database-related tasks and managing your database structure more efficiently. It simplifies the process of working with databases and allows you to focus more on developing your application's functionality rather than dealing with manual database management.

### SETUP THE PROJECT:
- Download this template from github and open it in your favourite text editor.
- Go inside the folder path and execute the following command:
    ```
    npm install
    ```
- In the root directory create a .env file and add the following env variables
    ```
    PORT=<port number of your choice>
    ex:
    PORT=3000
    ```
- We have installed `nodemon` module to automatically start server whenever file changes detects in folder. To use nodemon we have to execute command `npx nodemon src/index.js`.
- `npx nodemon src/index.js` this command is a bit long. So, go to package.json file make some changes on it. Add one property inside script property.
    ```
    "scripts": {
        "dev": "npx nodemon src/index.js"
    }
    ```
    Now instead of using `npx nodemon src/index.js` we can use `npm run dev`.
`
- Go inside `src` folder -> run command on terminal `npx sequelize init` -> This command add `config.json` file inside config folder , it will make `models`, `migrations` and `seeders` folder. 

- If you're setting up your development environment, then write the username of your db, password of your db and in dialect mention whatever db you are using for ex: mysql, mariadb etc.

- If you're setting up test or prod environment, make sure you also replace the host with the hosted db url. 

[Click here to know more about working with database](working_with_database.md)