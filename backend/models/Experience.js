import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Experience = sequelize.define('Experience', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  puesto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  empresa: {
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
    type: DataTypes.ENUM('En Curso', 'Completado', 'Certificado'),
    defaultValue: 'Completado',
  },
  tecnologias: {
    type: DataTypes.JSONB,
    defaultValue: [],
  },
  logoEmpresa: {
    type: DataTypes.STRING,
  },
  orden: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: 'experiences',
  timestamps: true,
});

export default Experience;
