/* DOM Elements */
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const header = document.querySelector('.header');
const darkModeIcon = document.querySelector('#darkMode-icon');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

/* Navigation Functions */
const toggleMenu = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

const removeMenuOnScroll = () => {
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

/* Scroll Functions */
const handleScroll = () => {
    // Sticky header
    header.classList.toggle('sticky', window.scrollY > 100);
    
    // Active section highlighting
    sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector(`header nav a[href*='${id}']`).classList.add('active');
            });
        }
    });
};

/* Theme Functions */
const toggleDarkMode = () => {
    darkModeIcon.classList.toggle('bx-sun');
    document.body.classList.toggle('dark-mode');
};

/* Swiper Configuration */
const initSwiper = () => {
    new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 50,
        loop: true,
        grabCursor: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
};

/* Scroll Reveal Configuration */
const initScrollReveal = () => {
    ScrollReveal({
        distance: '80px',
        duration: 2000,
        delay: 200
    });

    ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
    ScrollReveal().reveal('.home-img img, .services-container, .portfolio-box, .testimonial-wrapper, .contact form', { origin: 'bottom' });
    ScrollReveal().reveal('.home-content h1, .about-img img', { origin: 'left' });
    ScrollReveal().reveal('.home-content h3, .home-content p, .about-content', { origin: 'right' });
};

/* Event Listeners */
menuIcon.addEventListener('click', toggleMenu);
window.addEventListener('scroll', handleScroll);
window.addEventListener('scroll', removeMenuOnScroll);
darkModeIcon.addEventListener('click', toggleDarkMode);

/* Initialize Third-party Libraries */
document.addEventListener('DOMContentLoaded', () => {
    initSwiper();
    initScrollReveal();
});

// Video Modal Functionality
const logo = document.querySelector('.logo');
const videoModal = document.getElementById('videoModal');
const portfolioVideo = document.getElementById('portfolioVideo');
const closeVideo = document.querySelector('.close-video');

logo.addEventListener('click', (e) => {
    e.preventDefault();
    videoModal.style.display = 'flex';
    // Trigger reflow
    videoModal.offsetHeight;
    videoModal.classList.add('active');
    portfolioVideo.play();
});

closeVideo.addEventListener('click', () => {
    videoModal.classList.remove('active');
    setTimeout(() => {
        videoModal.style.display = 'none';
        portfolioVideo.pause();
        portfolioVideo.currentTime = 0;
    }, 300);
});

videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        videoModal.classList.remove('active');
        setTimeout(() => {
            videoModal.style.display = 'none';
            portfolioVideo.pause();
            portfolioVideo.currentTime = 0;
        }, 300);
    }
});