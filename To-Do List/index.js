document.addEventListener('DOMContentLoaded', () => {
    const newTaskInput = document.getElementById('new-task');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const showAllBtn = document.getElementById('show-all-btn');
    const showCompletedBtn = document.getElementById('show-completed-btn');
    const showIncompleteBtn = document.getElementById('show-incomplete-btn');

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function displayTasks(filter = 'all') {
        taskList.innerHTML = '';
        const filteredTasks = tasks.filter(task => {
            if (filter === 'completed') return task.completed;
            if (filter === 'incomplete') return !task.completed;
            return true;
        });
        filteredTasks.forEach(displayTask);
    }

    function displayTask(task, index) {
        const li = document.createElement('li');
        li.classList.add('task');
        li.innerHTML = `
            <input type="checkbox" id="check-${index}" name="check" ${task.completed ? 'checked' : ''} />
            <span id="task-content-${index}" class="${task.completed ? 'completed' : ''}">${task.value}</span>
            <button class="delete-btn" data-index="${index}">Удалить</button>
        `;
        taskList.appendChild(li);

        const taskContent = document.getElementById(`task-content-${index}`);
        taskContent.addEventListener('dblclick', () => {
            const newTaskValue = prompt('Введите новый текст задачи:', task.value);
            if (newTaskValue) {
                tasks[index].value = newTaskValue;
                saveTasks();
                displayTasks();
            }
        });
    }

    addTaskBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const task = {
            value: newTaskInput.value,
            completed: false
        };
        tasks.push(task);
        saveTasks();
        newTaskInput.value = "";
        displayTasks();
    });

    taskList.addEventListener('change', (e) => {
        if (e.target.name === 'check') {
            const index = e.target.id.split('-')[1];
            tasks[index].completed = e.target.checked;
            saveTasks();
            displayTasks();
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.dataset.index;
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        }
    });

    showAllBtn.addEventListener('click', () => displayTasks('all'));
    showCompletedBtn.addEventListener('click', () => displayTasks('completed'));
    showIncompleteBtn.addEventListener('click', () => displayTasks('incomplete'));

    displayTasks();
});
