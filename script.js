document.addEventListener('DOMContentLoaded', function() {
    // ==================== NAVIGATION ====================
    const nav = document.querySelector(".nav");
    const navOpenBtn = document.querySelector(".navOpenBtn");
    const navCloseBtn = document.querySelector(".navCloseBtn");
    const navLinks = document.querySelectorAll(".nav-links a");
    const navLinksContainer = document.querySelector(".nav-links");
    const socialLinksBtn = document.getElementById("socialLinksBtn");
    
    // ==================== MOBILE NAVIGATION ====================
    function toggleMobileMenu(open) {
        if (open) {
            navLinksContainer.classList.add("openNav");
            document.body.classList.add("menu-open");
        } else {
            navLinksContainer.classList.remove("openNav");
            document.body.classList.remove("menu-open");
        }
    }
    
    // Open mobile menu
    navOpenBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleMobileMenu(true);
    });
    
    // Close mobile menu
    navCloseBtn.addEventListener("click", () => {
        toggleMobileMenu(false);
    });
    
    // Close menu when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && navLinksContainer.classList.contains("openNav")) {
            if (!e.target.closest('.nav-links') && !e.target.closest('.navOpenBtn')) {
                toggleMobileMenu(false);
            }
        }
    });
    
    // Close menu when scrolling on mobile
    window.addEventListener('scroll', function() {
        if (window.innerWidth <= 768 && navLinksContainer.classList.contains("openNav")) {
            toggleMobileMenu(false);
        }
    });
    
    // ==================== SMOOTH SCROLLING ====================
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    toggleMobileMenu(false);
                }
                
                // Scroll to target
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
            
            // Update active link
            navLinks.forEach(item => item.classList.remove("active"));
            link.classList.add("active");
        });
    });
    
    // ==================== STICKY NAVBAR ON SCROLL ====================
    function handleScroll() {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // ==================== SOCIAL LINKS WINDOW ====================
    const socialWindow = document.getElementById("socialWindow");
    const socialOverlay = document.getElementById("socialOverlay");
    const socialCloseBtn = document.getElementById("socialCloseBtn");
    
    function toggleSocialWindow(open) {
        if (open) {
            socialWindow.classList.add("active");
            socialOverlay.classList.add("active");
            document.body.style.overflow = "hidden";
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                toggleMobileMenu(false);
            }
        } else {
            socialWindow.classList.remove("active");
            socialOverlay.classList.remove("active");
            document.body.style.overflow = "";
        }
    }
    
    socialLinksBtn.addEventListener("click", (e) => {
        e.preventDefault();
        toggleSocialWindow(true);
    });
    
    socialCloseBtn.addEventListener("click", () => toggleSocialWindow(false));
    socialOverlay.addEventListener("click", () => toggleSocialWindow(false));
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape") {
            if (socialWindow.classList.contains("active")) {
                toggleSocialWindow(false);
            } else if (navLinksContainer.classList.contains("openNav")) {
                toggleMobileMenu(false);
            }
        }
    });
    
    // ==================== DARK MODE TOGGLE ====================
    const mechanicalToggle = document.getElementById("mechanicalToggle");
    
    mechanicalToggle.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");
        this.classList.toggle("active");
        
        // Save preference to localStorage
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
    });
    
    // Check for saved dark mode preference
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
        mechanicalToggle.classList.add("active");
    }
    
    // ==================== ABOUT ME SECTION ====================
    const aboutMeBtn = document.getElementById("aboutMeBtn");
    const aboutMeSection = document.getElementById("aboutMeSection");
    
    aboutMeBtn.addEventListener("click", function() {
        aboutMeSection.style.display = aboutMeSection.style.display === "none" ? "block" : "none";
        
        if (aboutMeSection.style.display === "block") {
            aboutMeSection.scrollIntoView({ behavior: "smooth" });
            animateSkillBars();
        }
    });
    
    // ==================== SKILL BARS ANIMATION ====================
    const skillProgressBars = document.querySelectorAll(".skill-progress");
    
    function animateSkillBars() {
        skillProgressBars.forEach(bar => {
            const width = bar.getAttribute("data-width");
            bar.style.width = width + "%";
        });
    }
    
    // ==================== CV BUTTON ====================
    const cvBtn = document.getElementById("cvBtn");
    
    cvBtn.addEventListener("click", function() {
        window.open('cv.html', '_blank', 'width=1000,height=800,scrollbars=yes')?.focus();
    });
    
    // ==================== INITIALIZE ANIMATIONS ====================
    function initAnimations() {
        const animatedElements = document.querySelectorAll('.section, .header');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(el => {
            el.style.opacity = 0;
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    initAnimations();
    
    // ==================== WINDOW RESIZE HANDLER ====================
    function handleResize() {
        if (window.innerWidth > 768) {
            // Reset mobile-specific states when resizing to desktop
            toggleMobileMenu(false);
        }
    }
    
    window.addEventListener('resize', handleResize);
    
    // ==================== LOADING SCREEN ====================
    window.addEventListener('load', function() {
        setTimeout(function() {
            const loader = document.getElementById('loader');
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(function() {
                    loader.style.display = 'none';
                }, 200);
            }
        }, 1000);
    });
    
    // Initialize
    handleResize();
    handleScroll();
});