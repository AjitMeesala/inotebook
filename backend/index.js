const connectDB = require("./db");
const express = require("express");
const cors = require("cors");
const os = require("os");

const app = express();
const port = 5000;  
connectDB();

// Get local IP address
const getLocalIP = () => {
  const interfaces = os.networkInterfaces();
  for (let iface in interfaces) {
    for (let i = 0; i < interfaces[iface].length; i++) {
      const { family, address, internal } = interfaces[iface][i];
      if (family === 'IPv4' && !internal) {
        return address;
      }
    }
  }
  return 'localhost';
};

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://${getLocalIP()}:${port}`);
});
