/* ========================================
   Portfolio - Custom JavaScript
   Author: John Doe
   ======================================== */

'use strict';

// ===== Wait for DOM to load =====
document.addEventListener('DOMContentLoaded', () => {

    // ===== 1. Initialize AOS Animation Library =====
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 50,
    });

    // ===== 2. Typed.js Effect =====
    const typedElement = document.querySelector('.typed-text');
    if (typedElement) {
        new Typed(typedElement, {
            strings: [
                'Full-Stack Developer',
                'UI/UX Enthusiast',
                'Open Source Contributor',
                'Tech Innovator',
            ],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 1500,
            loop: true,
            showCursor: false,
        });
    }

    // ===== 3. Navbar Scroll Effect =====
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;

        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    });

    // ===== 4. Active Nav Link on Scroll (Smooth Highlight) =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        let current = '';
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;

            if (scrollPos >= top && scrollPos < top + height) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);

    // ===== 5. Project Filtering =====
    const filterButtons = document.querySelectorAll('.btn-filter');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            projectItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 50);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // ===== 6. Contact Form Handling =====
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Reset previous state
            formStatus.classList.add('d-none');
            formStatus.classList.remove('alert-success', 'alert-danger');

            // Validate fields
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            let isValid = true;

            // Bootstrap validation
            const inputs = [name, email, subject, message];
            const fields = ['name', 'email', 'subject', 'message'];

            fields.forEach((field, index) => {
                const input = document.getElementById(field);
                if (!inputs[index]) {
                    input.classList.add('is-invalid');
                    isValid = false;
                } else {
                    input.classList.remove('is-invalid');
                    input.classList.add('is-valid');
                }
            });

            // Email regex validation
            const emailInput = document.getElementById('email');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email && !emailPattern.test(email)) {
                emailInput.classList.add('is-invalid');
                isValid = false;
            }

            if (!isValid) return;

            // Simulate sending
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Sending...';

            // Simulate API request (replace with actual fetch)
            setTimeout(() => {
                // Success
                formStatus.classList.remove('d-none');
                formStatus.classList.add('alert-success');
                formStatus.textContent = '✅ Thank you! Your message has been sent successfully.';

                // Reset form
                contactForm.reset();
                document.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));

                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="bi bi-send me-2"></i>Send Message';

                // Auto-hide status
                setTimeout(() => {
                    formStatus.classList.add('d-none');
                }, 5000);
            }, 2000);
        });
    }

    // ===== 7. Scroll to Top Button =====
    const scrollToTopBtn = document.getElementById('scrollToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    });

    // ===== 8. Close Mobile Nav on Link Click =====
    const navLinksMobile = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.getElementById('navbarNav');
    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);

    navLinksMobile.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                // Use Bootstrap collapse to close
                const collapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                collapse.hide();
            }
        });
    });

    // ===== 9. Smooth Page Load =====
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });

});
