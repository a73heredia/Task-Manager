const express = require('express');
const router = express.Router();

const { getAll, createTask, updateTask, deleteTask, getTask } = require('../controllers/tasks');

router.route('/').get(getAll).post(createTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

module.exports = router;