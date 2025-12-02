document.addEventListener('DOMContentLoaded', function() {
    // Menú responsive
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Efecto de scroll en el header
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Validación y actualización de barras de habilidades
const skillLevels = document.querySelectorAll('.skill-level');
const skillPercentages = document.querySelectorAll('.skill-percentage');

skillPercentages.forEach((percentage, index) => {
    percentage.contentEditable = true;
    percentage.addEventListener('input', (e) => {
        let value = parseInt(e.target.textContent.replace('%', ''));
        if (isNaN(value)) value = 0;
        if (value > 100) value = 100;
        if (value < 0) value = 0;
        
        e.target.textContent = value + '%';
        skillLevels[index].style.width = value + '%';
    });

    percentage.addEventListener('blur', (e) => {
        let value = parseInt(e.target.textContent.replace('%', ''));
        if (isNaN(value)) value = 0;
        if (value > 100) value = 100;
        if (value < 0) value = 0;
        e.target.textContent = value + '%';
        skillLevels[index].style.width = value + '%';
    });
});

    // Smooth scroll para los enlaces de anclaje
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Añadir efecto de aparición a las secciones
    const sections = document.querySelectorAll('section');
    
    // Añadir clase section a todas las secciones
    sections.forEach(section => {
        section.classList.add('section');
    });
    
    const revealSection = function() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionBottom = section.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 150 && sectionBottom > 0) {
                section.classList.add('visible');
            } else {
                section.classList.remove('visible');
            }
        });
    };
    
    // Ejecutar una vez al cargar la página
    setTimeout(revealSection, 300);
    
    // Ejecutar al hacer scroll
    window.addEventListener('scroll', revealSection);

    // Añadir efecto de hover a los elementos de la línea de tiempo
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('timeline-hover');
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('timeline-hover');
        });
    });

    // Añadir efecto de parallax al hero
    const heroSection = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');

    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        if (heroSection && heroImage && scrollY <= heroSection.offsetHeight) {
            heroImage.style.transform = `translateY(${scrollY * 0.2}px)`;
        }
    });
});
