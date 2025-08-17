document.addEventListener("DOMContentLoaded", function () {
  // Configuration
  const CONFIG = {
    LOADER: {
      DISPLAY_TIME: 1000,
      FADE_OUT: 500,
    },
    MOBILE_BREAKPOINT: 720,
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

  // ==================== NAVBAR TOGGLE ====================
  const navbarToggle = document.querySelector(".navbar-toggle");
  const navbarMenu = document.querySelector(".navbar-menu");

  function toggleMenu(open) {
    if (open) {
      navbarToggle.classList.add("active");
      navbarMenu.classList.add("active");
      document.body.classList.add("menu-open");
      document.body.style.overflow = "hidden";
    } else {
      navbarToggle.classList.remove("active");
      navbarMenu.classList.remove("active");
      document.body.classList.remove("menu-open");
      document.body.style.overflow = "";
    }
  }

  navbarToggle?.addEventListener("click", () => {
    toggleMenu(!navbarMenu.classList.contains("active"));
  });

  document.addEventListener("click", (e) => {
    if (
      window.innerWidth <= CONFIG.MOBILE_BREAKPOINT &&
      navbarMenu.classList.contains("active") &&
      !e.target.closest(".navbar-menu") &&
      !e.target.closest(".navbar-toggle")
    ) {
      toggleMenu(false);
    }
  });

  window.addEventListener("scroll", () => {
    if (
      window.innerWidth <= CONFIG.MOBILE_BREAKPOINT &&
      navbarMenu.classList.contains("active")
    ) {
      toggleMenu(false);
    }
  });

  // ==================== DARK MODE TOGGLE ====================
  const mechanicalToggle = document.getElementById("mechanicalToggle");

  mechanicalToggle?.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    this.classList.toggle("active");
    localStorage.setItem(
      "darkMode",
      document.body.classList.contains("dark-mode")
    );
  });

  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
    mechanicalToggle?.classList.add("active");
  }

  // ==================== SMOOTH SCROLLING ====================
  const navLinks = document.querySelectorAll(".navbar-menu a");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();
        if (window.innerWidth <= CONFIG.MOBILE_BREAKPOINT) {
          toggleMenu(false);
        }

        const target = document.querySelector(href);
        if (target) {
          const targetPosition =
            target.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({ top: targetPosition, behavior: "smooth" });
        }
      }
    });
  });

  // ==================== ABOUT ME & CV BUTTONS ====================
  const aboutMeBtn = document.getElementById("aboutMeBtn");
  const cvBtn = document.getElementById("cvBtn");
  const aboutSection = document.getElementById("about");

  // Toggle About Me section
  if (aboutMeBtn && aboutSection) {
    aboutMeBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // Toggle hidden class
      aboutSection.classList.toggle("hidden-section");

      // Scroll to section if it's being shown
      if (!aboutSection.classList.contains("hidden-section")) {
        const targetPosition =
          aboutSection.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    });
  }
  window.addEventListener("DOMContentLoaded", () => {
    const progressBars = document.querySelectorAll(".skill-progress");
    progressBars.forEach((bar) => {
      const width = bar.getAttribute("data-width");
      bar.style.width = width + "%";
    });
  });

  // CV Button functionality - NEW WINDOW OPEN
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
      // Close mobile menu if open
      if (navbarMenu && navbarMenu.classList.contains("active")) {
        toggleMenu(false);
      }
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
    if (
      e.key === "Escape" &&
      socialWindow &&
      socialWindow.style.display === "block"
    ) {
      toggleSocialWindow(false);
    }
  });

  // Initialize state
  if (socialWindow) socialWindow.style.display = "none";
  if (socialOverlay) socialOverlay.style.display = "none";

  // ==================== INITIALIZE ANIMATIONS ====================
  function initAnimations() {
    const animatedElements = document.querySelectorAll(".section, .header");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    animatedElements.forEach((el) => {
      el.style.opacity = 0;
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(el);
    });
  }

  initAnimations();
});
