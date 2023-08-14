import { ApexOptions } from 'apexcharts';

export const ReservationCountSeries = [
  {
    name: 'This Month',
    data: [183, 124, 115, 85, 143, 143, 96, 234, 71, 123, 120, 201],
    
  },
  {
    name: 'Last Month',
    data: [95, 84, 72, 44, 108, 108, 47, 200, 81, 144, 80, 220],
    
  },
];

export const ReservationCountOptions: ApexOptions = {
  chart: {
    type: 'bar',
    toolbar: {
      show: false,
    },
  },
  colors: ['#f5ebe0', '#eae2b7'],
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: false,
      columnWidth: '65%',
    },
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    show: false,
  },
  stroke: {
    colors: ['transparent'],
    width: 4,
  },
  xaxis: {
    title: {
      text: 'Months of the year',
      style: {
        fontSize: '20px', 
      }
    },
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct','Nov','Dec'],
    labels: {
      style: {
        fontSize: '18px', 
      },
    },
  },
  yaxis: {
    title: {
      text: 'Number of reservations',
      style: {
        fontSize: '20px', 
      },
    },
    labels: {
      style: {
        fontSize: '17px', 
      },
    },

  },
  fill: {
    opacity: 2,
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
    fontSize: '14px',
  },
  tooltip: {
    y: {
      formatter(val: number) {
        return ` ${val} reservations`;
      },
    },
  },
};