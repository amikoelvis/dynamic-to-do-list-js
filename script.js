document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Load tasks from Local Storage
    function loadTasks() {
        // Retrieve stored tasks from Local Storage
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        
        // For each task in the array, call addTask to add it to the list
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' means not to save again to Local Storage
    }

    // Add a task and save it to Local Storage
    function addTask() {
        // Step 1: Retrieve and trim the input value
        const taskText = taskInput.value.trim();

        // Step 2: Check if taskText is empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new list item (li) element for the task
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

        // Save to Local Storage
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));

        // Clear the input field
        taskInput.value = '';
        taskInput.focus();
    }

    // Event listener for the 'Add Task' button
    addButton.addEventListener('click', addTask);

    // Event listener for the 'Enter' key in the task input field
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
