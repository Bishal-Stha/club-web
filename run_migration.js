import postgres from 'postgres';
import fs from 'fs';
import path from 'path';

const DATABASE_URL = 'postgresql://postgres:Mausam%402064%23@db.lecijxhhlsncsbkspzmc.supabase.co:5432/postgres';

const sql = postgres(DATABASE_URL, {
    ssl: 'require',
});

async function runMigration() {
    try {
        const migrationPath = path.resolve('admin_migration.sql');
        const migrationSql = fs.readFileSync(migrationPath, 'utf8');

        console.log('Running migration...');
        await sql.unsafe(migrationSql);
        console.log('Migration completed successfully!');

        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

runMigration();
