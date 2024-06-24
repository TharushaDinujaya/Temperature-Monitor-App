const express = require("express");
const app = express();
const cors = require("cors");

const deviceAPI = require("./routes/deviceAPI");
const databaseAPI = require("./routes/databaseAPI");
// const { getSensorReading } = require("./database/databaseFunctions");

require("dotenv").config();
const port = process.env.PORT;

app.use(cors());
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/device", deviceAPI);
app.use("/data", databaseAPI);

// getSensorReading(9, 1).then((data) => {
//   console.log(data);
// });

app.all("*", (req, res) => {
  res.status(404).send({ message: "invalid request" });
});

app.listen(port, () => {
  console.log("Server is running on Port :", port);
});
