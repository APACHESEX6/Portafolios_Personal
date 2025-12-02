import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Skill = sequelize.define('Skill', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  porcentaje: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 100,
    },
  },
  categoria: {
    type: DataTypes.ENUM('Frontend', 'Backend', 'Database', 'Tools', 'Other'),
    allowNull: false,
  },
  icono: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    defaultValue: '#4361ee',
  },
  orden: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: 'skills',
  timestamps: true,
});

export default Skill;
