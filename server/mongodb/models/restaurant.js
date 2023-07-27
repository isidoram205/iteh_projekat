//biblioteka za rad s MongoDB bazom podataka u Node.js okruženju
import mongoose from "mongoose";

//definicija seme
const RestaurantSchema = new mongoose.Schema ({
    title: {type:String, required: true},
    description: {type:String, required: true},
    restaurantType: {type:String, required: true},
    location: {type:String, required: true},
    price: {type:String, required: true},
    photo: {type:String, required: true},
    //povezano s drugim modelom "User".
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

})

// Mongoose model za "Restaurant" koji je baziran na prethodno definisanoj šemi 
const restaurantModel = mongoose.model('Restaurant', RestaurantSchema);

export default restaurantModel;