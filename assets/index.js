/* ==================================================
  js section
================================================== */
class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.bindElements();
        this.initPreloader();
        this.initNavigation();
        this.initScrollEffects();
        this.initTypingEffect();
        this.initCounters();
        this.initScrollAnimations();
        this.initParallax();
    }

    bindElements() {
        this.elements = {
            preloader: document.querySelector('.preloader'),
            header: document.querySelector('.header'),
            hamburger: document.querySelector('.hamburger'),
            navLinks: document.querySelector('.nav-links'),
            navItems: document.querySelectorAll('.nav-link'),
            sections: document.querySelectorAll('section'),
            scrollTop: document.querySelector('.scroll-to-top'),
            heroSubtitle: document.querySelector('.hero-subtitle'),
            stats: document.querySelectorAll('.stat-number'),
            projects: document.querySelectorAll('.project-card'),
            timeline: document.querySelectorAll('.timeline-item')
        };
    }

    initPreloader() {
        setTimeout(() => {
            this.elements.preloader?.classList.add('hidden');
        }, 1500);
    }

    initNavigation() {
        // Smooth scroll
        this.elements.navItems.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                this.closeMobileMenu();
            });
        });

        // Mobile menu
        this.elements.hamburger?.addEventListener('click', () => {
            this.elements.hamburger?.classList.toggle('active');
            this.elements.navLinks?.classList.toggle('active');
        });

        this.elements.scrollTop?.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    closeMobileMenu() {
        this.elements.hamburger?.classList.remove('active');
        this.elements.navLinks?.classList.remove('active');
    }

    initScrollEffects() {
        let ticking = false;
        
        const updateScroll = () => {
            const scrollY = window.scrollY;
            
            // Header scroll effect
            this.elements.header.classList.toggle('scrolled', scrollY > 50);
            
            // Scroll to top
            this.elements.scrollTop?.classList.toggle('show', scrollY > 500);
            
            // Active nav link
            this.elements.sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top < 100 && rect.bottom > 100) {
                    this.elements.navItems.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${section.id}`);
                    });
                }
            });
            
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateScroll);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick);
        window.addEventListener('resize', () => this.closeMobileMenu());
    }

    initTypingEffect() {
        if (!this.elements.heroSubtitle) return;

        const roles = [
            'Full Stack Java Developer',
            'Web Developer',
            'IoT Enthusiast'
        ];

        let index = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentText = roles[index];
            const displayText = currentText.slice(0, charIndex);

            this.elements.heroSubtitle.textContent = displayText + (charIndex < currentText.length ? '|' : '');

            if (!isDeleting && charIndex <= currentText.length) {
                charIndex++;
            } else if (isDeleting && charIndex > 0) {
                charIndex--;
            } else {
                isDeleting = !isDeleting;
                if (!isDeleting) index = (index + 1) % roles.length;
            }

            const speed = isDeleting ? 50 : 100;
            setTimeout(type, speed);
        };

        setTimeout(type, 1000);
    }

    initCounters() {
    // Direct show numbers - NO animation from 0
    this.elements.stats.forEach(stat => {
        const target = parseInt(stat.dataset.target);
        stat.textContent = target + (target === 3 ? '+' : '');
        stat.style.opacity = '1';
    });
    
    // Hover effect glow
    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.05)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

    initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                }
            });
        }, { threshold: 0.1 });

        // Observe all animated elements
        document.querySelectorAll('.skill-category, .project-card, .timeline-item, .about-content, .contact-content').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(60px)';
            el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            observer.observe(el);
        });
    }

    initParallax() {
        window.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            document.documentElement.style.setProperty('--mouse-x', `${mouseX * 20}px`);
            document.documentElement.style.setProperty('--mouse-y', `${mouseY * 20}px`);
        });
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => new PortfolioApp());

console.log('🚀 Ultra Modern Portfolio Loaded!');
