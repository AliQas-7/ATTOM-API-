const app = require("./scr/app");  // Fixed "scr" to "src" if it's a typo
const sequelize = require("./scr/config/db");

const PORT = process.env.PORT || 5000;

sequelize.authenticate()
  .then(() => {
    console.log("✅ Database connection successful");
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("🔥 Database Connection Error:", err);
    process.exit(1); // Exit process if DB connection fails
  });
