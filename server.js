const app = require("./src/app");  // Changed from scr to src
// const sequelize = require("./scr/config/db");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
