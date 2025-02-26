document.addEventListener('DOMContentLoaded', () => {
    const iconBoxes = document.querySelectorAll('.icon-box');
    const mainContainer = document.getElementById('mainContainer');
    const taskMenu = document.getElementById('taskMenu');
    const taskMenuTitle = document.getElementById('taskMenuTitle');
    const taskList = document.getElementById('taskList');
    const closeTaskMenu = document.getElementById('closeTaskMenu');
    const backToMain = document.getElementById('backToMain');
    const taskInput = document.getElementById('taskInput');
    const taskDeadline = document.getElementById('taskDeadline');
    const addTaskButton = document.getElementById('addTask');
    const errorMessage = document.getElementById('errorMessage');

    let currentCategory = '';
    const taskData = {
        marketing: [],
        management: [],
        development: [],
        design: []
    };

    // Обработчик клика по иконке
    iconBoxes.forEach(box => {
        box.addEventListener('click', () => {
            currentCategory = box.getAttribute('data-category');
            taskMenuTitle.textContent = `Задачи - ${currentCategory.toUpperCase()}`;
            renderTasks(currentCategory);
            mainContainer.style.display = 'none';
            taskMenu.style.display = 'block';
        });
    });

    // Закрытие меню задач
    closeTaskMenu.addEventListener('click', () => {
        taskMenu.style.display = 'none';
        mainContainer.style.display = 'flex';
    });

    // Возврат на главную страницу
    backToMain.addEventListener('click', () => {
        taskMenu.style.display = 'none';
        mainContainer.style.display = 'flex';
    });

    // Добавление задачи
    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        const taskDeadlineValue = taskDeadline.value;

        if (!taskText || !taskDeadlineValue) {
            errorMessage.textContent = 'Пожалуйста, заполните все поля.';
            errorMessage.style.display = 'block';
            return;
        }

        errorMessage.style.display = 'none';
        taskData[currentCategory].push({
            task: taskText,
            deadline: taskDeadlineValue
        });

        renderTasks(currentCategory);
        taskInput.value = '';
        taskDeadline.value = '';
    });

    // Функция для отображения задач
    function renderTasks(category) {
        taskList.innerHTML = '';
        const tasks = taskData[category];

        if (tasks.length === 0) {
            taskList.innerHTML = '<p>Нет задач для этой категории.</p>';
        } else {
            tasks.forEach((task, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <div>
                        <div>Задача: ${task.task}</div>
                        <div>Дедлайн: ${task.deadline}</div>
                    </div>
                    <button onclick="deleteTask('${category}', ${index})"><i class="fas fa-trash"></i></button>
                `;
                taskList.appendChild(li);
            });
        }
    }

    // Функция для удаления задачи
    window.deleteTask = function (category, index) {
        taskData[category].splice(index, 1);
        renderTasks(category);
    };
});