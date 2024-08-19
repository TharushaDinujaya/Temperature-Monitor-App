// const mysql = require("mysql2/promise");
const mysql = require("mysql2");

async function connectToDatabase() {
  console.log("connecting to the database !");
  try {
    const connection = mysql
      .createConnection({
        host: "tempmon.mysql.database.azure.com",
        port: 3306,
        user: "tempmon",
        password: "UoM#2024",
        database: "tempmondb",
      })
      .promise();

    console.log("Connected to MySQL database");

    return connection;
  } catch (error) {
    console.log("Error connecting to database");
    throw error;
  }
}

module.exports = { connectToDatabase };
