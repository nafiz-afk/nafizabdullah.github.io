document.addEventListener("DOMContentLoaded", function () {
    // Configuration
    const CONFIG = {
        LOADER: {
            DISPLAY_TIME: 1000,
            FADE_OUT: 500,
        },
        MOBILE_BREAKPOINT: 768,
    };

    // ==================== MUSIC PLAYER SYSTEM ====================
    
    // Music player elements
    const musicPlayer = document.getElementById('musicPlayer');
    const miniPlayer = document.getElementById('miniPlayer');
    const musicToggleBtn = document.getElementById('musicToggleBtn');
    const playerClose = document.getElementById('playerClose');
    const toggleMiniPlayer = document.getElementById('toggleMiniPlayer');
    const expandPlayer = document.getElementById('expandPlayer');
    
    // Player controls
    const playBtn = document.getElementById('playBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const miniPlayBtn = document.getElementById('miniPlayBtn');
    const miniPrevBtn = document.getElementById('miniPrevBtn');
    const miniNextBtn = document.getElementById('miniNextBtn');
    
    // Progress and volume
    const progressBar = document.getElementById('progressBar');
    const progress = document.getElementById('progress');
    const currentTimeEl = document.getElementById('currentTime');
    const totalTimeEl = document.getElementById('totalTime');
    const volumeSlider = document.getElementById('volumeSlider');
    
    // Song info elements
    const currentSongTitle = document.getElementById('currentSongTitle');
    const currentArtist = document.getElementById('currentArtist');
    const albumArt = document.getElementById('albumArt');
    
    // Playlist
    const playlistItems = document.querySelectorAll('.playlist-item');
    const playlist = document.getElementById('playlist');
    
    // Music data - 5 different songs with external URLs
    const musicData = [
        {
            title: "Golden brown instrumental",
            artist: "The stranglers",
            src: "music.mp3",
            duration: "1:21",
            image: "goldenbrown.png"
        },
        {
            title: "Fade to Black",
            artist: "Metalica",
            src: "fadetoblack.mp3",
            duration: "4:20",
            image: "fadetoblack.png"
        },
        {
            title: "Far From Any Road",
            artist: "The Handsome Family",
            src: "farfromanyroad.mp3",
            duration: "3:55",
            image: "farfromanyroad.png"
        },
        {
            title: "",
            artist: "",
            src: "",
            duration: "",
            image: ""
        },
        {
            title: "J",
            artist: "",
            src: "",
            duration: "",
            image: ""
        }
    ];
    
    // Audio object
    const audio = new Audio();
    let currentSongIndex = 0;
    let isPlaying = false;
    
    // Initialize audio
    function initAudio() {
        audio.src = musicData[currentSongIndex].src;
        audio.volume = volumeSlider.value / 100;
        
        audio.addEventListener('loadedmetadata', () => {
            totalTimeEl.textContent = formatTime(audio.duration);
        });
        
        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('ended', playNext);
    }
    
    // Format time (seconds to mm:ss)
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    // Update progress bar
    function updateProgress() {
        if (audio.duration) {
            const progressPercent = (audio.currentTime / audio.duration) * 100;
            progress.style.width = `${progressPercent}%`;
            currentTimeEl.textContent = formatTime(audio.currentTime);
        }
    }
    
    // Set progress on click
    progressBar.addEventListener('click', (e) => {
        const width = progressBar.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        
        audio.currentTime = (clickX / width) * duration;
    });
    
    // Play/pause toggle
    function togglePlay() {
        if (isPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    }
    
    // Play music
    function playMusic() {
        audio.play();
        isPlaying = true;
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        miniPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
        musicPlayer.classList.add('playing');
        miniPlayer.classList.add('playing');
    }
    
    // Pause music
    function pauseMusic() {
        audio.pause();
        isPlaying = false;
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        miniPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
        musicPlayer.classList.remove('playing');
        miniPlayer.classList.remove('playing');
    }
    
    // Play next song
    function playNext() {
        currentSongIndex = (currentSongIndex + 1) % musicData.length;
        loadSong(currentSongIndex);
        playMusic();
    }
    
    // Play previous song
    function playPrev() {
        currentSongIndex = (currentSongIndex - 1 + musicData.length) % musicData.length;
        loadSong(currentSongIndex);
        playMusic();
    }
    
    // Load song by index
    function loadSong(index) {
        currentSongIndex = index;
        const song = musicData[index];
        
        audio.src = song.src;
        currentSongTitle.textContent = song.title;
        currentArtist.textContent = song.artist;
        albumArt.src = song.image;
        
        // Update mini player
        document.querySelector('.mini-song-title').textContent = song.title;
        document.querySelector('.mini-song-artist').textContent = song.artist;
        document.querySelector('.mini-player-info img').src = song.image;
        
        // Update playlist active state
        playlistItems.forEach(item => item.classList.remove('active'));
        playlistItems[index].classList.add('active');
        
        if (isPlaying) {
            audio.play();
        }
    }
    
    // Event listeners for player controls
    playBtn.addEventListener('click', togglePlay);
    miniPlayBtn.addEventListener('click', togglePlay);
    
    prevBtn.addEventListener('click', playPrev);
    miniPrevBtn.addEventListener('click', playPrev);
    
    nextBtn.addEventListener('click', playNext);
    miniNextBtn.addEventListener('click', playNext);
    
    // Volume control
    volumeSlider.addEventListener('input', () => {
        audio.volume = volumeSlider.value / 100;
    });
    
    // Playlist item click
    playlistItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            loadSong(index);
            playMusic();
        });
    });
    
    // Toggle music player visibility
    musicToggleBtn.addEventListener('click', () => {
        musicPlayer.classList.toggle('active');
        miniPlayer.classList.remove('active');
    });
    
    playerClose.addEventListener('click', () => {
        musicPlayer.classList.remove('active');
    });
    
    toggleMiniPlayer.addEventListener('click', () => {
        musicPlayer.classList.remove('active');
        miniPlayer.classList.add('active');
    });
    
    expandPlayer.addEventListener('click', () => {
        miniPlayer.classList.remove('active');
        musicPlayer.classList.add('active');
    });
    
    // Close music player when clicking outside (on overlay)
    document.addEventListener('click', (e) => {
        if (!musicPlayer.contains(e.target) && !musicToggleBtn.contains(e.target) && 
            musicPlayer.classList.contains('active')) {
            musicPlayer.classList.remove('active');
        }
    });
    
    // Initialize audio system
    initAudio();
    loadSong(0);

    // ==================== LOADING SCREEN ====================
    const startTime = performance.now();
    const loader = document.getElementById("loader");

    setTimeout(function () {
        if (loader) {
            loader.style.opacity = "0";
            setTimeout(() => (loader.style.display = "none"), CONFIG.LOADER.FADE_OUT);
        }
    }, Math.max(0, CONFIG.LOADER.DISPLAY_TIME - (performance.now() - startTime)));

    // ==================== BACKGROUND ANIMATION ====================
    function createBackgroundAnimation() {
        const background =
            document.querySelector(".background-animation") ||
            document.createElement("div");
        if (!document.querySelector(".background-animation")) {
            background.className = "background-animation";
            document.body.appendChild(background);
        }

        // Create bubbles
        for (let i = 0; i < 15; i++) {
            const bubble = document.createElement("div");
            bubble.className = "bubble";

            // Random properties
            const size = Math.random() * 100 + 50;
            const left = Math.random() * 100;
            const animationDuration = Math.random() * 20 + 10;
            const animationDelay = Math.random() * 5;

            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${left}%`;
            bubble.style.animationDuration = `${animationDuration}s`;
            bubble.style.animationDelay = `${animationDelay}s`;

            background.appendChild(bubble);
        }
    }

    // ==================== THEME TOGGLE ====================
    const themeToggle = document.getElementById("themeToggle");
    const mobileThemeToggle = document.getElementById("mobileThemeToggle");
    const themeIcon = themeToggle?.querySelector("i");
    const mobileThemeIcon = mobileThemeToggle?.querySelector("i");

    function toggleTheme() {
        document.body.classList.toggle("dark-mode");
        const isDarkMode = document.body.classList.contains("dark-mode");

        // Update icons
        if (isDarkMode) {
            themeIcon?.classList.replace("fa-moon", "fa-sun");
            mobileThemeIcon?.classList.replace("fa-moon", "fa-sun");
        } else {
            themeIcon?.classList.replace("fa-sun", "fa-moon");
            mobileThemeIcon?.classList.replace("fa-sun", "fa-moon");
        }

        // Save preference
        localStorage.setItem("darkMode", isDarkMode);
    }

    themeToggle?.addEventListener("click", toggleTheme);
    mobileThemeToggle?.addEventListener("click", toggleTheme);

    // Initialize theme
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
        themeIcon?.classList.replace("fa-moon", "fa-sun");
        mobileThemeIcon?.classList.replace("fa-moon", "fa-sun");
    }

    // ==================== NAVIGATION ====================
    const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");
    const sections = document.querySelectorAll("section");

    // Set active navigation link based on scroll position
    function setActiveNavLink() {
        let current = "";
        const scrollPosition = window.scrollY + 100;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 20,
                    behavior: "smooth",
                });
            }
        });
    });

    // ==================== SKILLS ANIMATION ====================
    function animateSkills() {
        const skillBars = document.querySelectorAll(".skill-progress");

        skillBars.forEach((bar) => {
            const width = bar.getAttribute("data-width");
            bar.style.width = width + "%";
        });
    }

    // ==================== ABOUT ME & CV BUTTONS ====================
    const aboutMeBtn = document.getElementById("aboutMeBtn");
    const cvBtn = document.getElementById("cvBtn");

    // Scroll to about section
    if (aboutMeBtn) {
        aboutMeBtn.addEventListener("click", function (e) {
            e.preventDefault();
            const aboutSection = document.getElementById("about");

            if (aboutSection) {
                window.scrollTo({
                    top: aboutSection.offsetTop - 20,
                    behavior: "smooth",
                });
            }
        });
    }

    // Open CV in new window
    if (cvBtn) {
        cvBtn.addEventListener("click", function (e) {
            e.preventDefault();
            const cvUrl = "cv.html";
            window.open(cvUrl, "_blank", "noopener,noreferrer");
        });
    }

    // ==================== SOCIAL LINKS WINDOW ====================
    const socialLinksBtn = document.getElementById("socialLinksBtn");
    const socialWindow = document.getElementById("socialWindow");
    const socialOverlay = document.getElementById("socialOverlay");
    const socialCloseBtn = document.getElementById("socialCloseBtn");

    function toggleSocialWindow(show) {
        if (show) {
            socialWindow.style.display = "block";
            socialOverlay.style.display = "block";
            document.body.style.overflow = "hidden";
        } else {
            socialWindow.style.display = "none";
            socialOverlay.style.display = "none";
            document.body.style.overflow = "";
        }
    }

    if (socialLinksBtn) {
        socialLinksBtn.addEventListener("click", function (e) {
            e.preventDefault();
            toggleSocialWindow(true);
        });
    }

    if (socialCloseBtn) {
        socialCloseBtn.addEventListener("click", function () {
            toggleSocialWindow(false);
        });
    }

    if (socialOverlay) {
        socialOverlay.addEventListener("click", function () {
            toggleSocialWindow(false);
        });
    }

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && socialWindow.style.display === "block") {
            toggleSocialWindow(false);
        }
        if (e.key === "Escape" && musicPlayer.classList.contains("active")) {
            musicPlayer.classList.remove("active");
        }
    });

    // ==================== PORTFOLIO ITEM HOVER EFFECTS ====================
    const portfolioCards = document.querySelectorAll(".portfolio-card");

    portfolioCards.forEach((card) => {
        card.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-10px)";
        });

        card.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0)";
        });
    });

    // ==================== SCROLL ANIMATIONS ====================
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll(".section, .hero");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = 1;
                        entry.target.style.transform = "translateY(0)";

                        // Animate skills when about section is in view
                        if (entry.target.id === "about") {
                            animateSkills();
                        }
                    }
                });
            },
            { threshold: 0.1 }
        );

        animatedElements.forEach((el) => {
            el.style.opacity = 0;
            el.style.transform = "translateY(30px)";
            el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
            observer.observe(el);
        });
    }

    // ==================== FLOATING ELEMENTS ANIMATION ====================
    function initFloatingElements() {
        const floatingElements = document.querySelectorAll(".floating-element");

        floatingElements.forEach((element, index) => {
            // Set different animation delays
            element.style.animationDelay = `${index * 0.5}s`;
        });
    }

    // ==================== MOBILE NAVIGATION FIX ====================
    function fixMobileNavSpacing() {
        const footer = document.querySelector("footer");
        const mobileNav = document.querySelector(".mobile-nav");

        if (footer && mobileNav && window.innerWidth <= 768) {
            const navHeight = mobileNav.offsetHeight;
            footer.style.paddingBottom = navHeight + 40 + "px";
        }
        
        // Adjust music toggle button position for mobile
        const musicToggleBtn = document.getElementById('musicToggleBtn');
        if (musicToggleBtn && window.innerWidth <= 768) {
            if (miniPlayer.classList.contains('active')) {
                musicToggleBtn.style.bottom = '170px';
            } else {
                musicToggleBtn.style.bottom = '100px';
            }
        }
    }

    // ==================== INITIALIZE EVERYTHING ====================
    function init() {
        setActiveNavLink();
        initScrollAnimations();
        initFloatingElements();
        createBackgroundAnimation();
        fixMobileNavSpacing();

        // Event listeners
        window.addEventListener("scroll", setActiveNavLink);
        window.addEventListener("resize", fixMobileNavSpacing);

        // Initialize social window state
        if (socialWindow) socialWindow.style.display = "none";
        if (socialOverlay) socialOverlay.style.display = "none";

        // Create mobile theme toggle if it doesn't exist
        if (!document.getElementById("mobileThemeToggle")) {
            const mobileToggle = document.createElement("button");
            mobileToggle.id = "mobileThemeToggle";
            mobileToggle.className = "mobile-theme-toggle";
            mobileToggle.innerHTML = '<i class="fas fa-moon"></i>';
            document.body.appendChild(mobileToggle);

            mobileToggle.addEventListener("click", toggleTheme);

            // Initialize mobile theme icon
            if (localStorage.getItem("darkMode") === "true") {
                mobileToggle.querySelector("i").classList.replace("fa-moon", "fa-sun");
            }
        }
    }

    // Start the application
    init();
    
    // Auto play music after loading (with user interaction)
    document.body.addEventListener('click', function initAudioPlay() {
        if (!isPlaying) {
            playMusic();
        }
        document.body.removeEventListener('click', initAudioPlay);
    }, { once: true });
});