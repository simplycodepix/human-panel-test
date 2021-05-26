import React from 'react';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import tinycolor from 'tinycolor2';

import styles from './Chart.module.scss';

import { DEFAULT_COLORS } from './palette';

Chart.plugins.register(ChartDataLabels);
Chart.pluginService.register({
  beforeDraw: (chart) => {
    const width = chart.chart.width,
      height = chart.chart.height,
      ctx = chart.chart.ctx;

    ctx.restore();
    ctx.font = '1.5625em sans-serif';
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#382C9C";

    const totalValue = chart.data.datasets[0].data.reduce((val, acc) => acc += val, 0);
    const text = totalValue,
      textX = Math.round((width - ctx.measureText(text).width) / 2),
      textY = height / 2;

    ctx.fillText(text, textX, textY);
    ctx.save();
  },
});

export default class PieChart extends React.Component {
  chart;
  ref = React.createRef();

  constructor(props) {
    super(props);
    this.buildLegends = this.buildLegends.bind(this);
  }

  componentDidMount() {
    this.updateChart();
  }

  componentDidUpdate() {
    this.updateChart();
  }

  buildLegends() {
    const legendEl = document.getElementById('legend');
    legendEl.innerHTML = this.chart.generateLegend();

    const legendItems = legendEl.getElementsByTagName('li');
    for (let i = 0; i < legendItems.length; i += 1) {
      legendItems[i].addEventListener("click", (event) => {
        const el = event.target;

        const meta = this.chart.getDatasetMeta(0);
        const item = meta.data[i];
        if (item.hidden === null || item.hidden === false) {
          item.hidden = true;
          el.classList.add('hidden');
        } else {
          el.classList.remove('hidden');
          item.hidden = null;
        }
        this.chart.update();
      }, false);
    }
  }

  mapChartData(data) {
    const labels = [];
    const dataset = {
      label: data.title,
      data: [],
      backgroundColor: DEFAULT_COLORS,
      hoverOffset: 4,
    };

    (data?.dataSeries || []).forEach((item) => {
      labels.push(item.label);
      dataset.data.push(item.count);
    });

    return {
      labels,
      datasets: [dataset]
    }
  }

  updateChart() {
    const chartRef = this.ref.current.getContext("2d");
    const { isDoughnut = false, data } = this.props;

    if (typeof this.chart !== "undefined") this.chart.destroy();

    this.chart = new Chart(chartRef, {
      type: isDoughnut ? 'doughnut' : 'pie',
      data: this.mapChartData(data),
      options: {
        responsive: true,
        legend: {
          display: false,
        },

        plugins: {
          datalabels: {
            color: (context) => {
              const backgroundColor = context.dataset.backgroundColor[context.dataIndex];
              return tinycolor(backgroundColor).isDark() ? 'rgba(255, 255, 255, 0.9)' : 'rgba(49, 49, 49, 0.8)';
            },
          },
        },
      },
    });

    this.buildLegends();
  }

  render() {
    const { containerId, chartSize = 236 } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.chartContainer}>
          <canvas
            id={`pie-chart-${containerId}`}
            ref={this.ref}
            width={chartSize}
            height={chartSize}
          />
        </div>
        <div id="legend"></div>
      </div>
    );
  }
};