const Task = require('../models/Task');

const getAll = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(201).json({ tasks })
    } catch (error) {
        res.status(500).json({ msg: error.errors.name.message })
    }
}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({ task })
    }
    catch (err) {
        res.status(500).json({ msg: err })
    }

}

const getTask = async (req, res) => {
    try {
        const { id: taskID } = req.params
        const task = await Task.findOne({ _id: taskID })

        if (!task) {
            return res.status(404).json({ msg: 'No task with that id' })
        }
        res.status(200).json({ task })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}


// const deleteTask = async (req, res) => {

//     try {
//         const { id: taskID } = req.params
//         const task = await Task.findOneAndDelete({ _id: taskID })

//         if (!task) {
//             return res.status(404).json({ msg: 'No task with that id' })
//         }
//         res.status(200).json({ task })


//     } catch (error) {
//         res.status(500).json({ msg: error })
//     }
//     res.send('delete task');
// }
const deleteTask = async (req, res, next) => {
    const { id: taskID } = req.params
    const task = await Task.findOneAndDelete({ _id: taskID })
    if (!task) {
        return next(`No task with id : ${taskID}`, 404)
    }
    res.status(200).json({ task })
}

const updateTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
            new: true, runValidators: true
        })

        if (!task) {
            return res.status(404).json({ msg: `No task with that id ${taskID}` })
        }
        res.status(200).json({ task })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}
module.exports = {
    getAll,
    createTask,
    getTask,
    updateTask,
    deleteTask
}