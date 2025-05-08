document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const header = document.getElementById('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // 移动端菜单切换
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
    });
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // 技能条动画
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        });
    }
    
    // 当技能区域进入视口时触发动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
    
    // 表单提交
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 这里可以添加表单验证和AJAX提交逻辑
            alert('感谢您的留言！我会尽快回复您。');
            this.reset();
        });
    }
    
    // 卡片悬停效果增强
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const x = e.clientX - this.getBoundingClientRect().left;
            const y = e.clientY - this.getBoundingClientRect().top;
            
            const centerX = this.offsetWidth / 2;
            const centerY = this.offsetHeight / 2;
            
            const angleX = (y - centerY) / 10;
            const angleY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px)';
        });
    });
});