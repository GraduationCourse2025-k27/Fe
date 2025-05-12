import { useState } from "react";
import { PencilLine, Trash, Plus, Search } from "lucide-react";

const initialSpecialties = [
  { id: 1, name: "Nội tổng quát" },
  { id: 2, name: "Nhi khoa" },
  { id: 3, name: "Ngoại thần kinh" },
  { id: 4, name: "Da liễu" },
  { id: 5, name: "Tim mạch" },
];

const SpecializationManagementPage = () => {
  const [specialties, setSpecialties] = useState(initialSpecialties);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (specialty = null) => {
    setSelectedSpecialty(specialty);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedSpecialty(null);
    setIsModalOpen(false);
  };

  const handleSave = (data) => {
    if (data.id) {
      setSpecialties(specialties.map(spec => spec.id === data.id ? data : spec));
    } else {
      const newSpecialty = { ...data, id: Date.now() };
      setSpecialties([...specialties, newSpecialty]);
    }

    closeModal();
  };

  const handleDelete = (id) => {
    setSpecialties(specialties.filter(spec => spec.id !== id));
  };

  const filteredSpecialties = specialties.filter(spec => {
    return spec.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="flex flex-col gap-4">
      <h8 className="text-2xl font-bold">Quản lý chuyên khoa</h8>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-3 flex-wrap">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm theo tên chuyên khoa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border px-3 py-2 rounded pr-10 w-64"
            />
            <Search className="absolute right-2 top-2.5 text-gray-400" size={20} />
          </div>
        </div>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
          onClick={() => openModal()}
        >
          <Plus size={18} /> Thêm chuyên khoa
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Tên chuyên khoa</th>
              <th className="px-4 py-2 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredSpecialties.length > 0 ? (
              filteredSpecialties.map((spec, index) => (
                <tr key={spec.id} className="border-t">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{spec.name}</td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex justify-center gap-4">
                      <button className="text-blue-500" onClick={() => openModal(spec)}>
                        <PencilLine size={20} />
                      </button>
                      <button className="text-red-500" onClick={() => handleDelete(spec.id)}>
                        <Trash size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4">Không có chuyên khoa nào phù hợp.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <SpecialtyModal
          specialty={selectedSpecialty}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

const SpecialtyModal = ({ specialty, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    id: specialty?.id || null,
    name: specialty?.name || "",
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
        <h2 className="text-xl font-semibold mb-4">{specialty ? "Cập nhật chuyên khoa" : "Thêm chuyên khoa"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Tên chuyên khoa</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border px-3 py-2 rounded w-full"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>Hủy</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{specialty ? "Lưu" : "Thêm"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SpecializationManagementPage;
