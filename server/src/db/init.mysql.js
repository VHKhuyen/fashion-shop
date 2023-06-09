const { Sequelize } = require("sequelize");
const config = require("../config/config.mysql");
const { host, name, password, user, dialect, pool, port } = config.db;

const sequelize = new Sequelize(name, user, password, {
  host: host,
  port: port,
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
