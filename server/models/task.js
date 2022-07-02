import mongoose from 'mongoose'

const taskSchema = mongoose.Schema({
    name: {type: String, required: true},
    link: {type: String, required: true},
    status: {type: String, required: true},
    dateOfCreation: {type: String, required: true},
    startOfWork: {type: String, required: true},
    endOfWork: {type: String, required: true},
    id: {type: String},
})

export default mongoose.model('Task', taskSchema)