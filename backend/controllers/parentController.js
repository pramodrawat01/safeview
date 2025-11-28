import validaror from 'validator'
import bcrypt from 'bcrypt'
import Kid from '../models/kid.js'
import Parent from '../models/parent.js'



export const createChild = async(req, res)=>{
    const {userName, password, categories} = req.body 
    const parentId = req.user.id
    console.log(categories)
    

    if(!userName || !password){
        const err = new Error('fill the details first')
        err.statusCode = 400
        throw err
    }

    if(!validaror.isStrongPassword(password)){
        const err = new Error('password must be strong, include uppercase, numbers and symbles')
        err.statusCode = 400
        throw err
    }

    

    const existingKid =  await Kid.findOne({userName}) 

    if(existingKid){
        const err = new Error('userName already taken, choose another one!')
        err.statusCode = 400
        throw err
    }

    try {
        
        const hashedPassword = await bcrypt.hash(password, 10)
    
        const newKid = new Kid({
            userName,
            password : hashedPassword,
            parentId,
            allowedCategories : categories && categories.length > 0 
                ? categories
                : undefined
    
        })
    
        await newKid.save()

        await Parent.findByIdAndUpdate(
            parentId,
            { 
                $push : {
                    kids : newKid._id
                }
            },
            { new : true }
        )

        res.status(201).json({
            message : "child created successfully",
            role : newKid.role 
        })
    } catch (error) {
        const err = new Error(error.message)
        err.statusCode = 400
        throw err
    }


}


export const getAllChilds = async(req, res)=>{
    const parentId = req.user.id

    // find the parent with parentId and populate kids to get the requried data like username and allowedcategories 

    

    const parent = await Parent.findById(parentId)
    .populate('kids', "userName allowedCategories")

    if(!parent){
        const err = new Error('parent not found ')
        err.statusCode = 404
        throw err
    }

    res.status(200).json({
        success : true,
        kids : parent.kids
    })

}




export const updateChild = async (req, res) => {
  try {
    const { userName, categories } = req.body;
    const parentId = req.user.id;

    if (!userName || !categories) {
      const err = new Error("incomplete detail to update child");
      err.statusCode = 400;
      throw err;
    }

    console.log("1 - all data found");
    const child = await Kid.findOne({ userName, parentId });
    if (!child) {
      const err = new Error("Not found, child does not exist");
      err.statusCode = 404;
      throw err;
    }

    console.log("2- child also found");

    await Kid.findByIdAndUpdate(
      child._id,
      {
        allowedCategories : categories
      },
      { new: true }
    )

    console.log("3- child updated done");
    res.status(200).json({
      success: true,
      message: "child updated successfully",
    });
    console.log("4 - respose send done ");
  } catch (error) {
    const err = new Error(error.message);
    err.statusCode = 500;
    throw err;
  }
};