const { verify } = require("../utils/jwtService");

const authenticate = (req, res, next) => {
  const payload = verify(req.cookies.jwt);
  if (payload) {
    req.jwt = payload;
    res.redirect("/friends");
  } else {
    next();
  }
};

module.exports = authenticate;
