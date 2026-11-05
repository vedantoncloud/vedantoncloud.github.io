// ==========================================
// VEDANT MISHRA - PORTFOLIO INTERACTIVITY & 3D ENGINE
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initTypingEffect();
  initTerminal();
  initProjectFilters();
  initMobileNav();
  initContactForm();
  initThreeDWorkstation();
  initTechFilters();
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
    'Creator of CloudOps-AI & CloudForge',
    'AWS & OCI Certified Specialist',
    'Coffee & Code Powered Engineer',
    'Automated CI/CD & FinOps Optimizer'
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
    help: 'Available commands: [about, skills, projects, flagship, coffee, certs, exp, contact, clear, sudo]',
    about: 'Vedant Mishra: 3rd Year B.Tech CSE (Cloud Computing) @ MIT ADT Pune. Specializes in AWS Serverless, Docker, OCI, and CI/CD Automation.',
    skills: 'Cloud: AWS (Lambda, API Gateway, S3, DynamoDB, IAM), OCI\nDevOps: Docker, GitHub Actions, CI/CD, Linux, Bash\nBackend: Python, FastAPI, Node.js, SQL, REST APIs',
    projects: '1. CloudOps-AI (Flagship Autonomous Cloud Operations)\n2. CloudForge (Mini PaaS)\n3. CI/CD Pipeline (Render/Docker)\n4. CC-Prediction-Bot (FinOps)\n5. Cycra Health (Health Tech)',
    flagship: 'CloudOps-AI: Autonomous Cloud Operations Platform combining AI incident diagnosis, dry-run remediation planning, hash-chained audit trails, and automated rollback safeguards.',
    coffee: '☕ [BREWING COFFEE & CODE]...\n- Beans: 100% Dark Roast Espresso\n- Container: Dockerized Mug\n- Status: 200 OK | Fueling 100+ days streak & high-scale cloud architectures! 🚀',
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

