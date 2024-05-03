// script.js
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const completedCount = document.getElementById('completedCount');

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(taskText));
        taskList.appendChild(li);
        taskInput.value = '';

        // Save tasks to local storage
        saveTasksToLocalStorage();
        updateCompletedCount();
    }
}

function deleteTask(button) {
    const li = button.parentElement;
    li.remove();
    saveTasksToLocalStorage();
    updateCompletedCount();
}

function removeCheckedTasks() {
    const checkedItems = Array.from(taskList.querySelectorAll('li input[type="checkbox"]:checked'));
    checkedItems.forEach(item => item.parentElement.remove());
    saveTasksToLocalStorage();
    updateCompletedCount();
}

function saveTasksToLocalStorage() {
    const tasks = Array.from(taskList.querySelectorAll('li')).map(li => li.textContent);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(taskText => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(taskText));
        taskList.appendChild(li);
    });
    updateCompletedCount();
}

function updateCompletedCount() {
    const totalTasks = taskList.children.length;
    const completedTasks = taskList.querySelectorAll('li.completed').length;
    completedCount.textContent = `${completedTasks} of ${totalTasks} tasks done`;
}

loadTasksFromLocalStorage();

// Add event listener to handle task completion
taskList.addEventListener('change', function(event) {
    if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox') {
        const li = event.target.parentElement;
        li.classList.toggle('completed');
        saveTasksToLocalStorage();
        updateCompletedCount();
    }
});
