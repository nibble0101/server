const express = require("express");
const cron = require("node-cron");
const fs = require("fs");

const app = express();

const PORT = process.env.PORT || 3000;

const task = cron.schedule(
  "30 11 * * *",
  () => {
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
  },
  { scheduled: true, timezone: "Africa/Nairobi" }
);

task.start();

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
