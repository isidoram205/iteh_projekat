
import{ Typography, Box, Stack} from '@pankod/refine-mui'

import{
    RestaurantStatistics,
    ReservationCount
} from 'components';
 

const Statistics = () => {
    
    return(

        <Box>
            <Typography fontSize={25} fontWeight={700} color="#11142D">
                Web app statistics
            </Typography>

            <Stack mt="25px" width="100%" direction={{xs: 'column', lg: 'row'}} gap={4}>
                <ReservationCount/>
            </Stack>
            <Stack mt="25px" width="100%" direction={{xs: 'column', lg: 'row'}} gap={4}>
                <RestaurantStatistics/>
                <img src="https://media.cntraveler.com/photos/6179c440a9fbc0faf933d97a/4:3/pass/Oyster%2520Club-%2520Credit%2520Catherine%2520Dzilenski%2C%2520Idlewild%2520Photo%2520Co._CY3C8595-2.jpg" 
                alt="Image Restaurant" 
                style={{ maxWidth: '58%', height: 'auto', borderRadius: '20px' }}/>
                
            </Stack>

        </Box>
        
    )
}

export default Statistics