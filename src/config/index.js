const dotenv = require('dotenv'); //importing the dotenv package and it will return a object.

dotenv.config(); // On dotenv object we are calling config function. After this, inside "process" global all the ".env" file data gets loaded. 

module.exports={
    PORT: process.env.PORT
}
// It may happen that "process.env.PORT" will show undefined. So, to resolve this we can run command on cmd "set PORT=3000"