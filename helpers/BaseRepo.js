const Admin = require("../model/admin")
const bcrypt = require('bcryptjs')

    

module.exports = {
    CreateUser : async (body) => {
        console.log("i am trying");
        const { name, email, password, role } = body
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new Admin({
            name,
            email,
            password:hashedPassword,
            role
        })

        const isUser = await newUser.save()
        console.log("------",isUser);
        return isUser
    }
}