// 6. Contact Form & Direct Gmail Integration (NO TELEGRAM)
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
      const subject = document.getElementById('form-subject').value || 'Collaboration Opportunity';
      const message = document.getElementById('form-message').value;

      const composeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=vedantmanikmishra@gmail.com&su=${encodeURIComponent(
        `[Portfolio] ${subject} - from ${name}`
      )}&body=${encodeURIComponent(message)}`;

      window.open(composeUrl, '_blank');

      const btn = form.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-envelope text-emerald-400"></i> Launching Gmail...';
      setTimeout(() => {
        btn.innerHTML = original;
        form.reset();
      }, 3000);
    });
  }
}

// 7. REAL 3D THREE.JS "COFFEE AND CODE" WORKSTATION SCENE
function initThreeDWorkstation() {
  const container = document.getElementById('coffee-3d-canvas-container');
  if (!container || typeof THREE === 'undefined') return;

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const width = container.clientWidth || 400;
  const height = container.clientHeight || 360;

  const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
  camera.position.set(0, 3.2, 5.8);
  camera.lookAt(0, 0.3, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // Group to rotate together
  const workstationGroup = new THREE.Group();
  scene.add(workstationGroup);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0x38bdf8, 1.4);
  keyLight.position.set(4, 7, 5);
  scene.add(keyLight);

  const warmCoffeeLight = new THREE.PointLight(0xf59e0b, 1.8, 6);
  warmCoffeeLight.position.set(1.4, 1.2, 0.4);
  scene.add(warmCoffeeLight);

  const screenLight = new THREE.PointLight(0x38bdf8, 2.0, 7);
  screenLight.position.set(-0.8, 1.5, 0.2);
  scene.add(screenLight);

  // 1. Tech Platform Pad (Circular base with glowing rim)
  const padGeo = new THREE.CylinderGeometry(2.7, 2.8, 0.12, 48);
  const padMat = new THREE.MeshStandardMaterial({
    color: 0x0b1120,
    roughness: 0.3,
    metalness: 0.8
  });
  const pad = new THREE.Mesh(padGeo, padMat);
  pad.position.y = -0.06;
  workstationGroup.add(pad);

  // Glowing neon ring around platform
  const ringGeo = new THREE.TorusGeometry(2.75, 0.04, 16, 64);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2;
  workstationGroup.add(ring);

  // 2. 3D Developer Laptop
  // Base
  const laptopBaseGeo = new THREE.BoxGeometry(2.2, 0.07, 1.5);
  const laptopMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.85,
    roughness: 0.2
  });
  const laptopBase = new THREE.Mesh(laptopBaseGeo, laptopMat);
  laptopBase.position.set(-0.7, 0.04, 0.1);
  laptopBase.rotation.y = 0.2;
  workstationGroup.add(laptopBase);

  // Keyboard glow
  const kbGeo = new THREE.PlaneGeometry(1.8, 0.9);
  const kbMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });
  const kb = new THREE.Mesh(kbGeo, kbMat);
  kb.rotation.x = -Math.PI / 2;
  kb.position.set(-0.7, 0.08, 0.2);
  kb.rotation.z = -0.2;
  workstationGroup.add(kb);

  // Laptop Screen
  const screenGroup = new THREE.Group();
  screenGroup.position.set(-0.7, 0.07, -0.6);
  screenGroup.rotation.y = 0.2;

  const screenBackGeo = new THREE.BoxGeometry(2.2, 1.45, 0.05);
  const screenBack = new THREE.Mesh(screenBackGeo, laptopMat);
  screenBack.position.set(0, 0.7, 0);
  screenBack.rotation.x = -0.15;
  screenGroup.add(screenBack);

  // Glowing code display screen
  const displayGeo = new THREE.PlaneGeometry(2.0, 1.3);
  const displayMat = new THREE.MeshBasicMaterial({
    color: 0x0284c7
  });
  const display = new THREE.Mesh(displayGeo, displayMat);
  display.position.set(0, 0.7, 0.03);
  display.rotation.x = -0.15;
  screenGroup.add(display);
  workstationGroup.add(screenGroup);

  // 3. 3D Ceramic Coffee Mug (A Developer's Fuel)
  const mugGroup = new THREE.Group();
  mugGroup.position.set(1.4, 0.45, 0.3);

  // Mug Body
  const mugGeo = new THREE.CylinderGeometry(0.5, 0.42, 0.9, 32);
  const mugMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.15,
    metalness: 0.3
  });
  const mug = new THREE.Mesh(mugGeo, mugMat);
  mugGroup.add(mug);

  // Mug Handle
  const handleGeo = new THREE.TorusGeometry(0.32, 0.07, 16, 32, Math.PI * 1.15);
  const handle = new THREE.Mesh(handleGeo, mugMat);
  handle.position.set(0.48, 0, 0);
  handle.rotation.z = -Math.PI / 2;
  mugGroup.add(handle);

  // Fresh Steaming Dark Espresso Coffee Surface
  const liquidGeo = new THREE.CylinderGeometry(0.46, 0.46, 0.05, 32);
  const liquidMat = new THREE.MeshStandardMaterial({
    color: 0x3e1d0f,
    roughness: 0.2,
    metalness: 0.1
  });
  const liquid = new THREE.Mesh(liquidGeo, liquidMat);
  liquid.position.y = 0.38;
  mugGroup.add(liquid);

  workstationGroup.add(mugGroup);

  // 4. Dynamic Steaming Coffee Particles
  const steamCount = 45;
  const steamGeo = new THREE.BufferGeometry();
  const steamPositions = new Float32Array(steamCount * 3);
  const steamVelocities = [];

  for (let i = 0; i < steamCount; i++) {
    steamPositions[i * 3] = 1.4 + (Math.random() - 0.5) * 0.35;
    steamPositions[i * 3 + 1] = 0.9 + Math.random() * 1.2;
    steamPositions[i * 3 + 2] = 0.3 + (Math.random() - 0.5) * 0.35;

    steamVelocities.push({
      vy: 0.008 + Math.random() * 0.012,
      vx: (Math.random() - 0.5) * 0.004,
      vz: (Math.random() - 0.5) * 0.004,
      initialY: 0.9
    });
  }

  steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPositions, 3));

  const steamMat = new THREE.PointsMaterial({
    color: 0xfef08a,
    size: 0.07,
    transparent: true,
    opacity: 0.55
  });

  const steamParticles = new THREE.Points(steamGeo, steamMat);
  workstationGroup.add(steamParticles);

  // 5. Floating Orbital Cloud & Tech Atoms
  const atomCount = 20;
  const atomGeo = new THREE.BufferGeometry();
  const atomPos = new Float32Array(atomCount * 3);

  for (let i = 0; i < atomCount; i++) {
    const angle = (i / atomCount) * Math.PI * 2;
    const rad = 2.2 + Math.random() * 0.6;
    atomPos[i * 3] = Math.cos(angle) * rad;
    atomPos[i * 3 + 1] = 0.6 + Math.sin(angle * 2) * 0.8;
    atomPos[i * 3 + 2] = Math.sin(angle) * rad;
  }
  atomGeo.setAttribute('position', new THREE.BufferAttribute(atomPos, 3));
  const atomMat = new THREE.PointsMaterial({
    color: 0x38bdf8,
    size: 0.08,
    transparent: true,
    opacity: 0.85
  });
  const atoms = new THREE.Points(atomGeo, atomMat);
  workstationGroup.add(atoms);

  // Interactive Mouse Tilt & Parallax
  let targetRotationX = 0;
  let targetRotationY = 0;
  let mouseX = 0;
  let mouseY = 0;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

    targetRotationY = mouseX * 0.45;
    targetRotationX = -mouseY * 0.25;
  });

  // Click on 3D Container Brews Fresh Coffee!
  container.addEventListener('click', () => {
    // Jump animation
    mugGroup.position.y = 0.7;
    warmCoffeeLight.intensity = 4.0;
    setTimeout(() => {
      mugGroup.position.y = 0.45;
      warmCoffeeLight.intensity = 1.8;
    }, 350);

    const toast = document.getElementById('coffee-toast');
    if (toast) {
      toast.classList.remove('opacity-0', 'pointer-events-none');
      toast.classList.add('opacity-100');
      setTimeout(() => {
        toast.classList.add('opacity-0', 'pointer-events-none');
        toast.classList.remove('opacity-100');
      }, 2500);
    }
  });

  // Resize Handler
  window.addEventListener('resize', () => {
    const w = container.clientWidth || 400;
    const h = container.clientHeight || 360;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

  // Animation Loop
  let clock = 0;
  function animate() {
    requestAnimationFrame(animate);
    clock += 0.02;

    // Smooth inertia tilt
    workstationGroup.rotation.y += (targetRotationY - workstationGroup.rotation.y) * 0.08;
    workstationGroup.rotation.x += (targetRotationX - workstationGroup.rotation.x) * 0.08;

    // Floating idle bob
    workstationGroup.position.y = Math.sin(clock * 1.2) * 0.08;
    atoms.rotation.y += 0.008;

    // Update steam particles
    const positions = steamParticles.geometry.attributes.position.array;
    for (let i = 0; i < steamCount; i++) {
      positions[i * 3 + 1] += steamVelocities[i].vy;
      positions[i * 3] += Math.sin(clock + i) * 0.002;

      // Reset when particle floats too high
      if (positions[i * 3 + 1] > 2.3) {
        positions[i * 3 + 1] = steamVelocities[i].initialY;
        positions[i * 3] = 1.4 + (Math.random() - 0.5) * 0.25;
        positions[i * 3 + 2] = 0.3 + (Math.random() - 0.5) * 0.25;
      }
    }
    steamParticles.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }
  animate();
}

// 8. Hero Tab Switcher (3D Workstation vs Terminal)
function switchHeroTab(tab) {
  const tab3d = document.getElementById('hero-tab-3d');
  const tabTerminal = document.getElementById('hero-tab-terminal');
  const btn3d = document.getElementById('tab-btn-3d');
  const btnTerminal = document.getElementById('tab-btn-terminal');

  if (tab === '3d') {
    if (tab3d) tab3d.classList.remove('hidden');
    if (tabTerminal) tabTerminal.classList.add('hidden');
    if (btn3d) {
      btn3d.className = 'px-3 py-1 rounded-md bg-amber-500/20 text-amber-300 font-semibold transition-all flex items-center gap-1.5';
    }
    if (btnTerminal) {
      btnTerminal.className = 'px-3 py-1 rounded-md text-slate-400 hover:text-white transition-all flex items-center gap-1.5';
    }
  } else {
    if (tab3d) tab3d.classList.add('hidden');
    if (tabTerminal) tabTerminal.classList.remove('hidden');
    if (btn3d) {
      btn3d.className = 'px-3 py-1 rounded-md text-slate-400 hover:text-white transition-all flex items-center gap-1.5';
    }
    if (btnTerminal) {
      btnTerminal.className = 'px-3 py-1 rounded-md bg-sky-500/20 text-sky-300 font-semibold transition-all flex items-center gap-1.5';
    }
  }
}
window.switchHeroTab = switchHeroTab;

// 9. Tech Stack Category Filtering
function initTechFilters() {
  const buttons = document.querySelectorAll('.tech-tab-btn');
  const items = document.querySelectorAll('.tech-pill-item');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => {
        b.classList.remove('bg-sky-500/20', 'text-sky-300', 'border-sky-500/40');
        b.classList.add('text-slate-400', 'border-slate-800');
      });
      btn.classList.add('bg-sky-500/20', 'text-sky-300', 'border-sky-500/40');
      btn.classList.remove('text-slate-400', 'border-slate-800');

      const filter = btn.getAttribute('data-tech-filter');

      items.forEach((item) => {
        const cat = item.getAttribute('data-tech-cat') || '';
        if (filter === 'all' || cat.includes(filter)) {
          item.style.display = 'flex';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 30);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(8px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}


