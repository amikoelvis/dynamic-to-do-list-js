// Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', function(){

     // Select DOM elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Function to add a new task
    function addTask(){

        // Retrieve and trim task input value
        const taskText = taskInput.value.trim();

        // Validate task input
        if(taskText === ""){
            alert("Please enter a task.");
            return;
        }

        // Create a new list item (li) element
        const listItem = document.createElement("li");
        listItem.textContent = taskText;

        // Create a remove button
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Add event listener to the remove button
        removeButton.onclick = function() {
            taskList.removeChild(listItem);
        };
        // Append the remove button to the list item
        listItem.appendChild(removeButton);

        // Append the list item to the task list
        taskList.appendChild(listItem);

        // Clear the input field
        taskInput.value = '';
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