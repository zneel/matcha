const validatePassword = password => {
  if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{4,16}$/.test(password) === false) {
    return false;
  }
  return true;
};

const validateUsername = username => /^[a-zA-Z0-9]{2,13}$/.test(username);

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

const validateName = name => /^[a-zA-Z]{2,13}$/.test(name)
  
const validateDob = dob => {
  if (/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/gm.test(dob) === false) {
    return false;
  }
  const matches = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/gm.exec(dob);
  if (parseInt(matches[0]) < 1970 ||
      (parseInt(matches[1]) > 0 && parseInt(matches[1] < 13)) ||
      parseInt(matches[2]) > 0 && parseInt(matches[2]) < 32) {
    return true;
  }
  return false;
}

const validateString = str => /[a-zA-Z\\s,]+/g.test(str);

const validateLat = lat => (parseFloat(lat) >= -90 && parseFloat(lat) <= 90);

const validateLon = lon => (parseFloat(lon) >= -180 && parseFloat(lon) <= 180);

const validateGenre = genre => /male|female/g.test(genre);

const validateSexOrient = orient => /heterosexual|homosexual|bisexual/g.test(orient);

module.exports = {
  validatePassword,
  validateUsername,
  validateEmail,
  sanitizeStr,
  validateName,
  validateDob,
  validateString,
  validateLat,
  validateLon,
  validateGenre,
  validateSexOrient
};
