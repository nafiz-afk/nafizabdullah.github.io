/* =============================================
   NAFIZ ABDULLAH — PORTFOLIO SCRIPT
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ===== CURSOR =====
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');

  if (cursor && follower && window.innerWidth > 768) {
    let mx = 0, my = 0, fx = 0, fy = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    });

    function animateFollower() {
      fx += (mx - fx) * 0.12;
      fy += (my - fy) * 0.12;
      follower.style.left = fx + 'px';
      follower.style.top = fy + 'px';
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    document.querySelectorAll('a, button, .pcard, .acard, .jcard, .plist-item').forEach(el => {
      el.addEventListener('mouseenter', () => { cursor.classList.add('grow'); follower.classList.add('grow'); });
      el.addEventListener('mouseleave', () => { cursor.classList.remove('grow'); follower.classList.remove('grow'); });
    });
  }

  // ===== LOADER =====
  const loader = document.getElementById('loader');
  setTimeout(() => {
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => loader.style.display = 'none', 500);
    }
  }, 1000);

  // ===== NAVBAR SCROLL =====
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    setActiveNav();
    setActiveMobileNav();
  }, { passive: true });

  // ===== HAMBURGER / DRAWER =====
  const hamburger = document.getElementById('hamburger');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');

  function toggleDrawer(open) {
    hamburger.classList.toggle('open', open);
    mobileDrawer.classList.toggle('open', open);
    drawerOverlay.classList.toggle('show', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  hamburger.addEventListener('click', () => toggleDrawer(!mobileDrawer.classList.contains('open')));
  drawerOverlay.addEventListener('click', () => toggleDrawer(false));
  document.querySelectorAll('.drawer-link').forEach(l => l.addEventListener('click', () => toggleDrawer(false)));

  // ===== THEME TOGGLE =====
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const html = document.documentElement;

  const savedTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const isDark = html.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
  }

  // ===== TYPED TEXT =====
  const roles = ['Full Stack Web Developer', 'PHP & Laravel Enthusiast', 'Creative Problem Solver', 'Open Source Contributor'];
  const typedEl = document.getElementById('typedRole');
  let roleIdx = 0, charIdx = 0, deleting = false, typingTimer;

  function type() {
    if (!typedEl) return;
    const current = roles[roleIdx];
    if (!deleting) {
      typedEl.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) { deleting = true; typingTimer = setTimeout(type, 1800); return; }
    } else {
      typedEl.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; }
    }
    typingTimer = setTimeout(type, deleting ? 50 : 90);
  }
  setTimeout(type, 500);

  // ===== SMOOTH SCROLL for nav links =====
  function smoothScroll(targetId) {
    const el = document.querySelector(targetId);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  }

  document.querySelectorAll('.nav-link, .mbn-link').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) { e.preventDefault(); smoothScroll(href); }
    });
  });

  // ===== ACTIVE NAV on scroll =====
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const mbnLinks = document.querySelectorAll('.mbn-link');

  function setActiveNav() {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
  }

  function setActiveMobileNav() {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    mbnLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
  }

  // ===== ABOUT ME + CV BUTTONS =====
  const aboutMeBtn = document.getElementById('aboutMeBtn');
  const cvBtn = document.getElementById('cvBtn');

  aboutMeBtn?.addEventListener('click', e => { e.preventDefault(); smoothScroll('#about'); });
  cvBtn?.addEventListener('click', e => { e.preventDefault(); window.open('cv.html', '_blank', 'noopener,noreferrer'); });

  // ===== SOCIAL MODAL =====
  const socialLinksBtn = document.getElementById('socialLinksBtn');
  const socialOverlay = document.getElementById('socialOverlay');
  const socialModal = document.getElementById('socialModal');
  const socialClose = document.getElementById('socialClose');

  function toggleSocial(show) {
    socialOverlay.classList.toggle('show', show);
    socialModal.classList.toggle('show', show);
    document.body.style.overflow = show ? 'hidden' : '';
  }

  socialLinksBtn?.addEventListener('click', e => { e.preventDefault(); toggleSocial(true); });
  socialClose?.addEventListener('click', () => toggleSocial(false));
  socialOverlay?.addEventListener('click', () => toggleSocial(false));

  // ===== SCROLL ANIMATIONS =====
  const observerOptions = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.id === 'about') animateSkills();
        sectionObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section').forEach(el => sectionObserver.observe(el));

  // Cards with staggered delay
  const cardObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || 0);
        setTimeout(() => entry.target.classList.add('visible'), delay);
        cardObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.acard, .pcard, .jcard').forEach(el => cardObserver.observe(el));

  // ===== SKILL BARS =====
  function animateSkills() {
    document.querySelectorAll('.skill-fill').forEach((bar, i) => {
      setTimeout(() => {
        bar.style.width = bar.dataset.width + '%';
      }, i * 150);
    });
  }

  // ===== MUSIC PLAYER =====
  const musicData = [
    { title: 'Golden Brown Instrumental', artist: 'The Stranglers', src: 'music.mp3', image: 'goldenbrown.png', duration: '1:21' },
    { title: 'Fade to Black', artist: 'Metallica', src: 'fadetoblack.mp3', image: 'fadetoblack.png', duration: '4:20' },
    { title: 'Far From Any Road', artist: 'The Handsome Family', src: 'farfromanyroad.mp3', image: 'farfromanyroad.png', duration: '3:55' },
  ];

  const audio = new Audio();
  let currentIdx = 0;
  let isPlaying = false;

  // Elements
  const musicFab = document.getElementById('musicFab');
  const musicPill = document.getElementById('musicPill');
  const musicPanel = document.getElementById('musicPanel');
  const panelClose = document.getElementById('panelClose');
  const pillExpand = document.getElementById('pillExpand');
  const pillVinyl = document.getElementById('pillVinyl');

  const pillPlay = document.getElementById('pillPlay');
  const pillPrev = document.getElementById('pillPrev');
  const pillNext = document.getElementById('pillNext');
  const panelPlay = document.getElementById('panelPlay');
  const panelPrev = document.getElementById('panelPrev');
  const panelNext = document.getElementById('panelNext');

  const pillSong = document.getElementById('pillSong');
  const pillArtist = document.getElementById('pillArtist');
  const pillArt = document.getElementById('pillArt');
  const panelTitle = document.getElementById('panelTitle');
  const panelArtist = document.getElementById('panelArtist');
  const panelArt = document.getElementById('panelArt');

  const panelFill = document.getElementById('panelFill');
  const panelProgressBar = document.getElementById('panelProgressBar');
  const panelCurrent = document.getElementById('panelCurrent');
  const panelTotal = document.getElementById('panelTotal');
  const volSlider = document.getElementById('volSlider');

  audio.volume = 0.4;

  function loadSong(idx) {
    currentIdx = idx;
    const song = musicData[idx];
    audio.src = song.src;
    
    // Update pill
    pillSong.textContent = song.title;
    pillArtist.textContent = song.artist;
    pillArt.src = song.image;
    
    // Update panel
    panelTitle.textContent = song.title;
    panelArtist.textContent = song.artist;
    panelArt.src = song.image;

    // Update playlist
    document.querySelectorAll('.plist-item').forEach((item, i) => {
      item.classList.toggle('active', i === idx);
    });

    if (isPlaying) audio.play().catch(() => {});
  }

  function playMusic() {
    audio.play().then(() => {
      isPlaying = true;
      pillPlay.innerHTML = '<i class="fas fa-pause"></i>';
      panelPlay.innerHTML = '<i class="fas fa-pause"></i>';
      musicPill.classList.add('playing');
    }).catch(() => {});
  }

  function pauseMusic() {
    audio.pause();
    isPlaying = false;
    pillPlay.innerHTML = '<i class="fas fa-play"></i>';
    panelPlay.innerHTML = '<i class="fas fa-play"></i>';
    musicPill.classList.remove('playing');
  }

  function togglePlay() {
    isPlaying ? pauseMusic() : playMusic();
  }

  function fmtTime(s) {
    if (isNaN(s)) return '0:00';
    return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  }

  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    panelFill.style.width = pct + '%';
    panelCurrent.textContent = fmtTime(audio.currentTime);
  });

  audio.addEventListener('loadedmetadata', () => {
    panelTotal.textContent = fmtTime(audio.duration);
  });

  audio.addEventListener('ended', () => {
    currentIdx = (currentIdx + 1) % musicData.length;
    loadSong(currentIdx);
    playMusic();
  });

  panelProgressBar?.addEventListener('click', e => {
    const pct = e.offsetX / panelProgressBar.clientWidth;
    audio.currentTime = pct * audio.duration;
  });

  volSlider?.addEventListener('input', () => { audio.volume = volSlider.value / 100; });

  pillPlay?.addEventListener('click', togglePlay);
  panelPlay?.addEventListener('click', togglePlay);
  pillPrev?.addEventListener('click', () => { currentIdx = (currentIdx - 1 + musicData.length) % musicData.length; loadSong(currentIdx); if (isPlaying) playMusic(); });
  pillNext?.addEventListener('click', () => { currentIdx = (currentIdx + 1) % musicData.length; loadSong(currentIdx); if (isPlaying) playMusic(); });
  panelPrev?.addEventListener('click', () => { currentIdx = (currentIdx - 1 + musicData.length) % musicData.length; loadSong(currentIdx); if (isPlaying) playMusic(); });
  panelNext?.addEventListener('click', () => { currentIdx = (currentIdx + 1) % musicData.length; loadSong(currentIdx); if (isPlaying) playMusic(); });

  // Playlist click
  document.querySelectorAll('.plist-item').forEach((item, i) => {
    item.addEventListener('click', () => { loadSong(i); playMusic(); });
  });

  // Show/hide music UI
  musicFab?.addEventListener('click', () => {
    musicPill.classList.toggle('visible');
    if (!musicPill.classList.contains('visible')) musicPanel.classList.remove('open');
  });

  pillExpand?.addEventListener('click', () => musicPanel.classList.toggle('open'));
  panelClose?.addEventListener('click', () => musicPanel.classList.remove('open'));

  // Initialize
  loadSong(0);

  // Auto-play on first user interaction
  document.body.addEventListener('click', function firstPlay() {
    if (!isPlaying) playMusic();
    document.body.removeEventListener('click', firstPlay);
  }, { once: true });

  // Show music pill on load
  setTimeout(() => musicPill.classList.add('visible'), 2000);

  // ===== KEYBOARD ESC =====
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      toggleSocial(false);
      toggleDrawer(false);
      musicPanel.classList.remove('open');
    }
  });

  // ===== INIT =====
  setActiveNav();
  setActiveMobileNav();
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});
