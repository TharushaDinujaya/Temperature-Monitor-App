const { Client } = require("pg");
const client = new Client({
  host: "",
  user: "",
  port: 10077,
  password: "",
  database: "",
  ssl: { rejectUnauthorized: false },
});

module.exports = { client };
