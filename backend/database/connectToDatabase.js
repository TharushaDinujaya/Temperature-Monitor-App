const { Client } = require("pg");
const client = new Client({
  host: process.env.HOST,
  user: process.env.USER,
  port: process.env.DATABASE_PORT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  ssl: { rejectUnauthorized: false },
});

module.exports = { client };
