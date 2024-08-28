// const axios = require("axios");
// const fs = require("fs");
// const path = require("path");
// const cron = require("node-cron");
// const express = require("express");

// // Initialize the Express app
// const app = express();
// const port = 3000; // Choose an appropriate port

// // Your Fixer.io API key
// const apiKey = "bf57ddc9601e8d830de57d3d33ca3211";
// const baseUrl = `http://data.fixer.io/api/latest?access_key=${apiKey}`;

// // Define the path to the JSON file
// const filePath = path.join(__dirname, "exchangeRates.json");

// // Counter for executions
// let executionCount = 0;

// // Function to fetch exchange rates and save to JSON file
// const fetchExchangeRates = async () => {
//   try {
//     executionCount++;
//     console.log(
//       `Fetching exchange rates... Execution Count: ${executionCount}`
//     );
//     const response = await axios.get(baseUrl);
//     const data = response.data;

//     // Save the data to a JSON file
//     fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
//     console.log("Data saved to exchangeRates.json");
//   } catch (error) {
//     console.error("Error fetching exchange rates:", error.message);
//   }
// };

// // Schedule to run every 5 minutes
// cron.schedule("*/10 * * * *", () => {
//   fetchExchangeRates();
// });

// // Route to get exchange rates data
// app.get("/api/exchange-rates", (req, res) => {
//   fs.readFile(filePath, "utf8", (err, data) => {
//     if (err) {
//       console.error("Error reading exchange rates file:", err.message);
//       return res
//         .status(500)
//         .json({ error: "Failed to read exchange rates data" });
//     }
//     res.json(JSON.parse(data));
//   });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const cron = require("node-cron");
const express = require("express");

// Initialize the Express app
const app = express();
const port = 3000; // Choose an appropriate port

// Your Fixer.io API key
const apiKey = "bf57ddc9601e8d830de57d3d33ca3211";
const baseUrl = `http://data.fixer.io/api/latest?access_key=${apiKey}&base=USD`;

// Define the path to the JSON file
const filePath = path.join(__dirname, "exchangeRates.json");

// Counter for executions
let executionCount = 0;

// Function to fetch exchange rates and save to JSON file
const fetchExchangeRates = async () => {
  try {
    executionCount++;
    console.log(
      `Fetching exchange rates... Execution Count: ${executionCount}`
    );
    const response = await axios.get(baseUrl);
    const data = response.data;

    // Save the data to a JSON file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log("Data saved to exchangeRates.json");
  } catch (error) {
    console.error("Error fetching exchange rates:", error.message);
  }
};

// Schedule to run every 12 hours
cron.schedule("0 */12 * * *", () => {
  fetchExchangeRates();
});

// Route to get exchange rates data
app.get("/api/exchange-rates", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading exchange rates file:", err.message);
      return res
        .status(500)
        .json({ error: "Failed to read exchange rates data" });
    }
    res.json(JSON.parse(data));
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
