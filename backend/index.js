const express = require("express");
const cors = require("cors");
const path = require("path");
const h = require("./handler");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/bfhl", function (req, res) {
    res.json({ operation_code: 1 });
});

app.post("/bfhl", h);

app.listen(PORT, function () {
    console.log(`server is on port ${PORT}`);
});