import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const newsItems = [
    {
      id: 1,
      title: 'Bệnh thận mạn giai đoạn cuối đang có xu hướng gia tăng và trẻ hóa',
      images: [
        'https://suckhoedoisong.qltns.mediacdn.vn/zoom/780_488/324455921873985536/2025/4/11/hoi-thao-17443683580151718967724-83-0-1333-2000-crop-1744368362445786262946.jpg',
        'https://cdn2.tuoitre.vn/thumb_w/730/471584752817336320/2025/4/19/vinmec-17450274746971144714675.jpg',
        'https://suckhoedoisong.qltns.mediacdn.vn/thumb_w/640/324455921873985536/2025/4/19/tay-ninh-17450248580721425489302.jpg'
      ],
      desc: [
          'Thực hiện ý kiến chỉ đạo của Thủ tướng Chính phủ tại Công điện số 41/CĐ-TTg ngày 17/4/2025 về xử lý vụ việc sản xuất, buôn bán hàng giả là thuốc chữa bệnh, thực phẩm bảo vệ sức khỏe (TPBVSK), Cục An toàn thực phẩm (ATTP) đề nghị Sở Y tế các tỉnh thành phố trực thuộc trung ương.',
          'Khi tra cứu danh sách gần 600 loại sữa giả được công bố trên báo chí, tôi thấy có một sản phẩm ở trong... nhà mình. Tìm hiểu kỹ hơn tôi mới biết, thì ra loại sữa này do bố mẹ "âm thầm" mua online, đem giấu tự dùng vì sợ con cái biết (trước đó chúng tôi nhiều lần lên tiếng về việc bố mẹ mua thuốc qua mạng). Điều đáng nói, khi đưa bài báo có ghi tên loại sữa giả cho bố mẹ xem thì ông bà vẫn gạt đi, bảo rằng "báo đưa tin nhầm lẫn", "PGS.TS kia đã quảng cáo", rồi "hàng triệu người đang uống. Bố mẹ tôi chỉ là một trong rất nhiều nạn nhân của vấn đề mất "sức đề kháng" trước người nổi tiếng. Họ không chỉ xem, bấm like mà còn xem đó là chân lý. Niềm tin dần dà ngấm sâu và quyết định mua các sản phẩm được người nổi tiếng giới thiệu.',
          'Khi tra cứu danh sách gần 600 loại sữa giả được công bố trên báo chí, tôi thấy có một sản phẩm ở trong... nhà mình. Tìm hiểu kỹ hơn tôi mới biết, thì ra loại sữa này do bố mẹ "âm thầm" mua online, đem giấu tự dùng vì sợ con cái biết (trước đó chúng tôi nhiều lần lên tiếng về việc bố mẹ mua thuốc qua mạng). Điều đáng nói, khi đưa bài báo có ghi tên loại sữa giả cho bố mẹ xem thì ông bà vẫn gạt đi, bảo rằng "báo đưa tin nhầm lẫn", "PGS.TS kia đã quảng cáo", rồi "hàng triệu người đang uống. Bố mẹ tôi chỉ là một trong rất nhiều nạn nhân của vấn đề mất "sức đề kháng" trước người nổi tiếng. Họ không chỉ xem, bấm like mà còn xem đó là chân lý. Niềm tin dần dà ngấm sâu và quyết định mua các sản phẩm được người nổi tiếng giới thiệu. Khi tra cứu danh sách gần 600 loại sữa giả được công bố trên báo chí, tôi thấy có một sản phẩm ở trong... nhà mình. Tìm hiểu kỹ hơn tôi mới biết, thì ra loại sữa này do bố mẹ "âm thầm" mua online, đem giấu tự dùng vì sợ con cái biết (trước đó chúng tôi nhiều lần lên tiếng về việc bố mẹ mua thuốc qua mạng). Điều đáng nói, khi đưa bài báo có ghi tên loại sữa giả cho bố mẹ xem thì ông bà vẫn gạt đi, bảo rằng "báo đưa tin nhầm lẫn", "PGS.TS kia đã quảng cáo", rồi "hàng triệu người đang uống. Bố mẹ tôi chỉ là một trong rất nhiều nạn nhân của vấn đề mất "sức đề kháng" trước người nổi tiếng. Họ không chỉ xem, bấm like mà còn xem đó là chân lý. Niềm tin dần dà ngấm sâu và quyết định mua các sản phẩm được người nổi tiếng giới thiệu.',
          'Khi tra cứu danh sách gần 600 loại sữa giả được công bố trên báo chí, tôi thấy có một sản phẩm ở trong... nhà mình. Tìm hiểu kỹ hơn tôi mới biết, thì ra loại sữa này do bố mẹ "âm thầm" mua online, đem giấu tự dùng vì sợ con cái biết (trước đó chúng tôi nhiều lần lên tiếng về việc bố mẹ mua thuốc qua mạng). Điều đáng nói, khi đưa bài báo có ghi tên loại sữa giả cho bố mẹ xem thì ông bà vẫn gạt đi, bảo rằng "báo đưa tin nhầm lẫn", "PGS.TS kia đã quảng cáo", rồi "hàng triệu người đang uống. Bố mẹ tôi chỉ là một trong rất nhiều nạn nhân của vấn đề mất "sức đề kháng" trước người nổi tiếng. Họ không chỉ xem, bấm like mà còn xem đó là chân lý. Niềm tin dần dà ngấm sâu và quyết định mua các sản phẩm được người nổi tiếng giới thiệu.',
          'Thực hiện ý kiến chỉ đạo của Thủ tướng Chính phủ tại Công điện số 41/CĐ-TTg ngày 17/4/2025 về xử lý vụ việc sản xuất, buôn bán hàng giả là thuốc chữa bệnh, thực phẩm bảo vệ sức khỏe (TPBVSK), Cục An toàn thực phẩm (ATTP) đề nghị Sở Y tế các tỉnh thành phố trực thuộc trung ương.'
      ],
          date: "10/04/2025",
    },
    {
        id: 2,
        title: 'TP.HCM phát hiện ca viêm não do vi rút cúm gia cầm H5N1 hiếm gặp',
        images: [
        'https://cdn2.tuoitre.vn/zoom/260_163/471584752817336320/2025/4/18/z65170331208130f36fcf10d8e1ae90f81079d18b68edd-17449508365821478168397-495-533-998-1337-crop-17449553967691175390690.jpg',
        'https://cdn2.tuoitre.vn/thumb_w/730/471584752817336320/2025/4/19/vinmec-17450274746971144714675.jpg',
        'https://suckhoedoisong.qltns.mediacdn.vn/thumb_w/640/324455921873985536/2025/4/19/tay-ninh-17450248580721425489302.jpg'
        ],
        desc: [
          'Ngày 18/4, Sở Y tế TP.HCM xác nhận một bệnh nhân nam 38 tuổi được chẩn đoán mắc viêm não do vi rút cúm gia cầm H5N1 – một biến thể cực hiếm và có tỷ lệ tử vong cao. Đây là ca bệnh đầu tiên được ghi nhận tại TP.HCM trong hơn 10 năm qua.',
          'Bệnh nhân được đưa đến Bệnh viện Bệnh Nhiệt đới trong tình trạng sốt cao liên tục, co giật, rối loạn ý thức. Sau khi làm các xét nghiệm chuyên sâu, kết quả xác định bệnh nhân dương tính với H5N1. Hiện bệnh nhân đang được điều trị tích cực tại khoa hồi sức với tình trạng nguy kịch.',
          'Trung tâm Kiểm soát bệnh tật TP.HCM (HCDC) đã tiến hành khoanh vùng, truy vết và phun khử khuẩn khu vực nơi bệnh nhân sinh sống, đồng thời lấy mẫu xét nghiệm người tiếp xúc gần. Kết quả ban đầu cho thấy chưa có ca nhiễm thứ hai.',
          'Bộ Y tế khuyến cáo người dân cần hạn chế tiếp xúc với gia cầm sống không rõ nguồn gốc, tránh mua bán giết mổ tại chợ tự phát. Đồng thời, tăng cường vệ sinh cá nhân, rửa tay thường xuyên và đeo khẩu trang khi ra ngoài.',
          'Vi rút H5N1 thường lây truyền từ gia cầm sang người thông qua tiếp xúc trực tiếp hoặc hít phải giọt bắn, phân từ gia cầm nhiễm bệnh. Đây là một trong những loại cúm nguy hiểm nhất, có tỷ lệ tử vong cao nếu không được phát hiện và điều trị kịp thời.'
        ],
        date: "18/04/2025",
    },
    {
        id: 3,
        title: 'Cục An toàn thực phẩm hướng dẫn tra cứu sản phẩm bảo vệ sức khỏe, phát hiện hàng giả, hàng lậu',
        images: [
        'https://cdn2.tuoitre.vn/zoom/260_163/471584752817336320/2025/4/18/cc634763-9769-49b5-bea8-d74ebabd0c97-17449607453952130365444-102-0-468-585-crop-17449609482612093492682.jpg',
        'https://cdn2.tuoitre.vn/thumb_w/730/471584752817336320/2025/4/19/vinmec-17450274746971144714675.jpg',
        'https://suckhoedoisong.qltns.mediacdn.vn/thumb_w/640/324455921873985536/2025/4/19/tay-ninh-17450248580721425489302.jpg'
        ], // Bạn thêm ảnh sau
        desc: [
          'Cục An toàn thực phẩm (Bộ Y tế) vừa ra thông báo về việc hướng dẫn người dân tra cứu sản phẩm bảo vệ sức khỏe chính hãng và phát hiện hàng giả, hàng lậu thông qua hệ thống dữ liệu trực tuyến. Đây là một bước tiến quan trọng nhằm tăng cường nhận thức cộng đồng về vấn nạn thực phẩm chức năng không rõ nguồn gốc tràn lan trên thị trường.',
          'Theo đó, người dân có thể truy cập vào trang web chính thức của Cục An toàn thực phẩm và sử dụng công cụ tra cứu bằng cách nhập tên sản phẩm hoặc mã vạch. Hệ thống sẽ trả kết quả gồm: tên sản phẩm, nhà sản xuất, số đăng ký, ngày cấp phép và tình trạng lưu hành.',
          'Đại diện Cục cho biết, hiện tại đã có hơn 10.000 sản phẩm được cập nhật trong hệ thống, bao gồm cả những sản phẩm đã từng bị xử lý vi phạm. Việc này giúp người tiêu dùng dễ dàng phát hiện sản phẩm bất hợp pháp, tránh bị lợi dụng bởi các chiêu trò quảng cáo sai sự thật hoặc gắn mác "chính hãng" giả mạo.',
          'Cùng với việc tăng cường kiểm tra, xử phạt các doanh nghiệp vi phạm, Cục An toàn thực phẩm cũng khuyến cáo người dân cần cảnh giác với các sản phẩm được bán qua mạng xã hội, livestream không rõ nguồn gốc, đặc biệt là những sản phẩm có giá bán quá rẻ so với thị trường.',
          'Bên cạnh đó, Cục sẽ tiếp tục phối hợp với lực lượng quản lý thị trường, công an kinh tế và cơ quan truyền thông để nâng cao hiệu quả tuyên truyền và xử lý nghiêm các trường hợp vi phạm, nhằm bảo vệ sức khỏe người dân.'
        ],
        date: "18/04/2025",
      },
      {
        id: 4,
        title: 'Vụ nghi ngộ độc thực phẩm tại Trường tiểu học Võ Thị Sáu TP.HCM: Phụ huynh yêu cầu đổi nhà cung cấp',
        images: [
        'https://cdn2.tuoitre.vn/zoom/260_163/471584752817336320/2025/4/18/z651637925504041d032d44877866d7e88765551d3c682-17449408836602017820576-0-0-674-1078-crop-17449408917941512839003.jpg',
        'https://cdn2.tuoitre.vn/thumb_w/730/471584752817336320/2025/4/19/vinmec-17450274746971144714675.jpg',
        'https://suckhoedoisong.qltns.mediacdn.vn/thumb_w/640/324455921873985536/2025/4/19/tay-ninh-17450248580721425489302.jpg'
        ],
        desc: [
          'Sáng 18/4, hàng chục phụ huynh tại Trường tiểu học Võ Thị Sáu, quận 3, TP.HCM đã tập trung tại cổng trường để phản ánh tình trạng nhiều học sinh bị đau bụng, nôn ói sau khi ăn trưa tại trường ngày hôm trước.',
          'Theo thông tin ban đầu từ nhà trường, có hơn 40 em học sinh có biểu hiện nghi ngộ độc thực phẩm, trong đó 10 em phải nhập viện để theo dõi. Ngay sau khi sự việc xảy ra, Sở Y tế TP.HCM và Trung tâm Kiểm soát bệnh tật đã vào cuộc lấy mẫu thực phẩm và xét nghiệm.',
          'Phụ huynh cho biết, nhà cung cấp suất ăn hiện tại đã từng bị cảnh báo về điều kiện bảo quản không đảm bảo. Nhiều người bức xúc vì nhà trường không có sự giám sát chặt chẽ với đơn vị cung ứng.',
          'Một phụ huynh nói: “Chúng tôi yêu cầu nhà trường dừng hợp đồng với nhà cung cấp hiện tại và công khai quy trình lựa chọn đơn vị mới. Con cái chúng tôi không thể tiếp tục là nạn nhân của sự thiếu trách nhiệm.”',
          'Trước áp lực dư luận, Ban Giám hiệu nhà trường cho biết đang tạm ngừng hợp tác với nhà cung cấp và sẽ tổ chức đối thoại với phụ huynh trong tuần tới. Đồng thời cam kết sẽ tăng cường kiểm tra thực phẩm, chất lượng bữa ăn học đường.'
        ],
        date: "18/04/2025",
      },
      {
        id: 5,
        title: 'TP.HCM phát hiện ca viêm não do vi rút cúm gia cầm H5N1 hiếm gặp',
        images: [
        'https://cdn2.tuoitre.vn/zoom/260_163/471584752817336320/2025/4/17/z6514626098451fcee064765c9c9b469dad08839423d67-read-only-1744906515263220952876-140-0-1616-2362-crop-17449066528281696494129.jpg',
        'https://cdn2.tuoitre.vn/thumb_w/730/471584752817336320/2025/4/19/vinmec-17450274746971144714675.jpg',
        'https://suckhoedoisong.qltns.mediacdn.vn/thumb_w/640/324455921873985536/2025/4/19/tay-ninh-17450248580721425489302.jpg'
        ],
        desc: [
          'Ngày 18/4, Sở Y tế TP.HCM xác nhận một bệnh nhân nam 38 tuổi được chẩn đoán mắc viêm não do vi rút cúm gia cầm H5N1 – một biến thể cực hiếm và có tỷ lệ tử vong cao. Đây là ca bệnh đầu tiên được ghi nhận tại TP.HCM trong hơn 10 năm qua.',
          'Bệnh nhân được đưa đến Bệnh viện Bệnh Nhiệt đới trong tình trạng sốt cao liên tục, co giật, rối loạn ý thức. Sau khi làm các xét nghiệm chuyên sâu, kết quả xác định bệnh nhân dương tính với H5N1. Hiện bệnh nhân đang được điều trị tích cực tại khoa hồi sức với tình trạng nguy kịch.',
          'Trung tâm Kiểm soát bệnh tật TP.HCM (HCDC) đã tiến hành khoanh vùng, truy vết và phun khử khuẩn khu vực nơi bệnh nhân sinh sống, đồng thời lấy mẫu xét nghiệm người tiếp xúc gần. Kết quả ban đầu cho thấy chưa có ca nhiễm thứ hai.',
          'Bộ Y tế khuyến cáo người dân cần hạn chế tiếp xúc với gia cầm sống không rõ nguồn gốc, tránh mua bán giết mổ tại chợ tự phát. Đồng thời, tăng cường vệ sinh cá nhân, rửa tay thường xuyên và đeo khẩu trang khi ra ngoài.',
          'Vi rút H5N1 thường lây truyền từ gia cầm sang người thông qua tiếp xúc trực tiếp hoặc hít phải giọt bắn, phân từ gia cầm nhiễm bệnh. Đây là một trong những loại cúm nguy hiểm nhất, có tỷ lệ tử vong cao nếu không được phát hiện và điều trị kịp thời.'
        ],
        date: "18/04/2025",
      },
      {
        id: 6,
        title: 'Tăng "sức đề kháng", bảo vệ túi tiền và sức khỏe trước quảng cáo từ người nổi tiếng',
        images: [
        'https://cdn2.tuoitre.vn/zoom/260_163/471584752817336320/2025/4/18/chatgpt-image-145203-17-thg-4-2025-1744876340692263651222-0-0-640-1024-crop-17448764123571817627117-170-0-543-596-crop-1744938138602965921923.png',
        'https://cdn2.tuoitre.vn/thumb_w/730/471584752817336320/2025/4/19/vinmec-17450274746971144714675.jpg',
        'https://suckhoedoisong.qltns.mediacdn.vn/thumb_w/640/324455921873985536/2025/4/19/tay-ninh-17450248580721425489302.jpg'
        ],
        desc: [
          'Thời gian gần đây, mạng xã hội tràn ngập các video quảng cáo thực phẩm chức năng, mỹ phẩm và thiết bị y tế được giới thiệu bởi người nổi tiếng. Tuy nhiên, không phải sản phẩm nào cũng đảm bảo chất lượng, và không ít trường hợp người tiêu dùng trở thành nạn nhân của chiêu trò truyền thông đánh vào niềm tin.',
          'Nhiều người vì thấy thần tượng sử dụng sản phẩm mà bỏ tiền mua về dùng, bất chấp sản phẩm không rõ nguồn gốc hoặc chưa được cơ quan y tế kiểm định. Một số vụ việc gần đây đã ghi nhận trường hợp dị ứng, ngộ độc nhẹ sau khi sử dụng các sản phẩm được quảng bá quá mức.',
          'PGS.TS Nguyễn Thị Lan – chuyên gia về Dinh dưỡng – cho biết: "Người nổi tiếng không phải lúc nào cũng hiểu rõ thành phần, công dụng hay tác dụng phụ của sản phẩm họ giới thiệu. Người tiêu dùng cần tỉnh táo và chủ động tra cứu thông tin từ nguồn chính thống."',
          'Cục An toàn thực phẩm cũng khuyến cáo người dân nên lựa chọn sản phẩm đã được cấp phép, không nên quá tin tưởng vào quảng cáo trên mạng xã hội, đặc biệt là với các sản phẩm hứa hẹn công dụng "thần kỳ".',
          'Việc nâng cao nhận thức và kiểm chứng thông tin trước khi mua hàng là “lá chắn” quan trọng giúp bảo vệ sức khỏe và túi tiền của mỗi người tiêu dùng.'
        ],
        date: "17/04/2025",
      },
      {
        id: 7,
        title: 'Thêm một bệnh viện tạm dừng tư vấn sữa của công ty trong đường dây sản xuất sữa giả',
        images: [
        'https://cdn2.tuoitre.vn/thumb_w/730/471584752817336320/2025/4/17/base64-1744883376970612033707.jpeg',
        'https://cdn2.tuoitre.vn/thumb_w/730/471584752817336320/2025/4/19/vinmec-17450274746971144714675.jpg',
        'https://suckhoedoisong.qltns.mediacdn.vn/thumb_w/640/324455921873985536/2025/4/19/tay-ninh-17450248580721425489302.jpg'
        ],
        desc: [
          'Chiều 17/4, Bệnh viện Đa khoa Trung ương miền Trung xác nhận đã tạm dừng toàn bộ hoạt động tư vấn, giới thiệu sản phẩm sữa của một công ty từng xuất hiện trong đường dây sản xuất sữa giả đang bị điều tra bởi Bộ Công an.',
          'Theo đại diện bệnh viện, mặc dù hợp đồng quảng cáo giữa hai bên đã ký trước đó, nhưng sau khi có thông tin từ cơ quan chức năng, bệnh viện đã chủ động tạm ngừng để chờ kết luận điều tra chính thức.',
          'Trước đó, công ty này đã nhiều lần tài trợ các chương trình chăm sóc sức khỏe cộng đồng và tổ chức các buổi tư vấn tại các khoa Nhi và Dinh dưỡng trong bệnh viện. Tuy nhiên, sau loạt bài điều tra từ báo chí, dư luận dấy lên lo ngại về chất lượng và nguồn gốc sữa mà công ty cung cấp.',
          'Một số phụ huynh có con đang điều trị tại bệnh viện cũng bày tỏ sự bất an, cho rằng các bệnh viện cần thận trọng hơn trong việc lựa chọn đối tác tài trợ và giới thiệu sản phẩm đến bệnh nhân.',
          'Hiện Bộ Y tế và Cục An toàn thực phẩm đang rà soát toàn bộ các đơn vị y tế từng hợp tác với công ty này, đồng thời yêu cầu dừng lưu hành các sản phẩm chưa rõ nguồn gốc, chờ kết luận từ cơ quan chức năng.'
        ],
        date: "17/04/2025",
      },
      {
        id: 8,
        title: 'Danh sách 65 cơ sở đủ điều kiện cấp giấy khám sức khỏe lái xe liên thông ở Hà Nội',
        images: [
        'https://cdn2.tuoitre.vn/thumb_w/730/471584752817336320/2024/7/18/thuocbhyt-17212666846871259580692-0-0-1184-1894-crop-1721266996427511507595.jpg',
        'https://cdn2.tuoitre.vn/thumb_w/730/471584752817336320/2025/4/19/vinmec-17450274746971144714675.jpg',
        'https://suckhoedoisong.qltns.mediacdn.vn/thumb_w/640/324455921873985536/2025/4/19/tay-ninh-17450248580721425489302.jpg'
        ],
        desc: [
          'Sở Y tế Hà Nội vừa công bố danh sách 65 cơ sở y tế đủ điều kiện khám sức khỏe lái xe và liên thông dữ liệu điện tử với Tổng cục Đường bộ Việt Nam. Danh sách này được cập nhật định kỳ nhằm đảm bảo tính minh bạch và tiện lợi cho người dân có nhu cầu xin cấp mới hoặc gia hạn giấy phép lái xe.',
          'Các cơ sở bao gồm cả bệnh viện tuyến trung ương, bệnh viện đa khoa, trung tâm y tế quận huyện và một số phòng khám tư nhân. Tất cả đều phải đáp ứng các tiêu chí về nhân lực, trang thiết bị và hệ thống quản lý dữ liệu điện tử.',
          'Người dân khi đến khám tại các đơn vị này sẽ được cập nhật kết quả khám sức khỏe trực tiếp vào hệ thống dữ liệu quốc gia, không cần phải mang giấy tờ đến nộp tại các cơ quan chức năng như trước đây.',
          'Sở Y tế Hà Nội cũng khuyến cáo người dân không nên đến các cơ sở không nằm trong danh sách để tránh bị từ chối hồ sơ. Đồng thời cần kiểm tra thông tin kỹ lưỡng trên cổng thông tin của Sở trước khi đặt lịch khám.',
          'Việc công khai danh sách cơ sở đủ điều kiện là bước tiến quan trọng trong việc số hóa các thủ tục hành chính và nâng cao chất lượng dịch vụ y tế phục vụ người dân.'
        ],
        date: "16/04/2025",
      },
      {
        id: 9,
        title: 'Cẩn trọng với bột ngọt không rõ xuất xứ, chỉ ghi ‘đóng gói tại Việt Nam’',
        images: [
        'https://suckhoedoisong.qltns.mediacdn.vn/zoom/780_488/324455921873985536/2025/4/11/hoi-thao-17443683580151718967724-83-0-1333-2000-crop-1744368362445786262946.jpg',
        'https://cdn2.tuoitre.vn/thumb_w/730/471584752817336320/2025/4/19/vinmec-17450274746971144714675.jpg',
        'https://suckhoedoisong.qltns.mediacdn.vn/thumb_w/640/324455921873985536/2025/4/19/tay-ninh-17450248580721425489302.jpg'
        ],
        desc: [
          'Người tiêu dùng thời gian gần đây phản ánh về một số loại bột ngọt bày bán tại chợ và cửa hàng tạp hóa chỉ ghi chung chung là “đóng gói tại Việt Nam” mà không có thông tin về nhà sản xuất, địa chỉ hay giấy phép lưu hành.',
          'Các chuyên gia cảnh báo việc sử dụng bột ngọt không rõ nguồn gốc tiềm ẩn nguy cơ cao về an toàn thực phẩm. Do không kiểm soát được quá trình sản xuất, loại bột ngọt này có thể chứa tạp chất, kim loại nặng hoặc chất bảo quản vượt mức cho phép.',
          'Cục An toàn thực phẩm đã tiến hành lấy mẫu kiểm tra tại một số địa phương và phát hiện một số sản phẩm vi phạm. Các sản phẩm này đang được yêu cầu thu hồi và xử lý theo quy định.',
          'Đại diện Cục cho biết sẽ sớm ban hành hướng dẫn mới yêu cầu tất cả sản phẩm phụ gia thực phẩm bắt buộc phải ghi rõ nguồn gốc, tên cơ sở sản xuất, số đăng ký lưu hành trên bao bì.',
          'Người tiêu dùng nên ưu tiên lựa chọn sản phẩm của các thương hiệu uy tín, có kiểm định chất lượng rõ ràng, tránh sử dụng các sản phẩm trôi nổi chỉ vì giá rẻ mà ảnh hưởng đến sức khỏe lâu dài.'
        ],
        date: "16/04/2025",
      }
  ];

