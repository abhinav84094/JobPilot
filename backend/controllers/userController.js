




export const uploadResume = (req,res)=>{

    console.log(req.file);

    res.json({
        success:true,
        file:req.file
    });

}