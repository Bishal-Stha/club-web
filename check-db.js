import postgres from 'postgres';
import dotenv from 'dotenv';
dotenv.config();

const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

async function check() {
    try {
        console.log('Checking tables...');
        const tables = await sql`SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'`;
        console.log('Tables found:', tables.map(t => t.tablename).join(', '));

        if (tables.some(t => t.tablename === 'team_members')) {
            const teamCount = await sql`SELECT count(*) FROM team_members`;
            console.log('Team members count:', teamCount[0].count);
        } else {
            console.log('team_members table MISSING');
        }

        if (tables.some(t => t.tablename === 'events')) {
            const eventCount = await sql`SELECT count(*) FROM events`;
            console.log('Events count:', eventCount[0].count);
        } else {
            console.log('events table MISSING');
        }
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await sql.end();
    }
}

check();
