import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Profile = sequelize.define('Profile', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellidos: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profesion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcionCorta: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  descripcionLarga: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imagenPerfil: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  logoImagen: {
    type: DataTypes.STRING,
  },
  tipoDocumento: {
    type: DataTypes.STRING,
  },
  numeroDocumento: {
    type: DataTypes.STRING,
  },
  edad: {
    type: DataTypes.INTEGER,
  },
  fechaNacimiento: {
    type: DataTypes.STRING,
  },
  tipoSangre: {
    type: DataTypes.STRING,
  },
  nacionalidad: {
    type: DataTypes.STRING,
  },
  idiomas: {
    type: DataTypes.JSONB,
    defaultValue: [],
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
  },
  ubicacion: {
    type: DataTypes.STRING,
  },
  redesSociales: {
    type: DataTypes.JSONB,
    defaultValue: {},
  },
}, {
  tableName: 'profiles',
  timestamps: true,
});

export default Profile;
