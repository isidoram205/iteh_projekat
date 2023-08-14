import { ArrowCircleUpRounded } from '@mui/icons-material'

import ReactApexChart from 'react-apexcharts'

import { Typography, Box, Stack} from '@pankod/refine-mui'

import { ReservationCountOptions, ReservationCountSeries } from './chart.config'

//za grafikon
const reservationCount = () => {
  return (
    <Box
      p={4}
      flex={1}
      bgcolor="#d5bdaf"
      id="chart"
      display="flex"
      flexDirection="column"
      borderRadius="15px"
    >
      <Typography fontSize={18} fontWeight={600} color="#11142d">
        Total Number Of Reservations On Web App
      </Typography>

      <Stack my="20px" direction="row" gap={4} flexWrap="wrap">
        <Typography fontSize={28} fontWeight={700} color='#11142d'>100.234 reservations</Typography>
        <Stack direction="row" alignItems="center" gap={1} >
          <ArrowCircleUpRounded sx={{
            fontSize: 30, color: "white"
          }}/>
          <Stack>
            <Typography fontSize={20} color="white" fontWeight={'500px'}>
              2.4%
            </Typography>
            <Typography fontSize={15} color="white">
              More than last months reservations
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      
      <ReactApexChart
        series={ReservationCountSeries}
        type="bar"
        height={510}
        options={ReservationCountOptions}
        
      />
      
    </Box>
  )
}

export default reservationCount