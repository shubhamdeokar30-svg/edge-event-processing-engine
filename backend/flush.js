// flush.js
const { connection } = require('./src/config/redis');

async function wipe() {
  console.log("🧹 Cleaning up Redis...");
  await connection.flushall();
  console.log("✨ Redis is empty. Now restart your server!");
  process.exit(0);
}

wipe();