const User = require('../../Entities/UserSchema')
const jwt = require('jsonwebtoken')

const loginUserInteractor = async (email, password) =>{
    const user = await User.findOne({email, password})
    if(!user){
        throw new Error("Unable to find user.")
    }
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_TOKEN)
    return token
}

module.exports = loginUserInteractor