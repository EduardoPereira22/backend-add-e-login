const userSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const getAll = (req, res) =>{
    userSchema.find(function(err,users){
    if(err){
        res.status(500).send({message: err.message})
       }
        res.status(200).send(users)
    })
};

const createUser = async (req, res) => {
    // acessar email que vem na requisição
    const email = req.body.email
    // procurar se existe o email no banco
    const currentUser = await userSchema.findOne({ "email": email })

    if (currentUser) {
        return res.status(500).send("Usuário já existe")
    }

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
};

// Função de deletar todos os documentos, somente para usuários autenticados:
const deleteAll = async (req, res) => {
    try {
        // Pegar o token no head da requsição
        const authHeader = req.get('authorization')
        // Código para tirar a palavra Bearer e pegar só o que tem dps do espaço
        const token = authHeader.split (' ')[1]

        // Testar se o token existe
        if (!token) {
            return res.status(401).send("Erro no header")
        }

        // Se o token existe, testar se ele é válido
        jwt.verify(token, SECRET, (err) => {
            if (err) {
            return res.status(401).send("Não autorizado")}
        })

        // Se o token é válido, deletar todos os documentos
        userSchema.deleteMany({}, function(err, obj) {
            if (err) {
                return res.status(400).send(err)
            }
            res.status(200).send("Usuários excluídos")
        })
    } catch(error) {
        res.status(400).send("Usuário não autenticado. Faça login")
    }
};

// Deletar um só user usando como filtro um e-mail que vier na requisição
const deleteUser = async (req, res) => {
    // Pegar email que vem do body da requisição
    const emailToDelete = req.body.email

    userSchema.deleteOne({"email": emailToDelete}, function(err, users) {
        if (err) {
            return res.status(400).send(err)
        }
        res.status(200).send("Usuário excluído")
    })
};

const updatePassword = async (req, res) => {
    // acessar a informação de qual documento atualizar
    const userToUpdate = { "email": req.body.email }

    // hasherizar nova senha
    const newHashedPassword = bcrypt.hashSync(req.body.newPassword, 10)

    userSchema.updateOne(userToUpdate, { "password": newHashedPassword }, function (err, user) {
        if (err) {
            return res.status(400).send(err)
        }
        res.status(200).send("Senha atualizada")
    })
};

module.exports = {
    getAll,
    createUser,
    deleteAll,
    deleteUser,
    updatePassword
};