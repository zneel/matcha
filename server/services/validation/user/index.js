const validatePassword = password => {
  if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{4,16}$/.test(password) === false) {
    return false;
  }
  return true;
};

const validateUsername = username => {
  if (/^[a-zA-Z0-9]{2,13}$/.test(username) === false) {
    return false;
  }
  return true;
};

const validateEmail = email => {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (reg.test(email) === false) {
    return false;
  }
  return true;
};

const sanitizeStr = str => {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
};

const validateName = name => {
  if (/^[a-zA-Z]{2,13}$/.test(name) === false) {
    return false;
  }
  return true;
};

module.exports = {
  validatePassword,
  validateUsername,
  validateEmail,
  sanitizeStr,
  validateName
};
