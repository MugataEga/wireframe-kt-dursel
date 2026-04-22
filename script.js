  // ─── ACTIVE RW ───
  let activeRW = 'all';
  let activeSection = 'beranda';

  // ─── NAVIGATION ───
  function showSection(sec) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById('sec-' + sec).classList.add('active');

    document.querySelectorAll('.nav-link').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(b => {
      if (b.textContent.toLowerCase().includes(sec) ||
          (sec === 'beranda' && b.textContent === 'Beranda') ||
          (sec === 'pengumuman' && b.textContent === 'Pengumuman') ||
          (sec === 'agenda' && b.textContent === 'Agenda') ||
          (sec === 'galeri' && b.textContent === 'Galeri') ||
          (sec === 'profil' && b.textContent === 'Profil') ||
          (sec === 'aspirasi' && b.textContent.includes('Aspirasi'))) {
        b.classList.add('active');
      }
    });

    activeSection = sec;
    applyFilter(activeRW);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Show/hide RW bar for certain pages
    const rwBar = document.getElementById('rwBar');
    if (sec === 'profil' || sec === 'aspirasi') {
      rwBar.style.display = 'none';
    } else {
      rwBar.style.display = 'block';
    }
  }

  function goHome() {
    showSection('beranda');
  }

  // ─── MOBILE MENU ───
  function toggleMobile() {
    const m = document.getElementById('mobileMenu');
    m.classList.toggle('open');
  }

  // ─── RW FILTER ───
  function filterRW(rw, btn) {
    activeRW = rw;
    document.querySelectorAll('.rw-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilter(rw);
  }

  function applyFilter(rw) {
    const items = document.querySelectorAll('.rw-item');
    let visibleCount = 0;

    items.forEach(item => {
      const itemRWs = item.getAttribute('data-rw') || '';
      const sectionEl = item.closest('.section');
      if (!sectionEl) return;

      if (rw === 'all' || itemRWs.includes(rw)) {
        item.classList.remove('hidden');
        if (sectionEl.id === 'sec-' + activeSection) visibleCount++;
      } else {
        item.classList.add('hidden');
      }
    });

    // Update pill labels
    const rwName = rw === 'all' ? 'Semua Wilayah' : rw.replace('rw0', 'RW 0');
    ['pengumuman','agenda','galeri'].forEach(sec => {
      const pill = document.getElementById(sec + '-rw-pill');
      if (pill) pill.textContent = 'Menampilkan: ' + rwName;
    });

    // Filter messages
    ['pengumuman','agenda','galeri'].forEach(sec => {
      const msg = document.getElementById(sec + '-filter-msg');
      if (!msg) return;
      if (rw !== 'all') {
        const secEl = document.getElementById('sec-' + sec);
        const vis = secEl.querySelectorAll('.rw-item:not(.hidden)').length;
        if (vis === 0) {
          msg.textContent = 'Belum ada konten untuk wilayah ini.';
          msg.classList.add('shown');
        } else {
          msg.textContent = `Menampilkan konten untuk ${rwName}`;
          msg.classList.add('shown');
        }
      } else {
        msg.classList.remove('shown');
      }
    });
  }

  // ─── PROFIL TABS ───
  function showProfil(rw, btn) {
    document.querySelectorAll('.profil-tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.rw-tab').forEach(b => b.classList.remove('active'));
    document.getElementById('profil-' + rw).classList.add('active');
    btn.classList.add('active');
  }

  // ─── ASPIRASI FORM ───
  function submitAspirasi() {
    const nama = document.getElementById('asp-nama').value.trim();
    const rw   = document.getElementById('asp-rw').value;
    const kat  = document.getElementById('asp-kategori').value;
    const isi  = document.getElementById('asp-isi').value.trim();

    if (!nama || !rw || !kat || !isi) {
      alert('Harap lengkapi semua kolom wajib (*)');
      return;
    }

    document.getElementById('aspirasi-form-body').style.display = 'none';
    document.getElementById('form-success').style.display = 'block';
  }

  function resetForm() {
    document.getElementById('asp-nama').value = '';
    document.getElementById('asp-hp').value = '';
    document.getElementById('asp-rw').value = '';
    document.getElementById('asp-kategori').value = '';
    document.getElementById('asp-isi').value = '';
    document.getElementById('aspirasi-form-body').style.display = 'block';
    document.getElementById('form-success').style.display = 'none';
  }

  // ─── INIT ───
  showSection('beranda');