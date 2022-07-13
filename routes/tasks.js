const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.route('/tasks').get(taskController.getAllTasks).post(taskController.createTask);
router.route('/task/:id').get(taskController.getTaskById).patch(taskController.updateTask).delete(taskController.deleteTask).put(taskController.editTask);

module.exports = router;