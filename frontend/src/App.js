import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import TaskForm from './pages/TaskForm';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/new-task" element={<TaskForm />} />
            </Routes>
        </Router>
    );
}

export default App;