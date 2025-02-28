document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const clearUsernameButton = document.getElementById('clearUsername');
    const clearEmailButton = document.getElementById('clearEmail');
    const clearPasswordButton = document.getElementById('clearPassword');
    const errorMessage = document.getElementById('errorMessage');
    const verificationForm = document.getElementById('verificationForm');
    const codeForm = document.getElementById('codeForm');
    const resendCodeButton = document.getElementById('resendCode');
    const timerDisplay = document.getElementById('timer');
    const clearCodeButton = document.getElementById('clearCode'); // Кнопка очистки кода

    let countdown;
    let codeSent = false;

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

    // Очистка поля кода подтверждения
    clearCodeButton.addEventListener('click', () => {
        document.getElementById('verificationCode').value = '';
        document.getElementById('codeErrorMessage').style.display = 'none';
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

        // Если всё в порядке, отправляем код подтверждения
        sendVerificationCode(email);
        document.getElementById('registerForm').style.display = 'none';
        verificationForm.style.display = 'block';
        startTimer(3, timerDisplay);
    });

    // Функция для проверки email
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Функция для отправки кода подтверждения
    function sendVerificationCode(email) {
        // Здесь должна быть логика отправки кода на email
        console.log(`Код отправлен на ${email}`);
        codeSent = true;
    }

    // Функция для запуска таймера
    function startTimer(minutes, display) {
        let time = minutes * 60;
        countdown = setInterval(() => {
            const minutesLeft = Math.floor(time / 60);
            let secondsLeft = time % 60;
            secondsLeft = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft;
            display.textContent = `${minutesLeft}:${secondsLeft}`;
            time--;

            if (time < 0) {
                clearInterval(countdown);
                display.textContent = 'Время истекло';
                resendCodeButton.disabled = false;
            }
        }, 1000);
    }

    // Повторная отправка кода
    resendCodeButton.addEventListener('click', () => {
        if (codeSent) {
            const email = emailInput.value.trim();
            sendVerificationCode(email);
            startTimer(3, timerDisplay);
            resendCodeButton.disabled = true;
        }
    });

    // Проверка кода подтверждения
    codeForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const code = document.getElementById('verificationCode').value.trim();

        if (code.length !== 4 || isNaN(code)) {
            document.getElementById('codeErrorMessage').textContent = 'Код должен состоять из 4 цифр';
            document.getElementById('codeErrorMessage').style.display = 'block';
            return;
        }

        // Если код верный, переходим на главную страницу
        window.location.href = 'index.html';
    });
});