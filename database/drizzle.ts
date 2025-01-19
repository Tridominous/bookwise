
import config from '@/lib/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

export const sql = neon(config.env.databaseUrl);
export const db = drizzle({client: sql});
