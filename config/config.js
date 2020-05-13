const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  username: process.env.username,
  password: process.env.password,
  base: process.env.base,
  login: process.env.login
}