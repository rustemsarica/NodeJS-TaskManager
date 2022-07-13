const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const {createCustomError, CustomError} = require('../errors/custom-error');

const getAllTasks = asyncWrapper( async (req, res) => { 
    const tasks = await Task.find();
    res.status(200).json({tasks});  
})

const getTaskById = asyncWrapper( async (req, res) => {
    const task = await Task.findOne({_id:req.params.id});    
    if(!task){
        return next(createCustomError('Task not found:'+req.params.id,404));
    }
    res.status(200).json({task});
})

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
})

const updateTask = asyncWrapper( async (req, res) => {
    const task = await Task.findOneAndUpdate({_id:req.params.id},req.body,{new:true});
    if(!task){
        return next(createCustomError('Task not found:'+req.params.id,404));
    }
    res.status(200).json({task});
})

const editTask = asyncWrapper( async (req, res) => {
    const task = await Task.findOneAndUpdate({_id:req.params.id}, req.body, {new:true});
    res.send(task);
})

const deleteTask = asyncWrapper( async (req, res) => {   
    const task = await Task.findOneAndDelete({_id:req.params.id});
    if(!task){
        return next(createCustomError('Task not found:'+req.params.id,404));
    }
    res.status(200).send('Task deleted'); 
})

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    editTask,
    deleteTask
}