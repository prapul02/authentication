const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.hash = (plainText) => {
  const hashedValue = bcrypt.hashSync(plainText, saltRounds);
  return hashedValue;
};

exports.compareHash = (plainText, existingHash) => {
  console.log(plainText);
  const result = bcrypt.compareSync(plainText, existingHash);
  return result;
};