const DetailArticle = () => {
    const { id } = useParams(); // lấy id từ URL
    const navigate = useNavigate(); // Chuyển hook này lên đầu function component
  
    const [article, setArticle] = useState(null);
  
    useEffect(() => {
      const foundArticle = newsItems.find(item => item.id.toString() === id);
  
      // Nếu chỉ có 1 ảnh, convert sang mảng images
      if (foundArticle && !foundArticle.images && foundArticle.image) {
        foundArticle.images = [foundArticle.image];
      }
  
      setArticle(foundArticle);
    }, [id]);
  
    if (!article) return <div>Không tìm thấy bài viết</div>;
  return (
    <div className="min-h-screen flex flex-col">
      {/* Phần Header */}
      <Header />

      <div className="max-w-7xl mx-auto p-4 mt-20 flex flex-1">
        {/* Phần chính của bài viết */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
          <p className="text-gray-600 mb-4">Ngày đăng: {article.date || "Chưa có thông tin"}</p>

          {/* Hiển thị ảnh và mô tả luân phiên */}
          {article.images && article.images.map((imgUrl, index) => (
            <div key={index} className="mb-8">
              <img
                src={imgUrl}
                alt={`Ảnh ${index + 1} - ${article.title}`}
                className="w-full shadow mb-4"
              />
              {article.desc[index] && (
                <div className="prose max-w-none text-lg leading-relaxed mb-4">
                  <p>{article.desc[index]}</p>
                </div>
              )}
            </div>
          ))}
        <div className="flex justify-start mt-4">
        <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-gray-600 font-medium rounded-lg"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Quay lại
        </button>
        </div>
        </div>
        {/* Cột bên phải: danh sách các tin khác */}
        <div className="w-1/3 pl-8">
        <h5  className="text-xl font-bold mb-4 border-b-2 border-red-600 pb-2 text-blue-700">Tin tức khác</h5>
        <div className="space-y-6">
            {newsItems.filter(item => item.id !== article.id).map((item) => (
            <div key={item.id} className="border-b pb-4">
                <Link to={`/detail-article/${item.id}`} className="block !no-underline">
                <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-32 object-cover mb-2"
                />
                <h5 className="text-base font-medium text-black hover:text-blue-600 !no-underline">
                    {item.title}
                </h5>
                <p className="text-sm text-gray-500 mt-1">{item.date}</p>
                </Link>
            </div>
            ))}
        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailArticle;
