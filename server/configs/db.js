import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log("Database Connnected"));
        await mongoose.connect(`${process.env.MONGODB_URI}/greencart`);
    } catch (error) {
        console.error(error.message)
    }
}

export default connectDB;