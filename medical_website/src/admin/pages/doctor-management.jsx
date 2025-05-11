import { useState } from "react";
import { PencilLine, Trash, Plus, Search } from "lucide-react";

const initialSpecialties = [
  { id: 1, name: "Nội tổng quát" },
  { id: 2, name: "Nhi khoa" },
  { id: 3, name: "Ngoại thần kinh" },
  { id: 4, name: "Da liễu" },
  { id: 5, name: "Tim mạch" },
];

const initialDoctors = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    specialtyId: 1,
    experience: 5,
  },
  {
    id: 2,
    name: "Trần Thị B",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    specialtyId: 2,
    experience: 3,
  },
];

const DoctorManagementPage = () => {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (doctor = null) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDoctor(null);
    setIsModalOpen(false);
  };

  const handleSave = (data) => {
    const formattedData = {
      ...data,
      specialtyId: Number(data.specialtyId),
    };

    if (data.id) {
      setDoctors(doctors.map(doc => doc.id === data.id ? formattedData : doc));
    } else {
      const newDoctor = { ...formattedData, id: Date.now() };
      setDoctors([...doctors, newDoctor]);
    }

    closeModal();
  };

  const handleDelete = (id) => {
    setDoctors(doctors.filter(doc => doc.id !== id));
  };

  const getSpecialtyName = (id) => {
    return initialSpecialties.find(spec => spec.id === id)?.name || "Không rõ";
  };

  const filteredDoctors = doctors.filter(doc => {
    const matchesName = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = filterSpecialty ? doc.specialtyId === Number(filterSpecialty) : true;
    return matchesName && matchesSpecialty;
  });

  return (
    <div className="flex flex-col gap-4">
      <h8 className="text-2xl font-bold">Quản lý bác sĩ</h8>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-3 flex-wrap">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm theo tên bác sĩ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border px-3 py-2 rounded pr-10 w-64"
            />
            <Search className="absolute right-2 top-2.5 text-gray-400" size={20} />
          </div>

          <select
            value={filterSpecialty}
            onChange={(e) => setFilterSpecialty(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="">-- Tất cả chuyên khoa --</option>
            {initialSpecialties.map(spec => (
              <option key={spec.id} value={spec.id}>{spec.name}</option>
            ))}
          </select>
        </div>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
          onClick={() => openModal()}
        >
          <Plus size={18} /> Thêm bác sĩ
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Ảnh</th>
              <th className="px-4 py-2 text-left">Họ tên</th>
              <th className="px-4 py-2 text-left">Chuyên khoa</th>
              <th className="px-4 py-2 text-left">Kinh nghiệm</th>
              <th className="px-4 py-2 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doc, index) => (
                <tr key={doc.id} className="border-t">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">
                    <img src={doc.image} alt={doc.name} className="w-10 h-10 rounded-full object-cover" />
                  </td>
                  <td className="px-4 py-2">{doc.name}</td>
                  <td className="px-4 py-2">{getSpecialtyName(doc.specialtyId)}</td>
                  <td className="px-4 py-2">{doc.experience} năm</td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex justify-center gap-4">
                      <button className="text-blue-500" onClick={() => openModal(doc)}>
                        <PencilLine size={20} />
                      </button>
                      <button className="text-red-500" onClick={() => handleDelete(doc.id)}>
                        <Trash size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">Không có bác sĩ nào phù hợp.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <DoctorModal
          doctor={selectedDoctor}
          onClose={closeModal}
          onSave={handleSave}
          specialties={initialSpecialties}
        />
      )}
    </div>
  );
};

const DoctorModal = ({ doctor, onClose, onSave, specialties }) => {
  const [formData, setFormData] = useState({
    id: doctor?.id || null,
    name: doctor?.name || "",
    image: doctor?.image || "",
    specialtyId: doctor?.specialtyId || "",
    experience: doctor?.experience || 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">{doctor ? "Cập nhật bác sĩ" : "Thêm bác sĩ"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Họ tên</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Ảnh (URL)</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Chuyên khoa</label>
          <select
            name="specialtyId"
            value={formData.specialtyId}
            onChange={handleChange}
            required
            className="border px-3 py-2 rounded w-full"
          >
            <option value="">-- Chọn chuyên khoa --</option>
            {specialties.map(spec => (
              <option key={spec.id} value={spec.id}>{spec.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Số năm kinh nghiệm</label>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            min={0}
            onChange={handleChange}
            required
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>Hủy</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{doctor ? "Lưu" : "Thêm"}</button>
        </div>
      </form>
    </div>
  </div>
);
};

export default DoctorManagementPage;
