import { memo } from 'react';
import { useFetch } from '../hooks/useFetch';
import { profileService } from '../services/apiService';
import { User, FileText, CreditCard, Fingerprint, Cake, Calendar, Droplet, Flag, Globe } from 'lucide-react';
import './About.css';

const About = () => {
  const { data: profile } = useFetch(profileService.getProfile);
  
  if (!profile) return null;

  const infoItems = [
    { icon: User, label: 'Nombre', value: profile?.nombre || 'N/A' },
    { icon: User, label: 'Apellidos', value: profile?.apellidos || 'N/A' },
    { icon: FileText, label: 'Tipo de Documento', value: profile?.informacionPersonal?.tipoDocumento || 'N/A' },
    { icon: Fingerprint, label: 'Número de Documento', value: profile?.informacionPersonal?.numeroDocumento || 'N/A' },
    { icon: Cake, label: 'Edad', value: profile?.informacionPersonal?.edad ? `${profile.informacionPersonal.edad} años` : 'N/A' },
    { icon: Calendar, label: 'Fecha de Nacimiento', value: profile?.informacionPersonal?.fechaNacimiento || 'N/A' },
    { icon: Droplet, label: 'Tipo de Sangre', value: profile?.informacionPersonal?.tipoSangre || 'N/A' },
    { icon: Flag, label: 'Nacionalidad', value: profile?.informacionPersonal?.nacionalidad || 'N/A' },
  ];

  return (
    <>
      <section id="sobre-mi" className="section">
        <div className="container">
          <h2 className="section-title">Sobre Mí</h2>
          <div className="about-content">
            <p className="about-description">{profile?.descripcionLarga}</p>
          </div>
          
          {profile?.idiomas && profile.idiomas.length > 0 && (
            <div className="languages-section">
              <div className="languages-header">
                <Globe size={28} />
                <h3>Idiomas</h3>
              </div>
              <div className="languages-grid">
                {profile.idiomas.map((idioma, index) => (
                  <div key={index} className="language-card">
                    <div className="language-icon">
                      {idioma.icono ? (
                        <i className={idioma.icono} aria-hidden="true"></i>
                      ) : (
                        <span className="skill-fallback" aria-hidden="true">{idioma.nombre.charAt(0)}</span>
                      )}
                    </div>
                    <div className="language-details">
                      <span className="language-name">{idioma.nombre}</span>
                      <span className={`level-badge ${idioma.nivel.toLowerCase().replace(/\s/g, '-')}`}>
                        {idioma.nivel}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="informacion-personal" className="section alternate">
        <div className="container">
          <h2 className="section-title">Información Personal</h2>
          <div className="personal-info-grid">
            {infoItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
              <div key={index} className="info-card">
                <div className="info-icon">
                  <IconComponent size={24} />
                </div>
                <div className="info-content">
                  <span className="info-label">{item.label}</span>
                  <span className="info-value">{item.value}</span>
                </div>
              </div>
            );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

// Optimización: React.memo previene re-renders innecesarios
export default memo(About);
