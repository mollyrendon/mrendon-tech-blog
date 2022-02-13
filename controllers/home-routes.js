/*Required Connections*/

const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");

/*Find All Function:
This code is used to find all posts that have been created by the user.  The code will check to see if loggedIn is true before rendering anything on the homepage.  This is an e
*/
router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["id", "title", "content", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("homepage", { posts, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

/*Login and Signup:
This Login code is used to show the user a login page when they are not logged in.  It checks to see if the user is logged in, if they are it redirects them to the homepage.  The Signup code is used to show
the user a signpage page when they are not signed up.  
*/

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

/*Find ID Function:
This code looks for a post with a specified ID, if it is unable to find the post with the specific ID it returns a 404 error.  Otherwise it gets the data from that post and renders it to the user if they are logged in.  
*/

router.get("/post/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "content", "title", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        }
      },
      {
        model: User,
        attributes: ["username"],
      }
    ]
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "There is not a post with this id" });
        return;
      }
      const post = dbPostData.get({ plain: true });
      console.log(post);
      res.render("single-post", { post, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

/*Posts Comments Function:
This code is used to find a post with a specified ID.  If there is not a post with that specific ID then a 404 error message is returned.  Otherwise it gets the data from the database and renders the 
data to the user if they are logged in.
*/

router.get("/posts-comments", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "content", "title", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "There is not a post with this id" });
        return;
      }
      const post = dbPostData.get({ plain: true });

      res.render("posts-comments", { post, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
