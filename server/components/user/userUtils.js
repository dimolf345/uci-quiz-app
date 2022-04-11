require("dotenv").config();

exports.checkIsAdmin = function (body) {
  const { adminPassword } = body;
  if (adminPassword === process.env.ADMIN_PASSWORD) return "admin";
  return "user";
};
