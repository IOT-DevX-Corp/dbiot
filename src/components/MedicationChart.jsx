
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MedicationChart = () => {
  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Weekly Medication Adherence',
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      }
    }
  };

  // Sample data - medication adherence percentage by day
  const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Morning Dose',
        data: [100, 100, 85, 100, 90, 80, 95],
        backgroundColor: 'rgba(30, 174, 219, 0.7)',
      },
      {
        label: 'Evening Dose',
        data: [90, 95, 100, 75, 100, 85, 90],
        backgroundColor: 'rgba(0, 120, 165, 0.7)',
      },
    ],
  };

  return (
    <div className="h-[350px] w-full">
      <Bar options={options} data={data} />
    </div>
  );
};

export default MedicationChart;
