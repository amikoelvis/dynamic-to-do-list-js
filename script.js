document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false means not to save again to Local Storage
    }

    // Add a task and save it to Local Storage
    function addTask(taskText, save = true) {
        if (taskText.trim() === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new list item (li) element
        const listItem = document.createElement("li");
        listItem.textContent = taskText;

        // Create a remove button
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-btn");

        // Add event listener to the remove button
        removeButton.onclick = function () {
            taskList.removeChild(listItem);
            removeTaskFromLocalStorage(taskText); // Remove from Local Storage
        };

        // Append the remove button to the list item
        listItem.appendChild(removeButton);

        // Append the list item to the task list
        taskList.appendChild(listItem);

        // If saving is enabled, update Local Storage
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        // Clear the input field
        taskInput.value = '';
        taskInput.focus();
    }

    // Remove a task from Local Storage
    function removeTaskFromLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Event listener for the 'Add Task' button
    addButton.addEventListener('click', function () {
        addTask(taskInput.value);
    });

    // Event listener for the 'Enter' key in the task input field
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });

    // Load tasks from Local Storage when the page loads
    loadTasks();
});
