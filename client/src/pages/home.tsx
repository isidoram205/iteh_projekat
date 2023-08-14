import { useList } from '@pankod/refine-core';

import{ Typography, Box, Stack, fontFamily} from '@pankod/refine-mui'

import photoImage from '../assets/happy.jpg'
import photoImage2 from '../assets/types.jpg'


import{
    HappyChart,
    Foods,
    RestaurantCard
} from 'components';
 

const Home = () => {
    {/*za vracanje restorana koristimo ovu kuku */}
    const {data, isLoading, isError} = useList({
        resource:'restaurants',
        config: {
            pagination:{
            pageSize: 6
            }
        }


    })
//koristi se opcionalni operator ?. da bi se izbeglo pristupanje undefined vrednostima 
//u objektu data. Ako data ne postoji, uzmemo prazan niz umesto undefined vrednosti.
    const latestRestaurants = data?.data ?? [];

    if(isLoading) return <Typography>Loading...</Typography>
    if(isError) return <Typography>Something went wrong!</Typography>

    return(
        <Box
        sx={{background: "linear-gradient(109.5deg, rgba(223, 213, 204, 1) 11.2%, rgba(223, 205, 187, 1) 100.2%)", display: 'flex', borderRadius:'25px'}}
        >
        <Box
        sx={{background: 'linear-gradient(109.5deg, rgba(223, 213, 204, 1) 11.2%, rgba(223, 205, 187, 1) 100.2%)', padding: '30px', display: "flex", flexWrap:'wrap', gap:4,
        borderRadius:'25px'}}
        >
            <Typography fontSize={25} fontWeight={700} color="#000814">
            Taste of Belgrade 🍽️
            <Box
                flex = {1}
                borderRadius="15px"
                padding="20px"
                bgcolor="#fcfcfc"
                display="flex"
                flexDirection="column"
                minWidth="100%"
                mt="25px"
                sx={{backgroundColor: "#d5bdaf"}}
                >
            <Typography fontSize={18} fontWeight={500} color="#000814" textAlign={"justify"}>
Welcome to "Tastes of Belgrade" - the ultimate restaurants guide app that will take you on a delightful culinary journey through the vibrant city of Belgrade, Serbia. If you are a food lover or a traveler looking for the best dining experiences, this app is your go-to companion!

Discover a Gastronomic Paradise:
"Tastes of Belgrade" is your gateway to a gastronomic paradise, where you can explore the rich tapestry of flavors and cuisines that make Belgrade a food lover's haven. From traditional Serbian dishes like Ćevapi, Burek, and Ajvar, to international delights, this app has it all covered.

Curated Restaurant Recommendations:
We understand that finding the perfect restaurant can be overwhelming, especially in a city as diverse as Belgrade. That's why our team of food enthusiasts has carefully curated a selection of top-notch eateries to satisfy every craving. Whether you're seeking a fine-dining experience, a cozy cafe, or a hidden gem loved by the locals, "Tastes of Belgrade" has got you covered.

Explore Local Favorites and Hidden Gems:
Beyond the popular tourist spots, we'll take you off the beaten path to discover Belgrade's hidden culinary gems. Unearth charming local eateries, family-owned bistros, and street food stalls that serve up the most delectable dishes with a warm Serbian smile.👨‍🍳
                    </Typography>
                </Box>

                <Box mt="20px" display="flex" flexWrap="wrap" gap={2} paddingTop={5}>
                <HappyChart
                title='Over '
                value={10000}
                src= {photoImage}
                text='Happy Customers!😃'

                />

                <Foods
                title='Enjoy over'
                value={500}
                src= {photoImage2}
                text= 'different types of'
                text2= 'restaurants located in Belgrade!!!!🍕🥙🍣🥧'

                />

            </Box>

            </Typography>



            <Box
                flex = {1}
                borderRadius="15px"
                padding="20px"
                bgcolor="#fcfcfc"
                display="flex"
                flexDirection="column"
                minWidth="100%"
                mt="25px"
                sx={{backgroundColor: "#c9ada7"}}
                >
                <Typography fontSize="20px" fontWeight={600} color="#000814"> TRENDING RESTAURANTS📈 </Typography>
                <Box mt={2.5} sx={{display: 'flex', flexWrap:'wrap', gap:4}}>
                {latestRestaurants.map((restaurant) => (

                    <RestaurantCard
                    key={restaurant._id}
                    id={restaurant._id}
                    title={restaurant.title}
                    location={restaurant.location}
                    price={restaurant.price}
                    photo={restaurant.photo}
                    />
                ))}
                </Box>

            </Box>
        </Box>
        </Box>
    )
}

export default Home