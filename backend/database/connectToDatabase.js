// const mysql = require("mysql2/promise");
const mysql = require("mysql2");

async function connectToDatabase() {
  console.log("connecting to the database !");
  try {
    const connection = mysql
      .createConnection({
        host: process.env.HOST,
        port: process.env.DATABASE_PORT,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
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
