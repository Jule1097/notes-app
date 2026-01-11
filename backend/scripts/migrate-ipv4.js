import dns from "dns/promises";
import { execSync } from "child_process";

async function dohResolveA(host) {
  try {
    const url = `https://cloudflare-dns.com/dns-query?name=${host}&type=A`;
    const res = await fetch(url, { headers: { Accept: "application/dns-json" } });
    if (!res.ok) throw new Error("DoH failed");
    const json = await res.json();
    if (json.Answer && json.Answer.length) {
      const a = json.Answer.find(a => a.type === 1);
      if (a) return a.data;
    }
  } catch (e) {}
  throw new Error("DoH resolution failed");
}

async function resolveIPv4(host) {
  try {
    const { address } = await dns.lookup(host, { family: 4 });
    return address;
  } catch {
    return await dohResolveA(host);
  }
}

async function main() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error("Missing DATABASE_URL");
    process.exit(1);
  }

  try {
    const url = new URL(dbUrl);
    const hostname = url.hostname;
    const ipv4 = await resolveIPv4(hostname);
    console.log("Resolved IPv4 for DB host:", ipv4);
    const migratedUrl = dbUrl.replace(hostname, ipv4);
    console.log("Running migrations with URL:", migratedUrl);
    execSync(`npx sequelize-cli db:migrate --url "${migratedUrl}"`, { stdio: "inherit" });
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
}

main();
