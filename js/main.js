// ---------- Mobile nav toggle ----------
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
if(toggle && links){
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
}

// ---------- Active nav link ----------
(function highlightActive(){
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navlinks a').forEach(a => {
    const href = a.getAttribute('href');
    if(href === path){ a.classList.add('active'); }
  });
})();

// ---------- Scroll progress bar ----------
const progressBar = document.getElementById('scrollProgress');
if(progressBar){
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

// ---------- Scroll reveal ----------
const revealTargets = document.querySelectorAll('.reveal');
if(revealTargets.length){
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); } });
  }, {threshold:0.12});
  revealTargets.forEach(el => observer.observe(el));
}

// ---------- Hero spotlight follows cursor ----------
const spotlight = document.querySelector('.spotlight');
if(spotlight){
  const hero = document.getElementById('hero');
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width) * 100;
    const my = ((e.clientY - rect.top) / rect.height) * 100;
    hero.style.setProperty('--mx', mx + '%');
    hero.style.setProperty('--my', my + '%');
  });
}

// ---------- Rotating role text ----------
const roleEl = document.getElementById('roleCycle');
if(roleEl){
  const roles = ['Full Stack Engineer', 'STEM Educator', 'Robotics Trainer', 'Photographer'];
  let idx = 0, charIdx = 0, deleting = false;
  const textSpan = document.createElement('span');
  const cursorSpan = document.createElement('span');
  cursorSpan.className = 'cursor';
  cursorSpan.textContent = '\u00A0';
  roleEl.appendChild(textSpan);
  roleEl.appendChild(cursorSpan);

  function tick(){
    const current = roles[idx];
    if(!deleting){
      charIdx++;
      textSpan.textContent = current.slice(0, charIdx);
      if(charIdx === current.length){
        deleting = true;
        setTimeout(tick, 1400);
        return;
      }
    } else {
      charIdx--;
      textSpan.textContent = current.slice(0, charIdx);
      if(charIdx === 0){
        deleting = false;
        idx = (idx + 1) % roles.length;
      }
    }
    setTimeout(tick, deleting ? 35 : 65);
  }
  tick();
}

// ---------- Count-up stats ----------
const statNums = document.querySelectorAll('.stat .num[data-target]');
if(statNums.length){
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const el = entry.target;
        const target = parseFloat(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
        const duration = 1200;
        const start = performance.now();
        function step(now){
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const val = target * eased;
          el.textContent = (decimals ? val.toFixed(decimals) : Math.round(val)) + suffix;
          if(progress < 1){ requestAnimationFrame(step); }
        }
        requestAnimationFrame(step);
        statObserver.unobserve(el);
      }
    });
  }, {threshold:0.5});
  statNums.forEach(el => statObserver.observe(el));
}

// ---------- Page transition on internal link click ----------
document.querySelectorAll('a[href$=".html"]').forEach(a => {
  const url = new URL(a.href);
  if(url.origin === location.origin){
    a.addEventListener('click', (e) => {
      if(e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
      e.preventDefault();
      document.body.classList.add('leaving');
      setTimeout(() => { location.href = a.href; }, 220);
    });
  }
});

// ---------- Copy email with confetti ----------
const copyBtn = document.getElementById('copyEmailBtn');
if(copyBtn){
  copyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = copyBtn.dataset.email;
    navigator.clipboard.writeText(email).then(() => {
      const feedback = document.getElementById('copyFeedback');
      if(feedback){
        feedback.classList.add('show');
        setTimeout(() => feedback.classList.remove('show'), 1800);
      }
      burstConfetti(copyBtn);
    });
  });
}

function burstConfetti(originEl){
  const colors = ['#E8A33D', '#5FB8B0', '#EFEADD'];
  const rect = originEl.getBoundingClientRect();
  const originX = rect.left + rect.width/2;
  const originY = rect.top;
  for(let i=0;i<18;i++){
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.background = colors[i % colors.length];
    piece.style.left = originX + 'px';
    piece.style.top = originY + 'px';
    document.body.appendChild(piece);
    const angle = (Math.PI * 2 * i) / 18 + Math.random()*0.5;
    const velocity = 60 + Math.random()*70;
    const dx = Math.cos(angle) * velocity;
    const dy = Math.sin(angle) * velocity - 40;
    piece.animate([
      { transform:'translate(0,0) rotate(0deg)', opacity:1 },
      { transform:`translate(${dx}px, ${dy + 160}px) rotate(${Math.random()*360}deg)`, opacity:0 }
    ], { duration: 900 + Math.random()*300, easing:'cubic-bezier(.2,.7,.3,1)' });
    setTimeout(() => piece.remove(), 1300);
  }
}
