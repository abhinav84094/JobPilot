import mongoose from "mongoose"


const DBconnection = async ()=> {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected Successfully");
    }
    catch(err) {
        console.log(err);
    }
}


export default DBconnection;