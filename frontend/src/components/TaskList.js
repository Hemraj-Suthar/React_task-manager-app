import React, {useState} from 'react';

const TaskList = ({ tasks, fetchTasks }) => {
    const [editTaskId, setEditTaskId] = useState(null);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    const handleEditClick = (task) => {
        setEditTaskId(task._id);
        setTaskTitle(task.title);
        setTaskDescription(task.description);
    };

    const handleUpdate = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: taskTitle,
                    description: taskDescription,
                }),
            });
            await response.json();
            fetchTasks(); // Refresh the task list
            setEditTaskId(null); // Exit edit mode
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/tasks/${id}`, {
                method: 'DELETE',
            });
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <table className="table-container">
            <thead>
                <tr>
                    <th>Sr. No</th>
                    <th>Task</th>
                    <th>Description</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task, index) => (
                    <tr key={task._id}>
                        <td>{index + 1}</td>
                        <td>{editTaskId === task._id ? (
                            <input type="text" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
                        ) : (
                            <span>{task.title}</span>
                        )}</td>
                        <td>{editTaskId === task._id ? (
                            <input type="text" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
                        ) : (
                            <span>{task.description}</span>
                        )}</td>
                        <td className='action'>
                            {editTaskId === task._id ? (
                                <button className='save-btn' onClick={() => handleUpdate(task._id)}>Save</button>
                            ) : (
                                <>
                                    <button className='edit-btn' onClick={() => handleEditClick(task)}>Edit</button>
                                    <button className='delete-btn' onClick={() => handleDelete(task._id)}>Delete</button>
                                </>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TaskList;

// return (
//     <>
//         {tasks.map(task => 
//             (editTaskId === task._id ? (
//                 <div key={task._id} className="task">
//                     <input type="text" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
//                     <textarea value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
//                     <button onClick={() => handleUpdate(task._id)}>Save</button>
//                 </div>
//             ) : (
//                 <div key={task._id} className="task">
//                     <h2>{task.title}</h2>
//                     <p>{task.description}</p>
//                     <button onClick={() => handleEditClick(task)}>Edit</button>
//                     <button onClick={() => handleDelete(task._id)}>Delete</button>
//                 </div>
//             )
//         ))}
//     </>
// );

