import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL || `postgresql://postgres.foaafbvxpsztilwhgbjf:SvPmS8F@r4TK!._@aws-0-sa-east-1.pooler.supabase.com:6543/postgres`;

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});

export default pool;
