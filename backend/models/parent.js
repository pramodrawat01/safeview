import { model, Schema } from "mongoose";

const parentSchema = new Schema({
    userName : {
        type : String,
        required : [true, "userName is required"],
    },
    email : {
        type : String,
        required : [true, "email is required"],
        unique : [true, ""],
        
    },
    password :{
        type : String,
        required : [true, "please enter the password"],

    },
    role : {
        type :String,
        enum : ['parent'],
        default : 'parent'
    },
    kids : [
        {
            type : Schema.Types.ObjectId,
            ref : "Kid"
        }
    ]
},
{
    timestamps : true
})

const Parent = model("Parent", parentSchema)
export default Parent