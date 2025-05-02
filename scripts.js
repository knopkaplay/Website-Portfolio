// init
var maxx = document.body.clientWidth;
var maxy = document.body.clientHeight;
var halfx = maxx / 2;
var halfy = maxy / 2;
var canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.width = maxx;
canvas.height = maxy;
var context = canvas.getContext("2d");
var dotCount = 200;
var dots = [];
var mouseX = 0;
var mouseY = 0;
var attractRadius = 150; // Радиус притяжения курсора
var attractStrength = 0.5; // Сила притяжения

// Отслеживание позиции мыши
document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// dots class
function dot() {
    this.rad_x = 2 * Math.random() * halfx + 1;
    this.rad_y = 1.2 * Math.random() * halfy + 1;
    this.alpha = Math.random() * 360 + 1;
    this.speed = Math.random() * 100 < 50 ? 1 : -1;
    this.speed *= 0.1;
    this.size = Math.random() * 3 + 1;
    this.color = Math.floor(Math.random() * 256);
    
    // Добавляем базовые координаты для каждой точки
    this.x = halfx + this.rad_x * Math.cos(this.alpha / 180 * Math.PI);
    this.y = halfy + this.rad_y * Math.sin(this.alpha / 180 * Math.PI);
}

// drawing dot
dot.prototype.draw = function() {
    // set color with opacity
    context.fillStyle = `rgba(${this.color}, ${this.color}, ${this.color}, 0.8)`;
    // draw dot
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fill();
    
    // Добавляем свечение для точек рядом с курсором
    var dx = this.x - mouseX;
    var dy = this.y - mouseY;
    var distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < attractRadius) {
        var gradient = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
        gradient.addColorStop(0, `rgba(${this.color}, ${this.color}, ${this.color}, 0.3)`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        context.fill();
    }
};

// calc new position
dot.prototype.move = function() {
    // Обновляем базовые координаты
    var baseX = halfx + this.rad_x * Math.cos(this.alpha / 180 * Math.PI);
    var baseY = halfy + this.rad_y * Math.sin(this.alpha / 180 * Math.PI);
    
    // Проверяем расстояние до курсора
    var dx = mouseX - this.x;
    var dy = mouseY - this.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < attractRadius) {
        // Притяжение к курсору
        this.x += (dx / distance) * attractStrength;
        this.y += (dy / distance) * attractStrength;
    } else {
        // Возвращение к базовой позиции
        this.x += (baseX - this.x) * 0.1;
        this.y += (baseY - this.y) * 0.1;
    }
    
    this.alpha += this.speed;
    
    // Обновление цвета
    if (Math.random() * 100 < 50) {
        this.color += 1;
    } else {
        this.color -= 1;
    }
    this.color = Math.min(255, Math.max(0, this.color));
};

// dots animation
function render() {
    context.fillStyle = "rgba(0, 0, 0, 0.1)";
    context.fillRect(0, 0, maxx, maxy);
    for (var i = 0; i < dotCount; i++) {
        dots[i].draw();
        dots[i].move();
    }
    requestAnimationFrame(render);
}

// create dots
for (var i = 0; i < dotCount; i++) {
    dots.push(new dot());
}

// Обработка изменения размера окна
window.addEventListener('resize', function() {
    maxx = document.body.clientWidth;
    maxy = document.body.clientHeight;
    halfx = maxx / 2;
    halfy = maxy / 2;
    canvas.width = maxx;
    canvas.height = maxy;
});

