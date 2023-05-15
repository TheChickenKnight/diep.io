import { Chart } from "../libs/chart.min.js";

const configuration = {
    type: 'line',
    data: {
      labels: [],
      datasets: [
                {
                    label: 'avg circles',
                    data: [],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,255,255,1)',
                    ],
                    borderWidth: 5
                },
            ]
    },
    options: {
    },
    plugins: [{
      id: 'background-colour',
      beforeDraw: (chart) => {
        const ctx = chart.ctx;
        ctx.save();
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, 1920, 1080);
        ctx.restore();
      }
    }]
  };
const ctx = document.getElementById('myChart');
    

class ChartMaker {
    constructor() {
        this.chart = new Chart(ctx, {
            width: 1920,
            height: 1080,
            chartCallback: (ChartJS) => {
                  ChartJS.defaults.responsive = true;
                  ChartJS.defaults.maintainAspectRatio = false;
              }
          });
    }

    file(name, label, data) {
        configuration.data.labels.push(label);
        configuration.data.datasets[0].data.push(data);
        this.chart.renderToBuffer(configuration).then(base => fs.writeFileSync(name, base));
    }
}