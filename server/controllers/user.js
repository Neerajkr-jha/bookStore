import { User } from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const signup= async (req, res) => {
    try {
        const { username, email, password, address } = req.body

        if (!username || !email || !password || !address) {
            return res.status(400).json({ message: "All fields are required" });
        }
        //username length check
        if (username.length < 4) {
            return res.status(400).json({ message: "Username length should be greater then four" })
        }
        //check if already exists
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" })
        }
        const existingemail = await User.findOne({ email });
        if (existingemail) {
            return res.status(400).json({ message: "Email already exists" })
        }

        if (password.length <= 5) {
            return res.status(400).json({ message: "Password length should be greater then four" })
        }

        const hashPassword=await bcrypt.hash(password,10);

        const newUser = await User.create({ username, email, password:hashPassword, address });
        
         return res.status(200).json({ message: "Signup successfully" })
    } catch (error) {
        return res.status(500).json({ message: "Internal Server error" })
    }
}

const login= async (req, res) => {
    try {
        const { username, password } = req.body

        if (!username || !password ) {
            return res.status(400).json({ message: "All fields are required" });
        }
        //username length check
        if (username.length < 4) {
            return res.status(400).json({ message: "Username length should be greater then four" })
        }
        //check if already exists
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        // const existingemail = await User.findOne({ email });
        // if (existingemail) {
        //     return res.status(400).json({ message: "Invalid credentials" })
        // }

        if (password.length <= 5) {
            return res.status(400).json({ message: "Password length should be greater then four" })
        }

        bcrypt.compare(password,existingUser.password,(err,data)=>{
            if(data){
                const authclaims=[
                    {name:existingUser.username},
                    {role:existingUser.role}
                ]
                const token=jwt.sign({authclaims},process.env.SECRET,{expiresIn:"7d"})
                 return res.status(200).json({id:existingUser._id,token:token,role:existingUser.role});
            }else{
                 return res.status(400).json({ message: "Invalid credentials" })
            }
        })
    } catch (error) {
        return res.status(500).json({ message: "Internal Server error" })
    }
}

const getUser= async (req,res)=>{
    try {
        const {id}=req.headers;
        if (!id) {
            return res.status(400).json({ message: "ID  required" });
        }
        const data=await User.findById(id).select('-password');
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ message: "Internal Server error" })
    }
}

const updateAddress=async (req,res)=>{
    try {
        const {id}=req.headers;
        const {address}=req.body
        if (!id || !address) {
            return res.status(400).json({ message: "ID and address required" });
        }
        await User.findByIdAndUpdate(id,{address:address});
         return res.status(200).json({message:"Address updated successfully"})
    } catch (error) {
        return res.status(500).json({ message: "Internal Server error" })
    }
}

export {signup,login,getUser,updateAddress};