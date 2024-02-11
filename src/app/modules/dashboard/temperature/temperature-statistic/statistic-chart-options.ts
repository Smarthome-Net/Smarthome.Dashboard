import { ChartSettings } from '@models';

export const StatisticChartOptions: Partial<ChartSettings> = {
  series: [],
  chart: {
    type: "bar",
    height: 500,
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: "smooth"
  },
  markers: {
    size: 1
  },
  yaxis: {
    title: {
      text: "Temperatur in °C"
    },
    labels: {
      formatter(val) {
        return val.toFixed(2);
      },
    }
  },
  legend: {
    position: "bottom",
    horizontalAlign: "left",
  }
};
