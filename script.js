/**
 * Ayush Parmar - Modern Animated Portfolio Scripts
 * Features:
 * - Interactive Particle Constellation Canvas
 * - Typewriter Text Cycler
 * - 3D Card Parallax Tilt
 * - Recruiter Interactive CLI Terminal
 * - Skills Category Filter
 * - Project Architecture Deep-Dive Modals
 * - One-click Clipboard Copy & Contact Form Handlers
 * - Scroll Spy & IntersectionObserver Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initTypewriter();
  initNavbar();
  initScrollAnimations();
  init3DCardTilt();
  initRecruiterCLI();
  initSkillsFilter();
  initProjectModals();
  initClipboardAndForm();
  initAmbientGlow();
});

/* ==========================================================================
   1. Interactive Particle Constellation Canvas
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 16), 75);
  const mouse = { x: null, y: null, radius: 140 };

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 1;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.color = Math.random() > 0.4 ? 'rgba(99, 102, 241,' : 'rgba(6, 182, 212,';
      this.alpha = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse repulsion/attraction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 2.5;
          this.y -= (dy / dist) * force * 2.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `${this.color} ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          const opacity = (1 - dist / 120) * 0.25;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    connectParticles();
    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. Dynamic Typewriter Cycler
   ========================================================================== */
function initTypewriter() {
  const element = document.getElementById('typewriter');
  if (!element) return;

  const words = [
    'Full-Stack Developer',
    'React & Next.js Specialist',
    'Backend & API Architect',
    'MySQL & Database Optimizer',
    'DevOps & Cloud Enthusiast'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 90;
  const deletingSpeed = 45;
  const holdDelay = 1800;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      charIndex--;
      element.textContent = currentWord.substring(0, charIndex);
    } else {
      charIndex++;
      element.textContent = currentWord.substring(0, charIndex);
    }

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
      delay = holdDelay;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

/* ==========================================================================
   3. Navbar Scroll Spy & Mobile Menu
   ========================================================================== */
function initNavbar() {
  const header = document.getElementById('mainHeader');
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll header background
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll spy
    const scrollY = window.pageYOffset;
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  });

  // Mobile menu toggle
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close when clicking nav link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // Back to top click
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   4. Scroll Reveal Animations (Intersection Observer)
   ========================================================================== */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.reveal-init');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}

/* ==========================================================================
   5. 3D Card Parallax Tilt on Hover
   ========================================================================== */
function init3DCardTilt() {
  const card = document.getElementById('profileCard3D');
  if (!card) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  });
}

/* ==========================================================================
   6. Interactive Recruiter CLI Terminal
   ========================================================================== */
