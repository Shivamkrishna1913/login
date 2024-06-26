const express = require("express");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Simulated database (for demonstration purposes)
const users = {
  user1: bcrypt.hashSync("password123", 10),
};

app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!users[username]) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid username or password." });
  }

  const isPasswordValid = bcrypt.compareSync(password, users[username]);

  if (isPasswordValid) {
    res.json({ success: true });
  } else {
    res
      .status(401)
      .json({ success: false, message: "Invalid username or password." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
