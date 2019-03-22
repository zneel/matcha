"use strict";
const faker = require("faker");
const mysql = require("mysql");
require("dotenv").config();
const con = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const createUser = con => {
  return new Promise((resolve, reject) => {
    con.query(
      `INSERT INTO users (email, username, name, surname, password, bio, genres_id) VALUES (?,?,?,?,?,?,?)`,
      [
        faker.internet.email(),
        faker.internet.userName(),
        faker.name.firstName(),
        faker.name.lastName(),
        faker.internet.password(),
        faker.lorem.paragraph(),
        faker.random.number({ min: 1, max: 2 })
      ],
      (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      }
    );
  });
};

const seed = num => {
  let a = [];
  for (let i = 0; i <= num; i++) {
    a.push(createUser(con));
  }
  return Promise.all(a)
    .then(console.log)
    .catch(console.error);
};

seed(1000);
