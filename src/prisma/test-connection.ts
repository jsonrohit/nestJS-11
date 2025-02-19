const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient();

async function testConnection() {
  try {
    // Run a simple query to check the connection
    const result = await prisma.$queryRaw`SELECT 1`;
    console.log('Connection successful! Result:', result);
  } catch (error) {
    console.error('Connection failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();