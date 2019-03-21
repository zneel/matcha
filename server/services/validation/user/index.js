const consts = require("../../../consts");

const validatePassword = password => {
  if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{4,16}$/.test(password) === false) {
    return { msg: consts.USER_PASSWORD_ERROR, valid: false };
  }
  return { msg: "", valid: true };
};

const validateUsername = username => {
  if (/^[a-zA-Z0-9]{2,13}$/.test(username) === flase) {
    return { msg: consts.USER_USERNAME_ERROR, valid: false };
  }
  return { msg: "", valid: true };
};

const validateEmail = email => {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (reg.test(email) === false) {
    return { msg: consts.USER_EMAIL_ERROR, valid: false };
  }
  return { msg: "", valid: true };
};

const sanitizeStr = str => {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
};

const validateName = name => {
  if (/^[a-zA-Z]{2,13}$/.test(name) === false) {
    return { msg: consts.USER_NAME_SURNAME_ERROR, valid: false };
  }
  return { msg: "", valid: true };
};

module.exports = {
  validatePassword,
  validateUsername,
  validateEmail,
  sanitizeStr,
  validateName
};
