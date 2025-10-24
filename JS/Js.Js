const slides = document.querySelector('.slides1');
const slideCount = document.querySelectorAll('.slide1').length;
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let currentIndex = 0;

function goToSlide(index) {
    if (index < 0) {
        index = slideCount - 1;
    } else if (index >= slideCount) {
        index = 0;
    }
    currentIndex = index;
    slides.style.transform = `translateX(${-index * 100}%)`;
}

prevButton.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
});

nextButton.addEventListener('click', () => {
    goToSlide(currentIndex + 1);
});

// Автопрокрутка слайдера
setInterval(() => {
    goToSlide(currentIndex + 1);
}, 5000);

// Плавная прокрутка для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});


















document.addEventListener('DOMContentLoaded', function () {
    const sliders = document.querySelectorAll('.slider-container');

    sliders.forEach(slider => {
        initSlider(slider);
    });

    function initSlider(slider) {
        const slides = slider.querySelector('.slides');
        const slideCount = slider.querySelectorAll('.slide').length;
        const prevBtn = slider.querySelector('.slider-prev');
        const nextBtn = slider.querySelector('.slider-next');
        const dotsContainer = slider.querySelector('.slider-dots');

        let currentIndex = 0;

        // Создаем точки навигации
        for (let i = 0; i < slideCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }

        const dots = dotsContainer.querySelectorAll('.slider-dot');

        function goToSlide(index) {
            if (index < 0) {
                index = slideCount - 1;
            } else if (index >= slideCount) {
                index = 0;
            }

            currentIndex = index;
            slides.style.transform = `translateX(-${index * 100}%)`;

            // Обновляем активную точку
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
        });

        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
        });

        // Автопрокрутка (опционально)
        let autoplay = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);

        // Останавливаем автопрокрутку при наведении
        slider.addEventListener('mouseenter', () => {
            clearInterval(autoplay);
        });

        slider.addEventListener('mouseleave', () => {
            autoplay = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, 5000);
        });

        // Свайп для мобильных устройств
        let startX = 0;
        let endX = 0;

        slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        slider.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });

        function handleSwipe() {
            const diff = startX - endX;
            if (Math.abs(diff) > 50) { // минимальная дистанция свайпа
                if (diff > 0) {
                    goToSlide(currentIndex + 1); // свайп влево
                } else {
                    goToSlide(currentIndex - 1); // свайп вправо
                }
            }
        }
    }
});