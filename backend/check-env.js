const { connection } = require('./src/config/redis');

async function verify() {
  try {
    const ping = await connection.ping();
    console.log(`✅ Redis Connection: ${ping}`); // Should be PONG
    
    // Check if we can write/read
    await connection.set('test-key', 'edge-engine-ready');
    const val = await connection.get('test-key');
    console.log(`✅ Redis Write/Read: ${val === 'edge-engine-ready' ? 'Success' : 'Failed'}`);
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Connection Error:', err.message);
    process.exit(1);
  }
}

verify();