import React, { useEffect, useState } from "react";
import NoFoundData from "../components/NoFoundData";
import * as RecordsService from "../service/MedicalRecord/MedicalRecordApi";
import { formatDate } from "../validation/common/FormatDate";

const MyMedicalRecord = () => {
  const [records, setRecords] = useState([]);
  const [idClient, setIdClient] = useState(localStorage.getItem("id") || null);
  const [record, setRecord] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch records when idClient is available
  useEffect(() => {
    if (!idClient) return;

    const fetchRecords = async () => {
      setIsLoading(true);
      try {
        const result = await RecordsService.getRecordsByClientId(idClient);
        setRecords(result || []);
        // Set the first record if available
        if (result?.length > 0) {
          setRecord(result[0]);
        }
      } catch (error) {
        console.error("Error fetching records:", error);
        setError("Không thể tải hồ sơ bệnh án.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecords();
  }, [idClient]);

  // Update idClient when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setIdClient(localStorage.getItem("id") || null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Fetch a specific record by ID
  const getRecordById = async (id) => {
    setIsLoading(true);
    try {
      const result = await RecordsService.getRecordById(id);
      setRecord(result || null);
    } catch (error) {
      console.error("Error fetching record:", error);
      setError("Không thể tải chi tiết hồ sơ.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-5 mt-5">
      <h4 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
        Chi Tiết Hồ Sơ Bệnh Án
      </h4>

      {isLoading ? (
        <div className="text-center text-gray-600">Đang tải...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4 items-stretch">
          {/* Left column: Medical history */}
          <div className="h-full bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="py-4 bg-gray-100 border-b border-gray-300 font-bold text-gray-700 text-center">
              Lịch sử khám bệnh
            </div>
            <ul className="border-t border-gray-200 max-h-[500px] overflow-y-auto p-0 list-none">
              {records.length > 0 ? (
                records.map((rec) => (
                  <li key={rec?.id}>
                    <button
                      onClick={() => getRecordById(rec?.id)}
                      className={`w-full p-4 text-left transition-colors duration-200 cursor-pointer ${
                        record?.id === rec?.id
                          ? "bg-blue-100 border-l-4 border-blue-700"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="text-md">
                        {formatDate(rec?.createdAt)}
                      </div>
                      <div className="text-xs text-gray-600">
                        {rec?.doctor?.client?.fullName || "Không xác định"}
                      </div>
                    </button>
                  </li>
                ))
              ) : (
                <li className="p-4 text-center text-gray-600">
                  Không có lịch sử khám bệnh
                </li>
              )}
            </ul>
          </div>

          {/* Right column: Record details */}
          {record ? (
            <div className="h-full bg-white border border-gray-200 rounded-lg p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600 uppercase">
                    Họ và tên
                  </label>
                  <div className="text-lg font-semibold text-gray-900">
                    {record?.client?.fullName || "Không xác định"}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 uppercase">
                    Ngày sinh
                  </label>
                  <div className="text-lg font-semibold text-gray-900">
                    {formatDate(record?.birthDatePatient) || "Không xác định"}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 uppercase">
                    Giới tính
                  </label>
                  <div className="text-lg font-semibold text-gray-900">
                    {record?.gender || "Không xác định"}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 uppercase">
                    Ngày khám
                  </label>
                  <div className="text-lg font-semibold text-gray-900">
                    {formatDate(record?.createdAt) || "Không xác định"}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 uppercase">
                    Bác sĩ
                  </label>
                  <div className="text-lg font-semibold text-gray-900">
                    {record?.doctor?.client?.fullName || "Không xác định"}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 uppercase">
                    Bệnh viện
                  </label>
                  <div className="text-lg font-semibold text-gray-900">
                    Bệnh Viện Đa Khoa Đà Nẵng
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 uppercase">
                  Chẩn đoán
                </label>
                <div className="mt-2 p-4 bg-gray-50 text-lg text-gray-800 rounded">
                  {record?.diagnosis || "Không có thông tin"}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 uppercase">
                  Kê đơn thuốc
                </label>
                <div className="mt-2 p-4 bg-gray-50 text-lg text-gray-800 rounded">
                  {record?.prescription || "Không có thông tin"}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 uppercase">
                  Ghi chú
                </label>
                <div className="mt-2 p-4 bg-gray-50 text-lg text-gray-800 rounded">
                  {record?.note || "Không có thông tin"}
                </div>
              </div>
            </div>
          ) : (
            <NoFoundData content="Chưa có hồ sơ bệnh án cho người dùng này" />
          )}
        </div>
      )}
    </div>
  );
};

export default MyMedicalRecord;
