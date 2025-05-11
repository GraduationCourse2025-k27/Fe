import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";
import { Footer } from "../layouts/footer";
import { CreditCard, DollarSign, Package, PencilLine, Star, Trash, TrendingUp, Users } from "lucide-react";

const topDoctors = [
  {
    number: 1,
    name: "Dr. Nguyễn Văn A",
    image: "url_to_image",
    specialization: "Nội khoa",
    experience: 10,
    rating: 4.5,
    email: "nguyenvana@email.com",
  },
  {
    number: 2,
    name: "Dr. Trần Thị B",
    image: "url_to_image",
    specialization: "Ngoại khoa",
    experience: 8,
    rating: 4.2,
    email: "tranb@email.com",
  },
];

const chartTypes = {
  visits: {
    title: "Tổng quan lượt khám",
    unit: "lượt",
    color: "#2563eb",
  },
  revenue: {
    title: "Tổng doanh thu",
    unit: "USD",
    color: "#10b981",
  },
};

const timeRanges = ["Tháng", "Quý", "Năm"];

const mockData = {
  visits: {
    Tháng: [
      { name: "Tuần 1", value: 120 },
      { name: "Tuần 2", value: 180 },
      { name: "Tuần 3", value: 150 },
      { name: "Tuần 4", value: 200 },
    ],
    Quý: [
      { name: "Tháng 1", value: 450 },
      { name: "Tháng 2", value: 560 },
      { name: "Tháng 3", value: 620 },
    ],
    Năm: [
      { name: "Q1", value: 1500 },
      { name: "Q2", value: 1600 },
      { name: "Q3", value: 1700 },
      { name: "Q4", value: 1800 },
    ],
  },
  revenue: {
    Tháng: [
      { name: "Tuần 1", value: 1200 },
      { name: "Tuần 2", value: 1800 },
      { name: "Tuần 3", value: 1500 },
      { name: "Tuần 4", value: 2000 },
    ],
    Quý: [
      { name: "Tháng 1", value: 4500 },
      { name: "Tháng 2", value: 5600 },
      { name: "Tháng 3", value: 6200 },
    ],
    Năm: [
      { name: "Q1", value: 15000 },
      { name: "Q2", value: 16000 },
      { name: "Q3", value: 17000 },
      { name: "Q4", value: 18000 },
    ],
  },
};

