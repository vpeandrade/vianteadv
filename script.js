document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const menu = document.querySelector('.menu ul');
    const menuLinks = document.querySelectorAll('.menu ul li a');
    
    mobileMenuBtn.addEventListener('click', function() {
        menu.classList.toggle('active');
        this.classList.toggle('fa-times');
        this.classList.toggle('fa-bars');
    });
    
    // Fechar menu ao clicar em um link
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menu.classList.remove('active');
            mobileMenuBtn.classList.remove('fa-times');
            mobileMenuBtn.classList.add('fa-bars');
        });
    });
    
    // Adicionar classe active ao item do menu correspondente à seção visível
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });
        
        menuLinks.forEach(link => {
            link.parentElement.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.parentElement.classList.add('active');
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Slider de Depoimentos
    const testimonials = document.querySelectorAll('.testimonial');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;
    let intervalId;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        testimonials[index].classList.add('active');
        indicators[index].classList.add('active');
        currentIndex = index;
    }
    
    function nextTestimonial() {
        let newIndex = currentIndex + 1;
        if (newIndex >= testimonials.length) {
            newIndex = 0;
        }
        showTestimonial(newIndex);
    }
    
    // Configurar indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showTestimonial(index);
            resetInterval();
        });
    });
    
    // Auto-rotacionar depoimentos
    function startInterval() {
        intervalId = setInterval(nextTestimonial, 5000);
    }
    
    function resetInterval() {
        clearInterval(intervalId);
        startInterval();
    }
    
    startInterval();
    
    // Pausar slider quando o mouse estiver sobre ele
    const slider = document.querySelector('.testimonials-slider');
    
    slider.addEventListener('mouseenter', () => {
        clearInterval(intervalId);
    });
    
    slider.addEventListener('mouseleave', () => {
        startInterval();
    });
    
    // Botão Voltar ao Topo
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    // Suavizar scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Validação do Formulário
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            const nameInput = this.querySelector('#name');
            const emailInput = this.querySelector('#email');
            const phoneInput = this.querySelector('#phone');
            const subjectInput = this.querySelector('#subject');
            const messageInput = this.querySelector('#message');
            
            let isValid = true;
            
            // Resetar erros
            this.querySelectorAll('.error').forEach(error => {
                error.remove();
            });
            
            this.querySelectorAll('input, select, textarea').forEach(input => {
                input.classList.remove('error-border');
            });
            
            // Validar nome
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Por favor, insira seu nome');
                isValid = false;
            }
            
            // Validar email
            if (emailInput.value.trim() === '') {
                showError(emailInput, 'Por favor, insira seu e-mail');
                isValid = false;
            } else if (!isValidEmail(emailInput.value.trim())) {
                showError(emailInput, 'Por favor, insira um e-mail válido');
                isValid = false;
            }
            
            // Validar telefone
            if (phoneInput.value.trim() === '') {
                showError(phoneInput, 'Por favor, insira seu telefone');
                isValid = false;
            }
            
            // Validar assunto
            if (subjectInput.value === '') {
                showError(subjectInput, 'Por favor, selecione um assunto');
                isValid = false;
            }
            
            // Validar mensagem
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Por favor, insira sua mensagem');
                isValid = false;
            }
            
            if (isValid) {
                // Simular envio
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                submitBtn.disabled = true;
                
                // Simular delay de envio
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Mensagem Enviada';
                    
                    // Mostrar mensagem de sucesso
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.innerHTML = `
                        <i class="fas fa-check-circle"></i>
                        <h4>Mensagem enviada com sucesso!</h4>
                        <p>O Dr. Alexandre entrará em contato em breve.</p>
                    `;
                    
                    this.reset();
                    this.appendChild(successMessage);
                    
                    // Remover mensagem após alguns segundos
                    setTimeout(() => {
                        successMessage.remove();
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }, 5000);
                }, 1500);
            }
        });
    }
    
    function showError(input, message) {
        input.classList.add('error-border');
        
        const errorElement = document.createElement('small');
        errorElement.className = 'error';
        errorElement.style.color = 'var(--accent-color)';
        errorElement.textContent = message;
        
        input.parentNode.appendChild(errorElement);
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Mostrar elementos com animação quando aparecem na tela
    const animateElements = document.querySelectorAll('.about-content-wrapper, .area-card, .testimonial, .contact-method, .info-card');
    
    function checkAnimation() {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Configurar animações iniciais
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    window.addEventListener('scroll', checkAnimation);
    window.addEventListener('load', checkAnimation);
});