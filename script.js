document.addEventListener('DOMContentLoaded', function () {
    // NAVIGATION ELEMENTS
    const nav = document.querySelector(".nav");
    const navOpenBtn = document.querySelector(".navOpenBtn");
    const navCloseBtn = document.querySelector(".navCloseBtn");
    const navLinks = document.querySelectorAll(".nav-links a");
    const navLinksContainer = document.querySelector(".nav-links");
    const socialLinksBtn = document.getElementById("socialLinksBtn");

    // TOGGLE MOBILE MENU
    function toggleMobileMenu(open) {
        navLinksContainer.classList.toggle("openNav", open);
        document.body.classList.toggle("menu-open", open);
        document.body.style.overflow = open ? "hidden" : "";
    }

    navOpenBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleMobileMenu(true);
    });

    navCloseBtn.addEventListener("click", () => {
        toggleMobileMenu(false);
    });

    document.addEventListener("click", (e) => {
        if (window.innerWidth <= 768 &&
            navLinksContainer.classList.contains("openNav") &&
            !e.target.closest(".nav-links") &&
            !e.target.closest(".navOpenBtn")) {
            toggleMobileMenu(false);
        }
    });

    window.addEventListener("scroll", () => {
        if (window.innerWidth <= 768 && navLinksContainer.classList.contains("openNav")) {
            toggleMobileMenu(false);
        }
    });

    // SMOOTH SCROLL
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");
            if (href.startsWith("#")) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const navHeight = nav.offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });
                    toggleMobileMenu(false);
                }
            }
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
        });
    });

    // STICKY NAVBAR
    function handleScroll() {
        nav.classList.add("fixed-nav");
        if (window.scrollY > 100) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
    }
    window.addEventListener("scroll", handleScroll);

    // SOCIAL LINKS POPUP
    const socialWindow = document.getElementById("socialWindow");
    const socialOverlay = document.getElementById("socialOverlay");
    const socialCloseBtn = document.getElementById("socialCloseBtn");

    function toggleSocialWindow(open) {
        socialWindow.classList.toggle("active", open);
        socialOverlay.classList.toggle("active", open);
        document.body.style.overflow = open ? "hidden" : "";

        if (open && window.innerWidth <= 768) toggleMobileMenu(false);
    }

    socialLinksBtn?.addEventListener("click", (e) => {
        e.preventDefault();
        toggleSocialWindow(true);
    });

    socialCloseBtn?.addEventListener("click", () => toggleSocialWindow(false));
    socialOverlay?.addEventListener("click", () => toggleSocialWindow(false));

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            toggleMobileMenu(false);
            toggleSocialWindow(false);
        }
    });

    // DARK MODE TOGGLE
    const mechanicalToggle = document.getElementById("mechanicalToggle");
    mechanicalToggle?.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        this.classList.toggle("active");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
    });
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
        mechanicalToggle?.classList.add("active");
    }

    // ABOUT ME SECTION
    const aboutMeBtn = document.getElementById("aboutMeBtn");
    const aboutMeSection = document.getElementById("aboutMeSection");

    aboutMeBtn?.addEventListener("click", () => {
        const isVisible = aboutMeSection.style.display === "block";
        aboutMeSection.style.display = isVisible ? "none" : "block";

        if (!isVisible) {
            const navHeight = nav.offsetHeight;
            const targetPosition = aboutMeSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
            window.scrollTo({ top: targetPosition, behavior: "smooth" });
            animateSkillBars();
        }
    });

    // SKILL BARS
    const skillProgressBars = document.querySelectorAll(".skill-progress");
    function animateSkillBars() {
        skillProgressBars.forEach(bar => {
            const width = bar.getAttribute("data-width");
            bar.style.width = width + "%";
        });
    }

    // CV BUTTON
    const cvBtn = document.getElementById("cvBtn");
    cvBtn?.addEventListener("click", () => {
        window.open('cv.html', '_blank', 'width=1000,height=800,scrollbars=yes')?.focus();
    });

    // ANIMATIONS ON VIEW
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

    // WINDOW RESIZE HANDLER
    function handleResize() {
        if (window.innerWidth > 768) {
            toggleMobileMenu(false);
        }
    }
    window.addEventListener('resize', handleResize);

    // LOADER
    window.addEventListener('load', () => {
        setTimeout(() => {
            const loader = document.getElementById("loader");
            if (loader) {
                loader.style.opacity = "0";
                setTimeout(() => loader.style.display = "none", 200);
            }
        }, 1000);
    });

    // INIT
    handleResize();
    handleScroll();
});
