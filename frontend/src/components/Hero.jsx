import { useFetch } from '../hooks/useFetch';
import { profileService } from '../services/apiService';
import { Download, Mail, ArrowDown, Sparkles } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const { data: profile } = useFetch(profileService.getProfile);

  // Siempre mantener la misma estructura para evitar saltos
  const displayData = profile || {
    nombre: '',
    apellidos: '',
    profesion: '',
    descripcionCorta: '',
    imagenPerfil: 'https://i.postimg.cc/28vtTs7D/Whats-App-Image-2025-08-30-at-8-43-38-AM.jpg'
  };

  return (
    <section id="inicio" className="hero">
      <div className="hero-background">
        <div className="animated-blob blob-1"></div>
        <div className="animated-blob blob-2"></div>
        <div className="animated-blob blob-3"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-text">
          <div className="badge">
            <Sparkles size={16} />
            <span>Disponible para proyectos</span>
          </div>
          <h1 className="gradient-text" style={{ minHeight: '70px' }}>
            {`${displayData.nombre} ${displayData.apellidos}`}
          </h1>
          <h2 style={{ minHeight: '40px' }}>{displayData.profesion}</h2>
          <p style={{ minHeight: '100px' }}>{displayData.descripcionCorta}</p>
          <div className="hero-buttons">
            <a href="#contacto" className="btn primary">
              <Mail size={20} />
              <span>Contácteme</span>
            </a>
            <a href="#sobre-mi" className="btn secondary">
              <Download size={20} />
              <span>Ver CV</span>
            </a>
          </div>
        </div>
        
        <div className="hero-image">
          <div className="profile-image-container">
            <div className="image-glow"></div>
            <img 
              src={displayData.imagenPerfil} 
              alt={`${displayData.nombre} ${displayData.apellidos}`} 
              className="profile-photo"
              width="380"
              height="380"
              loading="eager"
            />
            <div className="floating-icons">
              <div className="floating-icon icon-1">💻</div>
              <div className="floating-icon icon-2">🚀</div>
              <div className="floating-icon icon-3">⚡</div>
            </div>
          </div>
        </div>
      </div>
      
      <a href="#sobre-mi" className="scroll-indicator">
        <ArrowDown size={24} className="bounce" />
      </a>
    </section>
  );
};

export default Hero;
