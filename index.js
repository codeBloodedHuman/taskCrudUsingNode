const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory storage for tasks
let tasks = [
  { id: 1, name: 'Task 1', description: 'Description for Task 1', status: 'Incomplete' },
  { id: 2, name: 'Task 2', description: 'Description for Task 2', status: 'Complete' },
];
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/'));
hbs.registerHelper('eq', (a, b) => a == b)
// Set the view engine to Handlebars
app.set('view engine', 'hbs');

// Set the path for partials (optional, but useful for modular views)
hbs.registerPartials(__dirname + '/views/partials');

// Display a list of all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});
app.get('/', (req, res) => {
    res.render('task', { tasks });
  });
// Display details of a specific task based on its ID
app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === taskId);

  if (task) {
    //res.json(task);
    res.render('detail', { task });
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// Add a new task to the collection
app.post('/tasks', (req, res) => {
  const newTask = req.body;
  
  newTask.id = tasks.length + 1;
  tasks.push(newTask);
  //console.log(req.body);
  //console.log(tasks);
  //res.status(201).json(req.body);
  res.redirect("/");
});

// Update the details of a specific task based on its ID
// ... (other imports and configurations)

// Update the details of a specific task based on its ID
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const index = tasks.findIndex(task => task.id === taskId);
  
    if (index !== -1) {
      // Update task details with data from the request body
      tasks[index].name = req.body.name;
      tasks[index].status = req.body.status;
      tasks[index].description = req.body.description;
  
  
      res.status(204).send(); // 204 No Content
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  });
  
  // ... (other routes and configurations)
  
// Delete a specific task based on its ID
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((t) => t.id !== taskId);

  res.json({ message: 'Task deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});