import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Soportar connection string de Supabase o variables individuales
const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    })
  : new Sequelize(
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
  // Si no hay configuración de DB, skip (modo API solo con Supabase client)
  if (!process.env.DATABASE_URL && !process.env.DB_NAME) {
    console.log('⚠️  No hay configuración de PostgreSQL. Usando solo Supabase client API.');
    return;
  }

  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL conectado correctamente');
    
    // Sincronizar modelos (crea las tablas si no existen)
    await sequelize.sync({ alter: false });
    console.log('✅ Tablas sincronizadas');
  } catch (error) {
    console.error('❌ Error de conexión a PostgreSQL:', error.message);
    console.log('⚠️  Continuando sin conexión a base de datos...');
    // No hacer exit(1) para permitir que el servidor arranque
  }
};

export { sequelize, connectDB };
export default connectDB;
