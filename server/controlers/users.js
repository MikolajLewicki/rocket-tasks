import mongoose from 'mongoose'
import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'
import imageToBase64 from 'image-to-base64';
import dotenv from 'dotenv'
import jwt from "jsonwebtoken";

export const addUser = async (req, res) => {
    const {name, mail, isAdmin} = req.body
    try{
        const result = await User.find({mail})
        if(result.length === 0){
            ///password generator
        const length = 8
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        let password = "";
        for (let i = 0, n = charset.length; i < length; ++i) {
            password += charset.charAt(Math.floor(Math.random() * n));
        }
        const hashedPassword = await bcrypt.hash(password, 12)


        ///sending mail with password 
        let transporter = nodemailer.createTransport({
            service:'hotmail',
            auth: {
              user: process.env.FROM, 
              pass: process.env.PASSWORD, 
            },
          });
        const options = {
            from: process.env.FROM,
            to: mail,
            subject: 'Dane dostępowe Rocket Tasks',
            text: `Miło cie widzieć w drużynie! \n twoje dane dostępowe do Rocket Tasks to: \n login: ${mail} \n hasło: ${password}`,
        }
        
        // transporter.sendMail(options)


        /// Converting img to base64
        let img = ""
        img = await imageToBase64("https://i.imgur.com/XY1MBVk.png")
        img = `data:image/jpeg;base64,${img}`


        /// Creating user
        await User.create({name, mail, isAdmin, password: hashedPassword, img, tasks: []})

        res.status(200).json({message: "user signed succesfully"})
        }else{
            res.status(417).json({message: "user already exist"})
        }
        
        
    }catch(err){
        console.log(err)
    }
}

export const getUsers = async (req, res) => {
    try{
        const result = await User.find()
        res.status(200).json({result: result})
    }catch(err){
        console.log(err)
    }
}
export const getUser = async (req, res) => {
    try{
        const result = await User.findById(req.body[0])
        res.status(200).json({result: result})
    }catch(err){
        console.log(err)
    }
}

export const logIn = async (req, res) => {
    try{
        const {mail, password} = req.body
        const existingUser = await User.findOne({mail})
        if(!existingUser) return res.status(404).json({ message: "user doesn't exist"})

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if(!isPasswordCorrect) return res.status(400).json({ message: 'invalid credentials'})

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, process.env.SECRET, {expiresIn: '1h'})
        res.status(200).json({result: existingUser, token})
    }catch(err){
        console.log(err)
    }
}
export const checkLogin = async (req, res) => {
    try{
        const id = req.body[0]
        const result = await User.findById(id)
        if(result){
            res.status(200).json({result: result})
        }else{
            res.status(406).json({message: 'unauthenticated'})
        }
        
    }catch(err){
        console.log(err)
    }
}
export const updateAvatar = async (req, res) => {
    try{
        const result = await User.findByIdAndUpdate(req.body[1], {img: req.body[0]})
        if(result){
            res.status(200).json({result: result})
        }else{
            res.status(406).json({message: 'unauthenticated'})
        }
        
    }catch(err){
        console.log(err)
    }
}
export const updatePassword = async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body[0], 12)
        const result = await User.findByIdAndUpdate(req.body[1], {password: hashedPassword})
        if(result){
            res.status(200).json({result: result})
        }else{
            res.status(406).json({message: 'unauthenticated'})
        }
        
    }catch(err){
        console.log(err)
    }
}
export const deleteUser = async (req, res) => {
    try{
        await User.findByIdAndDelete(req.body[1])
        res.status(200).json({message: 'User deleted succesfully'})
    }catch(err){
        console.log(err)
    }
}
export const resetAvatar = async (req, res) => {
    try{
        let img = ""
        img = await imageToBase64("https://i.imgur.com/XY1MBVk.png")
        img = `data:image/jpeg;base64,${img}`
        await User.findByIdAndUpdate(req.body[1], {img})
        res.status(200).json({message: 'User updated succesfully'})
    }catch(err){
        console.log(err)
    }
}
export const resetPassword = async (req, res) => {
    try{
        const length = 8
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        let password = "";
        for (let i = 0, n = charset.length; i < length; ++i) {
            password += charset.charAt(Math.floor(Math.random() * n));
        }
        const hashedPassword = await bcrypt.hash(password, 12)

        const userToEdit = await User.findById(req.body[1])

        ///sending mail with password 
        let transporter = nodemailer.createTransport({
            service:'hotmail',
            auth: {
              user: process.env.FROM, 
              pass: process.env.PASSWORD, 
            },
          });
        const options = {
            from: process.env.FROM, 
            to: userToEdit.mail,
            subject: 'Reset hasła Rocket Tasks',
            text: `Twoje hasło w Rocket Tasks zostało zresetowane! \n twoje nowe hasło to: ${password}`,
        }
        
        transporter.sendMail(options)

        await User.findByIdAndUpdate(req.body[1], {password: hashedPassword})
        res.status(200).json({message: 'User updated succesfully'})
    }catch(err){
        console.log(err)
    }
}
export const changeMail = async (req, res) => {
    try{
        await User.findByIdAndUpdate(req.body[1], {mail: req.body[0].newMail})
        res.status(200).json({message: 'User updated succesfully'})
    }catch(err){
        console.log(err)
    }
}
export const changeName = async (req, res) => {
    try{
        await User.findByIdAndUpdate(req.body[1], {name: req.body[0].newName})
        res.status(200).json({message: 'User updated succesfully'})
    }catch(err){
        console.log(err)
    }
}
