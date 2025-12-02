import Experience from '../models/Experience.js';

// Obtener toda la experiencia
export const getAllExperience = async (req, res) => {
  try {
    const experience = await Experience.findAll({ order: [['orden', 'ASC'], ['createdAt', 'DESC']] });
    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener experiencia', error: error.message });
  }
};

// Obtener experiencia por ID
export const getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findByPk(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: 'Experiencia no encontrada' });
    }
    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener experiencia', error: error.message });
  }
};

// Crear nueva experiencia
export const createExperience = async (req, res) => {
  try {
    const newExperience = await Experience.create(req.body);
    res.status(201).json({ message: 'Experiencia creada exitosamente', experience: newExperience });
  } catch (error) {
    res.status(400).json({ message: 'Error al crear experiencia', error: error.message });
  }
};

// Actualizar experiencia
export const updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findByPk(req.params.id);
    
    if (!experience) {
      return res.status(404).json({ message: 'Experiencia no encontrada' });
    }
    
    await experience.update(req.body);
    res.json({ message: 'Experiencia actualizada exitosamente', experience });
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar experiencia', error: error.message });
  }
};

// Eliminar experiencia
export const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findByPk(req.params.id);
    
    if (!experience) {
      return res.status(404).json({ message: 'Experiencia no encontrada' });
    }
    
    await experience.destroy();
    res.json({ message: 'Experiencia eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar experiencia', error: error.message });
  }
};
