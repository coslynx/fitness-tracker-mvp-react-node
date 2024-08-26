import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';

Chart.register(CategoryScale, LineController, LineElement, PointElement, LinearScale, Title);

interface ProgressChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  };
  title: string;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ data, title }) => {
  const [chartData, setChartData] = useState(data);

  useEffect(() => {
    setChartData(data);
  }, [data]);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title,
        font: {
          size: 18,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ProgressChart;