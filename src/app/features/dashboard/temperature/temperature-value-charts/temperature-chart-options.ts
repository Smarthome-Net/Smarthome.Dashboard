import { ChartSettings } from "@models";

export const TempareturChartOptions: Partial<ChartSettings> = {
  series: [],
  chart: {
    type: "line",
    height: 500,
    redrawOnParentResize: true,
    redrawOnWindowResize: true,
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
    size: 5
  },
  xaxis: {
    type: 'category',
    title: {
      text: "Uhrzeit"
    },
    labels: {
      formatter(val: string | number, timestamp?: number, opts?: any) {
        if (val) {
          var date = new Date(val);
          return date.toLocaleString();
        }
        return '';
      }
    }
  },
  yaxis: {
    title: {
      text: "Temperatur in °C"
    },
    labels: {
      formatter(val) {
        return val.toFixed(2);
      },
    },
    min: 5,
    max: 40
  },
  legend: {
    position: "bottom",
    horizontalAlign: "left",
  }
};
