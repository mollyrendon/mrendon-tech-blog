/*Required Connections*/
const { Comment } = require("../models");

/*Comment Data:
This code creates comments in the database.
*/
const commentData = [
  {
    comment_text: "Testing Comment number 1",
    user_id: 1,
    post_id: 1,
  },
  {
    comment_text: "Testing comment number 2",
    user_id: 2,
    post_id: 2,
  },
  {
    comment_text: "Testing comment number 3",
    user_id: 3,
    post_id: 3
  }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
