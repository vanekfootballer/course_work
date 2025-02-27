document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const clearEmailButton = document.getElementById('clearEmail');
    const clearPasswordButton = document.getElementById('clearPassword');
    const errorMessage = document.getElementById('errorMessage');

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

    // Проверка email при отправке формы
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Проверка email на корректность
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

        // Если всё в порядке, переходим на главную страницу
        window.location.href = 'index.html';
    });

    // Функция для проверки email
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Логика для авторизации через ВКонтакте
    document.getElementById('vkLogin').addEventListener('click', function() {
        alert('Авторизация через ВКонтакте');
    });
});