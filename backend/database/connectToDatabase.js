const mysql = require("mysql2/promise");

async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      port: process.env.DATABASE_PORT,
    });
    // console.log("Connected to MySQL database");
    return connection;
  } catch (error) {
    // console.log("Error connecting to database");
    throw error;
  }
}

module.exports = { connectToDatabase };
