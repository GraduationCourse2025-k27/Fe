# Fe

WEBSITE_MEDICAL ######

CÁCH SỬ DỤNG :
cài nodeJS (version từ 20 trở lên (nên tải version 20))
các bước để lấy project:
git clone project về (sau khi clone project về thì phải dùng lênh yarn install để update các thư viện mới nhất )
cài yarn với câu lênh : npm install -g yarn
kiểm trả version yarn : yarn --version
cách chạy project :
B1 :cd đến project của mình
B2 :yarn dev
B3 :click vào local ctrl + click chuột trái

cách tạo file jsx :
(tạo folder với file là tên .jsx)

cách lấy code mới nhấy từ main về :

# 1. Chuyển sang nhánh TamHp (nếu chưa ở đó)

git checkout TamHp

# 2. Cập nhật thông tin mới nhất từ remote

git fetch origin

# 3. Hợp nhất code từ main vào TamHp

git merge origin/main
