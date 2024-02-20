//This file is a utility file which is called wrapper files
//Using Promises we can handle[Preferable]

const asyncHandler = (requestHandler) => {
    return (req,res,next)=>{
        Promise
        .resolve(requestHandler(req,res,next))
        .catch((err)=> next)
    }   
}
export{asyncHandler}

//Using trycatch we can handle

// const asyncHandler = (fn) => async(req,res,next) => {
//     try {
//         await fn(req,res,next)  
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }


