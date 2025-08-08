/* Enhanced main.js with all features */
const state = {
  projects: [
    { 
      title: "Notzzz App", 
      desc: "Note-taking Android app with Firebase sync.", 
      url: "https://github.com/yugaltyagi/Notzzz",
      tech: ["Kotlin", "Jetpack Compose", "Room DB", "Firebase"],
      stats: { rating: 4.7, downloads: "10K+" }
    },
    { 
      title: "Indigo Taxi", 
      desc: "Ride-booking prototype (Firebase).", 
      url: "https://github.com/yugaltyagi/Cabbookingsystemapk",
      tech: ["Java", "Firebase", "Google Maps"],
      stats: { rating: 4.2, downloads: "5K+" }
    },
    { 
      title: "HealthMe Chatbot", 
      desc: "AI chatbot for health tracking (web).", 
      url: "https://github.com/yugaltyagi/HealthMe",
      tech: ["JavaScript", "Node.js", "MongoDB"],
      stats: { rating: 4.5, downloads: "8K+" }
    }
  ],
  darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches
};

document.addEventListener("DOMContentLoaded", () => {
  // Initialize year in footer
  document.getElementById("year").textContent = new Date().getFullYear();

  // Initialize theme toggle
  initTheme();
  
  // Enhanced navigation with smooth scrolling
  document.querySelectorAll(".nav-link").forEach(a => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      navClick(e);
      const target = document.getElementById(`page-${a.dataset.route}`);
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Button event listeners
  document.getElementById("resumeBtn").addEventListener("click", () => {
    window.open("Yogeshwar resume.pdf", "_blank");
  });

  document.getElementById("seeProjects").addEventListener("click", () => navigate('projects'));
  document.getElementById("hireBtn").addEventListener("click", () => navigate('contact'));
  document.getElementById("contactRecruiter").addEventListener("click", () => navigate('contact'));

  // Contact form handling
  const form = document.getElementById("contactForm");
  form.addEventListener("submit", e => {
    e.preventDefault();
    if (!validateForm()) return;
    openModal();
    form.reset();
  });
  
  document.getElementById("clearBtn").addEventListener("click", () => form.reset());
  document.getElementById("modalClose").addEventListener("click", closeModal);

  // Populate projects
  renderProjectPreviews();
  renderProjectsGrid();

  // Route handling
  window.addEventListener("hashchange", handleRoute);
  handleRoute(); // Initial route load

  // Initialize all animations and effects
  initFadeObserver();
  initAdvancedParticles();
  initAdvancedCursor();
  init3DHoverEffects();
  initSkillsVisualization();
});

// Navigation functions
function navigate(route) {
  location.hash = "#" + route;
}

function handleRoute() {
  const hash = location.hash.replace("#", "") || "home";
  
  // Show/hide pages
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  const el = document.getElementById("page-" + hash);
  if (el) el.classList.remove("hidden");

  // Update active nav link
  document.querySelectorAll(".nav-link").forEach(a => 
    a.classList.toggle("active", a.dataset.route === hash)
  );
  
  // Fade in visible elements
  document.querySelectorAll(`#page-${hash} .fade-in`).forEach(n => 
    setTimeout(() => n.classList.add("show"), 80)
  );
}

// Form validation
function validateForm() {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const msg = document.getElementById("message");
  
  if (!name.value.trim() || !email.value.trim() || !msg.value.trim()) {
    alert("Please fill all required fields.");
    return false;
  }
  
  if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) {
    alert("Please enter a valid email address.");
    return false;
  }
  
  return true;
}

// Modal functions
const modal = document.getElementById("modal");
function openModal() { 
  modal.classList.add("open"); 
  modal.setAttribute("aria-hidden","false"); 
  document.body.style.overflow = "hidden"; 
}
function closeModal() { 
  modal.classList.remove("open"); 
  modal.setAttribute("aria-hidden","true"); 
  document.body.style.overflow = ""; 
}

// Project rendering
function renderProjectPreviews() {
  const list = document.getElementById("projList");
  state.projects.forEach(p => {
    const card = document.createElement("div");
    card.className = "proj";
    card.innerHTML = `
      <h4>${p.title}</h4>
      <p>${p.desc}</p>
      <div class="tech-stack">
        ${p.tech.map(t => `<span class="tech-pill">${t}</span>`).join('')}
      </div>
      <div style="margin-top:10px">
        <a class="link-btn" href="${p.url}" target="_blank">View</a>
      </div>
    `;
    list.appendChild(card);
  });
}

function renderProjectsGrid() {
  const grid = document.getElementById("projectsGrid");
  state.projects.forEach(p => {
    const c = document.createElement("div");
    c.className = "proj";
    c.innerHTML = `
      <h4>${p.title}</h4>
      <p class="muted">${p.desc}</p>
      <div class="tech-stack">
        ${p.tech.map(t => `<span class="tech-pill">${t}</span>`).join('')}
      </div>
      <div class="app-stats" style="margin:10px 0">
        <span class="stat">${p.stats.rating}★</span> Rating
        <span class="stat">${p.stats.downloads}</span> Downloads
      </div>
      <div style="margin-top:12px">
        <a class="link-btn" href="${p.url}" target="_blank">Source</a>
      </div>
    `;
    grid.appendChild(c);
  });
}

