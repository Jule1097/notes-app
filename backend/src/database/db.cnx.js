import dns from "dns/promises";
import config from "../config/config.js";
import { Sequelize } from "sequelize";

const port = config.DB_PORT ? Number(config.DB_PORT) : 5432;

async function resolveIPv4(host) {
  try {
    const { address } = await dns.lookup(host, { family: 4 });
    return address;
  } catch {
    return host; // fallback to hostname if lookup fails
  }
}

let sequelize;

if (config.DATABASE_URL) {
  const url = new URL(config.DATABASE_URL);
  const hostname = url.hostname;
  const ipv4 = await resolveIPv4(hostname);
  const connectionString = config.DATABASE_URL.replace(hostname, ipv4);

  sequelize = new Sequelize(connectionString, {
    dialect: "postgres",
    protocol: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
        servername: hostname, // preserve SNI
      },
    },
  });
} else {
  const host = await resolveIPv4(config.DB_HOST || "localhost");
  sequelize = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, {
    host,
    port,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
        servername: config.DB_HOST || undefined,
      },
    },
  });
}

export { sequelize };
