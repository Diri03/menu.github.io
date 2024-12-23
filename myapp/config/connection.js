const { Pool } = require('pg');

const pool = new Pool({
  host: 'aws-0-ap-southeast-1.pooler.supabase.com',
  user: 'postgres.olylieomrxnahhyuloce',
  database: 'postgres',
  password: 'C9eKmll23wgRK5Yp',
  port: 6543,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

module.exports = pool;