// start animation
render();

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация мобильного меню
    const hamburger = document.querySelector('.hamburger');
    const closeNav = document.querySelector('.close-nav');
    const navLinks = document.querySelector('.nav-links');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    const body = document.body;

    if (hamburger && navLinks && mobileOverlay && closeNav) {
        // Открытие меню
        hamburger.addEventListener('click', function() {
            navLinks.classList.add('active');
            mobileOverlay.style.display = 'block';
            hamburger.classList.add('hidden'); // Скрываем гамбургер
            setTimeout(() => {
                mobileOverlay.classList.add('active');
            }, 10);
            body.style.overflow = 'hidden'; // Предотвращаем прокрутку страницы
        });

        // Закрытие меню при клике на крестик
        closeNav.addEventListener('click', closeMenu);

        // Закрытие меню при клике на оверлей
        mobileOverlay.addEventListener('click', closeMenu);

        // Закрытие меню при клике на ссылку
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Функция закрытия меню
        function closeMenu() {
            navLinks.classList.remove('active');
            mobileOverlay.classList.remove('active');
            hamburger.classList.remove('hidden'); // Показываем гамбургер снова
            setTimeout(() => {
                mobileOverlay.style.display = 'none';
            }, 300); // Задержка, соответствующая transition
            body.style.overflow = ''; // Возвращаем прокрутку страницы
        }
        
        // Определение текущей страницы и добавление класса active
        const currentLocation = window.location.pathname;
        const currentPage = currentLocation.split('/').pop() || 'index.html';
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage) {
                link.classList.add('active');
            }
        });
    }

    // Инициализация карусели навыков
    const skillsGrid = document.querySelector('.skills-grid');
    const skillCategories = document.querySelectorAll('.skill-category');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (skillsGrid && skillCategories.length > 0 && prevBtn && nextBtn) {
        let currentIndex = 0;

        function updateCarousel() {
            const offset = -currentIndex * 100;
            skillsGrid.style.transform = `translateX(${offset}%)`;
        }

        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : skillCategories.length - 1;
            updateCarousel();
        });

        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex < skillCategories.length - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        });

        updateCarousel();
    }

    // Инициализация кнопки копирования email
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', function() {
            const email = document.getElementById('email').textContent;
            navigator.clipboard.writeText(email).then(() => {
                this.textContent = 'Скопировано';
                setTimeout(() => {
                    this.textContent = 'Копировать';
                }, 2000);
            }).catch(err => {
                console.error('Ошибка копирования: ', err);
            });
        });
    }

    const drawerOpenButton = document.getElementById('drawer-open');
    const drawerCloseButton = document.getElementById('drawer-close');
    const navbarDrawer = document.getElementById('navbar-drawer');

    if (drawerOpenButton && drawerCloseButton && navbarDrawer) {
        drawerOpenButton.addEventListener('click', function() {
            navbarDrawer.showModal();
        });

        drawerCloseButton.addEventListener('click', function() {
            navbarDrawer.close();
        });
    }
    
    // Фильтрация постов блога
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogPosts = document.querySelectorAll('.blog-post');
    
    if (filterButtons.length > 0 && blogPosts.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Убираем класс active со всех кнопок
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Добавляем класс active для текущей кнопки
                this.classList.add('active');
                
                // Получаем категорию из data-атрибута
                const filterValue = this.getAttribute('data-filter');
                
                // Фильтруем посты
                blogPosts.forEach(post => {
                    const postCategory = post.getAttribute('data-category');
                    
                    // Если выбрано "все" или пост соответствует категории, показываем его
                    if (filterValue === 'all' || filterValue === postCategory) {
                        post.style.display = 'block';
                        post.style.opacity = '0';
                        // Анимация появления
                        setTimeout(() => {
                            post.style.opacity = '1';
                            post.style.transition = 'opacity 0.5s ease';
                        }, 100);
                    } else {
                        // Иначе скрываем пост
                        post.style.opacity = '0';
                        post.style.transition = 'opacity 0.5s ease';
                        setTimeout(() => {
                            post.style.display = 'none';
                        }, 500);
                    }
                });
            });
        });
    }
    
    // Инициализация поиска в блоге
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-form input');
    
    if (searchForm && searchInput && blogPosts.length > 0) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            if (searchTerm === '') {
                // Если поиск пустой, показываем все посты
                blogPosts.forEach(post => {
                    post.style.display = 'block';
                    post.style.opacity = '1';
                });
                return;
            }
            
            // Фильтруем посты по поисковому запросу
            blogPosts.forEach(post => {
                const title = post.querySelector('.post-title').textContent.toLowerCase();
                const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
                const category = post.querySelector('.post-category').textContent.toLowerCase();
                
                // Если запрос найден в заголовке, описании или категории, показываем пост
                if (title.includes(searchTerm) || excerpt.includes(searchTerm) || category.includes(searchTerm)) {
                    post.style.display = 'block';
                    post.style.opacity = '0';
                    // Анимация появления
                    setTimeout(() => {
                        post.style.opacity = '1';
                        post.style.transition = 'opacity 0.5s ease';
                    }, 100);
                } else {
                    // Иначе скрываем пост
                    post.style.opacity = '0';
                    post.style.transition = 'opacity 0.5s ease';
                    setTimeout(() => {
                        post.style.display = 'none';
                    }, 500);
                }
            });
        });
    }
});
