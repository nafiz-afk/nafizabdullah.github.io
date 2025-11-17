document.addEventListener("DOMContentLoaded", function () {
    // Configuration
    const CONFIG = {
        LOADER: {
            DISPLAY_TIME: 1000,
            FADE_OUT: 500,
        },
        MOBILE_BREAKPOINT: 768,
    };

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
        const background = document.querySelector('.background-animation') || document.createElement('div');
        if (!document.querySelector('.background-animation')) {
            background.className = 'background-animation';
            document.body.appendChild(background);
        }

        // Create bubbles
        for (let i = 0; i < 15; i++) {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            
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

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 20,
                    behavior: "smooth"
                });
            }
        });
    });

    // ==================== SKILLS ANIMATION ====================
    function animateSkills() {
        const skillBars = document.querySelectorAll(".skill-progress");
        
        skillBars.forEach(bar => {
            const width = bar.getAttribute("data-width");
            bar.style.width = width + "%";
        });
    }

    // ==================== ABOUT ME & CV BUTTONS ====================
    const aboutMeBtn = document.getElementById("aboutMeBtn");
    const cvBtn = document.getElementById("cvBtn");

    // Scroll to about section
    if (aboutMeBtn) {
        aboutMeBtn.addEventListener("click", function(e) {
            e.preventDefault();
            const aboutSection = document.getElementById("about");
            
            if (aboutSection) {
                window.scrollTo({
                    top: aboutSection.offsetTop - 20,
                    behavior: "smooth"
                });
            }
        });
    }

    // Open CV in new window
    if (cvBtn) {
        cvBtn.addEventListener("click", function(e) {
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
        socialLinksBtn.addEventListener("click", function(e) {
            e.preventDefault();
            toggleSocialWindow(true);
        });
    }

    if (socialCloseBtn) {
        socialCloseBtn.addEventListener("click", function() {
            toggleSocialWindow(false);
        });
    }

    if (socialOverlay) {
        socialOverlay.addEventListener("click", function() {
            toggleSocialWindow(false);
        });
    }

    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape" && socialWindow.style.display === "block") {
            toggleSocialWindow(false);
        }
    });

    // ==================== PORTFOLIO ITEM HOVER EFFECTS ====================
    const portfolioCards = document.querySelectorAll(".portfolio-card");
    
    portfolioCards.forEach(card => {
        card.addEventListener("mouseenter", function() {
            this.style.transform = "translateY(-10px)";
        });
        
        card.addEventListener("mouseleave", function() {
            this.style.transform = "translateY(0)";
        });
    });

    // ==================== SCROLL ANIMATIONS ====================
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll(".section, .hero");
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = "translateY(0)";
                    
                    // Animate skills when about section is in view
                    if (entry.target.id === "about") {
                        animateSkills();
                    }
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(el => {
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
        const footer = document.querySelector('footer');
        const mobileNav = document.querySelector('.mobile-nav');
        
        if (footer && mobileNav && window.innerWidth <= 768) {
            const navHeight = mobileNav.offsetHeight;
            footer.style.paddingBottom = (navHeight + 40) + 'px';
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
        if (!document.getElementById('mobileThemeToggle')) {
            const mobileToggle = document.createElement('button');
            mobileToggle.id = 'mobileThemeToggle';
            mobileToggle.className = 'mobile-theme-toggle';
            mobileToggle.innerHTML = '<i class="fas fa-moon"></i>';
            document.body.appendChild(mobileToggle);
            
            mobileToggle.addEventListener('click', toggleTheme);
            
            // Initialize mobile theme icon
            if (localStorage.getItem("darkMode") === "true") {
                mobileToggle.querySelector('i').classList.replace("fa-moon", "fa-sun");
            }
        }
    }

    // Start the application
    init();
});