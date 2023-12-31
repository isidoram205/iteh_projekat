
import Home from './home';
import { Login } from './login';
import AllRestaurants from './all-restaurants';
import CreateRestaurant from './create-restaurant';
import EditRestaurant from './edit-restaurant';
import MyProfile from './my-profile';
import RestaurantDetails from './restaurant-details';
import BrokerProfile from './broker-profile';
import Brokers from './broker';
import Statistics from './statistics';


//predstavlja izvoz svih komponenti koje se koriste u aplikaciji. Svaka od ovih komponenti se uvozi iz svog odgovarajućeg fajla
// i nakon toga se izvozi na korišćenje drugim delovima aplikacije.
export {

  Home,
  Login,
  AllRestaurants,
  CreateRestaurant,
  EditRestaurant,
  MyProfile,
  RestaurantDetails,
  BrokerProfile,
  Brokers,
  Statistics
  
};