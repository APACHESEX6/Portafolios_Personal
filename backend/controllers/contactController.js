import ContactMessage from '../models/ContactMessage.js';

// Obtener todos los mensajes
export const getAllMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.findAll({ order: [['createdAt', 'DESC']] });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener mensajes', error: error.message });
  }
};

// Obtener mensaje por ID
export const getMessageById = async (req, res) => {
  try {
    const message = await ContactMessage.findByPk(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Mensaje no encontrado' });
    }
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener mensaje', error: error.message });
  }
};

// Crear nuevo mensaje
export const createMessage = async (req, res) => {
  try {
    const newMessage = await ContactMessage.create(req.body);
    res.status(201).json({ message: 'Mensaje enviado exitosamente', contactMessage: newMessage });
  } catch (error) {
    res.status(400).json({ message: 'Error al enviar mensaje', error: error.message });
  }
};

// Marcar mensaje como leído
export const markAsRead = async (req, res) => {
  try {
    const message = await ContactMessage.findByPk(req.params.id);
    
    if (!message) {
      return res.status(404).json({ message: 'Mensaje no encontrado' });
    }
    
    await message.update({ leido: true });
    res.json({ message: 'Mensaje marcado como leído', contactMessage: message });
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar mensaje', error: error.message });
  }
};

// Eliminar mensaje
export const deleteMessage = async (req, res) => {
  try {
    const message = await ContactMessage.findByPk(req.params.id);
    
    if (!message) {
      return res.status(404).json({ message: 'Mensaje no encontrado' });
    }
    
    await message.destroy();
    res.json({ message: 'Mensaje eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar mensaje', error: error.message });
  }
};
