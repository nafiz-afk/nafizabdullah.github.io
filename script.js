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
    // Navigation Elements
    const nav = document.querySelector(".nav");
    const searchIcon = document.querySelector("#searchIcon");
    const navOpenBtn = document.querySelector(".navOpenBtn");
    const navCloseBtn = document.querySelector(".navCloseBtn");
    const navLinks = document.querySelectorAll(".nav-links a");
    const searchBox = document.querySelector(".search-box");
    
    // Dark Mode Toggle
    const mechanicalToggle = document.getElementById("mechanicalToggle");
    
    // About Me Section
    const aboutMeBtn = document.getElementById("aboutMeBtn");
    const aboutMeSection = document.getElementById("aboutMeSection");
    
    // CV Button
    const cvBtn = document.getElementById("cvBtn");
    
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

    // Improved Search Functionality for mobile
    searchIcon.addEventListener("click", (e) => {
        // Prevent default if it's a mobile device to avoid keyboard popup
        if (window.innerWidth <= 768) {
            e.preventDefault();
        }
        
        nav.classList.toggle("openSearch");
        nav.classList.remove("openNav");
        
        if (nav.classList.contains("openSearch")) {
            searchIcon.classList.replace("uil-search", "uil-times");
            if (window.innerWidth > 768) { // Only focus on desktop
                document.querySelector(".search-box input").focus();
            }
        } else {
            searchIcon.classList.replace("uil-times", "uil-search");
        }
    });

    // Close search when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && nav.classList.contains("openSearch")) {
            if (!searchBox.contains(e.target) && e.target !== searchIcon) {
                nav.classList.remove("openSearch");
                searchIcon.classList.replace("uil-times", "uil-search");
            }
        }
    });

    // Mobile Navigation
    navOpenBtn.addEventListener("click", () => {
        nav.classList.add("openNav");
        nav.classList.remove("openSearch");
        searchIcon.classList.replace("uil-times", "uil-search");
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
                        nav.classList.remove("openSearch");
                        searchIcon.classList.replace("uil-times", "uil-search");
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
            nav.classList.remove("openSearch");
            searchIcon.classList.replace("uil-times", "uil-search");
        }
    });
});