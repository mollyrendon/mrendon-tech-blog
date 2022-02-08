/*Authorization:
This code will redirect the user to the login page if they don't have an authenticated session*/

const withAuth = (req, res, next) => {
  if (!req.session.user_id) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = withAuth;
