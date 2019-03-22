"use strict";
const faker = require("faker");
const mysql = require("mysql");
require("dotenv").config();
const connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const createUser = (con, id) => {
  return new Promise((resolve, reject) => {
    con.query(
      `INSERT INTO users (id, email, username, name, surname, password, bio, genres_id) VALUES (?,?,?,?,?,?,?,?)`,
      [
        id,
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

const createImage = (con, is_profile) => {
  return new Promise((resolve, reject) => {
    con.query(
      `INSERT INTO images (path, is_profile) VALUES (?,?)`,
      [faker.image.avatar(), faker.random.number({ min: 0, max: 1 })],
      (err, res) => {
        if (err) return reject(err);
        return resolve(res);
      }
    );
  });
};

const seed = num => {
  let users = [];
  let images = [];
  for (let i = 0; i <= num; i++) {
    users.push(createUser(connection, i));
  }
  for (let j = 0; j <= num * 2; j++) {
    let is_profile = j % 5 === 0 ? 1 : 0;
    images.push(createImage(connection, is_profile));
  }
  return Promise.all([...users, ...images]);
};

seed(1000)
  .then(d => {
    console.log(d);
    return process.exit(0);
  })
  .catch(err => {
    console.error(err);
    return process.exit(1);
  });
