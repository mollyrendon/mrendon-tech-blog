/*Required Connections*/
const { User } = require("../models");

/*User Data:
This code creates users in the database.
*/
const userData = [
  {
    username: "bilbobaggins",
    password: "shire",
  },

  {
    username: "dianaprince",
    password: "lasso",
  },

  {
    username: "vladdracula",
    password: "stake"
  }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
