const dotenv = require("dotenv");
const Pool = require("pg").Pool;
dotenv.config();
const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port,
});

const testDbConnection = async () => {
  try {
    await pool.query("SELECT 1");
    console.log("Database connection is working.");
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
};

testDbConnection();

module.exports = pool;
