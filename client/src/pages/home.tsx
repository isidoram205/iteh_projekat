import { useList } from '@pankod/refine-core';

import{ Typography, Box, Stack, fontFamily} from '@pankod/refine-mui'

import photoImage from '../assets/happy.jpg'
import photoImage2 from '../assets/types.jpg'
import photoImage3 from '../assets/enjoy.jpg'
import RestaurantIcon from '@mui/icons-material/Restaurant';


import{
    HappyChart,
    Foods
} from 'components';
 

const Home = () => {


    return(
        <Box
        sx={{backgroundColor: '#FFC3A1', display: 'flex'}}
        >
        <Box
        sx={{backgroundColor: '#FFC3A1', padding: '30px', display: "flex", flexWrap:'wrap', gap:4}}
        >
            <Typography fontSize={25} fontWeight={700} color="#A75D5D"
            fontStyle='italic'>
            Taste of Belgrade <RestaurantIcon sx={{color: "#A75D5D", fontStyle: "italic"}}/>
            <Box
                flex = {1}
                borderRadius="15px"
                padding="20px"
                bgcolor="#fcfcfc"
                display="flex"
                flexDirection="column"
                minWidth="100%"
                mt="25px"
                sx={{backgroundColor: "#D3756B"}}
                >
            <Typography fontSize={18} fontWeight={500} color="#FFC3A1">
Tastes of Belgrade: Your Ultimate Restaurants Guide

Welcome to "Tastes of Belgrade" - the ultimate restaurants guide app that will take you on a delightful culinary journey through the vibrant city of Belgrade, Serbia. If you are a food lover or a traveler looking for the best dining experiences, this app is your go-to companion!

Discover a Gastronomic Paradise:
"Tastes of Belgrade" is your gateway to a gastronomic paradise, where you can explore the rich tapestry of flavors and cuisines that make Belgrade a food lover's haven. From traditional Serbian dishes like Ćevapi, Burek, and Ajvar, to international delights, this app has it all covered.

Curated Restaurant Recommendations:
We understand that finding the perfect restaurant can be overwhelming, especially in a city as diverse as Belgrade. That's why our team of food enthusiasts has carefully curated a selection of top-notch eateries to satisfy every craving. Whether you're seeking a fine-dining experience, a cozy cafe, or a hidden gem loved by the locals, "Tastes of Belgrade" has got you covered.

Explore Local Favorites and Hidden Gems:
Beyond the popular tourist spots, we'll take you off the beaten path to discover Belgrade's hidden culinary gems. Unearth charming local eateries, family-owned bistros, and street food stalls that serve up the most delectable dishes with a warm Serbian smile.
                    </Typography>
                    <Stack direction="column"></Stack>
    <img src= {photoImage3} style={{ height: '370px', width: '650px', 
    padding: '25px', borderRadius: '35px', marginLeft: '280px'}} />
    <Stack/>
                </Box>

            </Typography>

            <Box mt="20px" display="flex" flexWrap="wrap" gap={2} paddingTop={5}>
                <HappyChart
                title='Over '
                value={10000}
                src= {photoImage}
                text='Happy Customers!'

                />

                <Foods
                title='Enjoy over'
                value={500}
                src= {photoImage2}
                text= 'different types of'
                text2= 'restaurants located in Belgrade!'

                />

            </Box>

            <Box
                flex = {1}
                borderRadius="15px"
                padding="20px"
                bgcolor="#fcfcfc"
                display="flex"
                flexDirection="column"
                minWidth="100%"
                mt="25px"
                sx={{backgroundColor: "#D3756B"}}
                >
                <Typography fontSize="18px" fontWeight={600} color="#FFC3A1"> LATEST RESTAURANTS </Typography>
                <Box mt={2.5} sx={{display: 'flex', flexWrap:'wrap', gap:4}}>
                <div>...Latest restaurants...</div>
                </Box>

            </Box>
        </Box>
        </Box>
    )
}

export default Home