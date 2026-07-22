const { createClient } = require('@libsql/client');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function main() {
  console.log('Updating existing ML models with mock performance scores for demonstration...');
  
  await client.execute('UPDATE ml_models SET accuracy = 0.825 WHERE id = 1');
  await client.execute('UPDATE ml_models SET accuracy = 0.881, precision_score = 0.872, recall_score = 0.885, f1_score = 0.878 WHERE id = 2');
  await client.execute('UPDATE ml_models SET accuracy = 0.924, precision_score = 0.915, recall_score = 0.926, f1_score = 0.920 WHERE id = 3');

  const result = await client.execute('SELECT * FROM ml_models ORDER BY id DESC LIMIT 5');
  console.log('--- UPDATED ML MODELS ---');
  console.log(JSON.stringify(result.rows, null, 2));
}

main().catch(console.error);
