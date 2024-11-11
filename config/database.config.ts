import mongoose from 'mongoose';

export const connect = async () =>  {
    const urlDatabase: any = process.env.MONGO_URL
    try {
        mongoose.connect(urlDatabase);
        console.log("Connected to MongoDB! Successfully");
    } catch (err) {
        console.error("Failed to connect to MongoDB");
    }
}