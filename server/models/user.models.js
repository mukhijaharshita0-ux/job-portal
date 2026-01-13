import mongoose from 'mongoose'

const userSchema= mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String,
        unique: true
    },
    eduction:{
        type:String
    },
    password:{
        type: String
    },
    age:{
        type: Number
    },
    phone:{
        type:String
    },
    role:{
        type: String
    },
    city:{
        type:String
    }
})
const User= mongoose.model("User", userSchema)
export default User