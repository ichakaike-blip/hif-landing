// ===================================
// FALLING CIRCLES ANIMATION
// ===================================
const canvas = document.getElementById('fallingCircles');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Circle class
class Circle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = -20; // Start above the canvas
        this.radius = Math.random() * 15 + 5; // Random size between 5-20px
        this.speed = Math.random() * 2 + 1; // Random speed
        this.opacity = Math.random() * 0.5 + 0.3; // Random opacity 0.3-0.8

        // Random RGB color
        this.r = Math.floor(Math.random() * 256);
        this.g = Math.floor(Math.random() * 256);
        this.b = Math.floor(Math.random() * 256);
    }

    update() {
        this.y += this.speed;

        // Reset if circle goes off screen
        if (this.y - this.radius > canvas.height) {
            this.reset();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.opacity})`;
        ctx.fill();
    }
}

// Create circles
const circles = [];
const circleCount = 30; // Number of circles

for (let i = 0; i < circleCount; i++) {
    circles.push(new Circle());
    // Stagger initial positions
    circles[i].y = Math.random() * canvas.height;
}

// Draw the horizontal line at top
function drawLine() {
    ctx.beginPath();
    ctx.moveTo(0, 50);
    ctx.lineTo(canvas.width, 50);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.lineWidth = 2;
    ctx.stroke();
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawLine();

    circles.forEach(circle => {
        circle.update();
        circle.draw();
    });

    requestAnimationFrame(animate);
}

animate();

// ===================================
// ORIGINAL SCRIPT CONTENT
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .problem-card, .solution-card, .step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Formspree handles form submission automatically
// No custom JavaScript needed - the form submits directly to Formspree


// Add hover effect to stat boxes
const statBoxes = document.querySelectorAll('.stat-box');
statBoxes.forEach(box => {
    box.addEventListener('mouseenter', () => {
        box.style.transform = 'scale(1.05)';
        box.style.transition = 'transform 0.3s ease';
    });

    box.addEventListener('mouseleave', () => {
        box.style.transform = 'scale(1)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');

    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Add typing effect to hero title (optional enhancement)
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    heroTitle.style.opacity = '1';

    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 30);
        }
    };

    // Uncomment to enable typing effect
    // setTimeout(typeWriter, 500);
}

// Mobile menu toggle (for future enhancement)
const createMobileMenu = () => {
    const navLinks = document.querySelector('.nav-links');
    const menuBtn = document.createElement('button');
    menuBtn.className = 'mobile-menu-btn';
    menuBtn.innerHTML = '☰';
    menuBtn.style.display = 'none';

    if (window.innerWidth <= 768) {
        menuBtn.style.display = 'block';
    }

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.querySelector('.nav-content').prepend(menuBtn);
};

// Initialize
window.addEventListener('load', () => {
    // Add any initialization code here
    console.log('HIF Landing Page Loaded');
});
