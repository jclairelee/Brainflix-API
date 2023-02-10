const path = require("node:path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
const express = require("express");

const cors = require("cors");
const app = express();
const videoRouter = require("./routes/videos");

const corsOpts = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

app.use(express.json());
app.use(cors(corsOpts));
app.use(express.static(path.join(__dirname, "public")));
app.use("/videos", videoRouter);
app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
