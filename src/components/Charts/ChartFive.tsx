import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { getAllDietStyle } from "@/app/data"; // điều chỉnh đường dẫn nếu khác

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartFive: React.FC = () => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllDietStyle();
        const data = response.data as unknown as any[];

        const filteredData = data.filter((item) => item.percentage > 0);

        const labels = filteredData.map((item) => item.dietStyle);
        const percentages = filteredData.map((item) => item.percentage);

        setChartData({
          labels,
          datasets: [
            {
              label: "Tỷ lệ (%)",
              data: percentages,
              backgroundColor: [
                "#FF9F40",
                "#4BC0C0",
                "#9966FF",
                "#FF6384",
                "#36A2EB"
              ],
              borderWidth: 1,
            }
          ]
        });
      } catch (error) {
        console.error("Lỗi khi gọi getAllDietStyle:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: "100%", maxWidth: "500px", margin: 10, padding: 10 }}>
      <h3 className="text-lg font-semibold text-center mb-4 mt-7">
        Diet Style Distribution Chart
      </h3>
      {chartData ? <Pie data={chartData} /> : <p>Đang tải biểu đồ...</p>}
    </div>
  );
};

export default ChartFive;
