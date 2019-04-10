require("dotenv").config();
const { Pool } = require("pg");
const config = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
};

const pool = new Pool(config);
module.exports = {
  query: (text, params) => pool.query(text, params),
  connect: pool.connect()
};
