const { Sequelize } = require("sequelize");

const dbConfig = new Sequelize(process.env.DB_URL);

(async () => {
  try {
    await dbConfig.authenticate();
    console.log("db connecteion established successfully");
  } catch (error) {
    console.log("db connection failed:", error);
  }
})();

module.exports = dbConfig;
