import { useState, useEffect } from 'react';
import { Menu, X, Home, User, GraduationCap, Briefcase, Code, Mail } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detectar sección activa
      const sections = ['inicio', 'sobre-mi', 'educacion', 'experiencia', 'habilidades', 'contacto'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const section = document.querySelector(sectionId);
    if (section) {
      const offset = 80;
      const top = section.offsetTop - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      closeMenu();
    }
  };

  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'sobre-mi', label: 'Sobre Mí', icon: User },
    { id: 'educacion', label: 'Educación', icon: GraduationCap },
    { id: 'experiencia', label: 'Experiencia', icon: Briefcase },
    { id: 'habilidades', label: 'Habilidades', icon: Code },
    { id: 'contacto', label: 'Contacto', icon: Mail },
  ];

  return (
    <header className={isScrolled ? 'scrolled' : ''}>
      <nav>
        <div className="logo">
          <img 
            src="https://st2.depositphotos.com/2793243/9112/v/450/depositphotos_91122938-stock-illustration-hand-drawn-raccoon.jpg" 
            alt="Logo Raccoon" 
            className="logo-image" 
          />
          <span className="logo-text">Portafolio</span>
        </div>
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
            <li key={item.id}>
              <a 
                href={`#${item.id}`} 
                className={activeSection === item.id ? 'active' : ''}
                onClick={(e) => scrollToSection(e, `#${item.id}`)}
              >
                <IconComponent size={18} />
                <span>{item.label}</span>
              </a>
            </li>
            );
          })}
        </ul>
        <div className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </nav>
    </header>
  );
};

export default Header;
