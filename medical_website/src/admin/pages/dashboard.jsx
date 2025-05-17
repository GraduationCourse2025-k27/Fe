import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { Footer } from "../layouts/footer";
import { CreditCard, DollarSign, Package, Star, Users } from "lucide-react";

import * as statisticAdminService from "../service/admin/StatisticsAdminService";

const chartTypes = {
  visits: {
    title: "Tổng quan lượt khám năm 2025",
    unit: "lượt",
    color: "#2563eb",
  },
  revenue: {
    title: "Tổng doanh thu năm 2025",
    unit: "USD",
    color: "#10b981",
  },
};

const timeRanges = ["Tháng", "Quý"];
const mockData = {
  visits: {
    Tháng: [
      { name: "tháng 1 ", value: 0 },
      { name: "tháng 2 ", value: 0 },
      { name: "tháng 3 ", value: 0 },
      { name: "tháng 4", value: 0 },
      { name: "tháng 5", value: 0 },
      { name: "tháng 6", value: 0 },
      { name: "tháng 7", value: 0 },
      { name: "tháng 8", value: 0 },
      { name: "tháng 9", value: 0 },
      { name: "tháng 10", value: 0 },
      { name: "tháng 11", value: 0 },
      { name: "tháng 12", value: 0 },
    ],
    Quý: [
      { name: "Quý 1 ", value: 0 },
      { name: "Quý 2 ", value: 0 },
      { name: "Quý 3 ", value: 0 },
      { name: "Quý 4 ", value: 0 },
    ],
  },
  revenue: {
    Tháng: [
      { name: "tháng 1", value: 0 },
      { name: "tháng 2", value: 0 },
      { name: "tháng 3", value: 0 },
      { name: "tháng 4", value: 0 },
      { name: "tháng 5", value: 0 },
      { name: "tháng 6", value: 0 },
      { name: "tháng 7", value: 0 },
      { name: "tháng 8", value: 0 },
      { name: "tháng 9", value: 0 },
      { name: "tháng 10", value: 0 },
      { name: "tháng 11", value: 0 },
      { name: "tháng 12", value: 0 },
    ],
    Quý: [
      { name: "Quý 1", value: 0 },
      { name: "Quý 2", value: 0 },
      { name: "Quý 3", value: 0 },
      { name: "Quý 4", value: 0 },
    ],
  },
};

