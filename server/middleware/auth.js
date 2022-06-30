import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try{
        if(req.headers.authorization !== undefined){
            const token = req.headers.authorization.split(" ")[1]
            jwt.verify(token, process.env.SECRET, (err) => {
                if(err){
                    return res.status(406).json({message: 'unauthenticated'})
                }else{
                    next()
                }
            })
        }else{
            console.log('im here')
            return res.status(406).json({message: 'unauthenticated'})
        }   
    }catch(err){
        console.log(err)
    }
}

export default auth