// Theme management
function initTheme() {
  const toggle = document.createElement('button');
  toggle.id = 'themeToggle';
  toggle.innerHTML = state.darkMode ? '☀️' : '🌙';
  toggle.addEventListener('click', toggleTheme);
  document.querySelector('.topbar').appendChild(toggle);
  
  updateThemeClasses();
}

function toggleTheme() {
  state.darkMode = !state.darkMode;
  updateThemeClasses();
  document.getElementById('themeToggle').innerHTML = state.darkMode ? '☀️' : '🌙';
  
  // Reinitialize visualizations that depend on theme
  if (document.getElementById('skillsRadar')) {
    initSkillsVisualization();
  }
}

function updateThemeClasses() {
  document.documentElement.classList.toggle('dark-mode', state.darkMode);
  document.documentElement.classList.toggle('light-mode', !state.darkMode);
}

// Animation and effects
function initFadeObserver() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.12 });
  
  document.querySelectorAll(".fade-in").forEach(n => io.observe(n));
}

function init3DHoverEffects() {
  const cards = document.querySelectorAll('.proj, .process-step, .metric-card, .hero-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const angleX = (y - centerY) / 20;
      const angleY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`;
      card.style.boxShadow = `0 ${angleX * 5}px ${angleX * 10}px rgba(0,0,0,0.2)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
      card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    });
  });
}

function initAdvancedParticles() {
  const canvas = document.getElementById("particles");
  if (!canvas) return;
  
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const particles = [];
  const particleCount = Math.floor((canvas.width * canvas.height) / 10000);
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 2 - 1;
      this.speedY = Math.random() * 2 - 1;
      this.color = state.darkMode 
        ? `hsl(210, 100%, ${Math.random() * 50 + 50}%)` 
        : `hsl(210, 80%, ${Math.random() * 30 + 20}%)`;
      this.alpha = Math.random() * 0.5 + 0.1;
    }
    
    update(mouse) {
      // Mouse interaction
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const force = (100 - distance) / 100;
        this.x -= forceDirectionX * force * 5;
        this.y -= forceDirectionY * force * 5;
      }
      
      // Movement
      this.x += this.speedX;
      this.y += this.speedY;
      
      // Bounce off edges
      if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
      if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.fill();
    }
  }
  
  // Create particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  // Track mouse position
  const mouse = { x: null, y: null };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    particles.forEach(particle => {
      particle.update(mouse);
      particle.draw();
    });
    
    // Connect particles
    connectParticles();
    
    requestAnimationFrame(animate);
  }
  
  // Draw lines between close particles
  function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          ctx.beginPath();
          ctx.strokeStyle = state.darkMode 
            ? `rgba(200, 200, 255, ${1 - distance/100})` 
            : `rgba(50, 50, 100, ${1 - distance/100})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }
  
  // Handle resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  
  // Start animation
  animate();
}

function initAdvancedCursor() {
  const cursor = document.getElementById("spark");
  if (!cursor) return;
  
  const links = document.querySelectorAll('a, button');
  
  // Mouse movement
  document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
  
  // Hover effects
  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(3)';
      cursor.style.opacity = '0.5';
    });
    
    link.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      cursor.style.opacity = '0.8';
    });
  });
}

function initSkillsVisualization() {
  const canvas = document.getElementById('skillsRadar');
  if (!canvas) return;
  
  const skillsData = {
    labels: ['Kotlin', 'Java', 'Android SDK', 'Jetpack Compose', 'Firebase', 'UI/UX', 'Architecture', 'Testing'],
    datasets: [{
      label: 'Skill Level',
      data: [95, 90, 85, 80, 75, 70, 65, 60],
      backgroundColor: 'rgba(110, 231, 183, 0.2)',
      borderColor: 'rgba(110, 231, 183, 1)',
      pointBackgroundColor: 'rgba(110, 231, 183, 1)',
      pointBorderColor: '#fff',
      pointHoverRadius: 5,
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(110, 231, 183, 1)'
    }]
  };
  
  const skillsConfig = {
    type: 'radar',
    data: skillsData,
    options: {
      responsive: true,
      scales: {
        r: {
          angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
          grid: { color: 'rgba(255, 255, 255, 0.1)' },
          suggestedMin: 0,
          suggestedMax: 100,
          pointLabels: { 
            color: state.darkMode ? '#fff' : '#333',
            font: {
              size: 11
            }
          }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => `${context.dataset.label}: ${context.raw}%`
          }
        }
      },
      elements: {
        line: { tension: 0.1, borderWidth: 3 },
        point: { radius: 4 }
      }
    }
  };
  
  // Destroy previous chart if exists
  if (canvas.chart) {
    canvas.chart.destroy();
  }
  
  // Create new chart
  canvas.chart = new Chart(canvas.getContext('2d'), skillsConfig);
}

// Helper function for nav click
function navClick(e) {
  document.querySelectorAll(".nav-link").forEach(a => a.classList.remove("active"));
  e.currentTarget.classList.add("active");
}