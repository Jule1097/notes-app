import { Sequelize } from "sequelize";
import config from "../config/config.js";

const port = config.DB_PORT ? Number(config.DB_PORT) : 5432;

export const sequelize = config.DATABASE_URL
  ? new Sequelize(config.DATABASE_URL, {
      dialect: "postgres",
      protocol: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    })
  : new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, {
      host: config.DB_HOST,
      port,
      dialect: "postgres",
      dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
    });
