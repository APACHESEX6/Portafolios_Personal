import { useFetch } from '../hooks/useFetch';
import { skillService } from '../services/apiService';
import { Code2, Database, Wrench, Sparkles } from 'lucide-react';
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiAngular,
  SiPython,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiMysql
} from 'react-icons/si';
import './Skills.css';

const Skills = () => {
  const { data: skills } = useFetch(skillService.getAll);
  
  if (!skills || skills.length === 0) return null;

  // Agrupar habilidades por categoría
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.categoria;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {});

  const categoryIcons = {
    Frontend: Code2,
    Backend: Database,
    Database: Database,
    Tools: Wrench,
    Other: Sparkles,
  };

  const categoryNames = {
    Frontend: 'Desarrollo Frontend',
    Backend: 'Desarrollo Backend',
    Database: 'Bases de Datos',
    Tools: 'Herramientas',
    Other: 'Otras Habilidades',
  };

  return (
    <section id="habilidades" className="section alternate">
      <div className="container">
        <h2 className="section-title">Habilidades Técnicas</h2>
        <div className="skills-container">
          {groupedSkills && Object.entries(groupedSkills).map(([category, categorySkills]) => {
            const Icon = categoryIcons[category] || Sparkles;
            return (
              <div key={category} className="skills-category">
                <div className="category-header">
                  <Icon size={28} />
                  <h3>{categoryNames[category] || category}</h3>
                </div>
                <div className="skills-list">
                  {categorySkills.map((skill) => (
                    <div key={skill.id} className="skill-item">
                      <div className="skill-header">
                        <div className="skill-name">
                          <div className="skill-icon" style={{ color: skill.color }}>
                            {
                              // Mapear por nombre de la skill a un icono React
                              (() => {
                                const map = {
                                  'HTML5': SiHtml5,
                                  'CSS3': SiCss3,
                                  'JavaScript': SiJavascript,
                                  'React': SiReact,
                                  'Angular': SiAngular,
                                  'Python': SiPython,
                                  'Node.js': SiNodedotjs,
                                  'Node': SiNodedotjs,
                                  'Express': SiExpress,
                                  'PostgreSQL': SiPostgresql,
                                  'MongoDB': SiMongodb,
                                  'MySQL': SiMysql
                                };
                                const Icon = map[skill.nombre] || null;
                                if (Icon) return <Icon size={20} />;
                                // fallback: inicial
                                return <span className="skill-fallback" aria-hidden="true">{skill.nombre.charAt(0)}</span>;
                              })()
                            }
                          </div>
                          <span>{skill.nombre}</span>
                        </div>
                        <span className="skill-percentage">{skill.porcentaje}%</span>
                      </div>
                      <div className="skill-bar">
                        <div 
                          className="skill-level" 
                          style={{ 
                            width: `${skill.porcentaje}%`,
                            background: `linear-gradient(135deg, ${skill.color}dd 0%, ${skill.color} 100%)`
                          }}
                        >
                          <div className="skill-shine"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
