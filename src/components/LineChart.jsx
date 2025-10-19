import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
  Legend
);

function LineChart({ data, width = "100%", height, className }) {
  const chartData = useMemo(() => {
    const dateCount = {};
    data.forEach((lead) => {
      const date = lead.createdAt?.toDate
        ? lead.createdAt.toDate().toLocaleDateString()
        : new Date(lead.createdAt).toLocaleDateString();
      dateCount[date] = (dateCount[date] || 0) + 1;
    });
    const labels = Object.keys(dateCount).sort(
      (a, b) => new Date(a) - new Date(b)
    );
    const values = labels.map((label) => dateCount[label]);

    return {
      labels,
      datasets: [
        {
          label: "Leads Over Time",
          data: values,
          fill: true,
          backgroundColor: "rgba(59,130,246,0.1)",
          borderColor: "#3b82f6",
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: "#3b82f6",
        },
      ],
    };
  }, [data]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        title: {
          display: true,
          text: "Days",
        },
      },
      y: {
        grid: { color: "#f3f4f6" },
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          callback: function (value) {
            if (value % 1 === 0) {
              return value;
            }
          },
        },
        title: { display: true, text: "No of Registered" },
      },
    },
  };

  return (
    <div style={{ width, height }} className={className}>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}

export default LineChart;
