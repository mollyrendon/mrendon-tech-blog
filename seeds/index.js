/*Required Connections*/
const seedUsers = require('./user-seeds');
const seedPosts = require('./post-seeds');
const seedComments = require('./comment-seeds');
const sequelize = require('../config/connection');

/*Seed All:
The seedAll() function is defined as an async function that will be called once all of the other functions have been completed.  This function is used to seed all of the tables in the database with a foce flag set to true.  
*/
const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();

  await seedPosts();

  await seedComments();

  process.exit(0);
};

seedAll();