function initRecruiterCLI() {
  const cliBody = document.getElementById('cliBody');
  const cliInput = document.getElementById('cliInput');
  const cliForm = document.getElementById('cliForm');
  const chips = document.querySelectorAll('.cli-chip');

  if (!cliBody || !cliInput) return;

  const commands = {
    help: `Available Commands:
  • \x1b[36mabout\x1b[0m       - Quick overview of Ayush Parmar
  • \x1b[36mskills\x1b[0m      - Core technical competencies
  • \x1b[36mprojects\x1b[0m    - Featured full-stack systems built
  • \x1b[36mexperience\x1b[0m  - Timeline and engineering milestones
  • \x1b[36mhire\x1b[0m        - Why I am a strong candidate for your team
  • \x1b[36mcontact\x1b[0m     - Email, phone, GitHub, & socials
  • \x1b[36mclear\x1b[0m       - Clear terminal output`,

    about: `Ayush Parmar | Full-Stack Web Developer & Engineer
Location: Gujarat, India
Focus: High-performance frontends (React, Next.js), resilient backends (Node.js, Express, PHP), and relational database design (MySQL). Passionate about DevOps automation and clean software architectures.`,

    skills: `Technical Matrix:
  [Frontend]   React.js, Next.js, JavaScript (ES6+), HTML5, CSS3, Glassmorphic UI
  [Backend]    Node.js, Express.js, REST APIs, WebSockets (Socket.io), PHP
  [Database]   MySQL (Relational Modeling, Indexing, Query Optimization)
  [DevOps]     Git, GitHub, Vercel, Render, CI/CD basic pipelines`,

    projects: `Featured Deployments:
  1. Society Management System [HTML/CSS/JS/MySQL] - Resident & billing management.
  2. TechChat Real-Time Messaging [Node.js/Socket.io] - Low-latency chat rooms.
  3. Book Store eCommerce [PHP/MySQL/JS] - Catalog, cart, and order workflows.`,

    experience: `Milestones:
  • 2+ Years deep-diving into Web Engineering and Software Architecture.
  • Built 10+ projects covering CRUD, WebSockets, full-stack MVC, and APIs.
  • Active open-source and GitHub creator.`,

    hire: `Why Hire Ayush?
  1. Full-Stack Versatility: Seamlessly bridge UI/UX with database & API logic.
  2. Problem-Solving Speed: Quick to grasp new frameworks, clean code practices.
  3. Product Mindset: Focus on business usability, speed, and maintainability.
  4. Immediate Impact: Ready to build and scale production systems today.`,

    contact: `Contact Details:
  • Email:    ayushparmar1705@gmail.com
  • Phone:    +91 88495 80017
  • GitHub:   https://github.com/Ayushparmar1705
  • Location: Gujarat, India`,

    socials: `Profiles:
  • GitHub:   github.com/Ayushparmar1705
  • Email:    ayushparmar1705@gmail.com`
  };

  function executeCommand(cmd) {
    const cleanCmd = cmd.trim().toLowerCase();
    if (!cleanCmd) return;

    if (cleanCmd === 'clear') {
      cliBody.innerHTML = `
        <div class="cli-output">
          <div><span class="cli-line-prompt">ayush@portfolio:~$</span> <span class="cli-line-user">clear</span></div>
          <div class="cli-line-result">Terminal cleared. Type <span style="color:#22d3ee">'help'</span> to see commands.</div>
        </div>
      `;
      return;
    }

    const outputDiv = document.createElement('div');
    outputDiv.className = 'cli-output';

    let response = commands[cleanCmd];
    if (!response) {
      response = `Command not recognized: '${cleanCmd}'. Type 'help' for available commands.`;
    }

    outputDiv.innerHTML = `
      <div><span class="cli-line-prompt">ayush@portfolio:~$</span> <span class="cli-line-user">${escapeHtml(cmd)}</span></div>
      <div class="cli-line-result">${escapeHtml(response)}</div>
    `;

    cliBody.appendChild(outputDiv);
    cliBody.scrollTop = cliBody.scrollHeight;
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  if (cliForm) {
    cliForm.addEventListener('submit', (e) => {
      e.preventDefault();
      executeCommand(cliInput.value);
      cliInput.value = '';
    });
  }

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) {
        cliInput.value = cmd;
        executeCommand(cmd);
        cliInput.value = '';
      }
    });
  });
}

/* ==========================================================================
   7. Skills Matrix Filter Tabs
   ========================================================================== */
