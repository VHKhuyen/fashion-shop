const { Sequelize } = require("sequelize");
const {
  db: { host, name, password, user, dialect, pool },
} = require("../config/config.mysql");

const sequelize = new Sequelize(name, user, password, {
  host: host,
  dialect: dialect,
  logging: false,
  pool: pool,
});

(async () => {
  try {
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.log(error);
  }
})();
module.exports = sequelize;
