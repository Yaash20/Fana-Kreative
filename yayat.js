document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
    }
    
    // Cart Sidebar
    const cartIcon = document.querySelector('.header-icons .icon:last-child');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const closeCart = document.querySelector('.close-cart');
    const overlay = document.querySelector('.overlay');
    
    if (cartIcon && cartSidebar && closeCart && overlay) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            cartSidebar.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        closeCart.addEventListener('click', function() {
            cartSidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        overlay.addEventListener('click', function() {
            cartSidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Product Quick View
    const quickViewButtons = document.querySelectorAll('.quick-view');
    
    quickViewButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Implement quick view functionality
            // This could open a modal with product details
            console.log('Quick view clicked');
        });
    });
    
    // Product Color Selection
    const colorOptions = document.querySelectorAll('.color');
    
    colorOptions.forEach(function(option) {
        option.addEventListener('click', function() {
            const parent = this.parentElement;
            parent.querySelectorAll('.color').forEach(function(el) {
                el.classList.remove('selected');
            });
            this.classList.add('selected');
        });
    });
    
    // Add to Cart functionality
    function addToCart(productId, productName, productPrice, productColor, productQuantity) {
        // Here you would add the product to the cart
        // This is just a placeholder for demonstration
        console.log(`Added to cart: ${productName} (${productColor}), Quantity: ${productQuantity}, Price: ${productPrice}`);
        
        // Update cart count
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = parseInt(cartCount.textContent) + productQuantity;
        }
        
        // Show notification
        showNotification(`${productName} ditambahkan ke keranjang!`);
    }
    
    // Notification function
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(function() {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(function() {
            notification.classList.remove('show');
            setTimeout(function() {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Add CSS for notifications
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #333;
            color: #fff;
            padding: 12px 20px;
            border-radius: 4px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1002;
        }
        .notification.show {
            transform: translateY(0);
            opacity: 1;
        }
    `;
    document.head.appendChild(notificationStyle);
    
    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                // Here you would handle the email submission to your backend
                showNotification('Terima kasih telah berlangganan newsletter kami!');
                emailInput.value = '';
            }
        });
    }
    
    // Product Carousel for Homepage (simplified version)
    function setupCarousel() {
        const carousel = document.querySelector('.featured-products .products-grid');
        if (!carousel) return;
        
        let isDown = false;
        let startX;
        let scrollLeft;
        
        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            carousel.classList.add('active');
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });
        
        carousel.addEventListener('mouseleave', () => {
            isDown = false;
            carousel.classList.remove('active');
        });
        
        carousel.addEventListener('mouseup', () => {
            isDown = false;
            carousel.classList.remove('active');
        });
        
        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2; // scroll speed
            carousel.scrollLeft = scrollLeft - walk;
        });
    }
    
    // Initialize carousel functionality
    setupCarousel();
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add intersection observers for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    document.querySelectorAll('.product-card, .category-card, .section-title').forEach(el => {
        observer.observe(el);
    });
    
    // Add CSS for scroll animations
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .product-card, .category-card, .section-title {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .product-card.in-view, .category-card.in-view, .section-title.in-view {
            opacity: 1;
            transform: translateY(0);
        }
        
        .section-title {
            transition-delay: 0.1s;
        }
        
        .product-card:nth-child(1), .category-card:nth-child(1) {
            transition-delay: 0.2s;
        }
        
        .product-card:nth-child(2), .category-card:nth-child(2) {
            transition-delay: 0.3s;
        }
        
        .product-card:nth-child(3) {
            transition-delay: 0.4s;
        }
        
        .product-card:nth-child(4) {
            transition-delay: 0.5s;
        }
    `;
    document.head.appendChild(animationStyle);
});