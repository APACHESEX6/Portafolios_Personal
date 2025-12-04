import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { profileService, contactService } from '../services/apiService';
import './Contact.css';

const Contact = () => {
  const { data: profile, loading } = useFetch(profileService.getProfile);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
  });
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setMessage({ type: '', text: '' });

    try {
      await contactService.sendMessage(formData);
      setMessage({ type: 'success', text: '¡Mensaje enviado exitosamente!' });
      setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
    } catch {
      setMessage({ type: 'error', text: 'Error al enviar el mensaje. Intenta de nuevo.' });
    } finally {
      setSending(false);
    }
  };

  if (loading) return <div className="loading">Cargando...</div>;
  if (!profile) return null;

  return (
    <section id="contacto" className="section">
      <div className="container">
        <h2 className="section-title">Contacto</h2>
        <div className="contact-content">
          <div className="contact-info">
            {profile?.contacto?.email && (
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <p>{profile.contacto.email}</p>
              </div>
            )}
            {profile?.contacto?.telefono && (
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <p>{profile.contacto.telefono}</p>
              </div>
            )}
            {profile?.contacto?.ubicacion && (
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <p>{profile.contacto.ubicacion}</p>
              </div>
            )}
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="nombre"
                placeholder="Tu Nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Tu Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="asunto"
                placeholder="Asunto"
                value={formData.asunto}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="mensaje"
                placeholder="Tu Mensaje"
                rows="5"
                value={formData.mensaje}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn primary" disabled={sending}>
              {sending ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
            {message.text && (
              <div className={`message ${message.type}`}>{message.text}</div>
            )}
          </form>

          <div className="social-links">
            {profile?.contacto?.redesSociales?.linkedin && (
              <a href={profile.contacto.redesSociales.linkedin} className="social-link" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>
            )}
            {profile?.contacto?.redesSociales?.github && (
              <a href={profile.contacto.redesSociales.github} className="social-link" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
              </a>
            )}
            {profile?.contacto?.redesSociales?.twitter && (
              <a href={profile.contacto.redesSociales.twitter} className="social-link" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
            )}
            {profile?.contacto?.redesSociales?.instagram && (
              <a href={profile.contacto.redesSociales.instagram} className="social-link" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
