import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL conectado correctamente');
    
    // Sincronizar modelos (crea las tablas si no existen)
    await sequelize.sync({ alter: false });
    console.log('✅ Tablas sincronizadas');
  } catch (error) {
    console.error('❌ Error de conexión a PostgreSQL:', error.message);
    process.exit(1);
  }
};

export { sequelize, connectDB };
export default connectDB;
