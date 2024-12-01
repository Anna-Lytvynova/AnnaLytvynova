document.addEventListener("DOMContentLoaded", () => {
        const maxSnowflakes = 30; // Максимальна кількість сніжинок на екрані
        const snowflakes = [];

        // Функція створення сніжинки
        const createSnowflake = () => {
            const snowflake = document.createElement("img");
            snowflake.src = "./image/autor/sakura.svg"; // URL до зображення сніжинки
            snowflake.classList.add("snowflake");
            document.body.appendChild(snowflake);

            // Випадкові початкові параметри
            const startX = Math.random() * window.innerWidth;
            const size = Math.random() * 30 + 10; // Випадковий розмір сніжинки
            snowflake.style.left = `${startX}px`;
            snowflake.style.width = `${size}px`;
            snowflake.style.height = `${size}px`;

            const fallSpeed = Math.random() * 1 + 1; // Швидкість падіння
            const swingAmplitude = Math.random() * 3; // Амплітуда коливання
            const swingSpeed = Math.random() * 0.01 + 0.02; // Швидкість коливання

            let currentY = -50;
            let currentX = startX;
            let angle = 0;

            const animate = () => {
                currentY += fallSpeed;
                angle += swingSpeed;
                currentX += Math.sin(angle) * swingAmplitude;

                snowflake.style.top = `${currentY}px`;
                snowflake.style.left = `${currentX}px`;

                // Видалення сніжинки після виходу за межі body
                const bodyRect = document.body.getBoundingClientRect();
                const snowflakeRect = snowflake.getBoundingClientRect();
                if (snowflakeRect.top > bodyRect.bottom) {
                    snowflake.remove();
                    snowflakes.splice(snowflakes.indexOf(animate), 1); // Видаляємо анімацію з масиву
                } else {
                    requestAnimationFrame(animate);
                }
            };

            snowflakes.push(animate);
            animate();
        };

        // Функція для підтримки сталої кількості сніжинок
        const maintainSnowflakes = () => {
            if (snowflakes.length < maxSnowflakes) {
                createSnowflake();
            }
        };

        // Викликаємо підтримку сніжинок через інтервали
        setInterval(maintainSnowflakes, 300);
    });