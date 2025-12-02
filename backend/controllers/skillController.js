import Skill from '../models/Skill.js';

// Obtener todas las habilidades
export const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.findAll({ order: [['categoria', 'ASC'], ['orden', 'ASC']] });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener habilidades', error: error.message });
  }
};

// Obtener habilidades por categoría
export const getSkillsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const skills = await Skill.findAll({ where: { categoria: category }, order: [['orden', 'ASC']] });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener habilidades', error: error.message });
  }
};

// Obtener habilidad por ID
export const getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findByPk(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: 'Habilidad no encontrada' });
    }
    res.json(skill);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener habilidad', error: error.message });
  }
};

// Crear nueva habilidad
export const createSkill = async (req, res) => {
  try {
    const newSkill = await Skill.create(req.body);
    res.status(201).json({ message: 'Habilidad creada exitosamente', skill: newSkill });
  } catch (error) {
    res.status(400).json({ message: 'Error al crear habilidad', error: error.message });
  }
};

// Actualizar habilidad
export const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByPk(req.params.id);
    
    if (!skill) {
      return res.status(404).json({ message: 'Habilidad no encontrada' });
    }
    
    await skill.update(req.body);
    res.json({ message: 'Habilidad actualizada exitosamente', skill });
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar habilidad', error: error.message });
  }
};

// Eliminar habilidad
export const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByPk(req.params.id);
    
    if (!skill) {
      return res.status(404).json({ message: 'Habilidad no encontrada' });
    }
    
    await skill.destroy();
    res.json({ message: 'Habilidad eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar habilidad', error: error.message });
  }
};
