import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/student_db';

console.log('Testing connection to MongoDB...');
console.log('Connection URI:', MONGODB_URI.replace(/:([^@]+)@/, ':****@')); // Mask password

async function testConnection() {
  try {
    await mongoose.connect(MONGODB_URI, { bufferCommands: false });
    console.log('\n=============================================');
    console.log('SUCCESS: Successfully connected to MongoDB!');
    console.log('=============================================\n');
    
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Active collections:');
    if (collections.length === 0) {
      console.log(' (No collections exist yet. They will be created on first database write)');
    } else {
      collections.forEach(col => console.log(` - ${col.name}`));
    }

    await mongoose.disconnect();
    console.log('\nDisconnected cleanly.');
  } catch (error) {
    console.error('\n=============================================');
    console.error('ERROR: Connection to database failed!');
    console.error('Reason:', error.message);
    console.error('=============================================\n');
    process.exit(1);
  }
}

testConnection();
