/*Required Connections*/
const { User } = require("../models");

/*User Data:
This code creates users in the database.
*/
const userData = [
  {
    username: "bilbo_baggins",
    password: "shire",
  },

  {
    username: "diana_prince",
    password: "lasso",
  },

  {
    username: "vlad_dracula",
    password: "stake",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
