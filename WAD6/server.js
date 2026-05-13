// server.js

const express = require("express");

const app = express();

// Serve Static Files
app.use(express.static("public"));

// Port
const PORT = 3000;

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});