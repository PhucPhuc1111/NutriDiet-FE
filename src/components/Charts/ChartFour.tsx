import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { getAllActivity } from "@/app/data";
 // nếu bạn có dùng chung kiểu trả về

ChartJS.register(ArcElement, Tooltip, Legend);



const ChartFour: React.FC = () => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllActivity();
        const data = response.data;

        const labels = data.map((item) => item.activityLevel);
        const percentages = data.map((item) => item.percentage);

        setChartData({
          labels,
          datasets: [
            {
              label: "Tỷ lệ (%)",
              data: percentages,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF"
              ],
              borderWidth: 1
            }
          ]
        });
      } catch (error) {
        console.error("Lỗi khi gọi getAllActivity:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: "100%", maxWidth: "500px", margin: 10, padding : 10 }}>
      <h3 className="text-lg font-semibold text-center mb-4 mt-7">
      Activity Level Distribution Chart
      </h3>
      {chartData ? <Pie data={chartData} /> : <p>Đang tải biểu đồ...</p>}
    </div>
  );
};

export default ChartFour;
