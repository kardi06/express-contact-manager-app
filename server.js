const express = require("express");
const dotenv = require("dotenv").config();
const contactRoute = require("./routes/contactRoutes");

const app = express();
const port = process.env.PORT || 5000;

app.use('/api/contacts', contactRoute);

app.listen(port, () => console.log(`server is running on port ${port}`));