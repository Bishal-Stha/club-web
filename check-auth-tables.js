import postgres from 'postgres';
import dotenv from 'dotenv';
dotenv.config();

const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

async function checkAuthTables() {
    try {
        console.log('Checking authentication tables...');
        const tables = await sql`SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'`;
        const tableNames = tables.map(t => t.tablename);
        console.log('Tables found:', tableNames.join(', '));

        const requiredTables = ['auth_users', 'auth_accounts', 'auth_sessions', 'auth_verification_token'];
        const missingTables = requiredTables.filter(t => !tableNames.includes(t));

        if (missingTables.length === 0) {
            console.log('SUCCESS: All authentication tables found.');
        } else {
            console.log('MISSING TABLES:', missingTables.join(', '));
        }
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await sql.end();
    }
}

checkAuthTables();
