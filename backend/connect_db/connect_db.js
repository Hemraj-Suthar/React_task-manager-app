import mongoose from 'mongoose';

async function connect_db () {
    try {
        await mongoose.connect('mongodb://localhost:27017/Tasks-manager', { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('MongoDB connected successfully!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit the process with an error code if connection fails
    }
}


const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
});

const Task = mongoose.model('Task', taskSchema);


export {connect_db, Task};

  