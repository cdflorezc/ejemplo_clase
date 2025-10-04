import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

if (process.env.NODE_ENV !== 'environment') {
  dotenv.config({ path: './src/config/.env' });
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
  }
);
console.log("DB Config:", {
  name: process.env.DB_NAME,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  host: process.env.DB_HOST,
});
export default sequelize;
