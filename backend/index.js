const connectDB = require("./db");
const express = require("express");

const app = express();
const port = 5000;
connectDB();

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`inotebook app listening at http://localhost:${port}`);
});
