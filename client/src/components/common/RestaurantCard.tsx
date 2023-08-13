import { Place } from "@mui/icons-material";
import { Link } from "@pankod/refine-react-router-v6";
import { Typography, Box, Card, CardMedia, CardContent, Stack } from "@pankod/refine-mui";

import { RestaurantCardProps } from "interfaces/restaurant";


//prima parametra iz interfejsa i prikazuje na kartici nekretnine
const RestaurantCard = ({id, title, location, price, photo}: RestaurantCardProps) => {
  return (
    <Card
      component={Link} 
      to={`/restaurants/show/${id}`}
      sx={{
        maxWidth: '330px', 
        padding: '10px',
        '&:hover':{
          boxShadow: '0 22px 45px 2px rgba(176, 176, 176, 0.1)'
        },
        cursor:'pointer',
        textDecoration: 'none',
        backgroundColor: "#d5bdaf"
      }}
      elevation={0}
    >

      <CardMedia
      component="img"
      width = "100%"
      height={210}
      image = {photo}
      alt ="card image"
      sx ={{borderRadius: '10px'}}
      />

      <CardContent sx={{ display:'flex', flexDirection:'row', justifyContent:'space-between', gap: '10px', paddingX:'5px'}} >
        <Stack direction="column" gap={1}>
          <Typography fontSize={16} fontWeight={500} color="#11142d" >{title}</Typography>
          <Stack direction="row" gap={0.5} alignItems="flex-start">
            <Place
              sx={{fontSize: 18, color: '#11142d' ,marginTop: 0.5}}
            />
            <Typography fontSize={14} color='#808191'>{location}</Typography>
          </Stack>
        </Stack>
        <Box px={1.5} py={0.5} borderRadius={1} sx ={{background: "linear-gradient( 109.5deg,  rgba(229,233,177,1) 11.2%, rgba(223,205,187,1) 100.2% )"}} height = "fit-content" >
          <Typography fontSize={12} fontWeight={600} color="#000814" >${price}</Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default RestaurantCard