const DashboardPage = () => {
  const [chartType, setChartType] = useState("visits");
  const [timeRange, setTimeRange] = useState("Tháng");
  const [statistic, setStatistic] = useState({}); // thong ke chung
  const chart = chartTypes[chartType];
  const [chartData, setChartData] = useState(mockData.visits.Tháng);
  const [totalRevenue, setTotalRevenue] = useState({}); // tổng doanh thu
  const [totalAppointments, setTotalAppointments] = useState({}); // tong luot kham
  const [top5Doctor, setTop5Doctor] = useState([]); // top5 bác sĩ tốt nhất;
  const monthsMap = {
    // Cho visits
    "thang 1 ": "JANUARY",
    "thang 2 ": "FEBRUARY",
    "thang 3": "MARCH",
    "thang 4": "APRIL",
    "thang 5": "MAY",
    "thang 6": "JUNE",
    "thang 7": "JULY",
    "thang 8": "AUGUST",
    "thang 9": "SEPTEMBER",
    "thang 10": "OCTOBER",
    "thang 1 1": "NOVEMBER",
    "thang 1 2": "DECEMBER",
    // Cho revenue
    "tháng 1": "JANUARY",
    "tháng 2": "FEBRUARY",
    "tháng 3": "MARCH",
    "tháng 4": "APRIL",
    "tháng 5": "MAY",
    "tháng 6": "JUNE",
    "tháng 7": "JULY",
    "tháng 8": "AUGUST",
    "tháng 9": "SEPTEMBER",
    "tháng 10": "OCTOBER",
    "tháng 11": "NOVEMBER",
    "tháng 12": "DECEMBER",
  };

  const quartersMap = {
    "Quý 1 ": "Q1",
    "Quý 2 ": "Q2",
    "Quý 3 ": "Q3",
    "Quý 4 ": "Q4",
    "Quý 1": "Q1",
    "Quý 2": "Q2",
    "Quý 3": "Q3",
    "Quý 4": "Q4",
  };
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        await Promise.all([
          handleCountByStatistic(),
          handleGetAllAppointmentsCurrentYear(),
          handleGetAllRevenueCurrentYear(),
          handleTop5DoctorForBest(),
        ]);
      } catch (error) {
        console.error("Đã xảy ra lỗi khi tải dữ liệu dashboard:", error);
      }
    };

    fetchDashboardData();
  }, []);

  useEffect(() => {
    // Cập nhật dữ liệu biểu đồ khi chartType, timeRange, totalAppointments hoặc totalRevenue thay đổi
    const updateChartData = () => {
      let data = mockData[chartType]?.[timeRange] || [];
      let stats = chartType === "visits" ? totalAppointments : totalRevenue;
      let statsKey =
        chartType === "visits"
          ? timeRange === "Tháng"
            ? "monthlyStats"
            : "quarterlyStats"
          : timeRange === "Tháng"
          ? "monthlyRevenue"
          : "quarterlyRevenue";
      let map = timeRange === "Tháng" ? monthsMap : quartersMap;
      if (stats[statsKey] && typeof stats[statsKey] === "object") {
        data = data.map((item) => ({
          ...item,
          value: stats[statsKey][map[item.name]] ?? item.value, // Giữ giá trị gốc nếu không có trong API
        }));
      }
      setChartData(data);
    };

    updateChartData();
  }, [chartType, timeRange, totalAppointments, totalRevenue]);

  const handleCountByStatistic = async () => {
    try {
      const result = await statisticAdminService.countByAll();
      setStatistic(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetAllRevenueCurrentYear = async () => {
    try {
      const result = await statisticAdminService.getAllCurrentYearRevenue();
      setTotalRevenue(result);
    } catch (error) {
      console.log(error);
    }
  };
  const handleGetAllAppointmentsCurrentYear = async () => {
    try {
      const result =
        await statisticAdminService.getAllCurrentYearAppointments();
      setTotalAppointments(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTop5DoctorForBest = async () => {
    try {
      const result = await statisticAdminService.Top5DoctorForBest();
      setTop5Doctor(result ? result : []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 ml-8">
      <h8 className="text-2xl font-bold ">Tổng quan</h8>
      <div
        style={{
          display: "grid",
          gap: "16px",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        }}
      >
        <div
          style={{
            background: "#fff",
            border: "1px solid #ddd",
            padding: "16px",
            borderRadius: "8px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                padding: "8px",
                background: "rgba(59, 130, 246, 0.2)",
                borderRadius: "8px",
              }}
            >
              <Package size={26} color="#3b82f6" />
            </div>
            <p style={{ fontSize: "18px", fontWeight: "medium" }}>
              Tổng số bác sĩ
            </p>
          </div>
          <div style={{ marginTop: "16px" }}>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>
              {statistic?.countDoctor}
            </p>
          </div>
        </div>
        <div
          style={{
            background: "#fff",
            border: "1px solid #ddd",
            padding: "16px",
            borderRadius: "8px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                padding: "8px",
                background: "rgba(59, 130, 246, 0.2)",
                borderRadius: "8px",
              }}
            >
              <DollarSign size={26} color="#3b82f6" />
            </div>
            <p style={{ fontSize: "18px", fontWeight: "medium" }}>
              Tổng Số nhân viên{" "}
            </p>
          </div>
          <div style={{ marginTop: "16px" }}>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>
              {statistic?.countStaff}
            </p>
          </div>
        </div>
        <div
          style={{
            background: "#fff",
            border: "1px solid #ddd",
            padding: "16px",
            borderRadius: "8px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                padding: "8px",
                background: "rgba(59, 130, 246, 0.2)",
                borderRadius: "8px",
              }}
            >
              <Users size={26} color="#3b82f6" />
            </div>
            <p style={{ fontSize: "18px", fontWeight: "medium" }}>
              Số lượng Người dùng
            </p>
          </div>
          <div style={{ marginTop: "16px" }}>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>
              {statistic?.countUser}
            </p>
          </div>
        </div>
        <div
          style={{
            background: "#fff",
            border: "1px solid #ddd",
            padding: "16px",
            borderRadius: "8px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                padding: "8px",
                background: "rgba(59, 130, 246, 0.2)",
                borderRadius: "8px",
              }}
            >
              <CreditCard size={26} color="#3b82f6" />
            </div>
            <p style={{ fontSize: "18px", fontWeight: "medium" }}>
              Dịch vụ đã sử dụng
            </p>
          </div>
          <div style={{ marginTop: "16px" }}>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>
              {statistic?.medicalService}
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "16px" }}>
        {/* Biểu đồ lượt khám */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #ddd",
            padding: "16px",
            borderRadius: "8px",
            width: "66.67%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            {/* Nút chọn loại biểu đồ */}
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                style={{
                  padding: "8px 16px",
                  borderRadius: "999px",
                  fontSize: "14px",
                  fontWeight: "medium",
                  background: chartType === "visits" ? "#2563eb" : "#e5e7eb",
                  color: chartType === "visits" ? "#fff" : "#374151",
                }}
                onClick={() => setChartType("visits")}
              >
                Lượt khám
              </button>
              <button
                style={{
                  padding: "8px 16px",
                  borderRadius: "999px",
                  fontSize: "14px",
                  fontWeight: "medium",
                  background: chartType === "revenue" ? "#10b981" : "#e5e7eb",
                  color: chartType === "revenue" ? "#fff" : "#374151",
                }}
                onClick={() => setChartType("revenue")}
              >
                Doanh thu
              </button>
            </div>

            {/* Nút chọn mốc thời gian */}
            <div style={{ display: "flex", gap: "8px" }}>
              {timeRanges.map((range) => (
                <button
                  key={range}
                  style={{
                    padding: "4px 12px",
                    borderRadius: "999px",
                    fontSize: "14px",
                    background: timeRange === range ? "#4f46e5" : "#f3f4f6",
                    color: timeRange === range ? "#fff" : "#374151",
                  }}
                  onClick={() => setTimeRange(range)}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Biểu đồ */}
          <div>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              {chart.title}
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorMain" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={chart.color}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={chart.color}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <Tooltip
                  Formatter={(value) => `${value} ${chart.unit}`}
                  contentStyle={{
                    borderRadius: 8,
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                  }}
                />
                <XAxis dataKey="name" />
                <YAxis />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={chart.color}
                  fill="url(#colorMain)"
                  activeDot={{ r: 8 }}
                  strokeWidth={3}
                  animationDuration={800}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bảng top bác sĩ */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #ddd",
            padding: "16px",
            borderRadius: "8px",
            width: "33.33%",
          }}
        >
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "16px",
            }}
          >
            Top 5 Bác Sĩ Đánh giá tốt nhất
          </h2>
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f3f4f6" }}>
                  <th
                    style={{
                      padding: "8px",
                      textAlign: "left",
                      fontWeight: "600",
                    }}
                  >
                    STT
                  </th>
                  <th
                    style={{
                      padding: "8px",
                      textAlign: "left",
                      fontWeight: "600",
                    }}
                  >
                    Ảnh
                  </th>
                  <th
                    style={{
                      padding: "8px",
                      textAlign: "left",
                      fontWeight: "600",
                    }}
                  >
                    Tên
                  </th>
                  <th
                    style={{
                      padding: "8px",
                      textAlign: "left",
                      fontWeight: "600",
                    }}
                  >
                    Khoa
                  </th>
                  <th
                    style={{
                      padding: "8px",
                      textAlign: "left",
                      fontWeight: "600",
                    }}
                  >
                    Đánh giá
                  </th>
                </tr>
              </thead>
              <tbody>
                {top5Doctor.length > 0 &&
                  top5Doctor.map((doctor, index) => (
                    <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                      <td style={{ padding: "8px" }}>{index + 1}</td>
                      <td style={{ padding: "8px" }}>
                        <img
                          src={doctor?.doctorId?.imagePath}
                          alt={doctor?.client?.fullName}
                          style={{
                            width: "2.5rem",
                            height: "2.5rem",
                            borderRadius: "50%",
                            border: "2px solid #808080",
                            boxShadow: "0 0 6px rgba(0, 0, 0, 0.2)",
                          }}
                        />
                      </td>
                      <td style={{ padding: "8px" }}>
                        {doctor?.doctorId?.client?.fullName}
                      </td>
                      <td style={{ padding: "8px" }}>
                        {doctor?.doctorId?.speciality.name}
                      </td>
                      <td style={{ padding: "8px" }}>{doctor?.averageRate}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Danh sách bác sĩ */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #ddd",
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        <h2
          style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}
        >
          Danh sách bác sĩ
        </h2>
        <div style={{ maxHeight: "500px", overflowY: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f3f4f6" }}>
                <th
                  style={{
                    padding: "8px",
                    textAlign: "left",
                    fontWeight: "600",
                  }}
                >
                  STT
                </th>
                <th
                  style={{
                    padding: "8px",
                    textAlign: "left",
                    fontWeight: "600",
                  }}
                >
                  Bác sĩ
                </th>
                <th
                  style={{
                    padding: "8px",
                    textAlign: "left",
                    fontWeight: "600",
                  }}
                >
                  Tên
                </th>
                <th
                  style={{
                    padding: "8px",
                    textAlign: "left",
                    fontWeight: "600",
                  }}
                >
                  Chuyên khoa
                </th>

                <th
                  style={{
                    padding: "8px",
                    textAlign: "left",
                    fontWeight: "600",
                  }}
                >
                  Đánh giá
                </th>
              </tr>
            </thead>
            <tbody>
              {top5Doctor.map((doctor, index) => (
                <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "8px" }}>{index + 1}</td>
                  <td style={{ padding: "8px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                      }}
                    >
                  <img
                    src={doctor?.doctorId?.imagePath}
                    alt={doctor?.client?.fullName}
                    className="w-14 h-14 rounded-full object-cover"
                  />

                      <div>
                        <p style={{ fontWeight: "medium" }}>
                          {doctor?.client?.fullName}
                        </p>
                        <p style={{ fontSize: "14px", color: "#6b7280" }}>
                          {doctor?.speciality?.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "8px" }}>
                    {doctor?.doctorId?.client?.fullName}
                  </td>
                  <td style={{ padding: "8px" }}>
                    {doctor?.doctorId?.client?.fullName}
                  </td>

                  <td style={{ padding: "8px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Star
                        size={18}
                        style={{ fill: "#facc15", stroke: "#facc15" }}
                      />
                      {doctor?.averageRate}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardPage;
