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

// Contact Form Submission Handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const name = document.querySelector('input[name="name"]').value;
        const email = document.querySelector('input[name="email"]').value;
        const subject = document.querySelector('input[name="subject"]').value;
        const mobile = document.querySelector('input[name="mobile"]').value;
        const message = document.querySelector('textarea[name="message"]').value;
        
        // Validate form data
        if (!name || !email || !subject || !mobile || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
        
        try {
            // Google Apps Script Web App URL - Connected to your Google Sheet
            const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxE6qjgevagWHaLlM90AOFbIsxuUxbIKp2SJZKOGED1nt8uZuy0cmz486wCTctVUq1cIA/exec';
            
            // Prepare the data
            const formData = {
                name: name,
                email: email,
                subject: subject,
                mobile: mobile,
                message: message
            };
            
            // Send data to Google Apps Script
            const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            // Wait a moment for the data to be processed
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Show success message
            alert('✓ Thank you! Your message has been sent successfully.\n\nWe have received your details and will get back to you soon.');
            
            // Reset form
            contactForm.reset();
            
            // Scroll to top after success
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to send message. Please try again.');
        } finally {
            // Restore button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Send Email Button - Redirect to Form
const sendEmailLink = document.querySelector('a[href="mailto:aarsh4344@gmail.com"]');
if (sendEmailLink) {
    sendEmailLink.addEventListener('click', (e) => {
        e.preventDefault();
        // Scroll to contact form
        const form = document.querySelector('.contact-form');
        form.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Focus on first input
        form.querySelector('input[name="name"]').focus();
    });
}