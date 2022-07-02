import mongoose from 'mongoose'

const taskSchema = mongoose.Schema({
    title: {type: String, required: true},
    link: {type: String, required: true},
    status: {type: String, required: true},
    assignedFor: {type: String, required: true},
    dateOfCreation: {type: Date, required: true},
    startOfWork: {type: Date},
    endOfWork: {type: Date},
    id: {type: String},
})

export default mongoose.model('Task', taskSchema)