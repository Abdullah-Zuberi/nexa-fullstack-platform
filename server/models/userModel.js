const db = require("../config/db");

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM users WHERE id = ?",
      [id],
      (err, result) => {
        if (err) return reject(err);
        if (!result[0]) return resolve(null);
        resolve(result[0]);
      }
    );
  });
};

const getUserWithPasswordByUsername = (username) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT u.id, u.username, p.password
       FROM users u
       JOIN userspasswords p ON u.id = p.UserID
       WHERE u.username = ?`,
      [username],
      (err, result) => {
        if (err) return reject(err);
        if (!result[0]) return resolve(null);
        resolve(result[0]);
      }
    );
  });
};
module.exports = { getUserById, getUserWithPasswordByUsername };

