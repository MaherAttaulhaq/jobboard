const fs = require('fs');
const Database = require('better-sqlite3');

const sql = fs.readFileSync('drizzle/20260317182201_polite_leo/migration.sql', 'utf8');
const stmts = sql
  .split('--> statement-breakpoint')
  .map((s) => s.trim())
  .filter(Boolean);

const db = new Database('sqlite.db');
for (const stmt of stmts) {
  try {
    console.log('RUNNING:', stmt.split('\n')[0]);
    db.exec(stmt);
  } catch (e) {
    console.error('ERROR on stmt:', stmt.split('\n')[0]);
    console.error(e.message);
    process.exit(1);
  }
}
console.log('ok');
