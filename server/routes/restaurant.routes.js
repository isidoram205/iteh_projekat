//Uvoz biblioteke Express koja se koristi za upravljanje rutama i zahtevima
import express from 'express';
//funkcije iz kontrolera se importuju
import { createRestaurant,deleteRestaurant,getAllRestaurants,getRestaurantDetails,updateRestaurant } 
from '../controllers/restaurant.controller.js';

//Kreiranje novog router objekta koji se koristi za definisanje novih ruta
const router = express.Router();

//rute
router.route('/').get(getAllRestaurants);

router.route('/:id').get(getRestaurantDetails);

router.route('/').post(createRestaurant);

//za azuriranje samo odredjenih delova restorana
router.route('/:id').patch(updateRestaurant);

router.route('/:id').delete(deleteRestaurant);

export default router;

