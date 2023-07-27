import mongoose from 'mongoose';

//modeli koji su potrebni
import Restaurant from '../mongodb/models/restaurant.js';
import User from '../mongodb/models/user.js';

import * as dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';

//biblioteka dotenv učitava .env fajl
dotenv.config();

//loudinary.config() koja prihvata tri parametra  Ovi parametri se prosleđuju iz .env fajla preko process.env,
//aplikacija može da koristi Cloudinary API za preuzimanje, otpremanje i manipulisanje slikama
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})



const getAllRestaurants = async (req, res) => {
    //parametri za filtriranje podataka,ograničavanje broja povratnih podataka i sortiranje podataka
    const { _end, _order, _start, _sort, title_like = "", restaurantType = ""} = req.query;

    //kasnije se koristi za definisanje različitih parametara za pretraživanje baze podataka
    const query = {};

    //proverava se "restaurantType" iz zahteva i ako je definisan, 
    //dodaje se u "query" objekat kao parametar
    if(restaurantType !== ""){
        query.restaurantType = restaurantType;
    }

    // Pronađeni restorani se dodaju u "query" objekat
    if(title_like){
        query.title = {$regex: title_like, $options: 'i' };
    }

    try {
        //countDocuments funkcija da bi se izbrojao broj pronađenih restorana pre slanja upita bazi podataka
        const count = await Restaurant.countDocuments({query});

        //vracaju se restorani na osnovu zahteva,ogranicenje broja rezultata i da li ima preskakanje, 
        //i sortiranje
        const restaurants = await Restaurant
            .find(query)
            .limit(_end)
            .skip(_start)
            .sort({[_sort]: _order})

        // uključuje se informacija o ukupnom broju pronađenih restorana
        res.header('x-total-count', count);
        res.header('Access-Control-Expose-Headers', 'x-total-count');

        //svi nadjeni restorani se šalju kao JSON odgovor klijentskoj aplikaciji.
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({message:error.message}) 
    }
};

const getRestaurantDetails = async (req, res) => {
    //iz parametara zahteva se izdvaja id
    const { id } = req.params;
    //da se nadje taj restoran sa tim id-em
    const restaurantExists = await Restaurant.findOne({
        _id: id
    }).populate('creator',); //da se prikaze i onaj koji je kreiraro restoran

    //salje odgovor sa detaljima o restoranu
    if(restaurantExists) { res.status(200).json(restaurantExists) 
    }else{
        res.status(404).json({ message: 'Restaurant not found'});
    }
};

const createRestaurant = async (req, res) => {

    try {
        //req.body sadrži parametre za kreiranje restorana koje je korisnik poslao preko HTTP zahteva.
        const {title, description, restaurantType, location, price, photo, email} = req.body;

    //zapocinje se nova transakcija u bazi podataka
    const session = await mongoose.startSession();
    session.startTransaction();

    //pronađe korisnika na osnovu njihove adrese e-pošte
    const user = await User.findOne({ email }).session(session);

    if(!user) throw new Error('User not found');

    //servis da bi se slika restorana postavila na mrežu i dobila javni URL.
    const photoUrl = await cloudinary.uploader.upload(photo);

    //novu instanca Restaurant modela, koja se zatim dodaje u bazu podataka. 
    const newRestaurant = await Restaurant.create({
        title,
        description,
        restaurantType,
        location,
        price,
        photo: photoUrl.url,
        creator: user._id
    });
    // ID novog restorana u listu svih restorana korisnika. 
    //Zatim se ovo ažuriranje čuva u bazi podataka.
    user.allRestaurants.push(newRestaurant._id);
    await user.save({ session });

    //izvrsava transakciju, promene tokom transakcije se potvrđuju.
    await session.commitTransaction();

    res.status(200).json({ message: 'Restaurant created succesfully'}) 

    } catch (error) {
       res.status(500).json({message:error.message}) 
    }
   

};
//azuriranje restorana
const updateRestaurant = async (req, res) => {
    try {
        //koji restoran se menja
        const {id} = req.params;
        //req.body sadrži parametre za kreiranje restorana koje je korisnik poslao preko HTTP zahteva.
        const {title, description, restaurantType, location, price, photo} = req.body;

        const photoUrl = await cloudinary.uploader.upload(photo);

        await Restaurant.findByIdAndUpdate({_id: id}, {
            title,
            description,
            restaurantType,
            location,
            price,
            photo: photoUrl.url || photo

        })

        res.status(200).json({message: 'Restaurant updated successfully'})

    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
};


//brisanje restorana
const deleteRestaurant = async (req, res) => {
    try {
        //koji restoran se brise
        const { id } = req.params;

        //koristi za pronalaženje restorana u bazi
        const restaurantToDelete = await Restaurant.findById({
            _id: id
        }).populate('creator'); //učitali podaci korisnika koji je kreirao taj restoran

        if(!restaurantToDelete) throw new Error('Restaurant not found'); //ako ne postoji

        //zapocinje se nova transakcija u bazi podataka
        const session = await mongoose.startSession();
        session.startTransaction();

        //Uklanjanje restorana iz baze podataka koristeći remove funkciju 
        restaurantToDelete.remove({session});
        //uklanja referenca na restoran kod korisnika sa pull funkcijom
        restaurantToDelete.creator.allRestaurants.pull(restaurantToDelete);

        //Ažuriranje korisničkog objekta u bazi podataka kako bi se uklonila ta referenca
        await restaurantToDelete.creator.save({session});
        await session.commitTransaction();

        res.status(200).json({message: 'Restaurant deleted successfully'});

    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

export {
    getAllRestaurants,
    getRestaurantDetails,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
}