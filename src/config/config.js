import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'environment') {
  dotenv.config({ path: './src/config/.env' });
}

const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  isProd: process.env.NODE_ENV === 'production',
  uri: process.env.URI || 'http://localhost:3000',
};

export default config;
