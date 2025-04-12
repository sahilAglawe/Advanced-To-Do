const express = require('express');
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  searchTasks
} = require('../controllers/Tasks');

const router = express.Router();

router.route('/')
  .get(getTasks)
  .post(createTask);

router.route('/search')
  .get(searchTasks);

router.route('/:id')
  .get(getTask)
  .put(updateTask)
  .delete(deleteTask);

module.exports = router;