// Loading Screen Functionality
window.addEventListener('load', function() {
    setTimeout(function() {
        const loader = document.getElementById('loader');
        loader.style.opacity = '0';
        setTimeout(function() {
            loader.style.display = 'none';
        }, 200); 
    }, 1000); 
});

document.addEventListener('DOMContentLoaded', function() {
    // Navigation Elements - Make sure nav has higher z-index than social window
    const nav = document.querySelector(".nav");
    nav.style.zIndex = "1001"; // Higher than social window's 1000
    
    const navOpenBtn = document.querySelector(".navOpenBtn");
    const navCloseBtn = document.querySelector(".navCloseBtn");
    const navLinks = document.querySelectorAll(".nav-links a");
    
    // Remove any green tick marks from nav links
    navLinks.forEach(link => {
        const ticks = link.querySelectorAll(".fa-check, .fa-check-circle");
        ticks.forEach(tick => tick.remove());
    });

    // Dark Mode Toggle
    const mechanicalToggle = document.getElementById("mechanicalToggle");
    
    // About Me Section
    const aboutMeBtn = document.getElementById("aboutMeBtn");
    const aboutMeSection = document.getElementById("aboutMeSection");
    
    // CV Button
    const cvBtn = document.getElementById("cvBtn");
    
    // Social Links Elements
    const socialLinksBtn = document.getElementById("socialLinksBtn");
    const socialWindow = document.getElementById("socialWindow");
    const socialOverlay = document.getElementById("socialOverlay");
    const socialCloseBtn = document.getElementById("socialCloseBtn");
    
    // Remove any green ticks from social window if they exist
    const socialTicks = socialWindow.querySelectorAll(".fa-check, .fa-check-circle");
    socialTicks.forEach(tick => tick.remove());
    
    // Skill Progress Bars
    const skillProgressBars = document.querySelectorAll(".skill-progress");

    let atTop = true;

    // Navbar scroll behavior
    function handleScroll() {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
            atTop = false;
        } else {
            nav.classList.remove('scrolled');
            atTop = true;
        }
    }

    window.addEventListener('scroll', handleScroll);

    // Mobile Navigation Toggle
    navOpenBtn.addEventListener("click", () => {
        nav.classList.add("openNav");
    });
    
    navCloseBtn.addEventListener("click", () => {
        nav.classList.remove("openNav");
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            // Handle smooth scrolling for anchor links
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    // Close mobile menu if open
                    if (window.innerWidth <= 768) {
                        nav.classList.remove("openNav");
                    }
                    
                    // Scroll to target
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });

                    // Special handling for About section
                    if (href === "#about") {
                        // Ensure About section is visible
                        aboutMeSection.style.display = "block";
                        // Animate skill bars
                        animateSkillBars();
                    }

                    // Force navbar to reappear when we reach top
                    const checkIfAtTop = () => {
                        if (window.scrollY <= 100) {
                            nav.classList.remove('scrolled');
                            window.removeEventListener('scroll', checkIfAtTop);
                        }
                    };
                    window.addEventListener('scroll', checkIfAtTop);
                }
            }
            
            // Update active link
            navLinks.forEach(item => item.classList.remove("active"));
            link.classList.add("active");
        });
    });
    
    // Social Links Window Functionality
    socialLinksBtn.addEventListener("click", (e) => {
        e.preventDefault();
        socialWindow.classList.add("active");
        socialOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
        
        // Close mobile menu if open
        if (window.innerWidth <= 768) {
            nav.classList.remove("openNav");
        }
    });
    
    // Close Social Window
    const closeSocialWindow = () => {
        socialWindow.classList.remove("active");
        socialOverlay.classList.remove("active");
        document.body.style.overflow = "";
    };
    
    socialCloseBtn.addEventListener("click", closeSocialWindow);
    socialOverlay.addEventListener("click", closeSocialWindow);
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape" && socialWindow.classList.contains("active")) {
            closeSocialWindow();
        }
    });
    
    // Dark Mode Toggle
    mechanicalToggle.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");
        this.classList.toggle("active");
        
        // Save preference to localStorage
        const isDarkMode = document.body.classList.contains("dark-mode");
        localStorage.setItem("darkMode", isDarkMode);
    });
    
    // Check for saved dark mode preference
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
        mechanicalToggle.classList.add("active");
    }
    
    // About Me Section Toggle
    aboutMeBtn.addEventListener("click", function() {
        aboutMeSection.style.display = aboutMeSection.style.display === "none" ? "block" : "none";
        
        if (aboutMeSection.style.display === "block") {
            aboutMeSection.scrollIntoView({ behavior: "smooth" });
            // Animate skill bars when section is shown
            animateSkillBars();
        }
    });
    
    // CV Button functionality
    cvBtn.addEventListener("click", function() {
        // Open CV in a new window with specific dimensions
        const cvWindow = window.open('cv.html', '_blank', 'width=1000,height=800,scrollbars=yes');
        
        // Focus the window if it exists
        if (cvWindow) {
            cvWindow.focus();
        }
    });
    
    // Animate skill bars
    function animateSkillBars() {
        skillProgressBars.forEach(bar => {
            const width = bar.getAttribute("data-width");
            bar.style.width = width + "%";
        });
    }
    
    // Initialize animations
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

    // Ensure navbar reappears when clicking logo or other top elements
    document.querySelector('.logo')?.addEventListener('click', function(e) {
        if (window.scrollY > 100) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Force navbar to reappear when we reach top
            const checkIfAtTop = () => {
                if (window.scrollY <= 100) {
                    nav.classList.remove('scrolled');
                    window.removeEventListener('scroll', checkIfAtTop);
                }
            };
            window.addEventListener('scroll', checkIfAtTop);
        }
    });

    // Handle window resize to ensure proper mobile behavior
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // Reset mobile-specific states when resizing to desktop
            nav.classList.remove("openNav");
        }
    });
});
