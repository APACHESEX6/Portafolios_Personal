import { useFetch } from '../hooks/useFetch';
import { experienceService } from '../services/apiService';
import './Experience.css';

const Experience = () => {
  const { data: experience, loading } = useFetch(experienceService.getAll);

  if (loading) return <div className="loading">Cargando...</div>;
  if (!experience || experience.length === 0) return null;

  return (
    <section id="experiencia" className="section alternate" style={{ minHeight: '800px' }}>
      <div className="container">
        <h2 className="section-title">Experiencia</h2>
        <div className="experience-timeline">
          {experience.map((item, index) => (
            <div key={item.id || index} className="timeline-item experience-item">
              <div className="timeline-marker">
                <div className="marker-icon">
                  <i className="fas fa-briefcase"></i>
                </div>
                {index < experience.length - 1 && <div className="marker-line"></div>}
              </div>
              <div className="experience-card">
                <div className="card-header">
                  <div className="experience-title">
                    <h3>{item.puesto}</h3>
                    <span className={`status-badge ${item.estado.toLowerCase().replace(' ', '-')}`}>
                      {item.estado}
                    </span>
                  </div>
                  <div className="experience-company">
                    <i className="fas fa-building"></i>
                    <span>{item.empresa}</span>
                  </div>
                </div>
                <div className="card-content">
                  <div className="experience-period">
                    <i className="fas fa-calendar-alt"></i>
                    <span>{item.periodo}</span>
                  </div>
                  <p className="experience-description">{item.descripcion}</p>
                  {item.tecnologias && item.tecnologias.length > 0 && (
                    <div className="experience-highlights">
                      {item.tecnologias.map((tech, idx) => (
                        <span key={idx} className="highlight-tag">{tech}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
