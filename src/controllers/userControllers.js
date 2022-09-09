const userSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");

const getAll = (req, res) =>{
    userSchema.find(function(err,users){
    if(err){
        res.status(500).send({message: err.message})   }
        res.status(200).send(users)
    })
}

const createUser = async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassword;

    try{
        const newUser = new userSchema(req.body)
        const savedUser = await newUser.save()
        res.status(201).json({message:"User adicionado!",savedUser
    })
    } catch(error){
        res.status(500).json({message: error.message})
    }

}

module.exports ={
    getAll,createUser
}