const DashboardPage = () => {
  const [chartType, setChartType] = useState("visits");
  const [timeRange, setTimeRange] = useState("Tháng");

  const chart = chartTypes[chartType];
  const data = mockData[chartType]?.[timeRange] || [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "16px" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Trang tổng quan</h1>
      <div
        style={{
          display: "grid",
          gap: "16px",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        }}
      >
        <div style={{ background: "#fff", border: "1px solid #ddd", padding: "16px", borderRadius: "8px" }}>
          <div style={{ display: "flex", alineItems: "center", gap: "8px" }}>
            <div style={{ padding: "8px", background: "rgba(59, 130, 246, 0.2)", borderRadius: "8px" }}>
              <Package size={26} color="#3b82f6" />
            </div>
            <p style={{ fontSize: "18px", fontWeight: "medium" }}>Tổng số bác sĩ</p>
          </div>
          <div style={{ marginTop: "16px" }}>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>25,154</p>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                border: "1px solid #3b82f6",
                padding: "4px 8px",
                borderRadius: "999px",
                color: "#3b82f6",
                fontSize: "14px",
              }}
            >
              <TrendingUp size={18} />
              25%
            </span>
          </div>
        </div>
        <div style={{ background: "#fff", border: "1px solid #ddd", padding: "16px", borderRadius: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ padding: "8px", background: "rgba(59, 130, 246, 0.2)", borderRadius: "8px" }}>
              <DollarSign size={26} color="#3b82f6" />
            </div>
            <p style={{ fontSize: "18px", fontWeight: "medium" }}>Tổng hồ sơ bệnh án</p>
          </div>
          <div style={{ marginTop: "16px" }}>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>16,000</p>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                border: "1px solid #3b82f6",
                padding: "4px 8px",
                borderRadius: "999px",
                color: "#3b82f6",
                fontSize: "14px",
              }}
            >
              <TrendingUp size={18} />
              12%
            </span>
          </div>
        </div>
        <div style={{ background: "#fff", border: "1px solid #ddd", padding: "16px", borderRadius: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ padding: "8px", background: "rgba(59, 130, 246, 0.2)", borderRadius: "8px" }}>
              <Users size={26} color="#3b82f6" />
            </div>
            <p style={{ fontSize: "18px", fontWeight: "medium" }}>Số lượng bệnh nhân</p>
          </div>
          <div style={{ marginTop: "16px" }}>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>15,400</p>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                border: "1px solid #3b82f6",
                padding: "4px 8px",
                borderRadius: "999px",
                color: "#3b82f6",
                fontSize: "14px",
              }}
            >
              <TrendingUp size={18} />
              15%
            </span>
          </div>
        </div>
        <div style={{ background: "#fff", border: "1px solid #ddd", padding: "16px", borderRadius: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ padding: "8px", background: "rgba(59, 130, 246, 0.2)", borderRadius: "8px" }}>
              <CreditCard size={26} color="#3b82f6" />
            </div>
            <p style={{ fontSize: "18px", fontWeight: "medium" }}>Dịch vụ đã sử dụng</p>
          </div>
          <div style={{ marginTop: "16px" }}>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>12,340</p>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                border: "1px solid #3b82f6",
                padding: "4px 8px",
                borderRadius: "999px",
                color: "#3b82f6",
                fontSize: "14px",
              }}
            >
              <TrendingUp size={18} />
              19%
            </span>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "16px" }}>
        {/* Biểu đồ lượt khám */}
        <div style={{ background: "#fff", border: "1px solid #ddd", padding: "16px", borderRadius: "8px", width: "66.67%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
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
            <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}>{chart.title}</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorMain" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chart.color} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={chart.color} stopOpacity={0} />
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
        <div style={{ background: "#fff", border: "1px solid #ddd", padding: "16px", borderRadius: "8px", width: "33.33%" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>Top Bác Sĩ</h2>
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f3f4f6" }}>
                  <th style={{ padding: "8px", textAlign: "left", fontWeight: "600" }}>ID</th>
                  <th style={{ padding: "8px", textAlign: "left", fontWeight: "600" }}>Tên</th>
                  <th style={{ padding: "8px", textAlign: "left", fontWeight: "600" }}>Khoa</th>
                </tr>
              </thead>
              <tbody>
                {topDoctors.map((doctor) => (
                  <tr key={doctor.number} style={{ borderBottom: "1px solid #ddd" }}>
                    <td style={{ padding: "8px" }}>{doctor.number}</td>
                    <td style={{ padding: "8px" }}>{doctor.name}</td>
                    <td style={{ padding: "8px" }}>{doctor.specialization}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Danh sách bác sĩ */}
      <div style={{ background: "#fff", border: "1px solid #ddd", padding: "16px", borderRadius: "8px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>Danh sách bác sĩ</h2>
        <div style={{ maxHeight: "500px", overflowY: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f3f4f6" }}>
                <th style={{ padding: "8px", textAlign: "left", fontWeight: "600" }}>Mã</th>
                <th style={{ padding: "8px", textAlign: "left", fontWeight: "600" }}>Bác sĩ</th>
                <th style={{ padding: "8px", textAlign: "left", fontWeight: "600" }}>Chuyên khoa</th>
                <th style={{ padding: "8px", textAlign: "left", fontWeight: "600" }}>Kinh nghiệm</th>
                <th style={{ padding: "8px", textAlign: "left", fontWeight: "600" }}>Đánh giá</th>
                <th style={{ padding: "8px", textAlign: "left", fontWeight: "600" }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {topDoctors.map((doctor) => (
                <tr key={doctor.number} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "8px" }}>{doctor.number}</td>
                  <td style={{ padding: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        style={{ width: "56px", height: "56px", borderRadius: "8px", objectFit: "cover" }}
                      />
                      <div>
                        <p style={{ fontWeight: "medium" }}>{doctor.name}</p>
                        <p style={{ fontSize: "14px", color: "#6b7280" }}>{doctor.email}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "8px" }}>{doctor.specialization}</td>
                  <td style={{ padding: "8px" }}>{doctor.experience} năm</td>
                  <td style={{ padding: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Star size={18} style={{ fill: "#facc15", stroke: "#facc15" }} />
                      {doctor.rating}
                    </div>
                  </td>
                  <td style={{ padding: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <button style={{ color: "#3b82f6" }}>
                        <PencilLine size={20} />
                      </button>
                      <button style={{ color: "#ef4444" }}>
                        <Trash size={20} />
                      </button>
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