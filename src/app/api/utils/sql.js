import postgres from 'postgres';

const sql = process.env.DATABASE_URL
  ? postgres(process.env.DATABASE_URL, {
    ssl: 'require',
  })
  : () => {
    throw new Error('DATABASE_URL is not set');
  };

export default sql;