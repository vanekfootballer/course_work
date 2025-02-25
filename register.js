document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const clearUsernameButton = document.getElementById('clearUsername');
    const clearEmailButton = document.getElementById('clearEmail');
    const clearPasswordButton = document.getElementById('clearPassword');
    const errorMessage = document.getElementById('errorMessage');

    // Очистка поля имени пользователя
    clearUsernameButton.addEventListener('click', () => {
        usernameInput.value = '';
        errorMessage.style.display = 'none';
    });

    // Очистка поля email
    clearEmailButton.addEventListener('click', () => {
        emailInput.value = '';
        errorMessage.style.display = 'none';
    });

    // Очистка поля пароля
    clearPasswordButton.addEventListener('click', () => {
        passwordInput.value = '';
        errorMessage.style.display = 'none';
    });

    // Проверка данных при отправке формы
    document.getElementById('registerForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Проверка имени пользователя
        if (!username) {
            errorMessage.textContent = 'Пожалуйста, введите имя пользователя';
            errorMessage.style.display = 'block';
            return;
        }

        // Проверка email
        if (!validateEmail(email)) {
            errorMessage.textContent = 'Неправильный ввод электронной почты';
            errorMessage.style.display = 'block';
            return;
        }

        // Проверка пароля
        if (!password) {
            errorMessage.textContent = 'Пожалуйста, введите пароль';
            errorMessage.style.display = 'block';
            return;
        }

        // Если всё в порядке, переходим на страницу входа
        window.location.href = 'login.html';
    });

    // Функция для проверки email
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});