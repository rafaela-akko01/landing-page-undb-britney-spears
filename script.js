document.addEventListener('DOMContentLoaded', function() {
    // Menu Toggle para dispositivos móveis
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
    
    // Efeito de scroll suave para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efeito de header fixo com mudança de estilo ao scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Animação de elementos ao scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.section-title, .bio-content, .moda-content, .moda-text, .moda-image, .moda-gallery-item, .legado-content, .legado-text, .legado-image');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Executar uma vez ao carregar a página
    
    // Efeitos de hover para elementos das seções de moda e legado
    const hoverImages = document.querySelectorAll('.moda-image, .legado-image');
    hoverImages.forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        image.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Adicionar efeito de lightbox para as imagens da galeria de moda
    const modaGalleryItems = document.querySelectorAll('.moda-gallery-item');
    
    modaGalleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            openLightbox(imgSrc);
        });
    });
    
    function openLightbox(imgSrc) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        
        const img = document.createElement('img');
        img.src = imgSrc;
        
        const closeBtn = document.createElement('span');
        closeBtn.className = 'lightbox-close';
        closeBtn.innerHTML = '&times;';
        
        lightbox.appendChild(img);
        lightbox.appendChild(closeBtn);
        document.body.appendChild(lightbox);
        
        setTimeout(() => {
            lightbox.classList.add('active');
        }, 10);
        
        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('active');
            setTimeout(() => {
                lightbox.remove();
            }, 300);
        });
        
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                setTimeout(() => {
                    lightbox.remove();
                }, 300);
            }
        });
    }
    
    // Adicionar estilos CSS para o lightbox
    const lightboxStyle = document.createElement('style');
    lightboxStyle.textContent = `
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .lightbox.active {
            opacity: 1;
        }
        
        .lightbox img {
            max-width: 90%;
            max-height: 90%;
            border: 5px solid white;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        }
        
        .lightbox-close {
            position: absolute;
            top: 20px;
            right: 30px;
            font-size: 40px;
            color: white;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .lightbox-close:hover {
            transform: scale(1.2);
            color: #e91e63;
        }
    `;
    document.head.appendChild(lightboxStyle);
    
    // Adicionar estilos CSS para animações
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .section-title, .bio-content, .moda-content, .moda-text, .moda-image, .gallery-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .section-title.animate, .bio-content.animate, .moda-content.animate, .moda-text.animate, .moda-image.animate, .gallery-item.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(animationStyle);
});