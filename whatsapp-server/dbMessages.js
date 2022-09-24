import mongoose from 'mongoose';
// const mongoose =require('mongoose');

const whatsappSchema = mongoose.Schema({
    userid: String,
    allmessages: [
        {
            username: String,
            message: String,
            name: String,
            timestamp: String,
            received: String
        }
    ]
})

export default mongoose.model('messagecontents', whatsappSchema);