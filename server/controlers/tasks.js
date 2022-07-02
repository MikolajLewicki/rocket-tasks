import mongoose from 'mongoose'
import Task from '../models/task.js'
import User from '../models/user.js'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

export const addTask = async (req, res) => {
    const {title, link} = req.body
    try{
        if(req.get('origin')){ ///Checking is request is from right origin
            const allTasks = await Task.find()
            const allUsers = await User.find()
            if(allTasks.length !== 0){ /// Checking is there any tasks
                if(!allTasks.find(item => item.link === link)){ ///Checking is there already that task
                    const pos = allUsers.map((i) => i._id.toString()).indexOf(allTasks.reverse()[0].assignedFor) /// Checking index of user assigned to last task
                    let index = pos
                    if(index + 1 === allUsers.length){   
                        index = 0
                    }else{
                        ++index
                    }
                    Task.create({title, link, status: "new", assignedFor: allUsers[index]._id, dateOfCreation: new Date()}) ///Assigning task for next user 
                }
            }else{
                Task.create({title, link, status: "new", assignedFor: allUsers[0]._id, dateOfCreation: new Date()}) /// Assigning task to first user of all
            }
        }
        res.status(200)
    }catch(err){
        console.log(err)
    }
}
export const getTasks = async (req, res) => {
    try{
        const result = await Task.find()
        res.status(200).json({result: result})
    }catch(err){
        console.log(err)
    }
}
export const changeStatus = async (req, res) => {
    try{
        await Task.findByIdAndUpdate(req.body[1], {status: req.body[0]})
        res.status(200).json({message: "status changed succesfully"})
    }catch(err){
        console.log(err)
    }
}

