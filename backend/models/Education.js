import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Education = sequelize.define('Education', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  institucion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  periodo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM('En Curso', 'Completado'),
    defaultValue: 'Completado',
  },
  destacados: {
    type: DataTypes.JSONB,
    defaultValue: [],
  },
  icono: {
    type: DataTypes.STRING,
    defaultValue: 'fa-graduation-cap',
  },
  orden: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: 'educations',
  timestamps: true,
});

export default Education;
