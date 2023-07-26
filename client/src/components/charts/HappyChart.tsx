import ReactApexChart from 'react-apexcharts'

import { Typography, Box, Stack} from '@pankod/refine-mui'
import { SimpleChartProps } from 'interfaces/home'

const HappyChart = ({title, value, src, text} : SimpleChartProps) => {
  return (
    <Box
      id="chart"
      flex={1}
      display="flex"
      bgcolor="#fcfcfc"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      pl={3.5}
      py={2}
      gap={2}
      borderRadius="15px"
      minHeight="110px"
      width="fit-content"
      sx={{backgroundColor: "#D3756B"}}

    >
      <Stack direction="column">
        <Typography fontSize={25} color="#FFC3A1" fontStyle="italic">{title}</Typography>
        <Typography fontSize={44} color="#A75D5D" fontWeight={900} mt={1} fontStyle="italic">{value}</Typography>
        <Typography fontSize={25} color="#FFC3A1" fontStyle="italic">{text}</Typography>
      
      </Stack>


    <img src= {src} style={{ height: '270px', width: '450px', paddingTop: '10px',
    paddingBottom: '10px', paddingRight: '10px', paddingLeft: '10px', borderRadius: '35px'
    , marginLeft: "-40px"}} />
   

      
    </Box>
  )
}

export default HappyChart