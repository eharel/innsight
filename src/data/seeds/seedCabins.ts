import { faker } from "@faker-js/faker";
import { supabaseAdmin } from "@/services/supabase/supabaseAdmin";
import type { CabinInsertData } from "@/types/db-aliases";

// Cabin types with realistic ranges and descriptions
const cabinTypes = [
  {
    type: "Luxury Lodge",
    minPrice: 300,
    maxPrice: 800,
    minCapacity: 4,
    maxCapacity: 10,
    discountRange: [10, 25],
    description: "A spacious luxury lodge with premium amenities",
  },
  {
    type: "Forest Cabin",
    minPrice: 200,
    maxPrice: 500,
    minCapacity: 2,
    maxCapacity: 6,
    discountRange: [5, 15],
    description: "Cozy wooden cabin nestled in the forest",
  },
  {
    type: "Lakeside Retreat",
    minPrice: 250,
    maxPrice: 600,
    minCapacity: 2,
    maxCapacity: 8,
    discountRange: [8, 20],
    description: "Peaceful cabin with stunning lake views",
  },
  {
    type: "Mountain View",
    minPrice: 350,
    maxPrice: 700,
    minCapacity: 4,
    maxCapacity: 8,
    discountRange: [10, 20],
    description: "Elevated cabin with panoramic mountain views",
  },
  {
    type: "Riverside Cottage",
    minPrice: 180,
    maxPrice: 450,
    minCapacity: 2,
    maxCapacity: 4,
    discountRange: [0, 10],
    description: "Charming cottage by the gentle flowing river",
  },
];

// Sample image URLs
const cabinImages = [
  "https://images.unsplash.com/photo-1601919051950-bb9f3ffb3fee",
  "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9",
  "https://images.unsplash.com/photo-1510798831971-661eb04b3739",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1",
  "https://images.unsplash.com/photo-1505916349660-8d91a99c3e23",
  "https://images.unsplash.com/photo-1575517111839-3a3843ee7c5e",
  "https://images.unsplash.com/photo-1604609165393-55646110e5ef",
  "https://images.unsplash.com/photo-1562133567-b6a0a9c7e6eb",
];

/**
 * Generate an array of random cabin data.
 */
function generateCabins(count: number = 10): CabinInsertData[] {
  return Array.from({ length: count }, () => {
    const cabinType = cabinTypes[Math.floor(Math.random() * cabinTypes.length)];

    const hasDiscount = Math.random() > 0.3;
    const discountPercent = hasDiscount
      ? faker.number.int({
          min: cabinType.discountRange[0],
          max: cabinType.discountRange[1],
        })
      : 0;

    return {
      name: `${cabinType.type} ${faker.word.adjective({
        length: { min: 4, max: 8 },
      })}`,
      description: `${cabinType.description}. ${faker.lorem.paragraph(2)}`,
      capacity: faker.number.int({
        min: cabinType.minCapacity,
        max: cabinType.maxCapacity,
      }),
      price: faker.number.int({
        min: cabinType.minPrice,
        max: cabinType.maxPrice,
      }),
      discount_percent: discountPercent,
      photo_url: cabinImages[Math.floor(Math.random() * cabinImages.length)],
      created_at: new Date().toISOString(),
    };
  });
}

/**
 * Seed the cabins table with generated cabin data.
 */
export async function seedCabins(count: number = 10): Promise<void> {
  try {
    const cabins = generateCabins(count);
    const { data, error } = await supabaseAdmin
      .from("cabins")
      .insert(cabins)
      .select();

    if (error) throw new Error(`Error seeding cabins: ${error.message}`);

    console.log(`✓ Successfully seeded ${data?.length ?? 0} cabins`);
  } catch (error) {
    console.error("❌ Failed to seed cabins:", error);
    throw error;
  }
}
