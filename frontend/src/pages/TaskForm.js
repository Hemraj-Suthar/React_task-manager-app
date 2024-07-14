import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description }),
            });
            await response.json();
            navigate('/');
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    return (
        <div className='container'>
            <h1>Create New Task</h1>
            <form onSubmit={handleSubmit}>
                <div className='title-box'>
                    <label>Title :</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className='des-box'>
                    <label>Description :</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <button type="submit" className='create-task-btn'>Create Task</button>
            </form>
        </div>
    );
};

export default TaskForm;


