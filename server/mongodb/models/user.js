//biblioteka za rad s MongoDB bazom podataka u Node.js okruženju
import mongoose from 'mongoose';


//definicija seme za Usera
const UserSchema = new mongoose.Schema({
    name: { type:String, required:true },
    email: {type:String, required:true },
    avatar: {type:String, required:true },
    //referenca na model "Restaurant", što znači da je povezano s drugim modelom "Restaurant"
    allRestaurants: [{type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'}],

});

//Mongoose model za "User" koji se bazira na prethodno definisanoj semi
const userModel = mongoose.model('User', UserSchema);

export default userModel;