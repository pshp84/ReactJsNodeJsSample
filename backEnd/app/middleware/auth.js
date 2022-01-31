const jwt = require("jsonwebtoken");
exports.createJWT = async (email, authId, duration) => {
  const payload = {
    email,
    authId,
    duration,
  };
  let token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: duration,
  });
  return token;
};
