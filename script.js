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
    const taskSubcategory = document.getElementById('taskSubcategory');
    const addTaskButton = document.getElementById('addTask');
    const errorMessage = document.getElementById('errorMessage');

    let currentCategory = '';

    // Подкатегории для каждой категории
    const subcategories = {
        marketing: ['Анализ рынка', 'Реклама', 'SEO'],
        management: ['Планирование', 'Контроль', 'Отчетность'],
        development: ['Фронтенд', 'Бэкэнд', 'Анализирование', 'Тестирование'],
        design: ['Прототипирование', 'Визуальный дизайн', 'Анимация']
    };

    // Данные задач
    const taskData = {
        marketing: { 'Анализ рынка': [], 'Реклама': [], 'SEO': [] },
        management: { 'Планирование': [], 'Контроль': [], 'Отчетность': [] },
        development: { 'Фронтенд': [], 'Бэкэнд': [], 'Анализирование': [], 'Тестирование': [] },
        design: { 'Прототипирование': [], 'Визуальный дизайн': [], 'Анимация': [] }
    };

    // Обработчик клика по иконке
    iconBoxes.forEach(box => {
        box.addEventListener('click', () => {
            currentCategory = box.getAttribute('data-category');
            taskMenuTitle.textContent = `Задачи - ${currentCategory.toUpperCase()}`;
            updateSubcategories(currentCategory);
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
        const taskSubcategoryValue = taskSubcategory.value;

        if (!taskText || !taskDeadlineValue || !taskSubcategoryValue) {
            errorMessage.textContent = 'Пожалуйста, заполните все поля.';
            errorMessage.style.display = 'block';
            return;
        }

        errorMessage.style.display = 'none';
        taskData[currentCategory][taskSubcategoryValue].push({
            task: taskText,
            deadline: taskDeadlineValue
        });

        renderTasks(currentCategory);
        taskInput.value = '';
        taskDeadline.value = '';
    });

    // Функция для обновления подкатегорий в выпадающем списке
    function updateSubcategories(category) {
        taskSubcategory.innerHTML = '';
        subcategories[category].forEach(sub => {
            const option = document.createElement('option');
            option.value = sub;
            option.textContent = sub;
            taskSubcategory.appendChild(option);
        });
    }

    // Функция для отображения задач
    function renderTasks(category) {
        taskList.innerHTML = '';
        const tasksBySubcategory = taskData[category];

        if (Object.keys(tasksBySubcategory).every(sub => tasksBySubcategory[sub].length === 0)) {
            taskList.innerHTML = '<p>Нет задач для этой категории.</p>';
        } else {
            for (const [subcategory, tasks] of Object.entries(tasksBySubcategory)) {
                if (tasks.length > 0) {
                    const subcategoryHeader = document.createElement('h3');
                    subcategoryHeader.textContent = subcategory;
                    taskList.appendChild(subcategoryHeader);

                    tasks.forEach((task, index) => {
                        const li = document.createElement('li');
                        li.innerHTML = `
                            <div>
                                <div>Задача: ${task.task}</div>
                                <div>Дедлайн: ${task.deadline}</div>
                            </div>
                            <button onclick="deleteTask('${category}', '${subcategory}', ${index})"><i class="fas fa-trash"></i></button>
                        `;
                        taskList.appendChild(li);
                    });
                }
            }
        }
    }

    // Функция для удаления задачи
    window.deleteTask = function (category, subcategory, index) {
        taskData[category][subcategory].splice(index, 1);
        renderTasks(category);
    };
});