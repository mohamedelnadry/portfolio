document.addEventListener('DOMContentLoaded', () => {

  // ── Scroll reveal ──
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08 });
  document.querySelectorAll('.section').forEach(s => observer.observe(s));

  // ── Smooth scroll ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  // ── Typing animation ──
  const el = document.getElementById('typeTarget');
  if (el) {
    const parts = [
      { text: 'I build ', accent: false },
      { text: 'scalable systems', accent: true },
      { text: ' and backend infrastructure.', accent: false },
    ];
    const full = parts.map(p => p.text).join('');
    el.innerHTML = '<span class="cursor"></span>';
    let typed = '';

    function type() {
      if (typed.length >= full.length) {
        setTimeout(() => { const c = el.querySelector('.cursor'); if (c) c.remove(); }, 1400);
        return;
      }
      typed += full[typed.length];
      el.innerHTML = '';
      let pos = 0;
      parts.forEach(p => {
        const slice = typed.slice(pos, pos + p.text.length);
        if (slice) {
          if (p.accent) {
            const s = document.createElement('span');
            s.textContent = slice;
            el.appendChild(s);
          } else {
            el.appendChild(document.createTextNode(slice));
          }
        }
        pos += p.text.length;
      });
      const c = document.createElement('span');
      c.className = 'cursor';
      el.appendChild(c);
      setTimeout(type, 38);
    }
    setTimeout(type, 500);
  }

  // ── Card tilt on hover ──
  document.querySelectorAll('.proj-card').forEach(card => {
    card.style.transformStyle = 'preserve-3d';
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width  - .5) * 5;
      const y = ((e.clientY - r.top)  / r.height - .5) * -5;
      card.style.transform = `translateY(-2px) rotateX(${y}deg) rotateY(${x}deg)`;
      card.style.transition = 'transform 0.06s linear';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform .35s ease, border-color .2s, box-shadow .2s';
    });
  });

});

// ── Sidebar ──
function openSidebar() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('open');
  document.body.style.overflow = '';
}
