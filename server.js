"use strict";
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const routes = require("./routes.js");

app.use(express.static("./public"));
app.use(express.json());
app.use("/", routes);

app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);
})