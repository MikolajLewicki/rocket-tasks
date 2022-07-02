import mongoose from 'mongoose'
import Task from '../models/task.js'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

export const addTask = async (req, res) => {
    const {title, link} = req.body
    try{
        if(req.get('origin')){
            const allTasks = await Task.find()
            if(!allTasks.find(item => item.link === link)){
                Task.create({title, link, status: "new", dateOfCreation: new Date()})
            }
        }
        res.status(200)
    }catch(err){
        console.log(err)
    }
}

