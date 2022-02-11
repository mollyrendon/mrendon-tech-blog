/*Required Connections*/
const { Post } = require('../models');

/*Post Data:
This code creates the posts in the database.
*/
const postData = [
  {
    title: "Fusce non erat dapibus",
    content:
      "Praesent vel quam id sem varius iaculis sit amet sodales nulla. Phasellus vel diam non massa pretium viverra eget tempor tortor. Vivamus sagittis ante lorem, at egestas felis commodo at. ",
    user_id: 1
  },
  {
    title: "Etiam cursus cursus nisi",
    content:
      "Vivamus non erat lobortis, lobortis tortor non, euismod ante. Ut sit amet pharetra sapien. Sed finibus aliquet efficitur. Nullam ut rutrum mauris. Pellentesque at augue consectetur, tempus nulla at, consectetur sapien. ",
    user_id: 2
  },
  {
    title: "Curabitur non finibus tortor",
    content:
      "urabitur aliquam hendrerit leo, eget ultrices dui commodo vitae. Nulla sodales quam eget orci dignissim euismod. Phasellus sodales pellentesque tellus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. ",
    user_id: 3
  }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
