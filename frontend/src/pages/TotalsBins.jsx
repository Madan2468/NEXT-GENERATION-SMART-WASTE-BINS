import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TotalBins = () => {
  const [totalBins, setTotalBins] = useState(0);
  const [bins, setBins] = useState([]); // State for bins data
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBinsData = async () => {
      try {
        const response = await axios.get(
          "https://next-generation-smart-waste-bins-backend.onrender.com/api/bins/all"
        );
        const binsArray = Array.isArray(response.data.bins)
          ? response.data.bins
          : Object.values(response.data.bins);
        setTotalBins(binsArray.length);
        setBins(binsArray);
      } catch (error) {
        console.error("Error fetching bins data:", error);
        setError("Failed to fetch bins data.");
      }
    };

    fetchBinsData();
  }, []);

  // Prepare chart data
  const chartData = {
    labels: bins.map((bin, index) => `Bin ${index + 1}`),
    datasets: [
      {
        label: "Full Bins",
        data: bins.map((bin) => (bin.status === "Full" ? 1 : 0)), // 1 for Full, 0 otherwise
        backgroundColor: "rgba(99, 102, 241, 0.6)", // Tailwind Indigo-500
        borderColor: "rgba(99, 102, 241, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Bin Status Overview",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Status (Full = 1, Empty = 0)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Bins",
        },
      },
    },
  };

  return (
    <div className="container mx-auto p-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-lg">
      <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
        Total Bins
      </h1>
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Chart Component */}
            <div className="w-full lg:w-1/2">
              <Bar data={chartData} options={chartOptions} />
            </div>

            {/* Total Bins and Details */}
            <div className="flex-grow space-y-6">
              <p className="text-2xl font-semibold text-gray-700 text-center">
                Total Bins: {totalBins}
              </p>
              <div className="bins-list space-y-4">
                {bins.map((bin, index) => (
                  <div
                    key={bin._id || index}
                    className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300"
                  >
                    <h3 className="text-lg font-semibold text-gray-800">
                      Bin {index + 1}
                    </h3>
                    <p className="text-gray-600">
                      <strong>ID:</strong> {bin._id || "N/A"}
                    </p>
                    <p className="text-gray-600">
                      <strong>Location:</strong> {bin.location || "Unknown"}
                    </p>
                    <p className="text-gray-600">
                      <strong>Status:</strong> {bin.status || "N/A"}
                    </p>
                    <p className="text-gray-600">
                      <strong>Last Updated:</strong>{" "}
                      {bin.lastUpdated || "Not Available"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      <div className="text-center mt-8">
        <button
          onClick={() => (window.location.href = "/dashboard")}
          className="px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default TotalBins;
