import mongoose from 'mongoose'
import Task from '../models/task.js'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

export const addTask = async (req, res) => {
    try{
        console.log(req.body)
    }catch(err){
        console.log(err)
    }
}

