const { createClient } = require('@libsql/client');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function main() {
  console.log('Checking current database state...');
  
  const usersResult = await client.execute('SELECT * FROM user');
  console.log('--- USERS ---');
  console.log(JSON.stringify(usersResult.rows, null, 2));

  const accountsResult = await client.execute('SELECT * FROM account');
  console.log('--- ACCOUNTS ---');
  console.log(JSON.stringify(accountsResult.rows.map(r => ({ ...r, password: r.password ? '[HASHED]' : null })), null, 2));
}

main().catch(console.error);
