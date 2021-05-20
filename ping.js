const axios = require("axios");
const fs = require("fs");

async function ping() {
  const data = await axios.get(
    "https://quiet-mountain-13573.herokuapp.com/ping"
  );
  fs.readFile("./ping.json", (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    const fetchedData = JSON.parse(result);
    fetchedData.push(data.data);
    fs.writeFile("./ping.json", JSON.stringify(fetchedData), (err) => {
      console.error(err);
    });
  });
}

ping();