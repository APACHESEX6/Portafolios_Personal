import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import connectDB from './config/database.js';
import { testConnection as testSupabase } from './config/supabaseClient.js';

// Importar rutas
import profileRoutes from './routes/profileRoutes.js';
import educationRoutes from './routes/educationRoutes.js';
import experienceRoutes from './routes/experienceRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a la base de datos
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir frontend estático si existe el build
const frontendDist = path.join(process.cwd(), 'frontend', 'dist');
const backendPublic = path.join(process.cwd(), 'public');

if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
} else if (fs.existsSync(backendPublic)) {
  app.use(express.static(backendPublic));
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(backendPublic, 'index.html'));
  });
}

// Rutas
app.get('/', (req, res) => {
  res.json({
    message: '🚀 API del Portafolio Personal',
    version: '1.0.0',
    endpoints: {
      profile: '/api/profile',
      education: '/api/education',
      experience: '/api/experience',
      skills: '/api/skills',
      contact: '/api/contact',
    },
  });
});

app.use('/api/profile', profileRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/contact', contactRoutes);

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, async () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);

  // Verificar conexión a Supabase (comprobación ligera)
  try {
    const ok = await testSupabase();
    if (ok) {
      console.log('✅ Supabase reachable (basic check passed)');
    } else {
      console.log('⚠️  Supabase no responde al check básico. Revisa SUPABASE_URL y SUPABASE_KEY en .env');
    }
  } catch (err) {
    console.log('⚠️  Error al verificar Supabase:', err.message || err);
  }
});

export default app;
