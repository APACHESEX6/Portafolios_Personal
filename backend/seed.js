import { sequelize, connectDB } from './config/database.js';
import Profile from './models/Profile.js';
import Education from './models/Education.js';
import Experience from './models/Experience.js';
import Skill from './models/Skill.js';

const seedDatabase = async () => {
  try {
    // Conectar a la base de datos
    await connectDB();

    // Sincronizar modelos (crear tablas)
    await sequelize.sync({ force: false, alter: true });
    console.log('📦 Tablas sincronizadas');

    // Limpiar datos existentes (opcional)
    // await Profile.destroy({ where: {} });
    // await Education.destroy({ where: {} });
    // await Experience.destroy({ where: {} });
    // await Skill.destroy({ where: {} });

    // Insertar Perfil
    const [profile, createdProfile] = await Profile.findOrCreate({
      where: { email: 'diego.lesmes@correounivalle.edu.co' },
      defaults: {
        nombre: 'Diego Alejandro',
        apellidos: 'Lesmes Ordóñez',
        profesion: 'Ingeniero en Sistemas y Desarrollador web',
        descripcionCorta: 'Desarrollador Full Stack especializado en tecnologías modernas. Apasionado por crear soluciones innovadoras y escalables.',
        descripcionLarga: 'Estudiante de Tecnología en Desarrollo de Software en la Universidad del Valle. Con experiencia en desarrollo Full Stack, me especializo en crear aplicaciones web modernas utilizando React, Node.js y bases de datos tanto SQL como NoSQL. Apasionado por aprender nuevas tecnologías y resolver problemas complejos.',
        imagenPerfil: 'https://i.postimg.cc/28vtTs7D/Whats-App-Image-2025-08-30-at-8-43-38-AM.jpg',
        logoImagen: 'https://st2.depositphotos.com/2793243/9112/v/450/depositphotos_91122938-stock-illustration-hand-drawn-raccoon.jpg',
        tipoDocumento: 'Cédula',
        numeroDocumento: '1.115.574.315',
        edad: 21,
        fechaNacimiento: '6 de julio del 2004',
        tipoSangre: 'O+',
        nacionalidad: 'Colombiano',
        idiomas: [
          { nombre: 'Español', nivel: 'Nativo', icono: 'fas fa-language' },
          { nombre: 'Inglés', nivel: 'B1', icono: 'fas fa-globe-americas' }
        ],
        email: 'diego.lesmes@correounivalle.edu.co',
        telefono: '+57 314 865 8895',
        ubicacion: 'Sevilla, Colombia',
        redesSociales: {
          linkedin: 'https://www.linkedin.com/in/tu-perfil',
          github: 'https://github.com/APACHESEX6',
          twitter: '#',
          instagram: '#'
        }
      }
    });
    console.log(createdProfile ? '✅ Perfil creado' : '✓ Perfil ya existe');

    // Insertar Educación
    const educationData = [
      {
        titulo: 'Tecnología en Desarrollo de Software',
        institucion: 'Universidad del Valle',
        periodo: '2025 - Presente',
        descripcion: 'Desarrollo de software, arquitectura de sistemas, bases de datos y metodologías ágiles. Participación en proyectos de investigación y desarrollo de aplicaciones web.',
        estado: 'En Curso',
        destacados: ['Promedio: 4.0/5.0', 'Proyectos destacados', 'Liderazgo estudiantil'],
        icono: 'fa-graduation-cap',
        orden: 1
      },
      {
        titulo: 'Bachillerato Académico',
        institucion: 'Institución Educativa Liceo Mixto',
        periodo: '2016 - 2021',
        descripcion: 'Formación integral con énfasis en ciencias y matemáticas. Participación en olimpiadas académicas y actividades de liderazgo estudiantil.',
        estado: 'Completado',
        destacados: ['Promedio: 4.5/5.0', 'Mejor promedio en el colegio'],
        icono: 'fa-school',
        orden: 2
      }
    ];

    for (const edu of educationData) {
      const [education, created] = await Education.findOrCreate({
        where: { titulo: edu.titulo, institucion: edu.institucion },
        defaults: edu
      });
      console.log(created ? `✅ Educación creada: ${edu.titulo}` : `✓ Educación ya existe: ${edu.titulo}`);
    }

    // Insertar Experiencia
    const experienceData = [
      {
        puesto: 'Desarrollador Full Stack en Angular',
        empresa: 'Universidad del Valle',
        periodo: '2025 - Presente',
        descripcion: 'Desarrollo de aplicaciones web empresariales utilizando Angular como framework principal. Implementación de arquitecturas escalables, integración con APIs RESTful.',
        estado: 'En Curso',
        tecnologias: ['Angular 17+', 'TypeScript', 'RxJS', 'Material Design'],
        orden: 1
      },
      {
        puesto: 'Desarrollador Full Stack',
        empresa: 'Universidad del Valle',
        periodo: '2025 - Presente',
        descripcion: 'Desarrollo de aplicaciones web modernas con React y Node.js. Integración de APIs, gestión de bases de datos SQL y NoSQL.',
        estado: 'En Curso',
        tecnologias: ['React', 'Node.js', 'PostgreSQL', 'MongoDB'],
        orden: 2
      },
      {
        puesto: 'Reto Sevilla GeoEspacial',
        empresa: 'Universidad del Valle',
        periodo: '2024',
        descripcion: 'Participación en desafío de innovación territorial. Desarrollo de soluciones geoespaciales para el Eje Cafetero usando tecnologías de Esri (ArcGIS) y datos de la NASA.',
        estado: 'Certificado',
        tecnologias: ['Esri ArcGIS', 'NASA Earth Data', 'Geoespacial'],
        orden: 3
      }
    ];

    for (const exp of experienceData) {
      const [experience, created] = await Experience.findOrCreate({
        where: { puesto: exp.puesto, empresa: exp.empresa },
        defaults: exp
      });
      console.log(created ? `✅ Experiencia creada: ${exp.puesto}` : `✓ Experiencia ya existe: ${exp.puesto}`);
    }

    // Insertar Habilidades
    const skillsData = [
      { nombre: 'HTML5', porcentaje: 60, categoria: 'Frontend', icono: 'fab fa-html5', color: '#e34f26', orden: 1 },
      { nombre: 'CSS3', porcentaje: 60, categoria: 'Frontend', icono: 'fab fa-css3-alt', color: '#2965f1', orden: 2 },
      { nombre: 'JavaScript', porcentaje: 40, categoria: 'Frontend', icono: 'fab fa-js', color: '#f7df1e', orden: 3 },
      { nombre: 'React', porcentaje: 50, categoria: 'Frontend', icono: 'fab fa-react', color: '#61dafb', orden: 4 },
      { nombre: 'Angular', porcentaje: 55, categoria: 'Frontend', icono: 'fab fa-angular', color: '#dd0031', orden: 5 },
      { nombre: 'Python', porcentaje: 60, categoria: 'Backend', icono: 'fab fa-python', color: '#3776ab', orden: 1 },
      { nombre: 'Node.js', porcentaje: 40, categoria: 'Backend', icono: 'fab fa-node-js', color: '#68a063', orden: 2 },
      { nombre: 'Express', porcentaje: 45, categoria: 'Backend', icono: 'fas fa-server', color: '#000000', orden: 3 },
      { nombre: 'PostgreSQL', porcentaje: 50, categoria: 'Database', icono: 'fas fa-database', color: '#336791', orden: 1 },
      { nombre: 'MongoDB', porcentaje: 50, categoria: 'Database', icono: 'fas fa-database', color: '#47A248', orden: 2 },
      { nombre: 'MySQL', porcentaje: 50, categoria: 'Database', icono: 'fas fa-database', color: '#00758F', orden: 3 }
    ];

    for (const skill of skillsData) {
      const [skillRecord, created] = await Skill.findOrCreate({
        where: { nombre: skill.nombre, categoria: skill.categoria },
        defaults: skill
      });
      console.log(created ? `✅ Habilidad creada: ${skill.nombre}` : `✓ Habilidad ya existe: ${skill.nombre}`);
    }

    console.log('\n🎉 Base de datos poblada exitosamente!');
    console.log('\n📊 Resumen:');
    console.log(`   Perfiles: ${await Profile.count()}`);
    console.log(`   Educación: ${await Education.count()}`);
    console.log(`   Experiencias: ${await Experience.count()}`);
    console.log(`   Habilidades: ${await Skill.count()}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error al poblar la base de datos:', error);
    process.exit(1);
  }
};

seedDatabase();
