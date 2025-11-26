import mongoose from "mongoose"

const connection = (url)=>{
    mongoose.connect(url)
    .then( ()=>{
        console.log("db connected successfully")
    })
    .catch( (err) => {
        console.log("error in db connection ", err.message)
    })
}

export default connection