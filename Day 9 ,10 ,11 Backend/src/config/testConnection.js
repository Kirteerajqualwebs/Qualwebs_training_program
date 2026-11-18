
const sequelize = require("./database");

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Database connection failed:", error.message);
  } finally {
    await sequelize.close();
  }
}


module.exports = testConnection