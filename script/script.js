// Отримуємо всі блоки та приховані блоки
const blocks = document.querySelectorAll('.block');
const hiddenBlocks = document.querySelectorAll('.hidden-block');
const animationBlocks = document.querySelectorAll('.animationBlock');

// Функція для зняття активного класу з усіх блоків і сховати всі приховані блоки
function resetBlocks() {
    blocks.forEach(block => block.classList.remove('active'));
    hiddenBlocks.forEach(hiddenBlock => hiddenBlock.style.display = 'none');
    animationBlocks.forEach(animationBlock => animationBlock.classList.remove('active')); // Знімаємо клас 'active' для анімаційних блоків
}

// Додаємо обробник події для кожного блоку
blocks.forEach(block => {
    block.addEventListener('click', () => {
        resetBlocks(); // Скидаємо всі активні класи і приховані блоки

        // Додаємо активний клас до натиснутого блоку
        block.classList.add('active');

        // Визначаємо відповідний прихований блок і показуємо його
        const blockNumber = block.id.replace('block', ''); // Отримуємо номер блоку
        document.getElementById('hiddenBlock' + blockNumber).style.display = 'flex'; // Показуємо відповідний hiddenBlock
        document.getElementById('animationBlock' + blockNumber).classList.add('active'); // Додаємо клас 'active' для збільшення розміру
    });
});

// Відкриття модального вікна
const openModalButtons = document.querySelectorAll('.openModalBtn');
openModalButtons.forEach(button => {
    button.addEventListener('click', function () {
        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('visible'), 10);
    });
});

// Закриття модального вікна
const closeModalButtons = document.querySelectorAll('.close-btn');
closeModalButtons.forEach(button => {
    button.addEventListener('click', function () {
        const modal = button.closest('.cards-section-block-modal');
        modal.classList.remove('visible');
        setTimeout(() => modal.style.display = 'none', 500);
    });
});

// Закриття модального вікна при кліку на затемнений фон
window.addEventListener('click', function (event) {
    if (event.target.classList.contains('cards-section-block-modal')) {
        event.target.classList.remove('visible');
        setTimeout(() => event.target.style.display = 'none', 500);
    }
});


// Ліниве завантаження iframe та анімація елементів при появі на екрані
document.addEventListener("DOMContentLoaded", function () {
    const iframe = document.querySelector('iframe[data-src]');
    const elements = document.querySelectorAll("[data-animate]");
    const observerOptions = { threshold: 0.1 };

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.tagName === 'IFRAME') {
                        entry.target.src = entry.target.getAttribute('data-src');
                        observer.unobserve(entry.target);
                    } else {
                        entry.target.classList.add("show");
                        observer.unobserve(entry.target);
                    }
                }
            });
        }, observerOptions);

        if (iframe) observer.observe(iframe);
        elements.forEach(element => observer.observe(element));
    } else {
        // Фолбек для старих браузерів без IntersectionObserver
        if (iframe) iframe.src = iframe.getAttribute('data-src');
        elements.forEach(element => element.classList.add("show"));
    }
});