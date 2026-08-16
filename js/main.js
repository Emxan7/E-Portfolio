// Eman's portfolio interactions: scroll reveals, subtle particle field, and keyboard-friendly navigation.
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: 0.12 });
    items.forEach((item) => observer.observe(item));
  } else items.forEach((item) => item.classList.add('visible'));
  document.querySelectorAll('.project-card[data-project]').forEach((card) => {
    const open = () => { window.location.href = card.dataset.project; };
    card.addEventListener('click', (event) => {
      if (!event.target.closest('a, button')) open();
    });
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); }
    });
  });
  const canvas = document.querySelector('#particle-field'); const ctx = canvas.getContext('2d'); let dots = [];
  const resize = () => { canvas.width = innerWidth * devicePixelRatio; canvas.height = innerHeight * devicePixelRatio; ctx.scale(devicePixelRatio, devicePixelRatio); dots = Array.from({length: Math.min(70, Math.floor(innerWidth / 18))}, () => ({x: Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.7+.4,v:(Math.random()-.5)*.2,p:Math.random()*Math.PI*2})); };
  const draw = () => { ctx.clearRect(0,0,innerWidth,innerHeight); dots.forEach(d=>{d.y-=.12;d.p+=.01;if(d.y<0)d.y=innerHeight;ctx.beginPath();ctx.arc(d.x,d.y,d.r+Math.sin(d.p)*.4,0,Math.PI*2);ctx.fillStyle='rgba(201,166,255,.45)';ctx.fill();}); if(!reduceMotion) requestAnimationFrame(draw); };
  addEventListener('resize', resize); resize(); draw();
})();
