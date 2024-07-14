import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import {connect_db, Task} from './connect_db/connect_db.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

connect_db();

// Get all tasks
app.get('/api/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.get('/api/tasks/:id', async (req, res) => {
    try {
        const objectId = new mongoose.Types.ObjectId(req.params.id);
        const task = await Task.findById(objectId);
        
        if (task) {
            res.json(task);
        } else {
            res.status(404).send('Task not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Create a new task
app.post('/api/tasks', async (req, res) => {
    const newTask = new Task({
        title: req.body.title,
        description: req.body.description,
    });
    await newTask.save();
    res.status(201).json(newTask);
});

// Update a task
app.put('/api/tasks/:id', async (req, res) => {
    try {
        const taskId = new mongoose.Types.ObjectId(req.params.id);
        console.log(taskId);
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { title: req.body.title, description: req.body.description },
            { new: true }
        );

        if (updatedTask) {
            res.json(updatedTask);
        } else {
            res.status(404).send('Task not found');
        }
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Delete a task
app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const taskId = new mongoose.Types.ObjectId(req.params.id);
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (deletedTask) {
            res.status(204).send();
        } else {
            res.status(404).send('Task not found');
        }
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});