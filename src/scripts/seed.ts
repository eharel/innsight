import { runAllSeeds } from '../data/seeds';

/**
 * Main script entry point for seeding the database
 */
async function main() {
  console.log('🚀 Starting database seeding process...');
  
  try {
    await runAllSeeds();
    console.log('✨ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    process.exit(1);
  }
}

// Execute the seeding function
main();
