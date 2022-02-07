const { User } = require("../models");

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
