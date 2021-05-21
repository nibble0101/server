const express = require("express");
const cron = require("node-cron");
const fs = require("fs");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

const task = cron.schedule("5 * 21 5 *", () => {
  fs.readFile("./data.json", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    data = JSON.parse(data);
    data.push(new Date().toISOString());
    fs.writeFile("./data.json", JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Written successfully to file");
    });
  });
});

task.start();

app.get("/ping", (req, res) => {
  const date = new Date().toISOString();
  res.json({ date });
});

app.get("/", (req, res) => {
  fs.readFile("./data.json", (err, data) => {
    if (err) {
      res.send(err);
      return;
    }
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => console.log(`server listening on PORT ${PORT}`));
