document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    const clearEmailButton = document.getElementById('clearEmail');
    const errorMessage = document.getElementById('errorMessage');

    // Очистка поля email
    clearEmailButton.addEventListener('click', () => {
        emailInput.value = '';
        errorMessage.style.display = 'none';
    });

    // Проверка email при отправке формы
    document.getElementById('forgotPasswordForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const email = emailInput.value.trim();

        // Проверка email на корректность
        if (!validateEmail(email)) {
            errorMessage.textContent = 'Неправильный ввод электронной почты';
            errorMessage.style.display = 'block';
            return;
        }

        // Если всё в порядке, выводим сообщение об успешной отправке
        alert('Инструкции по восстановлению пароля отправлены на ваш email.');
        window.location.href = 'login.html';
    });

    // Функция для проверки email
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});