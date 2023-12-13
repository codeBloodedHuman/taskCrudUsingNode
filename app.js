// app.js

// Function to add a new task
function addTask() {
    const taskName = document.getElementById('taskName').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const taskStatus = document.getElementById('taskStatus').value;
  
    // Make an HTTP POST request to add the new task
    fetch('/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: taskName,
        description: taskDescription,
        status: taskStatus,
      }),
    })
    .then(response => response.json())
    .then(newTask => {
      // Add the new task to the HTML list
      const tasksList = document.getElementById('tasks');
      const listItem = document.createElement('li');
      listItem.classList.add('list-group-item');
      listItem.textContent = `ID: ${newTask.id}, Name: ${newTask.name}, Status: ${newTask.status}`;
      tasksList.appendChild(listItem);
  
      // Clear the form
      document.getElementById('addTaskForm').reset();
    })
    .catch(error => console.error('Error adding task:', error));
  }
  
  // Function to fetch and display the list of tasks
  function displayTasks() {
    // Make an HTTP GET request to retrieve the list of tasks
    fetch('/tasks')
    .then(response => response.json())
    .then(tasks => {
      // Clear the existing list
      const tasksList = document.getElementById('tasks');
      tasksList.innerHTML = '';
  
      // Add each task to the HTML list
      tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.textContent = `ID: ${task.id}, Name: ${task.name}, Status: ${task.status}`;
        tasksList.appendChild(listItem);
      });
    })
    .catch(error => console.error('Error fetching tasks:', error));
  }
  // custom.js

function deleteTask(taskId) {
  // Send a DELETE request to the server to delete the task
  fetch(`/tasks/${taskId}`, {
    method: 'DELETE',
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
    // Reload the page to reflect the updated task list
    location.reload();
  })
  .catch(error => console.error(error));
}

function editTask(event, taskId) {
    event.preventDefault();

    // Fetch the form data
    const formData = {
      name: document.getElementById(`editTaskName${taskId}`).value,
      status: document.getElementById(`editTaskStatus${taskId}`).value,
      description: document.getElementById(`editTaskDescription${taskId}`).value
    };

    // Send a PUT request to update the task
    fetch(`/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to edit task');
      }
      // Reload the page to reflect the updated task list
      location.reload();
    })
    .catch(error => console.error(error));
  }
  
  // Call the displayTasks function when the page loads
  document.addEventListener('DOMContentLoaded', displayTasks);
  