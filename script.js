// ==========================================
// VEDANT MISHRA - PORTFOLIO INTERACTIVITY
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initTypingEffect();
  initTerminal();
  initProjectFilters();
  initMobileNav();
  initContactForm();
});

// 1. Interactive Constellation Canvas
function initParticleCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const numParticles = Math.min(Math.floor((width * height) / 16000), 70);

  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha})`;
      ctx.fill();

      // Connect close particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.12 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(render);
  }
  render();
}

// 2. Hero Typing Effect
function initTypingEffect() {
  const target = document.getElementById('typing-text');
  if (!target) return;

  const roles = [
    'Cloud Architect & DevOps Engineer',
    'AWS & OCI Certified Specialist',
    'Platform Engineering (Creator of CloudForge)',
    'Automated CI/CD & FinOps Optimizer',
    'Serverless Microservices Architect'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let delay = 90;

  function type() {
    const current = roles[roleIdx];
    if (isDeleting) {
      target.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      delay = 45;
    } else {
      target.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      delay = 85;
    }

    if (!isDeleting && charIdx === current.length) {
      isDeleting = true;
      delay = 2000;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = 500;
    }

    setTimeout(type, delay);
  }
  type();
}

// 3. Interactive Terminal Widget
function initTerminal() {
  const input = document.getElementById('terminal-input');
  const body = document.getElementById('terminal-body');
  if (!input || !body) return;

  const commands = {
    help: 'Available commands: [about, skills, projects, certs, exp, contact, clear, sudo]',
    about: 'Vedant Mishra: 3rd Year B.Tech CSE (Cloud Computing) @ MIT ADT Pune. Specializes in AWS Serverless, Docker, OCI, and CI/CD Automation.',
    skills: 'Cloud: AWS (Lambda, API Gateway, S3, DynamoDB, IAM), OCI\nDevOps: Docker, GitHub Actions, CI/CD, Linux, Bash\nBackend: Python, FastAPI, Node.js, SQL, REST APIs',
    projects: '1. CloudForge (Mini PaaS)\n2. CloudOps-AI (Governance Platform)\n3. CI/CD Pipeline (Render/Docker)\n4. CC-Prediction-Bot (FinOps Telegram)',
    certs: '1. Oracle Multicloud Architect Professional\n2. Oracle Cloud Infrastructure Foundations Associate\n3. AWS Cloud Practitioner Essentials\n4. Google Bits and Bytes of Networking',
    exp: 'Cloud Engineering Intern @ HEPro AI (Nov 2025 - Jan 2026)\nCloud Computing Trainee @ Oracle University',
    contact: 'Email: vedantmanikmishra@gmail.com\nPhone: +91-88477-33697\nLinkedIn: https://linkedin.com/in/vedant-mishra-8b3987328/',
    sudo: 'Nice try! Access Denied: You are not in the sudoers file. This incident will be reported to AWS CloudWatch 🤖'
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = input.value.trim().toLowerCase();
      input.value = '';

      if (val === 'clear') {
        const welcome = body.querySelector('.terminal-welcome');
        body.innerHTML = '';
        if (welcome) body.appendChild(welcome);
        return;
      }

      // Append command prompt line
      const line = document.createElement('div');
      line.className = 'flex items-center gap-2 text-slate-300 mt-2 font-mono text-xs sm:text-sm';
      line.innerHTML = `<span class="text-emerald-400 font-bold">vedant@cloud:~$</span> <span>${escapeHtml(val)}</span>`;
      body.appendChild(line);

      // Append output
      const output = document.createElement('div');
      output.className = 'text-slate-400 font-mono text-xs sm:text-sm whitespace-pre-wrap pl-4 border-l border-sky-500/30 my-1';

      if (commands[val]) {
        output.textContent = commands[val];
      } else if (val === '') {
        return;
      } else {
        output.textContent = `zsh: command not found: ${val}. Type 'help' for command list.`;
        output.className += ' text-rose-400';
      }

      body.appendChild(output);
      body.scrollTop = body.scrollHeight;
    }
  });

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// 4. Project Category Filtering
function initProjectFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => {
        b.classList.remove('bg-sky-500/20', 'text-sky-400', 'border-sky-500/40');
        b.classList.add('text-slate-400', 'border-slate-800');
      });
      btn.classList.add('bg-sky-500/20', 'text-sky-400', 'border-sky-500/40');
      btn.classList.remove('text-slate-400', 'border-slate-800');

      const filter = btn.getAttribute('data-filter');

      cards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

// 5. Mobile Menu Toggle
function initMobileNav() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  const links = menu.querySelectorAll('a');
  links.forEach((l) => {
    l.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });
}

// 6. Contact Form & Quick Actions
function initContactForm() {
  const form = document.getElementById('contact-form');
  const copyBtn = document.getElementById('copy-email-btn');

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('vedantmanikmishra@gmail.com').then(() => {
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fa-solid fa-check text-emerald-400"></i> Copied to Clipboard!';
        setTimeout(() => {
          copyBtn.innerHTML = originalText;
        }, 2200);
      });
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value;
      const subject = document.getElementById('form-subject').value || 'Collaboration Inquiry';
      const message = document.getElementById('form-message').value;

      const composeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=vedantmanikmishra@gmail.com&su=${encodeURIComponent(
        `[Portfolio] ${subject} - from ${name}`
      )}&body=${encodeURIComponent(message)}`;

      window.open(composeUrl, '_blank');

      const btn = form.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-paper-plane text-emerald-400"></i> Opening Gmail...';
      setTimeout(() => {
        btn.innerHTML = original;
        form.reset();
      }, 3000);
    });
  }
}
