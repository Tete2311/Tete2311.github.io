// ===================== CUSTOM CURSOR =====================
const cursorDot = document.querySelector('.cursor-dot');
const cursorCircle = document.querySelector('.cursor-circle');

let cursorX = 0;
let cursorY = 0;
let circleX = 0;
let circleY = 0;

function initCustomCursor() {
  document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
  });

  // Add hover effect to interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .service-card, .project-card, .nav-links a, .btn, .faq-question, .btn-demo-final');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorCircle.classList.add('hovered');
    });
    el.addEventListener('mouseleave', () => {
      cursorCircle.classList.remove('hovered');
    });
  });

  // Animate cursor
  animateCursor();
}

function animateCursor() {
  // Smooth trailing effect for circle
  circleX += (cursorX - circleX) * 0.15;
  circleY += (cursorY - circleY) * 0.15;

  cursorDot.style.left = cursorX - 4 + 'px';
  cursorDot.style.top = cursorY - 4 + 'px';

  cursorCircle.style.left = circleX - 20 + 'px';
  cursorCircle.style.top = circleY - 20 + 'px';

  requestAnimationFrame(animateCursor);
}

// ===================== CANVAS BACKGROUND ANIMATION =====================
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
let animationId;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.5 + 0.1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
  
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function connectParticles() {
  const maxDistance = 150;
  
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < maxDistance) {
        const opacity = (1 - distance / maxDistance) * 0.15;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });
  
  connectParticles();
  animationId = requestAnimationFrame(animate);
}

// ===================== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS =====================
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(el => observer.observe(el));
}

// ===================== NAVBAR SCROLL EFFECT =====================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

function handleScroll() {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
}

// ===================== MOBILE NAV TOGGLE =====================
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelector('.nav-links');

function toggleMobileNav() {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
}

function closeMobileNav() {
  navToggle.classList.remove('active');
  navLinks.classList.remove('active');
}

// ===================== SMOOTH SCROLL =====================
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        closeMobileNav();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ===================== FORM HANDLING =====================
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

function handleFormSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');
  
  // Basic validation
  if (!name || !email || !message) {
    showFormStatus('error', 'Por favor, completa todos los campos.');
    return;
  }
  
  if (!isValidEmail(email)) {
    showFormStatus('error', 'Por favor, ingresa un email válido.');
    return;
  }
  
  // Simulate form submission
  showFormStatus('success', '¡Mensaje enviado! Te contactaremos pronto.');
  contactForm.reset();
  
  // In a real implementation, you would send this to a server
  console.log('Form submitted:', { name, email, message });
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showFormStatus(type, message) {
  formStatus.className = `form-status ${type}`;
  formStatus.textContent = message;
  formStatus.style.display = 'block';
  
  setTimeout(() => {
    formStatus.style.display = 'none';
  }, 5000);
}

// ===================== YEAR UPDATE =====================
function updateYear() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// ===================== INITIALIZATION =====================
function init() {
  // Custom cursor
  initCustomCursor();
  
  // Canvas setup
  resizeCanvas();
  initParticles();
  animate();
  
  // Scroll animations
  initScrollAnimations();
  
  // Navbar scroll effect
  window.addEventListener('scroll', handleScroll);
  
  // Mobile nav
  if (navToggle) {
    navToggle.addEventListener('click', toggleMobileNav);
  }
  
  // Smooth scroll
  initSmoothScroll();
  
  // Form handling
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }
  
  // Update year
  updateYear();
}

// ===================== WINDOW RESIZE =====================
window.addEventListener('resize', () => {
  resizeCanvas();
  initParticles();
});

// ===================== START =====================
document.addEventListener('DOMContentLoaded', init);

// ===================== PERFORMANCE OPTIMIZATION =====================
// Pause animation when tab is not visible
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    cancelAnimationFrame(animationId);
  } else {
    animate();
  }
});
