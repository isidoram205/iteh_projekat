import ReactApexChart from 'react-apexcharts'

import { Typography, Box, Stack} from '@pankod/refine-mui'
import { FoodChartProps } from 'interfaces/home'

const Foods = ({title, value, src, text, text2} : FoodChartProps) => {
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
      sx={{backgroundColor: "#d5bdaf"}}

    >
      <Stack direction="column">
        <Typography fontSize={20} color="#000814" fontWeight={400} fontStyle="italic">{title}</Typography>
        <Typography fontSize={44} color="#edede9" fontWeight={900} mt={1} fontStyle="italic"
        style={{
          position: 'relative',
          animation: 'zoom-in-zoom-out 2s infinite',
          transformOrigin: 'center', // Adjust the transform origin as needed
        }}
        >{value}<style>
        {`
         @keyframes zoom-in-zoom-out {
          0% {
            transform: scale(1, 1);
          }
          50% {
            transform: scale(1.2, 1.2); // Adjust the scale values
          }
          100% {
            transform: scale(1, 1);
          }
        }
        `}
      </style></Typography>
        <Typography fontSize={20} color="#000814" fontWeight={400} fontStyle="italic">{text}</Typography>
        <Typography fontSize={20} color="#000814" fontWeight={400} fontStyle="italic">{text2}</Typography>
     
      </Stack>

    <img src= {src} style={{ height: '270px', width: '450px', padding: '10px', borderRadius: '35px'}} />


      
    </Box>
  )
}

export default Foods