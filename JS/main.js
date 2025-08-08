/* Enhanced main.js with all new features */
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
  // init year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Initialize theme
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

  document.getElementById("resumeBtn").addEventListener("click", () => {
    window.open("Yogeshwar resume.pdf", "_blank");
  });

  document.getElementById("seeProjects").addEventListener("click", () => navigate('projects'));
  document.getElementById("hireBtn").addEventListener("click", () => navigate('contact'));
  document.getElementById("contactRecruiter").addEventListener("click", () => navigate('contact'));

  // contact form handling
  const form = document.getElementById("contactForm");
  form.addEventListener("submit", e => {
    e.preventDefault();
    if (!validateForm()) return;
    openModal();
    form.reset();
  });
  document.getElementById("clearBtn").addEventListener("click", () => form.reset());
  document.getElementById("modalClose").addEventListener("click", closeModal);

  // populate projects previews
  renderProjectPreviews();
  renderProjectsGrid();

  // route handling
  window.addEventListener("hashchange", handleRoute);
  handleRoute(); // initial

  // small UI flourishes
  initFadeObserver();
  initAdvancedParticles();
  initAdvancedCursor();
  init3DHoverEffects();
  initSkillsVisualization();

  // subtle hover activation for nav (keep active if route changes)
  function navClick(e) {
    document.querySelectorAll(".nav-link").forEach(a => a.classList.remove("active"));
    e.currentTarget.classList.add("active");
  }
});

function navigate(route) {
  location.hash = "#" + route;
}

function handleRoute() {
  const hash = location.hash.replace("#", "") || "home";
  // show/hide pages
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  const el = document.getElementById("page-" + hash);
  if (el) el.classList.remove("hidden");

  // nav active
  document.querySelectorAll(".nav-link").forEach(a => a.classList.toggle("active", a.dataset.route === hash));
  // fade in visible elements
  document.querySelectorAll("#page-" + hash + " .fade-in").forEach(n => setTimeout(()=>n.classList.add("show"), 80));
}

// FORM VALIDATION (basic)
function validateForm() {
  const name = document.getElementById("name"), email = document.getElementById("email"), msg = document.getElementById("message");
  if (!name.value.trim() || !email.value.trim() || !msg.value.trim()) {
    alert("Please fill required fields.");
    return false;
  }
  if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) {
    alert("Please enter a valid email.");
    return false;
  }
  return true;
}

// MODAL
const modal = document.getElementById("modal");
function openModal(){ modal.classList.add("open"); modal.setAttribute("aria-hidden","false"); document.body.style.overflow = "hidden"; }
function closeModal(){ modal.classList.remove("open"); modal.setAttribute("aria-hidden","true"); document.body.style.overflow = ""; }

// RENDER PROJECTS
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

/* IntersectionObserver for fade-in sections */
function initFadeObserver() {
  const io = new IntersectionObserver(entries=>{
    entries.forEach(ent=>{
      if(ent.isIntersecting) ent.target.classList.add("show");
    });
  }, {threshold: 0.12});
  document.querySelectorAll(".fade-in").forEach(n => io.observe(n));
}

/* Theme management */
function initTheme() {
  const toggle = document.createElement('button');
  toggle.id = 'themeToggle';
  toggle.innerHTML = state.darkMode ? '☀️' : '🌙';
  toggle.addEventListener('click', toggleTheme);
  document.querySelector('.topbar').appendChild(toggle);
  
  document.documentElement.classList.toggle('dark-mode', state.darkMode);
  document.documentElement.classList.toggle('light-mode', !state.darkMode);
}

function toggleTheme() {
  state.darkMode = !state.darkMode;
  document.documentElement.classList.toggle('dark-mode', state.darkMode);
  document.documentElement.classList.toggle('light-mode', !state.darkMode);
  document.getElementById('themeToggle').innerHTML = state.darkMode ? '☀️' : '🌙';
  
  // Reinitialize skills chart with new colors
  if (document.getElementById('skillsRadar')) {
    initSkillsVisualization();
  }
}

/* 3D hover effects */
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

/* Advanced particle system */
function initAdvancedParticles() {
  const canvas = document.getElementById("particles");
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
      this.color = state.darkMode ? `hsl(210, 100%, ${Math.random() * 50 + 50}%)` 
                                  : `hsl(210, 80%, ${Math.random() * 30 + 20}%)`;
      this.alpha = Math.random() * 0.5 + 0.1;
    }
    
    update(mouse) {
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
      
      this.x += this.speedX;
      this.y += this.speedY;
      
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
  
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  const mouse = { x: null, y: null };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
      particle.update(mouse);
      particle.draw();
    });
    connectParticles();
    requestAnimationFrame(animate);
  }
  
  function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          ctx.beginPath();
          ctx.strokeStyle = state.darkMode ? `rgba(200, 200, 255, ${1 - distance/100})` 
                                          : `rgba(50, 50, 100, ${1 - distance/100})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }

      }
    }
  

  animate();

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });


/* Advanced cursor trail (spark) */
function initAdvancedCursor() {
  const spark = document.getElementById("spark");
  if (!spark) return;

  window.addEventListener("mousemove", (e) => {
    spark.style.left = e.clientX + "px";
    spark.style.top = e.clientY + "px";
  });
}

/* Skills radar chart initialization */
function initSkillsVisualization() {
  const canvas = document.getElementById("skillsRadar");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (window.skillsChart) {
    window.skillsChart.destroy();
  }

  window.skillsChart = new Chart(ctx, {
    type: "radar",
    data: {
      labels: ["Kotlin", "Java", "Firebase", "UI/UX", "Jetpack Compose", "Testing"],
      datasets: [
        {
          label: "Skill Level",
          data: [90, 85, 80, 75, 70, 65],
          fill: true,
          backgroundColor: state.darkMode
            ? "rgba(96,165,250,0.2)"
            : "rgba(54,162,235,0.2)",
          borderColor: state.darkMode ? "#60a5fa" : "#36A2EB",
          pointBackgroundColor: "#6ee7b7",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#6ee7b7",
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        r: {
          suggestedMin: 0,
          suggestedMax: 100,
          grid: {
            color: state.darkMode
              ? "rgba(255,255,255,0.1)"
              : "rgba(0,0,0,0.1)",
          },
          pointLabels: {
            color: state.darkMode ? "#fff" : "#000",
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: state.darkMode ? "#fff" : "#000",
          },
        },
      },
    },
  });
}
