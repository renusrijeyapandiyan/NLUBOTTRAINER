const { createClient } = require("@libsql/client");
require("dotenv").config();

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function main() {
  const users = await client.execute({
    sql: "SELECT * FROM user WHERE email = ?",
    args: ["testcheck1@example.com"],
    });
  console.log("USER ROWS:", users.rows);

  const accounts = await client.execute({
    sql: "SELECT id, accountId, providerId, userId, password FROM account",
  });
  console.log("ACCOUNT ROWS:", accounts.rows);
}

main();