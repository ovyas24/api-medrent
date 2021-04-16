const Admin = require("../model/admin")
const bcrypt = require('bcryptjs');

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
    },
    PasswordMatch :  async ({ email, opassword }) => {
        try {
            console.log("base-break", email, opassword);
            const user = await Admin.findOne({email:email})
            const isMatch = await bcrypt.compare(opassword, user.password)
            console.log(isMatch);
            return isMatch
        } catch (error) {
            console.log(error);
            return false
        }
    }
}