const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json())

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});

app.use("/races", racesRouter);

app.get("/", (req, res, next) => {
    res.json({ message: "test" });
    next();
});

module.exports = app;
