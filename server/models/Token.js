"use strict";
const db = require("../services/db");

const blacklistToken = (token, userId) => db.query("INSERT INTO matcha.blacklist_token (token, user_id) VALUES ($1,$2)", [token, userId]);
const checkIfBlacklisted = token => db.query("SELECT COUNT(*) FROM matcha.blacklist_token WHERE token = $1", [token]) 

module.exports = {
  blackListToken
}
