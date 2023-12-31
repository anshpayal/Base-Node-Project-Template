### Basic SQL commands:
Here are some steps to work with mysql shell:
- The first step is that you need to check if you are in the MYSQL Shell SQL mode or JS mode, if JS mode then run command __\sql__
- __\connect root@localhost__-> connect to local host. 
- __show databases;__-> it will show all the databases. 
- __use databaseName;__-> select the database.
- __show tables;__-> show the tables inside selected database.
- __desc tablename;__ -> it will show how many rows and column table have and their constraints.


### Working with Database:

- Now to work with Database we are using ORM which is sequelize, sequelize is ORM for any type of relational Database, to install sequelize run the command `npm install sequelize`.
  
- There are many relational Databases like mysql, mariadb, sqlite and many more. Whatever database we use it needs a driver to make the connection with the ORM layer to the actual database layer. So we are using mysql2 driver, to install this driver run the command `npm install mysql2`.
  
- To make things more simple for working with the database, we have to install sequelize-cli `npm install sequelize-cli`. 

- Go inside `src` folder -> run command on terminal `npx sequelize init` -> This command add `config.json` file inside config folder , it will make `models`, `migrations` and `seeders` folder.

- Inside `config.json` there are configurations related to the database connection for different environments (development, test, and production). Using different environments helps ensure that the development process is systematic, safe, and efficient. It reduces the chance of introducing errors and bugs into the production system.
    ```
     {
      "development": {
        "username": "root",
        "password": null, //password which you have set up for mysql
        "database": "database_development", //name of database 
        "host": "127.0.0.1", //mention URL where we have hosted our DB, since we are developing so it is inside the local machine thats why the address is 127.0.0.1, it will assume the default PORT as mysql port until you change the port no need to add it. 
        "dialect": "mysql" //automatically detects the DB to which we are connecting.   
     }
    ``` 

- If you're setting up your development environment, then write the username of your db, password of your db and in dialect mention whatever db you are using for ex: mysql, mariadb etc.

- If you're setting up test or prod environment, make sure you also replace the host with the hosted db url. 
- Run command `npx sequelize db:create` inside src directory -> it will load configuration from config.json file , it uses by default development enviroment and create flights database (because in config.json file we have given database name as flights). 

- Every table is treated as a model. So, if we want to create a table then we have create the model.

- Command to make a model(table) `npx sequelize model:generate --name Airplane --attributes modelNumber:string,capacity:integer`.  Here __--name__ flag will name the table as __Airplane__ and __--attributes__ flag will define the columns __modelNumber and capacity__. 
    - This command will create **model** and **migration** file. 
    - Inside "Airplane.js" it creates the class automatically, give us the associate function, and gives the property of table which we have created. 
    - We can also add some constraints for example:
    ```
    //Before constraints
    Airplane.init({
        modelNumber: DataTypes.STRING,
        capacity: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Airplane',
    });
    // after adding constraints
    Airplane.init({
        modelNumber: {
        type: DataTypes.STRING,
        allowNull:false //constraint
    },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false //constraint
        }
    }, {
        sequelize,
        modelName: 'Airplane',
    });
    ```
    - `NOTE:` after executing this command, when we run __show tables;__ command on mysql then it shows __empty set__ because this command only creates model and migration file. So, to actually create the model (table) inside flights DB first we have to look into migrations file. 

-  Before actually creating the model (table) inside DB, we going to first check the migration file which is created and if want to make few changes in the structure of table we can do it. Inside migration file "up function" is present in which properties are defined. 
    - We can notice one thing in up function that there are three new properties **(id, createdAt, updatedAT)** present which seqeulize created themselves. if you want to remove these properties we can do it.
    - So this migration is telling that the table is going to create with these properties which is present inside up function, if you want to make any change before creation of table we can make that change through changing the properties inside up function.
    - `NOTE:` As we have added constraints in model file then it is preffered to add those constraints in migration file also because adding constraints in model file will add javascript level constraint which means when we try to add ariplane using javascript code without capacity then it will throw an error. After adding constraints to migration file it will add database level constraint which means when we create the table then those contraints is applied to the table also.

- `sequelize db:migrate` this command will apply (commit) all pending migrations. The above migration is only created not applied. So, to apply the migration we have to run this command.
    - Creation of migration means we have created a code and still if we want to make any changes we can make it. 
    - Applying a migration means it will apply to the database.
    - We can see the unique number in migration file name it represent the date+time(2023.06.26+22:49:43) at which migration created. It helps to track the migration.
    - Now if run commnad on mysql shell **use flights; -> show tables; -> desc airplanes;** it will show the structure of the table.
    - It also create one table inside flights DB that is SequelizeMeta. It has only one column to store the name of the file to track what last migration we have applied.

- `sequelize db:migrate:undo` this command will revert (undo) the last migration.
    - Now if run commnad on mysql shell **use flights; -> show tables;** it won't show the airplanes table.
