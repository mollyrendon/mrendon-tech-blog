/*Required Connections*/

const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");


/*Find All Comments Function:
  This code is used to find all of the comments in the database and return them to the user. 
*/
router.get("/", (req, res) => {
  Comment.findAll({})
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


/*Find One Comment Function:
  This code is used to find a comment with a specific id.  
*/
router.get("/:id", (req, res) => {
  Comment.findAll({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


/*Create Comment Function:
  This code is used to create a comment.  
*/
router.post("/", withAuth, (req, res) => {
  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body,
      post_id,
      user_id: req.session.user_id,
    })
      .then((dbCommentData) => res.json(dbCommentData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

/*Update Comment Function:
  This code is used to update a comment.  It first check to see if there is already an existing comment with a specific id.  If there is not then a 404 error message appears.  If there is a comment with that specific id then the data is returned and the user can update the comment.
*/
router.put("/:id", withAuth, (req, res) => {
  Comment.update(
    {
      comment_text: req.body.comment_text,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbCommentData) => {
      if (!dbCommentData) {
        res
          .status(404)
          .json({ message: "There is not a comment found with this id " });
        return;
      }
      res.json(dbCommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


/*Delete Comment Function:
  This code is used to delete a comment.  It first check to see if there is already an existing comment with a specific id.  If there is not then a 404 error message appears.  If there is a comment with that specific id then the data is returned and the user can delete the comment.
*/
router.delete("/:id", withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCommentData) => {
      if (!dbCommentData) {
        res
          .status(404)
          .json({ message: "There is not a comment found with this id " });
        return;
      }
      res.json(dbCommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
