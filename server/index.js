const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

// Load environment variables
dotenv.config({ path: './config.env' });

// MongoDB connection
const db = process.env.DATABASE_LOCAL || 'mongodb://localhost:27017/your-db-name';

mongoose.connect(db, {
 
}).then(() => {
  console.log(' Database connection successful');
}).catch((err) => {
  console.error(' Database connection error:', err);
});

// Start server
const port = process.env.PORT || 2002;
app.listen(port, () => {
  console.log(` Server is running on http://localhost:${port}`);
});
