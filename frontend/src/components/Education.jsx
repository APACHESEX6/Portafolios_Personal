import { useFetch } from '../hooks/useFetch';
import { educationService } from '../services/apiService';
import './Education.css';

const Education = () => {
  const { data: education, loading } = useFetch(educationService.getAll);

  if (loading) return <div className="loading">Cargando...</div>;
  if (!education || education.length === 0) return null;

  return (
    <section id="educacion" className="section alternate">
      <div className="container">
        <h2 className="section-title">Educación</h2>
        <div className="education-timeline">
          {education.map((item, index) => (
            <div key={item.id || index} className="timeline-item education-item">
              <div className="timeline-marker">
                <div className="marker-icon">
                  <i className={`fas ${item.icono}`}></i>
                </div>
                {index < education.length - 1 && <div className="marker-line"></div>}
              </div>
              <div className="education-card">
                <div className="card-header">
                  <div className="education-title">
                    <h3>{item.titulo}</h3>
                    <span className={`status-badge ${item.estado.toLowerCase().replace(' ', '-')}`}>
                      {item.estado}
                    </span>
                  </div>
                  <div className="education-institution">
                    <i className="fas fa-university"></i>
                    <span>{item.institucion}</span>
                  </div>
                </div>
                <div className="card-content">
                  <div className="education-period">
                    <i className="fas fa-calendar-alt"></i>
                    <span>{item.periodo}</span>
                  </div>
                  <p className="education-description">{item.descripcion}</p>
                  {item.destacados && item.destacados.length > 0 && (
                    <div className="education-highlights">
                      {item.destacados.map((highlight, idx) => (
                        <span key={idx} className="highlight-tag">{highlight}</span>
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

export default Education;
