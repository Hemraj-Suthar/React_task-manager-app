import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TaskList from '../components/TaskList';

const Home = () => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/tasks');
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className='container'>
            <h1>Task Manager</h1>
            <TaskList tasks={tasks} fetchTasks={fetchTasks} />
            <Link to="/new-task"><button  className='create-task-btn'>Create New Task</button></Link>
        </div>
    );
};

export default Home;
