document.addEventListener("DOMContentLoaded", () => {
  // Initialize EmailJS
  const emailjs = window.emailjs
  emailjs.init("QFwMdrU1TQazGmqQx")

  // Preloader
  window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader")
    setTimeout(() => {
      preloader.style.opacity = "0"
      setTimeout(() => {
        preloader.style.display = "none"
      }, 500)
    }, 1000)
  })

  // Navbar active state and transparency on scroll
  const navbar = document.getElementById("navbar")
  const navLinks = document.querySelectorAll(".nav-link")
  const sections = document.querySelectorAll("section")
  const backToTop = document.getElementById("back-to-top")
  const navbarToggler = document.querySelector(".navbar-toggler")
  const navbarCollapse = document.getElementById("navbarNav")
  const scrollDownBtn = document.querySelector(".scroll-down a")

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    const isNavbarOpen = navbarCollapse.classList.contains("show")
    if (isNavbarOpen && !navbarCollapse.contains(e.target) && e.target !== navbarToggler) {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse)
      bsCollapse.hide()
    }
  })

  window.addEventListener("scroll", () => {
    // Navbar transparency
    if (window.scrollY > 50) {
      navbar.classList.add("navbar-scrolled")
    } else {
      navbar.classList.remove("navbar-scrolled")
    }

    // Back to top button visibility
    if (window.scrollY > 300) {
      backToTop.classList.add("active")
    } else {
      backToTop.classList.remove("active")
    }

    // Active nav link based on scroll position
    let current = ""
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.offsetHeight
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  })

  // Improved smooth scrolling for navbar links with better offset
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      // Calculate a better offset based on which section is being navigated to
      let offset = 0

      if (targetId === "#home") {
        offset = 0 // No offset for home section
      } else if (targetId === "#about") {
        offset = 70 // Smaller offset to show more of the about section
      } else if (targetId === "#skills") {
        offset = 70 // Smaller offset to show more of the skills section
      } else if (targetId === "#contact") {
        offset = 70 // Smaller offset to show more of the contact section
      }

      window.scrollTo({
        top: targetSection.offsetTop - offset,
        behavior: "smooth",
      })

      // Close mobile menu after clicking
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse)
        bsCollapse.hide()
      }
    })
  })

  // Scroll down button - Fixed to ensure About Me title is fully visible
  if (scrollDownBtn) {
    scrollDownBtn.addEventListener("click", (e) => {
      e.preventDefault()
      const aboutSection = document.querySelector("#about")

      // Use a larger offset (100px) to ensure the About Me title is fully visible
      const offset = 40

      window.scrollTo({
        top: aboutSection.offsetTop - offset,
        behavior: "smooth",
      })
    })
  }

  // Back to top button
  backToTop.addEventListener("click", (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Typing effect for home section
  const Typed = window.Typed
  new Typed("#typed-output", {
    strings: ["Student", "Programmer", "Develover"],
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 1500,
    loop: true,
  })

  // Form submission with EmailJS
  const form = document.getElementById("contact-form")

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault()

      const formData = new FormData(form)
      const messageData = Object.fromEntries(formData.entries())

      // Disable submit button and show loading state
      const submitButton = form.querySelector('button[type="submit"]')
      const originalButtonText = submitButton.innerHTML
      submitButton.disabled = true
      submitButton.innerHTML = '<span>Mengirim...</span> <i class="fas fa-spinner fa-spin"></i>'

      emailjs
        .send(
          "service_72vpjrg",
          "template_tpzplb4",
          {
            name: messageData.name,
            email: messageData.email,
            subject: messageData.subject || "No Subject",
            message: messageData.message,
          },
          "QFwMdrU1TQazGmqQx",
        )
        .then((response) => {
          console.log("Email sent successfully:", response)

          // Show success message with enhanced SweetAlert
          const Swal = window.Swal
          Swal.fire({
            title: "Pesan Terkirim!",
            text: "Terima kasih telah menghubungi saya. Saya akan segera membalas pesan Anda.",
            icon: "success",
            confirmButtonText: "Tutup",
            confirmButtonColor: "#4361ee",
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          })

          // Reset form
          form.reset()
        })
        .catch((error) => {
          console.error("Email sending failed:", error)

          // Show error message
          const Swal = window.Swal
          Swal.fire({
            title: "Gagal Mengirim!",
            text: "Terjadi kesalahan saat mengirim pesan. Silakan coba lagi nanti.",
            icon: "error",
            confirmButtonText: "Tutup",
            confirmButtonColor: "#4361ee",
          })
        })
        .finally(() => {
          // Re-enable submit button and restore original text
          submitButton.disabled = false
          submitButton.innerHTML = originalButtonText
        })
    })
  }

  // Theme toggle functionality
  const toggleThemeBtn = document.getElementById("theme-toggle")
  const body = document.body
  const themeIcon = toggleThemeBtn.querySelector("i")

  function setTheme(mode) {
    if (mode === "dark") {
      body.classList.add("dark-mode")
      themeIcon.className = "fas fa-sun"
      localStorage.setItem("theme", "dark")
    } else {
      body.classList.remove("dark-mode")
      themeIcon.className = "fas fa-moon"
      localStorage.setItem("theme", "light")
    }
  }

  // Check user preference
  const savedTheme = localStorage.getItem("theme") || "light"
  setTheme(savedTheme)

  // Toggle theme on button click
  toggleThemeBtn.addEventListener("click", () => {
    const currentTheme = body.classList.contains("dark-mode") ? "dark" : "light"
    setTheme(currentTheme === "dark" ? "light" : "dark")
  })

  // Animation on scroll
  const animateElements = document.querySelectorAll(".animate__animated")

  function checkIfInView() {
    animateElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const elementVisible = 150

      if (elementTop < window.innerHeight - elementVisible) {
        element.style.visibility = "visible"
        element.style.opacity = "1"
      }
    })
  }

  // Set initial visibility
  animateElements.forEach((element) => {
    element.style.visibility = "hidden"
    element.style.opacity = "0"
    element.style.transition = "opacity 0.5s ease"
  })

  // Check elements on load and scroll
  window.addEventListener("load", checkIfInView)
  window.addEventListener("scroll", checkIfInView)

  // Handle resize events for responsive adjustments
  window.addEventListener("resize", () => {
    checkIfInView()
  })

  const bootstrap = window.bootstrap
})

