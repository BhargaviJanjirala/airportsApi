const express = require("express");
const ApiRoute = require("./src/country/routes.js");
const app = express();
const port = 3008;
app.use(express.json());
app.get("/", (req, res) => {
  res.send("welcome");
});
app.use("/api/airport", ApiRoute);
app.listen(port, () => console.log(`app listening on port ${port}`));
