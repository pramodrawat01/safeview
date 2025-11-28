import { model, Schema } from "mongoose";

const parentSchema = new Schema({
    userName : {
        type : String,
        required : [true, "userName is required"],
        unique : [true, 'must be unique']
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