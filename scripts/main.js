const PROJECTS = {
  featured: [
    {
      name: 'Anuvad',
      title: 'Anuvad',
      lang: 'Kotlin',
      tech: ['Android', 'ML Kit', 'On-device Translation'],
      desc: 'Real-time English-to-Hindi translation app using Google ML Kit. Fast, accurate text processing with a clean, intuitive UI.',
      repo: 'https://github.com/yugaltyagi/Anuvad',
    },
    {
      name: 'Notzzz',
      title: 'Notzzz App',
      lang: 'Java',
      tech: ['Android', 'Firebase Auth', 'Firestore'],
      desc: 'Secure note-taking app with Firebase Authentication and Firestore, enabling seamless real-time data synchronization.',
      repo: 'https://github.com/yugaltyagi/Notzzz',
    },
    {
      name: 'Cabbookingsystemapk',
      title: 'Indigo Taxi App',
      lang: 'Java',
      tech: ['Android', 'Firebase', 'Real-time DB'],
      desc: 'Ride-booking system with real-time database integration, supporting efficient ride requests and tracking.',
      repo: 'https://github.com/yugaltyagi/Cabbookingsystemapk',
    },
    {
      name: 'HealthMe',
      title: 'HealthMe Chatbot',
      lang: 'Web',
      tech: ['Node.js', 'AI Chatbot', 'Authentication'],
      desc: 'AI-powered web chatbot to assist users with health queries, featuring authentication and interactive responses.',
      repo: 'https://github.com/yugaltyagi/HealthMe',
    },
    {
      name: 'Swiggy_Zomato_Clone',
      title: 'Swiggy / Zomato Clone',
      lang: 'Kotlin',
      tech: ['Android', 'Kotlin', 'XML'],
      desc: 'Food delivery app prototype with intuitive UI and structured ordering workflow similar to real-world applications.',
      repo: 'https://github.com/yugaltyagi/Swiggy_Zomato_Clone',
    },
    {
      name: 'team-task-manager',
      title: 'Team Task Manager',
      lang: 'TypeScript',
      tech: ['TypeScript', 'Web App', 'Team Management'],
      desc: 'Collaborative team task management web application with a live deployed demo.',
      repo: 'https://github.com/yugaltyagi/team-task-manager',
      demo: 'https://team-task-manager-alpha-one.vercel.app',
    },
  ],
  other: [
    {
      name: 'Cheekypoo',
      title: 'CheekyPoo',
      lang: 'Kotlin',
      tech: ['Android', 'Dating App', 'Gen Z'],
      desc: 'Dating app for Gen Z college students — connecting peers within universities in a safe, secure environment.',
      repo: 'https://github.com/yugaltyagi/Cheekypoo',
    },
    {
      name: 'Cheekypoo-Messenger',
      title: 'CheekyPoo Messenger',
      lang: 'Kotlin',
      tech: ['Android', 'E2E Encryption', 'Authentication'],
      desc: 'Android messenger built with Kotlin and XML featuring authentication, database, and end-to-end encryption.',
      repo: 'https://github.com/yugaltyagi/Cheekypoo-Messenger',
    },
    {
      name: 'QuackQuack',
      title: 'QuackQuack',
      lang: 'Kotlin',
      tech: ['Android', 'REST API', 'Kotlin'],
      desc: 'Dad jokes Android app that fetches jokes from an API and displays a new joke on each button tap.',
      repo: 'https://github.com/yugaltyagi/QuackQuack',
    },
    {
      name: 'FIGMALAND',
      title: 'FIGMALAND',
      lang: 'CSS',
      tech: ['HTML', 'CSS', 'JavaScript'],
      desc: 'Static frontend-only website built with HTML, CSS, and JavaScript from a Figma design.',
      repo: 'https://github.com/yugaltyagi/FIGMALAND',
    },
    {
      name: 'builder-pulse-verse',
      title: 'Builder Pulse Verse',
      lang: 'TypeScript',
      tech: ['TypeScript', 'Builder.io'],
      desc: 'Web project created with Builder.io for rapid UI development and prototyping.',
      repo: 'https://github.com/yugaltyagi/builder-pulse-verse',
    },
    {
      name: 'Portfolio',
      title: 'Portfolio',
      lang: 'HTML',
      tech: ['HTML', 'CSS', 'JavaScript'],
      desc: 'This portfolio website — modern, responsive, and deployed on GitHub Pages.',
      repo: 'https://github.com/yugaltyagi/Portfolio',
      demo: 'https://yugaltyagi.github.io/Portfolio/',
    },
  ],
};

function createProjectCard(project, isFeatured) {
  const card = document.createElement('article');
  card.className = `project-card reveal${isFeatured ? ' featured' : ''}`;

  const links = [
    `<a href="${project.repo}" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> Source</a>`,
  ];
  if (project.demo) {
    links.push(
      `<a href="${project.demo}" target="_blank" rel="noopener" class="demo"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo</a>`
    );
  }

  card.innerHTML = `
    <div class="project-header">
      <h4>${project.title}</h4>
      <span class="project-lang">${project.lang}</span>
    </div>
    <p>${project.desc}</p>
    <div class="project-tech">
      ${project.tech.map((t) => `<span>${t}</span>`).join('')}
    </div>
    <div class="project-links">${links.join('')}</div>
  `;

  return card;
}

function renderProjects() {
  const featuredEl = document.getElementById('featuredProjects');
  const otherEl = document.getElementById('otherProjects');

  PROJECTS.featured.forEach((p) => {
    featuredEl.appendChild(createProjectCard(p, true));
  });

  PROJECTS.other.forEach((p) => {
    otherEl.appendChild(createProjectCard(p, false));
  });
}

function initNav() {
  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });

  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
    navToggle.innerHTML = open
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  navItems.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navItems.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((s) => observer.observe(s));
}

function initReveal() {
  const revealEls = document.querySelectorAll(
    '.section-header, .about-grid, .highlight-card, .timeline-item, .edu-card, .skill-group, .project-card, .activity-list li, .contact-box'
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${Math.min(i * 0.05, 0.4)}s`;
    observer.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();
  renderProjects();
  initNav();
  initReveal();
});
