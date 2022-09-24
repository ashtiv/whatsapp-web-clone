import mongoose from 'mongoose';
// const mongoose =require('mongoose');

const whatsappSchema = mongoose.Schema({
    useruid: String,
    username:String,
    purl:String,
    lastseen:String
})

export default mongoose.model('users', whatsappSchema);