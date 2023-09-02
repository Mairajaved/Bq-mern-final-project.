const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const port = process.env.SERVER_PORT || 3241;
const cors = require("cors"); // Import the 'cors' middleware
const path = require("path");

const clientPath = path.join(__dirname, "./client/dist");
app.use("/", express.static(clientPath));

app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// ... (rest of your server setup code)
app.use("/api", require("./api/users/router"));
app.use("/api", require("./api/products/router"));
app.use("/api", require("./api/brands/router"));
app.use("/api", require("./api/category/router"));
app.use("/api", require("./api/mailer/router"));
app.use("/api", require("./api/orders/router"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to the database"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/dist/index.html"));
});

app.listen(port, () => {
  console.log(`Server is listening on port http://localhost:${port}`);
});
