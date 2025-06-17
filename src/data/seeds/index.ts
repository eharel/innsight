import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { seedCabins } from "./seedCabins.ts";
import { clearAllTables } from "./clearTables.ts";

/**
 * Main seeding function that orchestrates all data seeding
 * @param options Configuration options for seeding
 */
export async function seedAll(
  options: {
    clear?: boolean;
    cabins?: { count: number };
    // bookings?: { count: number };
    // users?: { count: number };
  } = {}
) {
  console.log("🌱 Starting database seeding...");

  const { clear = true, cabins = { count: 10 } } = options;

  try {
    if (clear) {
      console.log("🧹 Clearing existing data...");
      await clearAllTables();
    }

    if (cabins) {
      await seedCabins(cabins.count);
    }

    console.log("✅ All seeding completed successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    throw error;
  }
}
/**
 * Run all seeding operations - can be executed directly
 */
export async function runAllSeeds() {
  console.log("🌱 Starting database seeding...");

  try {
    await seedAll();
    console.log("✨ Database populated with sample data!");
  } catch (error) {
    console.error("Failed to seed database:", error);
    process.exit(1);
  }
}

// Allow direct execution of this file
// if (require.main === module) {
//   runAllSeeds().then(() => process.exit(0));
// }
if (import.meta.url.includes("src/data/seeds/index.ts")) {
  runAllSeeds().then(() => process.exit(0));
}