function initSkillsFilter() {
  const tabs = document.querySelectorAll('.skill-tab-btn');
  const cards = document.querySelectorAll('.skill-card');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      cards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   8. Project Deep-Dive Technical Modals
   ========================================================================== */
const projectData = {
  society: {
    title: 'Society Management System',
    badge: 'Full Stack Web Platform',
    icon: 'fa-solid fa-building-user',
    desc: 'A comprehensive multi-tenant portal designed to streamline gated community administration, automate maintenance tracking, and facilitate seamless resident communication.',
    problem: 'Traditional housing communities struggle with manual paper receipting, delayed maintenance collection, and fragmented notice announcements.',
    architecture: 'Built using a clean MVC pattern. Role-Based Access Control (RBAC) separates Admin powers (finance, resident records, notice broadcasts) from Resident dashboards (dues payment status, maintenance requests, directory).',
    techHighlights: [
      'Relational MySQL schema with foreign key cascades for unit-to-resident mappings',
      'Automated billing calculation algorithms with overdue alert triggers',
      'Secure input sanitization preventing SQL injection and XSS exploits',
      'Responsive interface ensuring smooth management on tablets and mobile devices'
    ],
    github: 'https://github.com/Ayushparmar1705/Society_system'
  },
  techchat: {
    title: 'TechChat - Real-Time Messaging App',
    badge: 'Real-Time Communication',
    icon: 'fa-solid fa-comments',
    desc: 'A modern, high-performance instant chat application providing real-time bidirectional communication, dedicated rooms, and active participant tracking.',
    problem: 'Standard HTTP polling introduces significant server overhead and sluggish messaging latency for multi-user collaboration.',
    architecture: 'Powered by Node.js and WebSocket/Socket.io protocol for persistent, low-overhead TCP connections. Implements event-driven message dispatching with millisecond latency.',
    techHighlights: [
      'Bidirectional socket event handlers for instant broadcasting and typing indicators',
      'Room-based channel isolation preventing cross-chat message leaks',
      'Clean modern dark UI with auto-scrolling message feeds and timestamping',
      'Optimized connection lifecycle handling graceful reconnects and disconnects'
    ],
    github: 'https://github.com/Ayushparmar1705/Techchat/tree/Techchatbranch'
  },
  bookstore: {
    title: 'Book Store eCommerce Platform',
    badge: 'Full-Featured Web Store',
    icon: 'fa-solid fa-book-open-reader',
    desc: 'An interactive online book retail experience featuring dynamic product catalogs, category filtering, persistent session carts, and order checkout flows.',
    problem: 'Book shoppers need fast search, categorized genre browsing, and immediate cart updates without cumbersome page reloading.',
    architecture: 'Full-stack eCommerce application connecting frontend dynamic rendering with backend session authentication and relational product databases.',
    techHighlights: [
      'Dynamic search and multi-category filtering without heavy latency',
      'Session-backed shopping cart with quantity modifications and price totals',
      'Normalized database structure linking books, authors, categories, and orders',
      'Admin interface for inventory management, stock alerts, and price updates'
    ],
    github: 'https://github.com/Ayushparmar1705/Book_Store'
  }
};

function initProjectModals() {
  const modalBackdrop = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const detailButtons = document.querySelectorAll('.project-details-btn');

  if (!modalBackdrop) return;

  function openModal(projectKey) {
    const data = projectData[projectKey];
    if (!data) return;

    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalBadge').textContent = data.badge;
    document.getElementById('modalDesc').textContent = data.desc;
    document.getElementById('modalProblem').textContent = data.problem;
    document.getElementById('modalArchitecture').textContent = data.architecture;
    document.getElementById('modalGithubLink').setAttribute('href', data.github);

    const highlightsList = document.getElementById('modalHighlights');
    highlightsList.innerHTML = '';
    data.techHighlights.forEach((item) => {
      const li = document.createElement('li');
      li.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${item}</span>`;
      highlightsList.appendChild(li);
    });

    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  detailButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectKey = btn.getAttribute('data-project');
      openModal(projectKey);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   9. One-Click Clipboard Copy & Contact Form
   ========================================================================== */
function initClipboardAndForm() {
  // Clipboard copy
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalHTML = btn.innerHTML;
          btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
          btn.style.color = '#34d399';
          btn.style.borderColor = 'rgba(16, 185, 129, 0.4)';
          setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.color = '';
            btn.style.borderColor = '';
          }, 2000);
        });
      }
    });
  });

  // Contact form submission
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending message...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        if (formStatus) {
          formStatus.className = 'form-status success';
          formStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent successfully. Ayush will get back to you shortly.';
          formStatus.style.display = 'flex';
          contactForm.reset();

          setTimeout(() => {
            formStatus.style.display = 'none';
          }, 6000);
        }
      }, 1200);
    });
  }
}

/* ==========================================================================
   10. Interactive Ambient Glow Mouse Follower
   ========================================================================== */
function initAmbientGlow() {
  const glow = document.getElementById('ambientGlow');
  if (!glow) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function renderGlow() {
    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;

    glow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
    requestAnimationFrame(renderGlow);
  }

  renderGlow();
}
