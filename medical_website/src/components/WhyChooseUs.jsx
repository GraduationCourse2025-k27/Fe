// import { FaUserMd, FaShieldAlt, FaMicrochip, FaFlask } from "react-icons/fa";
// import SplitText from "./SplitText"; 

// const WhyChooseUs = () => {
//   const features = [
//     {
//       icon: <FaUserMd className="text-blue-700 text-5xl md:text-5xl" />,
//       title: "Chuyên gia hàng đầu",
//       description:
//         "Bệnh viện Đa khoa quy tụ đội ngũ chuyên gia, bác sĩ, dược sĩ và điều dưỡng có trình độ chuyên môn cao, tay nghề giỏi, tận tâm và chuyên nghiệp. Luôn đặt người bệnh làm trung tâm, Bệnh viện Đa khoa cam kết đem đến dịch vụ chăm sóc sức khỏe tốt cho khách hàng.",
//     },
//     {
//       icon: <FaShieldAlt className="text-blue-700 text-5xl md:text-5xl" />,
//       title: "Chất lượng quốc tế",
//       description:
//         "Hệ thống Y tế Bệnh viện Đa khoa được quản lý và vận hành dưới sự giám sát của những nhà quản lý y tế giàu kinh nghiệm, cùng với sự hỗ trợ của phương tiện kỹ thuật hiện đại, nhằm đảm bảo cung cấp dịch vụ chăm sóc sức khỏe toàn diện và hiệu quả.",
//     },
//     {
//       icon: <FaMicrochip className="text-blue-700 text-5xl md:text-5xl" />,
//       title: "Công nghệ tiên tiến",
//       description:
//         "Bệnh viện Đa khoa cung cấp cơ sở vật chất hạng nhất và dịch vụ 5 sao bằng cách sử dụng các công nghệ tiên tiến được quản lý bởi các bác sĩ lâm sàng lành nghề để đảm bảo dịch vụ chăm sóc sức khỏe toàn diện và hiệu quả cao.",
//     },
//     {
//       icon: <FaFlask className="text-blue-700 text-5xl md:text-5xl" />,
//       title: "Nghiên cứu & Đổi mới",
//       description:
//         "Bệnh viện Đa khoa liên tục thúc đẩy y học hàn lâm dựa trên nghiên cứu các phương pháp và sự phát triển y tế được chia sẻ từ quan hệ đối tác toàn cầu với các hệ thống chăm sóc sức khỏe hàng đầu thế giới nhằm cung cấp các phương pháp điều trị mang tính cách mạng và sáng tạo cho tiêu chuẩn chăm sóc bệnh nhân tốt nhất.",
//     },
//   ];

//   return (
//     <div className="flex flex-col items-center gap-6 mt-5 p-3">
//       <h4 className="ml-2 text-2xl sm:text-3xl font-semibold text-left self-start mt-5">
//         TẠI SAO CHỌN BỆNH VIỆN ĐA KHOA?
//       </h4>

//       <div className="flex flex-col md:flex-row items-center gap-8">
//         {/* Ẩn ảnh trên mobile */}
//         <div className="hidden md:flex md:w-1/3 justify-center">
//           <img
//             src="https://www.vinmec.com/static/uploads/wepik_export_20230610051550k_Azj_1_1_de0e3052ea.png"
//             alt="Nurse"
//             className="w-85 h-auto object-cover"
//           />
//         </div>

//         {/* Nội dung */}
//         <div className="w-full md:w-2/3">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             {features.map((feature, index) => (
//               <div key={index} className="flex gap-4">
//                 <div className="flex-shrink-0">{feature.icon}</div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-blue-900">{feature.title}</h3>
//                   <SplitText text={feature.description} className="text-gray-700 text-sm" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default WhyChooseUs;


import { FaUserMd, FaShieldAlt, FaMicrochip, FaFlask } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaUserMd className="text-blue-700 pt text-5xl md:text-5xl" />,
      title: "Chuyên gia hàng đầu",
      description:
        "Bệnh viện Đa khoa quy tụ đội ngũ chuyên gia, bác sĩ, dược sĩ và điều dưỡng có trình độ chuyên môn cao, tay nghề giỏi, tận tâm và chuyên nghiệp. Luôn đặt người bệnh làm trung tâm, Bệnh viện Đa khoa cam kết đem đến dịch vụ chăm sóc sức khỏe tốt cho khách hàng.",
    },
    {
      icon: <FaShieldAlt className="text-blue-700 text-5xl md:text-5xl" />,
      title: "Chất lượng quốc tế",
      description:
        "Hệ thống Y tế Bệnh viện Đa khoa được quản lý và vận hành dưới sự giám sát của những nhà quản lý y tế giàu kinh nghiệm, cùng với sự hỗ trợ của phương tiện kỹ thuật hiện đại, nhằm đảm bảo cung cấp dịch vụ chăm sóc sức khỏe toàn diện và hiệu quả.",
    },
    {
      icon: <FaMicrochip className="text-blue-700 text-5xl md:text-5xl" />,
      title: "Công nghệ tiên tiến",
      description:
        "Bệnh viện Đa khoa cung cấp cơ sở vật chất hạng nhất và dịch vụ 5 sao bằng cách sử dụng các công nghệ tiên tiến được quản lý bởi các bác sĩ lâm sàng lành nghề để đảm bảo dịch vụ chăm sóc sức khỏe toàn diện và hiệu quả cao.",
    },
    {
      icon: <FaFlask className="text-blue-700 text-5xl md:text-5xl" />,
      title: "Nghiên cứu & Đổi mới",
      description:
        "Bệnh viện Đa khoa liên tục thúc đẩy y học hàn lâm dựa trên nghiên cứu các phương pháp và sự phát triển y tế được chia sẻ từ quan hệ đối tác toàn cầu với các hệ thống chăm sóc sức khỏe hàng đầu thế giới nhằm cung cấp các phương pháp điều trị mang tính cách mạng và sáng tạo cho tiêu chuẩn chăm sóc bệnh nhân tốt nhất.",
    },
  ];

  return (
    <div className="flex flex-col items-center gap-6 mt-5 pt-3 px-3">
      <h4 className="ml-2 text-2xl sm:text-3xl font-semibold text-left self-start mt-5">
        TẠI SAO CHỌN BỆNH VIỆN ĐA KHOA?
      </h4>

      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Ẩn ảnh trên mobile */}
        <div className="hidden md:flex md:w-1/3 justify-center">
          <img
            src="https://www.vinmec.com/static/uploads/wepik_export_20230610051550k_Azj_1_1_de0e3052ea.png"
            alt="Nurse"
            className="w-85 h-auto object-cover"
          />
        </div>

        {/* Nội dung */}
        <div className="w-full  md:w-2/3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">{feature.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-900">{feature.title}</h3>
                  <p className="text-gray-700 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;

