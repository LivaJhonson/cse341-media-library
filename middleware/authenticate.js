const isAuthenticated = (req, res, next) => {
  // Allow if user exists in session OR Passport sets req.user
  if (!req.session.user && !req.user) {
    return res.status(401).json("You do not have access.");
  }
  next();
};

module.exports = {
  isAuthenticated
};
