import jwt from 'jsonwebtoken'
import User from "../models/UserModel.js";
import dotenv from "dotenv";
dotenv.config();

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token){
        return res.status(401).json({
            status: 401,
            message: "You are not logged in"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);

        const currentUser = await User.findById(decoded.id)
        if (!currentUser){
            return res.status(401).json({
                status: "Error",
                message: 'The user belonging to this token does no longer exist.'
            })
        }

        if (currentUser.changedPasswordAfter(decoded.iat)){
            return res.status(401).json({
                status: "Error",
                message: 'User recently changed password! Please log in again.'
            })
        }

        req.user = currentUser
        next()
    } catch (err){
        res.status(401).json({
            status: 'error',
            message: 'Invalid token. Please log in again!'
        });
    }
}

export default protect