const dev = {
  app: {
    port: process.env.DEV_APP_PORT,
  },
  db: {
    host: process.env.DEV_APP_HOST,
    user: process.env.DEV_APP_USER,
    password: process.env.DEV_APP_PASSWORD,
    name: process.env.DEV_APP_NAME,
    dialect: "mysql",

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};

const pro = {
  app: {
    port: process.env.PORT_APP_PORT,
  },
  db: {
    host: process.env.PRO_APP_HOST,
    user: process.env.PRO_APP_USER,
    password: process.env.PRO_APP_PASSWORD,
    name: process.env.PRO_APP_NAME,
    port: process.env.PRO_APP_PORT,
    dialect: "mysql",

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};

const config = { dev, pro };
const env = process.env.NODE_ENV == "production" ? "pro" : "dev";
module.exports = config[env];
