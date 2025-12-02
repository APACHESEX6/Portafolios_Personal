import Education from '../models/Education.js';

// Obtener toda la educación
export const getAllEducation = async (req, res) => {
  try {
    const education = await Education.findAll({ order: [['orden', 'ASC'], ['createdAt', 'DESC']] });
    res.json(education);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener educación', error: error.message });
  }
};

// Obtener educación por ID
export const getEducationById = async (req, res) => {
  try {
    const education = await Education.findByPk(req.params.id);
    if (!education) {
      return res.status(404).json({ message: 'Educación no encontrada' });
    }
    res.json(education);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener educación', error: error.message });
  }
};

// Crear nueva educación
export const createEducation = async (req, res) => {
  try {
    const newEducation = await Education.create(req.body);
    res.status(201).json({ message: 'Educación creada exitosamente', education: newEducation });
  } catch (error) {
    res.status(400).json({ message: 'Error al crear educación', error: error.message });
  }
};

// Actualizar educación
export const updateEducation = async (req, res) => {
  try {
    const education = await Education.findByPk(req.params.id);
    
    if (!education) {
      return res.status(404).json({ message: 'Educación no encontrada' });
    }
    
    await education.update(req.body);
    res.json({ message: 'Educación actualizada exitosamente', education });
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar educación', error: error.message });
  }
};

// Eliminar educación
export const deleteEducation = async (req, res) => {
  try {
    const education = await Education.findByPk(req.params.id);
    
    if (!education) {
      return res.status(404).json({ message: 'Educación no encontrada' });
    }
    
    await education.destroy();
    res.json({ message: 'Educación eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar educación', error: error.message });
  }
};
