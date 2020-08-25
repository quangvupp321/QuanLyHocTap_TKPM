# Trang web Quản lý môn học (dành cho sinh viên)

## Người thực hiện:

- 1712208 - Hà Phùng Quang Vũ
- 1712591 - Hồ Đình Minh

## Thông tin Project:

- Đồ án môn học ***Thiết kế phần mềm*** của trường ***Đại học khoa học tự nhiên - ĐHQG TPHCM*** (2020)
- Sử dụng NodeJS và handlebars.
- Sử dụng hệ quản trị cơ sở dữ liệu: MySQL

## Hướng dẫn sử dụng:

### Hướng dẫn cách xây dựng cơ sở dữ liệu:

1. Vào hệ quản trị cơ sở dữ liệu MySQL để tạo database và localhost tương ứng:

- host: 'localhost',
- user: 'root',
- port: '3306',
- password: '123456',
- database: 'qlht'

2. Vào folder */public/database_script* của SourceCode
3. Sau đó chạy lần lượt 2 file để tạo các bảng và thêm dữ liệu vào các bảng

> - structure.sql
> - dataweb.sql

### Hướng dẫn cách build chương trình:

1. Chạy lệnh sau để cài đặt các package:

```
npm install
```

2. Chạy lệnh sau để bắt đầu:

```
npm start
```

3. Để bắt đầu sử dụng, vào trang web:

> http://localhost:3000/

