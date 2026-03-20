import "dotenv/config";
import * as fs from "fs";
import * as path from "path";

async function main() {
  // Use the same fallback logic as migrate.ts and seed.ts
  const dbFileName = process.env.DB_FILE_NAME || "sqlite.db";
  
  const filesToDelete = [
    dbFileName,
    `${dbFileName}-shm`,
    `${dbFileName}-wal`,
  ];

  console.log(`🗑️  Cleaning up local database state...`);

  let deleted = false;
  for (const file of filesToDelete) {
    const filePath = path.resolve(file);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
        console.log(`   Deleted: ${file}`);
        deleted = true;
      } catch (e) {
        console.error(`   ❌ Failed to delete ${file}:`, e);
      }
    }
  }

  if (deleted) {
    console.log("✅ Local database cleared successfully.");
    console.log("   You can now run migrations again.");
  } else {
    console.log(`ℹ️  No database files found (looked for ${dbFileName}).`);
  }
}

main();
