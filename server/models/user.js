import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    mail: {type: String, required: true},
    isAdmin: {type: Boolean, required: true},
    password: {type: String, required: true},
    img: {type: String, required: true},
    tasks: {type: Array, required: true},
    id: {type: String},
})

export default mongoose.model('User', userSchema)