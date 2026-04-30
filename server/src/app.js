// ✅ server/src/app.js - PROPER DB INITIALIZATION & CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost',  // ← FIXED
  credentials: true,
}));

// Initialize database with retry logic
const initDB = async () => {
  if (dbInitialized) return;
  try {
    console.log('🔧 Initializing database...');
    await initializeDatabase();
    await seedDatabase();
    dbInitialized = true;
    console.log('✅ Database ready!');
  } catch (error) {
    console.error('❌ Database initialization error:', error.message);
    setTimeout(initDB, 2000); // Retry
  }
};

app.get('/', (req, res) => {  // ← DEBUG ENDPOINT
  res.json({
    message: 'JobBoard API v1',
    endpoints: {
      health: '/health',
      jobs: '/api/v1/jobs',
    },
  });
});