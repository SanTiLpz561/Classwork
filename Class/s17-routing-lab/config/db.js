import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(MONGOURL);
        console.log(`Mongo DB Atlas Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Database connection error: ${error.message}`);
        proccess.exit(1);
    }
    
};