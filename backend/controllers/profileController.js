import Profile from '../models/Profile.js';

// Obtener perfil (solo debe haber uno)
export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ message: 'Perfil no encontrado' });
    }
    
    // Formatear respuesta para compatibilidad con frontend
    const formattedProfile = {
      ...profile.toJSON(),
      informacionPersonal: {
        tipoDocumento: profile.tipoDocumento,
        numeroDocumento: profile.numeroDocumento,
        edad: profile.edad,
        fechaNacimiento: profile.fechaNacimiento,
        tipoSangre: profile.tipoSangre,
        nacionalidad: profile.nacionalidad,
      },
      contacto: {
        email: profile.email,
        telefono: profile.telefono,
        ubicacion: profile.ubicacion,
        redesSociales: profile.redesSociales,
      },
    };
    
    res.json(formattedProfile);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el perfil', error: error.message });
  }
};

// Crear o actualizar perfil
export const createOrUpdateProfile = async (req, res) => {
  try {
    const existingProfile = await Profile.findOne();
    
    // Extraer datos anidados del frontend
    const profileData = {
      ...req.body,
      tipoDocumento: req.body.informacionPersonal?.tipoDocumento,
      numeroDocumento: req.body.informacionPersonal?.numeroDocumento,
      edad: req.body.informacionPersonal?.edad,
      fechaNacimiento: req.body.informacionPersonal?.fechaNacimiento,
      tipoSangre: req.body.informacionPersonal?.tipoSangre,
      nacionalidad: req.body.informacionPersonal?.nacionalidad,
      email: req.body.contacto?.email || req.body.email,
      telefono: req.body.contacto?.telefono,
      ubicacion: req.body.contacto?.ubicacion,
      redesSociales: req.body.contacto?.redesSociales || {},
    };
    
    if (existingProfile) {
      await existingProfile.update(profileData);
      return res.json({ message: 'Perfil actualizado exitosamente', profile: existingProfile });
    }
    
    const newProfile = await Profile.create(profileData);
    res.status(201).json({ message: 'Perfil creado exitosamente', profile: newProfile });
  } catch (error) {
    res.status(400).json({ message: 'Error al guardar el perfil', error: error.message });
  }
};

// Actualizar perfil
export const updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ message: 'Perfil no encontrado' });
    }
    
    const profileData = {
      ...req.body,
      tipoDocumento: req.body.informacionPersonal?.tipoDocumento,
      numeroDocumento: req.body.informacionPersonal?.numeroDocumento,
      edad: req.body.informacionPersonal?.edad,
      fechaNacimiento: req.body.informacionPersonal?.fechaNacimiento,
      tipoSangre: req.body.informacionPersonal?.tipoSangre,
      nacionalidad: req.body.informacionPersonal?.nacionalidad,
      email: req.body.contacto?.email || req.body.email,
      telefono: req.body.contacto?.telefono,
      ubicacion: req.body.contacto?.ubicacion,
      redesSociales: req.body.contacto?.redesSociales || {},
    };
    
    await profile.update(profileData);
    res.json({ message: 'Perfil actualizado exitosamente', profile });
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el perfil', error: error.message });
  }
};
