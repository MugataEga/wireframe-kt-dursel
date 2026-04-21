  function showPage(name) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + name).classList.add('active');
    window.scrollTo(0, 0);
  }

  function doLogin(e) {
    e.preventDefault();
    showPage('admin');
  }

  function switchAdminTab(tab, el) {
    document.querySelectorAll('[id^="admin-"]').forEach(t => t.style.display = 'none');
    document.getElementById('admin-' + tab).style.display = 'block';
    if (el) {
      document.querySelectorAll('.admin-nav a').forEach(a => a.classList.remove('active'));
      el.classList.add('active');
    }
  }

  function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('open');
  }

  function closeMenu() {
    document.getElementById('navLinks').classList.remove('open');
  }

  let toastTimer;
  function showToast(msg) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-msg').textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
  }

  function submitAspirasi(e) {
    e.preventDefault();
    document.getElementById('aspirasiName').value = '';
    document.getElementById('aspirasiMsg').value = '';
    showToast('Aspirasi terkirim! Terima kasih.');
  }

  // Intersection Observer for fade-in animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Active nav highlight on scroll
  const sections = ['pengumuman', 'agenda', 'galeri', 'profil', 'aspirasi'];
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 100) current = id;
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + current) a.classList.add('active');
    });
  });