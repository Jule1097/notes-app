import dns from "dns/promises";
import { execSync } from "child_process";

async function main() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error("Missing DATABASE_URL");
    process.exit(1);
  }

  try {
    const url = new URL(dbUrl);
    const { address } = await dns.lookup(url.hostname, { family: 4 });
    const ipv4 = address;
    const migratedUrl = dbUrl.replace(url.hostname, ipv4);
    console.log("Resolved IPv4 for DB host:", ipv4);
    console.log("Running migrations with URL:", migratedUrl);
    execSync(`npx sequelize-cli db:migrate --url "${migratedUrl}"`, { stdio: "inherit" });
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
}

main();