document.addEventListener('DOMContentLoaded', () => {
    const iconBoxes = document.querySelectorAll('.icon-box');
    const taskMenu = document.getElementById('taskMenu');
    const taskMenuTitle = document.getElementById('taskMenuTitle');
    const taskList = document.getElementById('taskList');
    const closeTaskMenu = document.getElementById('closeTaskMenu');
    const addTaskButton = document.getElementById('addTask');
    const taskInput = document.getElementById('taskInput');
    const taskDeadline = document.getElementById('taskDeadline');
    const taskType = document.getElementById('taskType');
    const errorMessage = document.getElementById('errorMessage');
    const backToMain = document.getElementById('backToMain');
    const mainContainer = document.getElementById('mainContainer');
    let currentCategory = '';

    // Типы задач для каждого направления
    const taskTypes = {
        marketing: ['Анализ рынка', 'Реклама', 'SEO'],
        management: ['Планирование', 'Контроль', 'Отчетность'],
        development: ['Кодинг', 'Тестирование', 'Анализ'],
        design: ['Прототипирование', 'Визуальный дизайн', 'Анимация']
    };

    const taskData = {
        marketing: [],
        management: [],
        development: [],
        design: []
    };

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
                        <div>Тип: ${task.type}</div>
                        <div>Дедлайн: ${task.deadline}</div>
                    </div>
                    <div>
                        <button onclick="editTask('${category}', ${index})"><i class="fas fa-edit"></i></button>
                        <button onclick="deleteTask('${category}', ${index})"><i class="fas fa-trash"></i></button>
                    </div>
                `;
                taskList.appendChild(li);
            });
        }
    }

    // Функция для удаления задачи
    window.deleteTask = function (category, index) {
        taskData[category].splice(index, 1);
        renderTasks(currentCategory);
    };

    // Функция для редактирования задачи
    window.editTask = function (category, index) {
        const task = taskData[category][index];
        taskInput.value = task.task;
        taskDeadline.value = task.deadline;
        taskType.value = task.type;
        addTaskButton.textContent = 'Обновить задачу';
        addTaskButton.onclick = function () {
            taskData[category][index] = {
                task: taskInput.value,
                type: taskType.value,
                deadline: taskDeadline.value
            };
            renderTasks(currentCategory);
            taskInput.value = '';
            taskDeadline.value = '';
            addTaskButton.textContent = 'Добавить задачу';
            addTaskButton.onclick = addTaskHandler;
        };
    };

    // Обработчик добавления задачи
    function addTaskHandler() {
        const taskText = taskInput.value.trim();
        const taskDeadlineValue = taskDeadline.value;
        const taskTypeValue = taskType.value;
        if (!taskText || !taskDeadlineValue) {
            errorMessage.textContent = 'Пожалуйста, заполните все поля.';
            errorMessage.style.display = 'block';
            return;
        }
        errorMessage.style.display = 'none';
        taskData[currentCategory].push({
            task: taskText,
            type: taskTypeValue,
            deadline: taskDeadlineValue
        });
        renderTasks(currentCategory);
        taskInput.value = '';
        taskDeadline.value = '';
    }

    addTaskButton.addEventListener('click', addTaskHandler);

    // Обработчик клика по иконке категории
    iconBoxes.forEach(box => {
        box.addEventListener('click', () => {
            currentCategory = box.dataset.category;
            taskMenuTitle.textContent = `Задачи - ${currentCategory.toUpperCase()}`;
            renderTasks(currentCategory);
            updateTaskTypes(currentCategory);
            taskMenu.style.display = 'block';
            mainContainer.style.display = 'none';
            document.body.style.background = getCategoryBackground(currentCategory);
        });
    });

    // Функция для обновления типов задач в выпадающем списке
    function updateTaskTypes(category) {
        taskType.innerHTML = '';
        taskTypes[category].forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            taskType.appendChild(option);
        });
    }

    // Функция для получения фона в зависимости от категории
    function getCategoryBackground(category) {
        switch (category) {
            case 'marketing':
                return 'url("./images/marketing-bg.jpg")';
            case 'management':
                return 'url("./images/management-bg.jpg")';
            case 'development':
                return 'url("./images/development-bg.jpg")';
            case 'design':
                return 'url("./images/design-bg.jpg")';
            default:
                return 'linear-gradient(to right, #a7ffeb, #EC80FF)';
        }
    }

    // Закрытие меню задач
    closeTaskMenu.addEventListener('click', () => {
        taskMenu.style.display = 'none';
        mainContainer.style.display = 'flex';
        document.body.style.background = 'linear-gradient(to right, #a7ffeb, #EC80FF)';
    });

    // Возврат на главную страницу
    backToMain.addEventListener('click', () => {
        taskMenu.style.display = 'none';
        mainContainer.style.display = 'flex';
        document.body.style.background = 'linear-gradient(to right, #a7ffeb, #EC80FF)';
    });
});