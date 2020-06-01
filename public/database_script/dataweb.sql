use qldg;

-- category cấp 1 trang chính chỉ để thể hiện trong danh mục (không truy xuất product theo trang này)
INSERT INTO category VALUES (1,"Điện Tử");
INSERT INTO category VALUES (2,"Điện Gia Dụng"); 
INSERT INTO category VALUES (3,"Đồ Chơi và Bé");
INSERT INTO category VALUES (4,"Thể Thao và Dã Ngoại");
INSERT INTO category VALUES (5,"Thời trang");
insert into category values (6,"Oto và Xe Máy");

-- category cấp 2 truy xuất product theo các mục này 
insert into subcategory values (11,"Máy Tính", 1);
insert into subcategory values (12,"Linh kiện máy tính", 1);
insert into subcategory values (21,"Nhà Bếp", 2);
insert into subcategory values (22,"Thiết Bị Gia Đình", 2);
insert into subcategory values (31,"Đồ Chơi", 3);
insert into subcategory values (32,"Đồ Dùng Em Bé", 3);
insert into subcategory values (41,"Thể Thao", 4);
insert into subcategory values (42,"Dã Ngoại", 4);
insert into subcategory values (51,"Làm Đẹp", 5);
insert into subcategory values (52,"Thời trang", 5);

-- User phân cấp theo permission 0: bidder , 1: seller , 2: admin
-- password dung bcrypt để mã hóa với chiều dài cô định 60 ký tự: pass: 12345678 saltRounds: 10
-- bắt đầu từ 20000

insert into User_ values (20001,"Lê Minh Hoàng" ,"lehoangminh","leminhoang@gmail.com",
"$2b$10$0Xifu5Z9aOYT6.oIePCqDer8gwjEVgR0p/KDAU0JkiN7vI3Qq60yG","1999/1/1","Quận 1",8,0);

insert into User_ values (20002,"Minh Trí", "minhtri","minhtri@gmail.com",
"$2b$10$8FAr123BZL2J8ayjuYuKu.cVRASlN0t42urEXFMRTv08TbR.tyGe6","1999/1/1","Quận 1",8,0);

insert into User_ values (20003,"Lê Hoàng","lehoang","lehoang@gmail.com",
"$2b$10$Hwweg3tCCg0Zg2O9qvWM9eJOqBtAJ1FXPZFP6GByCeLK6/e32y9uS","1999/1/1","Quận 1",8,0);

insert into User_ values (20004,"Lê Quag Thịnh" ,"lequangthinh","quangthinh@gmail.com",
"$2b$10$LUTdRuAmTbNI9NNcBEi9tOzQaE2JcpvB7HpRhMalm6wI9FWj2eyYi","1999/2/1","Quận 2",8,0);

insert into User_ values (20005,"Huỳnh Đinh Tiến" , "huynhdinhtien","dinhtien@gmail.com",
"$2b$10$sd295mzMuIQfXVOPGWMVK.zwGWv/RaNzySXzmfiWvjSutZuGQT8aa","1999/3/1","Quận 3",8,0);

insert into User_ values (20006, "Thái Ba Sơn","thaibason","baoson@gmail.com",
"$2b$10$RAJ3TU3N3CQCAfRsx4emc.bv/JpwltaaUmPg368Yi4TRRvs9P.zwy","1999/5/1","Quận 4",8,1);

insert into User_ values (20007,"Nguyễn Văn Tài" ,"nguyenvantai","vantai@gmail.com",
"$2b$10$Kr579w1b5mXA1I/0Agt2SOfbJm5doubLPz24H.A7aMGZNz73EJwqW","1999/4/1","Quận 5",8,1);

insert into User_ values (20008,'Nguyễn Thái Huy',"nguyethaihuy","thaihuy@gmail.com",
"$2b$10$oWfC9i2H1.HwHH/bPiQgM.Y3l9umgUV7d5iI2Bhn8CyrEQyCQoJgy","1999/6/1","Quận 6",8,1);

insert into User_ values (20009,"Nguyễn Thái Học" ,"nguyenthaihoc","thaihoc@gmail.com",
"$2b$10$DRid.lXki29p3GNUkSBG/.E1bbSoUzm6NU.qCg3quLN5dqSXOfQby","1999/7/1","Quận 7",8,1);

insert into User_ values (200010,"Nguyễn Huy Hoàng" ,"nguyenhuyhoang","huyhoang@gmail.com",
"c88c2d9ab092bc488444e681f9b5b3974ad0ad80222494b072939a2eaefb7b9e16efdc22f8c","1999/8/1","Quận 8",10,1);

insert into User_ values (200011,"Quang Vũ", "quangvu","quangvupp321@gmail.com",
"$2b$10$QtNrkrSa65hefoULPQbOpOwznwBUEPmOeVlYsol2Tu5rlnzWNU5d6","1999/8/1","Quận 8",10,2);

insert into User_ values (200012, "Nguyễn Phạm Anh Tú","nguyenphamanhtu","anhtu@gmail.com",
"$2b$10$psiop6jlFkcNcfmLGgIvA.7mGPwa008lDXWWnw3wzgUKkOZB6dBCO","1999/9/1","Quận 9",8,2);

insert into User_ values (200013,"Nguyễn Hồng Ân" ,"nguyenhongan","hongan150699@gmail.com",
"$2user_b$10$eqnwJwFhpH8KT1EPcyuNoeSj.TaDmPieH27upvFXp8E/aJsgfRiYC","1999/10/1","Quận 10",8,2);


-- nhập dữ liệu theo từng product và các dữ liệu liên quan như time_stamp (thời gian đấu giá) , orderdetail(các lượt đấu giá)
-- thiết bị gia đình
INSERT INTO products VALUES (1,"Móc phơi đồ 9 lỗ",50000,20004,22,10,null,5000,0,
"<p>móc treo quần áo 9 lỗ tiện dụng, đa năng giúp tiết kiệm diện tích tủ quần áo và sắp xếp tủ quần áo gọn gàng, dễ tìm kiếm, dễ lấy.</p>
<p>Có thể dùng móc bên trong tủ hay bên ngoài đều được.</p>
<p>Chất liệu Nhựa ABS cứng, chịu lực cao, an toàn cho sức khỏe.</p>",'2019/12/25','2020/1/5');
-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (1,60000,20004,20001);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (1,65000,20004,20002);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (1,70000,20004,20003);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (1,80000,20004,20001);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (1,90000,20004,20002);

INSERT INTO products VALUES (2,"Móc phơi giày",60000,20004,22,10,null,10000,0,
"<p>Chất liệu : Nhựa PP, OP</p>
<p>Móc xoay 360oC</p>
<p>Trọng lượng : 65gram</p>
<p>Màu sắc : xanh, hồng hoặc xám nhạt</p>",'2019/12/25','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (2,60000,20004,20002);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (2,70000,20004,20003);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (2,80000,20004,20002);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (2,90000,20004,20003);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (2,110000,20004,20001);

INSERT INTO products VALUES (3,"Thảm Lau Chân Xuất Sứ Mỹ",2000000,20004,22,10,null,10000,0,
"<p>Thảm lau chân đơn sắc thiết kế đơn giản.</p>
<p>Sơi lông mềm dài rất êm chân và siêu thấm nước.</p>
<p>Màu sắc trầm ít bám bẩn và tạo cảm giác nhẹ nhàng cho không gian.</p>
<p>Mặt sau có đệm cao su chống trượt, an toàn khi sử dụng.</p>",'2019/12/25','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (3,220000,20004,20002);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (3,240000,20004,20003);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (3,250000,20004,20003);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (3,260000,20004,20002);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (3,270000,20004,20003);

INSERT INTO products VALUES (4,"Giá đựng giày bằng gỗ",500000,20004,22,10,null,10000,0,
"<p>Kệ được thiết kế 5 tầng để giày dép và 1 ngăn kéo tủ đồ cá nhận như : xi đánh giày, vật dụng khá</p>
<p>Lắp ghép ốc vít có sẵn chắc chắn và dễ dàng</p>
<p>Chất liệu: gỗ ép công nghiệp</p>
",'2019/12/25','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (4,520000,20004,20002);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (4,540000,20004,20001);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (4,550000,20004,20003);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (4,560000,20004,20002);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (4,570000,20004,20003);

INSERT INTO products VALUES (5,"Rèm treo cửa",150000,20004,22,10,null,5000,0,
"<p>Rèm treo phòng tắm màu kem trơn chống thấm tốt</p>
<p>Ngăn tình trang văng nước, hạn chế trơn trượt</p>
<p>Dễ dàng giặt giũ, vệ sinh rèm</p>
<p>Chất liệu mỏng nhẹ, bền màu</p>
",'2019/12/25','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (5,150000,20004,20001);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (5,153000,20004,20003);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (5,156000,20004,20001);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (5,158000,20004,20002);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (5,160000,20004,20003);

-- link kiện máy tính
INSERT INTO products VALUES (6,"Ram máy tính 8GB",1000000,20005,12,10,null,100000,0,
"<p>Bộ nhớ chất lượng cao chuẩn DDR4</p>
<p>Dung lượng 8GB</p>
<p>Bộ nhớ Intel XMP2.0</p>
<p>Tản nhiệt nhôm</p>",'2019/12/25','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (6,100000,20005,20001);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (6,113000,20005,200012);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (6,126000,20005,20001);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (6,138000,20005,200012);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (6,150000,20005,200011);

INSERT INTO products VALUES (7,"Bộ vi xử lý CPU AMD Ryzen 5 1600X",3000000,20005,12,10,null,200000,0,
"<p>Bộ vi xử lý AMD Ryzen 5 1600x</p>
<p>Tốc độ: 3.6Ghz Turbo Boost lên đến 4.1Ghz</p>
<p>Bộ nhớ đệm: 16MB</p>
<p>Số nhân: 6 Nhân và 12 Luồng</p>",'2019/12/25','2020/1/5');


-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (7,3000000,20005,20001);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (7,3300000,20005,200012);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (7,3500000,20005,200011);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (7,3700000,20005,20003);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (7,3900000,20005,200011);

INSERT INTO products VALUES (8,"Chip Intel core-i5",2000000,20005,12,10,null,100000,0,
"<p>ntel Core i5-9400</p>
<p>Socket: LGA1151 (Coffee Lake-R)</p>
<p>Số lõi/luồng: 6/6</p>
<p>Tần số cơ bản/turbo: 2.9/4.1 GHz</p>
<p>Bộ nhớ đệm: 9MB </p>",'2019/12/25','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (8,2000000,20005,200010);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (8,2300000,20005,20006);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (8,2500000,20005,20007);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (8,2700000,20005,20004);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (8,2900000,20005,200011);


INSERT INTO products VALUES (9,"Quạt Tản Nhiệt Thermaltake Riing",200000,20005,12,10,null,10000,0,
"<p>Kích thước: 120 x 120 x 25 mm</p>
<p>Điện áp định mức: 12 V</p>
<p>Tốc độ quạt: 1500 R.P.M / 1000 R.P.M (with LNC)</p>
<p>Tiếng ồn: 24.6 dB-A</p>
",'2019/12/25','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (9,200000,20005,200010);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (9,230000,20005,20006);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (9,250000,20005,20007);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (9,270000,20005,20005);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (9,290000,20005,20001);

INSERT INTO products VALUES (10,"chuột không dây MSI ",500000,20005,12,10,null,20000,0,
"<p>Chất liệu cao cấp, nhỏ gọn, thời trang</p>
<p>Thiết kế hiện đại</p>
<p>Kết nối : Wireless 2.4GHz =</p>
<p>Khoảng cách kết nối : 10m</p>",'2019/12/25','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (10,500000,20005,200010);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (10,530000,20005,20005);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (10,550000,20005,20008);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (10,570000,20005,20008);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (10,590000,20005,20001);

-- máy tính 

INSERT INTO products VALUES (11,"Laptop MSI GF63 Thin 9RCX-645VN",20000000,20005,11,10,null,1000000,0,
"<p>CPU: Intel Core i7-9750H 2.6GHz up to 4.5GHz 12MB</p>
<p>RAM: 8GB DDR4 2666MHz (2x SO-DIMM socket, up to 32GB SDRAM)</p>
<p>Ổ cứng: 512GB SSD M.2 PCIe</p>
<p>Card đồ họa: NVIDIA GeForce GTX 1050Ti 4GB GDDR5 + Intel UHD Graphics 620</p>
<p>Màn hình: 15.6 Inches FHD (1920 x 1080) IPS, 60Hz, Thin Bezel, Anti-Glare with 45% NTSC</p>",'2019/12/25','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (11,20000000,20005,20002);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (11,23000000,20005,20005);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (11,25000000,20005,20003);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (11,27000000,20005,20008);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (11,29000000,20005,20001);

INSERT INTO products VALUES (12,"Laptop Dell G7 Inspiron 7591 KJ2G41",21000000,20005,11,10,null,1000000,0,
"<p>CPU: Intel Core i7-9750H (2.6GHz upto 4.5GHz, 6Cores, 12Threads, 12MB cache, FSB 8GT/s)</p>
<p>RAM: 8GB DDR4 2666Mhz (1x8GB), 2 Slot, Max 32GB</p>
<p>Ổ cứng: 256GB SSD M.2 PCIe NVMe</p>
<p>Card VGA: NVIDIA GeForce GTX 1050 3GB GDDR5</p>
<p>Màn hình: 15.6 inch FHD (1920 x 1080), Anti-glare LED Backlight Non-touch Display, màn góc rộng</p>",'2019/12/25','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (12,22000000,20005,20002);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (12,23000000,20005,20003);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (12,25000000,20005,20004);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (12,27000000,20005,20005);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (12,29000000,20005,20006);

INSERT INTO products VALUES (13," Laptop HP ENVY 13-AQ0026TU",21000000,20005,11,10,null,1000000,0,
"<p>CPU: Intel Core i5-8265U 1.6GHz up 3.9GHz 6MB</p>
<p>Màn hình: 13.3 inch FHD (1920 x 1080) IPS, BrightView Micro-Edge</p>
<p>RAM: 8GB LPDDR3 2133MHz (Onboard)</p>
<p>Đồ họa: Intel UHD Graphics 620</p>
<p>Lưu trữ: 256GB PCIe NVMe M.2 SSD</p>",'2019/12/25','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (13,22000000,20005,20001);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (13,23000000,20005,20003);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (13,25000000,20005,20004);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (13,27000000,20005,20005);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (13,29000000,20005,20002);

INSERT INTO products VALUES (14," Laptop Asus Vivobook A512FA-EJ440T",15000000,20005,11,10,null,1000000,0,
"<p>Chip: Intel Core i5-8265U (1.60GHz Up to 3.90 GHz, 4Cores, 8Threads, 6MB Cache, FSB 4GT/s)</p>
<p>RAM: 8GB DDR4 2400MHz Onboard , 1x SO-DIMM socket, up to 16GB SDRAM)</p>
<p>Ổ cứng: 512GB SSD M.2 Sata + 1 slot HDD</p>
<p>Chipset đồ họa: Intel UHD Graphics 620</p>
<p>Màn hình: 15.6-inch FHD (1920x1080), LED backlit, 60Hz, Anti-Glare, 45% NTSC</p>",'2019/12/25','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (14,15000000,20005,200010);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (14,16000000,20005,20003);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (14,17000000,20005,20004);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (14,18000000,20005,20005);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (14,19000000,20005,20007);

INSERT INTO products VALUES (15,"Laptop Lenovo ThinkPad T480 20L5S01400",17000000,20005,11,10,null,1000000,0,
"<p>Chip: Intel Core i5-8250U</p>
<p>RAM: 8GB DDR4 2400MHz</p>
<p>Ổ cứng: 256GB M.2 SSD NVMe</p>
<p>Chipset đồ họa: Intel UHD Graphics 620</p>
<p>Màn hình: 14 inch Full HD (1920 x 1080) IPS Anti-Glare</p>",'2019/12/25','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (15,18000000,20005,200010);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (15,19000000,20005,20004);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (15,20000000,20005,20006);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (15,21000000,20005,20005);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (15,22000000,20005,20009);

-- Nhà bếp 
INSERT INTO products VALUES (16,"Bình Giữ Nhiệt Lock&Lock Feather Light",170000,20004,21,10,null,10000,0,
"<p>Thiết kế thon gọn, bắt mắt</p>
<p>Bình có giá lọc trà tiện ích</p>
<p>Chất liệu cao cấp, an toàn </p>
<p>Dung tích: 450ml</p>",'2019/12/25','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (16,180000,20004,200010);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (16,190000,20004,20004);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (16,200000,20004,20006);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (16,210000,20004,20005);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (16,220000,20004,20009);

INSERT INTO products VALUES (17,"Hộp Hâm Nóng Arirang Life EL-ALS263 ",270000,20004,21,10,null,10000,0,
"<p>Chất liệu cao cấp, an toàn khi sử dụng</p>
<p>Được hỗ trợ với nhiều chức năng co ích và tiện dụng cho người sử dụng</p>
<p>Hộp hâm nóng được trang bị với 3 tầng là 3 khay đựng thực phẩm</p>",'2019/12/25','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (17,280000,20004,200011);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (17,290000,20004,20001);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (17,300000,20004,20006);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (17,310000,20004,20005);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (17,320000,20004,20008);

INSERT INTO products VALUES (18,"Bộ Nồi Inox 430 Và Chảo Chống Dính Inox 3 Đáy Bếp",170000,20004,21,10,null,20000,0,
"<p>Chất liệu inox 430 sáng bóng, bền đẹp</p>
<p>Tay cầm bằng quai silicon chống nóng</p>
<p>Sử dụng được trên tất cả các loại bếp</p>",'2019/12/25','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (18,220000,20004,200011);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (18,240000,20004,20001);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (18,260000,20004,20002);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (18,280000,20004,20003);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (18,320000,20004,20004);

INSERT INTO products VALUES (19,"Nồi Áp Suất Anod Sunhouse SHA8504 ",170000,20004,21,10,null,20000,0,
"<p>Cấu tạo từ hợp kim siêu bền, kỹ thuật tiên tiến giảm thiểu biến dạng khi va đập</p>
<p>Quai nồi được chế tạo bằng nhựa chịu nhiệt nhập khẩu</p>
<p>Gioăng cao su có tuổi thọ cao</p>
<p>Sản phẩm có độ bền cao, bề mặt chống xước</p>",'2019/12/25','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (19,220000,20004,200010);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (19,240000,20004,200011);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (19,260000,20004,20001);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (19,280000,20004,20003);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (19,320000,20004,20004);


INSERT INTO products VALUES (20,"NỒI ÁP SUẤT ĐIỆN ĐA NĂNG 5L-860W",500000,20004,21,10,null,50000,0,
"<p>Tính năng nổi bật:</p>
<p>Phủ lớp chống dính siêu bền</p>
<p>Tiện lợi với chế độ hẹn giờ lên đến 24h.</p>
<p>Thức ăn được nấu bằng áp suất và nhiệt độ cao nên chín nhanh, hương vị thơm ngon, giữ nguyên được những chất dinh dưỡng cần thiết.</p>
",'2019/12/25','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (20,500000,20004,20005);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (20,550000,20004,20006);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (20,600000,20004,20001);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (20,650000,20004,20003);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (20,700000,20004,20004);

-- Nooooooooooooo Đồ chơi 
INSERT INTO products VALUES (21,"Nhiệt Kế Hồng Ngoại Đo Nhiệt Độ Cho Bé",100000,20006,31,10,null,10000,0,
"<p>Cho kết quả siêu nhanh trong 1 giây.</p>
<p>Sử dụng đơn giản chỉ với 1 nút bấm.</p>
<p>Độ chính xác cao, sai số chỉ 0,2 - 0,3 độ</p>
<p>Màn hình hiển thị nhiệt độ rõ nét.</p>
",'2019/12/25','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (21,100000,20006,20005);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (21,120000,20006,20002);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (21,140000,20006,20001);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (21,160000,20006,20003);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (21,170000,20006,20004);

INSERT INTO products VALUES (22,"Nôi Vải Zaracos Jelly 6046 - Yellow",1000000,20006,31,10,null,500000,0,
"<p>Kiểu dáng được thiết kế nhỏ gọn</p>
<p>Sử dụng đơn giản chỉ với 1 nút bấm.</p>
<p>Cũi có 3 tầng khác nhau</p>
<p>Có chức năng rung nhẹ</p>
",'2019/12/25','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (22,1000000,20006,20005);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (22,1500000,20006,20006);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (22,2400000,20006,20001);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (22,2900000,20006,20003);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (22,3500000,20006,20008);

INSERT INTO products VALUES (23,"Địu Em Bé, Địu Nhiều Tư Thế Có Mũ Che Nắng",100000,20006,31,10,null,10000,0,
"<p>Chất liệu: Vải cotton thấm hút tốt</p>
<p>Có vải mũ che nắng cho bé khi bé ra ngoài</p>
<p>Trợ lực hông và vai giúp mẹ thoải mái khi địu bé</p>
<p>Đầu khóa có chốt an toàn, giúp cố định bé chắc chắn, dễ cài</p>
<p>Dây đai hông dễ dàng điều chỉnh, kích thước hông: 72 đến 129 cm.</p>
",'2019/12/25','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (23,100000,20006,20005);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (23,150000,20006,20006);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (23,160000,20006,20001);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (23,170000,20006,20004);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (23,190000,20006,20007);


INSERT INTO products VALUES (24,"Gối cao su non đa năng ",100000,20006,31,10,null,10000,0,
"<p>Dành cho bé từ sơ sinh, giúp ngăn ngừa tình trạng méo đầu, móp đầu, nghẹo cổ, còm lưng do sử dụng sai gối.</p>
<p>Gối được làm cao su non tự nhiên 100%, đàn hồi và độ êm ái rất cao</p>
<p>Thiết kế kích thước và độ lõm phù hợp với vòng đầu trẻ em Việt Nam, là cơ chế phòng chống, khắc phục méo đầu, nghẹo cổ rất hiệu quả</p>
",'2019/12/26','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (24,100000,20006,20006);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (24,150000,20006,20007);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (24,240000,20006,20001);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (24,290000,20006,20003);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (24,350000,20006,200012);

INSERT INTO products VALUES (25,"Máy Xay Sinh Tố Cầm Tay Philips HR1600",200000,20006,31,10,null,20000,0,
"<p>Công suất: 550W</p>
<p>Lưỡi dao bằng thép không gỉ rất sắc và bền</p>
<p>Công nghệ xay ProMix độc đáo tạo ra luồng tối ưu</p>
<p>Thiết kế nhỏ gọn với ly xay dung tích 500ml, dễ dàng di chuyển</p>
",'2019/12/26','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (25,200000,20006,20001);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (25,220000,20006,20002);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (25,240000,20006,20001);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (25,260000,20006,20003);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (25,300000,20006,20001);

-- Em bé
INSERT INTO products VALUES (26,"2 Sữa Bột Ensure Gold + 2 Sữa Nước Ensure Vigor",200000,20006,32,10,null,50000,0,
"<p>Được đặc chế với hỗn hợp chất béo giàu PUFA, MUFA</p>
<p>Bổ sung FOS (Fructo-oligosaccharides) giúp hệ tiêu hóa khỏe mạnh</p>
<p>Thích hợp cho người ăn uống kém và người bệnh cần phục hồi nhanh</p>",'2019/12/26','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (26,200000,20006,20001);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (26,250000,20006,20002);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (26,300000,20006,20001);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (26,360000,20006,20003);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (26,460000,20006,20001);

INSERT INTO products VALUES (27,"Sữa Bột Enfagrow A+ 4",200000,20006,32,10,null,50000,0,
"<p>Hỗ trợ phát triển não bộ và toàn diện</p>
<p>Tăng cường sức đề kháng</p>
<p>Giúp hệ tiêu hóa hoạt động tốt</p>",'2019/12/26','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (27,200000,20006,20003);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (27,250000,20006,20002);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (27,300000,20006,20001);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (27,360000,20006,20004);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (27,460000,20006,20005);

INSERT INTO products VALUES (28,"Thảm xốp silicone XPE nằm chơi cho Bé",100000,20006,32,10,null,10000,0,
"<p>Kích thước: 1M8 X 2M X 1CM</p>
<p>Bố mẹ lưu ý: Đây là kích thước sau khi bố mẹ đã trải thảm ra đầy đủ nhé, vì đây là thảm gấp. Kích thước gấp lại là: (90 cm x 40 cm x 10 cm).</p>
<p>Thảm xốp XPE Silicone còn gọi là Bọt cách nhiệt XPE-một loại vật liệu cao cấp)</p>",'2019/12/26','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (28,100000,20006,20003);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (28,120000,20006,20002);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (28,130000,20006,20009);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (28,160000,20006,200010);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (28,170000,20006,20006);


INSERT INTO products VALUES (29,"Ba Lô Fancy Clever Hippo Ban Nhạc BK1105",200000,20006,32,10,null,50000,0,
"<p>Sản phẩm siêu nhẹ và chống gù</p>
<p>Sử dụng nguyên phụ liệu an toàn</p>
<p>Có băng phản quang</p>
<p>Có quai đeo ngực trợ lực</p>",'2019/12/26','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (29,200000,20006,20003);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (29,250000,20006,20002);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (29,300000,20006,20001);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (29,360000,20006,20004);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (29,460000,20006,200010);

INSERT INTO products VALUES (30,"Tã Quần Huggies Dry Gói Cực Đại XL62",100000,20006,32,10,null,50000,0,
"<p>Thiết kế kiểu tã quần tiện lợi</p>
<p>Chất liệu khử mùi</p>
<p>Chống tràn hiệu quả</p>
<p>Hương thơm dịu dàng</p>",'2019/12/26','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (30,100000,20006,20003);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (30,150000,20006,200010);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (30,200000,20006,200011);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (30,260000,20006,200010);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (30,360000,20006,20006);

-- Thể thao 
INSERT INTO products VALUES (31,"Thảm Tập Gym Và Yoga TPE 2 Lớp 6MM2L",100000,20007,41,10,null,50000,0,
"<p>Chất liệu cao cấp</p>
<p>Thiết kế gọn gàng tiện lợi</p>
<p>Độ bám cao, chống trơn trợt</p>
<p>Màu sắc trang nhã</p>",'2019/12/26','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (31,100000,20007,20003);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (31,150000,20007,200010);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (31,200000,20007,200011);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (31,260000,20007,200010);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (31,360000,20007,20008);

INSERT INTO products VALUES (32,"Giày Thể Thao Nam Bitis's Hunter BKL DSMH02302DEN",600000,20007,41,10,null,50000,0,
"<p>Mũ quai LiteKnit: Co dãn, thoáng khí tối đa</p>
<p>Đệm TPU Film: Định hình và trợ lực gót chân</p>
<p>Đế lót kháng khuẩn và công nghệ 6 điểm: Giúp massage lòng bàn chân</p>
",'2019/12/26','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (32,600000,20007,20003);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (32,650000,20007,200010);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (32,700000,20007,200011);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (32,760000,20007,200010);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (32,860000,20007,20006);

INSERT INTO products VALUES (33,"Bộ cần câu rút cacbon đỏ Máy YF200 TRANPHU B12",100000,20007,41,10,null,20000,0,
"<p>Bộ cần câu rút cacbon đỏ Máy YF200 TRANPHU B12</p>
<p>Cần câu rút cacbon</p>
<p>Chất liệu kim loại</p>
<p>Độ dài: 1m8, 2m1, 2m4, 2m7, 3m, 3m6 thu gọn 60cm</p>",'2019/12/26','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (33,100000,20007,20003);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (33,150000,20007,200010);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (33,200000,20007,200011);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (33,260000,20007,200010);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (33,300000,20007,20001);

INSERT INTO products VALUES (34,"Vợt cầu lông APACS NANO 9900 new",300000,20007,41,10,null,50000,0,
"<p>Được sản xuất bằng chất liệu24T Japan High Modulus Graphite + ZigZag Holes + Power Delta siêu bền</p>
<p>Màu sắc trẻ trung nổi bật</p>
<p>Mẫu vợt thích hợp cho người chơi mới có lực cổ tay trung bình</p>
<p>Sản phẩm chính hãng ( made in Malaysia )</p>",'2019/12/26','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (34,300000,20007,20003);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (34,350000,20007,20001);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (34,400000,20007,200012);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (34,460000,20007,200011);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (34,560000,20007,20004);

INSERT INTO products VALUES (35," Vợt cầu lông Dunlop - HYPER FIBRE X7.6 G1",500000,20007,41,10,null,50000,0,
"<p>Chất liệu cao cấp, bền bỉ, sử dụng dài lâu</p>
<p>Độ cân bằng linh hoạt, thích hợp với mọi lối chơi ở mọi cấp độ khác nhau</p>
<p>Công nghệ HM Carbon mới nhất giúp gia tăng cảm giác</p>
<p>Trọng lượng nhẹ và khả năng kiểm soát tốt</p>",'2019/12/26','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (35,500000,20007,20003);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (35,550000,20007,20001);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (35,700000,20007,20004);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (35,760000,20007,200010);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (35,860000,20007,20007);

-- Dã Ngoại
INSERT INTO products VALUES (36,"Dao Xếp Đa Năng Victorinox - Classic 0.6223",100000,20007,42,10,null,10000,0,
"<p>Kích thước nhỏ gọn, linh hoạt và tiện dụng cho những hoạt động dã ngoại, cắm trại ngoài trời</p>
<p>Dao có 7 chức năng như: Dao, Giũa móng tay, Chìa vít, Kéo, Móc chìa khóa, Nhíp, Xỉa răng</p>
<p>Sản phẩm Victorinox được hưởng chế độ bảo hành trọn đời</p>",'2019/12/26','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (36,150000,20007,20003);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (36,250000,20007,20001);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (35,270000,20007,20004);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (36,290000,20007,200011);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (36,360000,20007,20009);

INSERT INTO products VALUES (37,"Túi ngủ dã ngoại",100000,20007,42,10,null,10000,0,
"<p>Kích thước: (180 +30)X 75cm</p>
<p>Cân nặng: 1kg</p>
<p>Chịu nhiệ độ: Từ 10 độ trở lên</p>
<p>Thích hợp sử dụng cho 4 mùa, có thể mang theo đi du lịch</p>
<p>Kích thước gấp gọn: 38X20X20CM</p>",'2019/12/26','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (37,150000,20007,20003);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (37,160000,20007,20001);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (37,170000,20007,20004);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (37,180000,20007,200011);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (37,190000,20007,20009);

INSERT INTO products VALUES (38,"Găng tay chống nắng xỏ ngón Aqua-X Let's Slim",50000,20007,42,10,null,5000,0,
"<p>Chống nắng, tia UV, sử dụng cho nhiều mục đích đa dạng</p>
<p>Tạo cảm giác thoáng mát, gọn nhẹ, dễ sử dụng</p>
<p>Chất liệu: thun mềm, nhẹ, thấm mồ hôi</p>",'2019/12/26','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (38,50000,20007,20003);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (38,55000,20007,20001);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (38,60000,20007,20002);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (38,70000,20007,20001);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (38,80000,20007,20005);

INSERT INTO products VALUES (39,"Bật lửa điện hồng ngoại cảm ứng vân tay Lighter",100000,20007,42,10,null,10000,0,
"<p>Không đơn giản là chiếc bật-lửa thông thường, bởi chiếc bật-lửa còn mang một ý nghĩa may mắn, rất thích hợp làm quà tặng. </p>
<p>Đặc điểm của chiếc bật-lửa cảm ứng vân tay là thiết đẹp mỏng, màu săc tinh tế mang lại phong cách nổi bật cho người sử dụng.</p>
<p>Bật-lửa với điểm nhấn cực kỳ độc là lên lửa qua cảm ứng vân tay rất sang trọng, lửa mạnh, lâu không ngại gió mạnh.</p>
",'2019/12/26','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (39,150000,20007,20002);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (39,160000,20007,20001);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (39,170000,20007,20004);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (39,190000,20007,20003);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (39,260000,20007,20005);

INSERT INTO products VALUES (40,"ĐÈN PIN ĐỘI ĐẦU 3 BÓNG SIÊU SÁNG",100000,20007,42,10,null,10000,0,
"<p>Ánh sáng	 Trắng ấm</p>
<p>Độ sáng 	 2200 lumens maximum </p>
<p>Pin 	 2 x 18650 7800mAh, 3.7V</p>
<p>Chế độ sáng 	 4 chế độ (1 LED - 2 LED - 3 LED - Chớp)</p>
<p>Thời gian sáng 	 Rất lâu tùy thuộc chế độ sáng</p>",'2019/12/26','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (40,100000,20007,20002);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (40,110000,20007,20001);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (40,120000,20007,20004);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (40,130000,20007,20003);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (40,140000,20007,20007);

-- Làm đẹp

INSERT INTO products VALUES (41,"Bộ Sản Phẩm Gel Rửa Mặt Làm Sạch & Giảm Nhờn",100000,20008,51,10,null,20000,0,
"<p>Chăm sóc làn da mụn hiệu quả</p>
<p>Nhẹ nhàng làm sạch da từ sâu trong lỗ chân lông và bã nhờn</p>
<p>Đẩy lùi khuẩn mụn, làm mờ vết thâm và ngăn ngừa mụn</p>",'2019/12/26','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (41,100000,20008,20002);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (41,120000,20008,20001);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (41,140000,20008,20004);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (41,160000,20008,20003);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (41,180000,20008,20002);

INSERT INTO products VALUES (42,"Bộ Đôi Kem chống nắng kiềm dầu khô thoáng hoàn hảo",200000,20008,51,10,null,20000,0,
"<p>Chống trôi trong nước &amp; mồ hôi mạnh mẽ hơn với công nghệ độc quyền Aqua Booster EX</p>
<p>Công nghệ chống ma sát độc đáo</p>
<p>50% thành phần dưỡng da mịn mượt, kiểm soát bóng dầu</p>
<p>Ngăn chặn tác hại của tia UV trên mọi bề mặt da và mọi góc độ</p>",'2019/12/26','2020/1/5');


-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (42,200000,20008,20002);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (42,220000,20008,20001);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (42,240000,20008,20003);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (42,260000,20008,20004);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (42,280000,20008,20005);

INSERT INTO products VALUES (43,"Bộ Mặt Nạ Ngủ Dưỡng Ẩm Laneige Water Sleeping Mask ",200000,20008,51,10,null,20000,0,
"<p>Mặt Nạ Ngủ Dưỡng Ẩm Laneige Water Sleeping Mask (70ml)</p>
<p>Mặt Nạ Ngủ Dưỡng Ẩm Laneige Water Sleeping Mask (15ml)</p>
<p>Mặt Nạ Ngủ Dưỡng Ẩm Hương Hoa Oải Hương Laneige Water Sleeping Mask Lavender (15ml)</p>
<p>Mặt Nạ Ngủ Cho Môi Laneige Lip Sleeping Mask (3g)</p>",'2019/12/26','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (43,200000,20008,20002);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (43,220000,20008,20001);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (43,240000,20008,20004);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (43,260000,20008,20003);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (43,280000,20008,20002);

INSERT INTO products VALUES (44,"Son Bút Chì 3 Trong 1 Mamonde Creamy",100000,20008,51,10,null,20000,0,
"<p>Sự kết hợp 3 trong 1 giữa: son thỏi, son tint và son dưỡng</p>
<p>Màu sắc chuẩn xác, mịn mượt như nhung</p>
<p>20 tông màu cho bạn thoả thích lựa chọn</p>",'2019/12/26','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (44,100000,20008,200012);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (44,120000,20008,200011);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (44,140000,20008,200010);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (44,160000,20008,20003);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (44,180000,20008,20002);

INSERT INTO products VALUES (45,"Máy Rửa Mặt Halio Facial Cleansing & Massaging",300000,20008,51,10,null,20000,0,
"<p>Bộ sản phẩm gồm có:1 thân máy rửa mặt, 1 dây sạc USB</p>
<p>Sử dụng công nghệ sóng rung, làm sạch sâu mà vẫn dịu nhẹ với làn da, kể cả da khô và lão hoá</p>
<p>Thay đổi tới 14 chế độ rung, phù hợp với cả những làn da nhạy cảm nhất</p>
<p>Bề mặt cọ rộng hơn, nhanh chóng rửa sạch toàn bộ khuôn mặt.</p>",'2019/12/26','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (45,300000,20008,20002);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (45,320000,20008,20001);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (45,340000,20008,20005);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (45,360000,20008,20006);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (45,380000,20008,20007);

-- Thời trang

INSERT INTO products VALUES (46,"Vali Nhựa Kamiliant AY9 Kapa TSA",300000,20008,52,10,null,20000,0,
"<p>Chất liệu ABS (Acrylonitrile Butadiene Styrene) có độ đàn hồi tốt</p>
<p>Tay cầm làm bằng nhôm chất lượng cao</p>
<p>Thiết kế bề mặt với các đường nét độc đáo</p>
<p>4 bánh xe đa chiều, xoay linh hoạt 360 độ</p>
<p>Hệ thống mã khóa TSA an ninh chuẩn Hoa Kỳ</p>",'2019/12/26','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (46,300000,20008,20002);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (46,320000,20008,20001);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (46,440000,20008,20008);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (46,460000,20008,20009);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (46,480000,20008,200010);

INSERT INTO products VALUES (47,"Thắt lưng nam, dây nịt nam da thật NT63",100000,20008,52,10,null,10000,0,
"<p>Chất liệu da thật 100% , chống đứt gãy</p>
<p>Đầu khóa hợp kim không gỉ sáng bóng thời thượng</p>
<p>Đường chỉ may tỉ mỉ, chắc chắn</p>
<p>Kiểu dáng đẳng cấp sang trọng</p>
<p>Tông màu lịch lãm, dễ kết hợp trang phục</p>",'2019/12/26','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (47,100000,20008,20002);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (47,120000,20008,20001);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (47,140000,20008,20003);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (47,160000,20008,200011);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (47,180000,20008,200012);

INSERT INTO products VALUES (48,"Giày Sneaker Unisex Converse Chuck Taylor All Star 1970s",1000000,20008,52,10,null,1000000,0,
"<p>Chất vải canvas nhẹ, tạo cảm giác thoải mái</p>
<p>Lớp lót dày tạo cảm giác êm ái khi vận động</p>
<p>Phiên bản mới lớp lót được cải tiến êm hơn &amp; có thể tháo rời </p>
<p>Phần đế màu trắng ngà vintage được phủ 1 lớp bóng bên ngoài</p>
<p>Logo bên hông giày với phù hiệu của Converse All Star kết hợp với chữ ký của Chuck Taylor</p>",'2019/12/26','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (48,1000000,20008,20001);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (48,1100000,20008,20002);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (48,1200000,20008,20003);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (48,1300000,20008,20004);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (48,1400000,20008,20007);

INSERT INTO products VALUES (49,"Đồng Hồ Nam Điện Tử Thể Thao SKMEI 1155 - DHA440",200000,20008,52,10,null,20000,0,
"<p>Chính hãng SKMEI</p>
<p>Thiết kế thời trang, hiện đại</p>
<p>Chống shock, chống va đập</p>
<p>Bộ máy Quartz Nhật</p>
<p>Độ chống nước 5ATM: tắm nhanh, rửa tay, rửa măt; Không tắm nước nóng và bơi nước mặn</p>",'2019/12/26','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (49,200000,20008,20002);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (49,220000,20008,20001);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (49,240000,20008,20008);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (49,260000,20008,20009);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (49,280000,20008,20001);

INSERT INTO products VALUES (50,"ÁO KHOÁC HOODIE HỌA TIẾT RỒNG LỬA ",300000,20008,52,10,null,20000,0,
"<p>Áo chất nỉ bông dầy ấm, 1 lớp nỉ.</p>
<p>Áo sáng màu, in nhiệt chống  bong tróc</p>
<p>Kiểu dáng thời trang, áo tay dài, có mũ trùm đầu, có túi ốp ở bụng.</p>
<p>Áo dáng xuông, mặc rất thoải mái, dễ phối đồ.</p>
<p>Kiểu dáng trẻ trung, nam hay nữ đều mặc được.</p>",'2019/12/26','2020/1/5');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (50,300000,20008,20002);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (50,320000,20008,20001);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (50,440000,20008,20008);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (50,460000,20008,20009);
insert into ordersdetails(ProID,PriceOrdered,SellerID,BidderID) values (50,480000,20008,20007);

INSERT INTO products VALUES (51,"Dell Inspiron 7591 i5 9300H (N5I5591W)",20000000,20005,11,10,null,1000000,0,
"<span>Màn hình: 15.6 inch, Full HD (1920 x 1080)</span>
<span>CPU: Intel Core i5 Coffee Lake, 2.40 GHz</span>
<span>RAM: 8 GB, SSD 256GB NVMe PCIe, Hỗ trợ khe cắm HDD SATA</span>
<span>Đồ họa: NVIDIA GeForce GTX 1050, 3GB</span>",'2019/12/25','2020/1/2');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,OrderDate ,IsSuccess,SellerID,BidderID) values (51,20000000,"2019/12/31",0,20005,20002);
insert into ordersdetails(ProID,PriceOrdered,OrderDate ,IsSuccess,SellerID,BidderID) values (51,23000000,"2019/12/31",0,20005,20005);
insert into ordersdetails(ProID,PriceOrdered,OrderDate ,IsSuccess,SellerID,BidderID) values (51,25000000,"2019/12/31",0,20005,20003);
insert into ordersdetails(ProID,PriceOrdered,OrderDate ,IsSuccess,SellerID,BidderID) values (51,27000000,"2019/12/31",0,20005,20008);
insert into ordersdetails(ProID,PriceOrdered,OrderDate ,IsSuccess,SellerID,BidderID) values (51,29000000,"2019/12/31",1,20005,20001);

INSERT INTO products VALUES (52,"Dell Inspiron 7373 i5 8250U (C3TI501OW)",20000000,20005,11,10,null,1000000,0,
"<span>Màn hình: 13.3 inch, Full HD (1920 x 1080)</span>
<span>CPU: Intel Core i5 Kabylake Refresh, 1.60 GHz</span>
<span>RAM: 8 GB, SSD 256GB NVMe PCIe, Hỗ trợ khe cắm HDD SATA</span>
<span>Đồ họa: NVIDIA GeForce GTX 1050, 3GB</span>",'2019/12/25','2020/1/2');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,OrderDate ,IsSuccess,SellerID,BidderID) values (52,20000000,"2019/12/31",0,20005,20002);
insert into ordersdetails(ProID,PriceOrdered,OrderDate ,IsSuccess,SellerID,BidderID) values (52,21000000,"2019/12/31",0,20005,20006);
insert into ordersdetails(ProID,PriceOrdered,OrderDate ,IsSuccess,SellerID,BidderID) values (52,22000000,"2019/12/31",0,20005,200010);
insert into ordersdetails(ProID,PriceOrdered,OrderDate ,IsSuccess,SellerID,BidderID) values (52,23000000,"2019/12/31",0,20005,200011);
insert into ordersdetails(ProID,PriceOrdered,OrderDate ,IsSuccess,SellerID,BidderID) values (52,26000000,"2019/12/31",1,20005,200012);

INSERT INTO products VALUES (53,"Dell XPS 13 9370 i7 8550U (415PX3)",30000000,20005,11,10,null,1000000,0,
"<span>Màn hình: 13.3 inch, Full HD (1920 x 1080)</span>
<span>CPU: Intel Core i7 Coffee Lake, 1.80 GHz</span>
<span>RAM: 8 GB, SSD 256GB NVMe PCIe</span>
<span>Đồ họa: Intel® UHD Graphics 620</span>
<span>Nặng: 1.21 kg, Pin: Li-Ion 4 cell</span>",'2019/12/25','2020/1/2');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,OrderDate ,IsSuccess,SellerID,BidderID) values (53,30000000,"2019/12/31",0,20005,20002);
insert into ordersdetails(ProID,PriceOrdered,OrderDate ,IsSuccess,SellerID,BidderID) values (53,31000000,"2019/12/31",0,20005,20006);
insert into ordersdetails(ProID,PriceOrdered,OrderDate ,IsSuccess,SellerID,BidderID) values (53,32000000,"2019/12/31",0,20005,200010);
insert into ordersdetails(ProID,PriceOrdered,OrderDate ,IsSuccess,SellerID,BidderID) values (53,33000000,"2019/12/31",0,20005,200011);
insert into ordersdetails(ProID,PriceOrdered,OrderDate ,IsSuccess,SellerID,BidderID) values (53,36000000,"2019/12/31",1,20005,20008);

INSERT INTO products VALUES (54,"Dell XPS 13 7390 i5 10210U (70197462)",25000000,20005,11,10,null,1000000,0,
"<span>Màn hình: 13.3 inch, Full HD (1920 x 1080)</span>
<span>CPU: Intel Core i5 Comet Lake, 1.60 GHz</span>
<span>RAM: 8 GB, SSD 256GB NVMe PCIe</span>
<span>Đồ họa: Intel UHD Graphics</span>
<span>Nặng: 1.29 kg, Pin: Li-Ion 4 cell</span>",'2019/12/25','2020/1/2');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,OrderDate ,IsSuccess,SellerID,BidderID) values (54,30000000,"2019/12/31",0,20005,20002);
insert into ordersdetails(ProID,PriceOrdered,OrderDate ,IsSuccess,SellerID,BidderID) values (54,31000000,"2019/12/31",0,20005,20006);
insert into ordersdetails(ProID,PriceOrdered,OrderDate ,IsSuccess,SellerID,BidderID) values (54,32000000,"2019/12/31",0,20005,200010);
insert into ordersdetails(ProID,PriceOrdered,OrderDate ,IsSuccess,SellerID,BidderID) values (54,33000000,"2019/12/31",0,20005,200011);
insert into ordersdetails(ProID,PriceOrdered,OrderDate ,IsSuccess,SellerID,BidderID) values (54,34000000,"2019/12/31",1,20005,20008);

INSERT INTO products VALUES (55,"iPhone 11 Pro Max 512GB",25000000,20005,11,10,null,1000000,0,
"<span>Màn hình: 6.5 In, Super Retina XDR</span>
<span>CPU: Apple A13 Bionic 6 nhân</span>
<span>RAM: 4 GB, ROM: 512 GB</span>
<span>Camera: 3 camera 12 MP</span>
<span>PIN: 3969 mAh, có sạc nhanh</span>",'2019/12/25','2020/1/2');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,OrderDate ,IsSuccess,SellerID,BidderID) values (55,26000000,"2019/12/31",0,20005,20002);
insert into ordersdetails(ProID,PriceOrdered,OrderDate ,IsSuccess,SellerID,BidderID) values (55,28000000,"2019/12/31",0,20005,20006);
insert into ordersdetails(ProID,PriceOrdered,OrderDate ,IsSuccess,SellerID,BidderID) values (55,32000000,"2019/12/31",0,20005,200010);
insert into ordersdetails(ProID,PriceOrdered,OrderDate ,IsSuccess,SellerID,BidderID) values (55,33000000,"2019/12/31",0,20005,200011);
insert into ordersdetails(ProID,PriceOrdered,OrderDate ,IsSuccess,SellerID,BidderID) values (55,34000000,"2019/12/31",1,20005,20007);

INSERT INTO products VALUES (56,"iPhone 11 Pro Max 256GB",22000000,20005,11,10,null,1000000,0,
"<span>Màn hình: 6.5 In, Super Retina XDR</span>
<span>CPU: Apple A13 Bionic 6 nhân</span>
<span>RAM: 4 GB, ROM: 256 GB</span>
<span>Camera: 3 camera 12 MP</span>
<span>PIN: 3969 mAh, có sạc nhanh</span>",'2019/12/25','2020/1/2');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,OrderDate ,IsSuccess,SellerID,BidderID) values (56,23000000,"2019/12/31",0,20005,20002);
insert into ordersdetails(ProID,PriceOrdered,OrderDate ,IsSuccess,SellerID,BidderID) values (56,26000000,"2019/12/31",0,20005,20006);
insert into ordersdetails(ProID,PriceOrdered,OrderDate ,IsSuccess,SellerID,BidderID) values (56,37000000,"2019/12/31",0,20005,200010);
insert into ordersdetails(ProID,PriceOrdered,OrderDate ,IsSuccess,SellerID,BidderID) values (56,29000000,"2019/12/31",0,20005,20009);
insert into ordersdetails(ProID,PriceOrdered,OrderDate ,IsSuccess,SellerID,BidderID) values (56,30000000,"2019/12/31",1,20005,20007);


INSERT INTO products VALUES (57,"iPhone 11 Pro Max 256GB",22000000,20005,11,10,null,1000000,0,
"<span>Màn hình: 6.5 In, Super Retina XDR</span>
<span>CPU: Apple A13 Bionic 6 nhân</span>
<span>RAM: 4 GB, ROM: 256 GB</span>
<span>Camera: 3 camera 12 MP</span>
<span>PIN: 3969 mAh, có sạc nhanh</span>",'2019/12/25','2020/1/2');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,OrderDate ,IsSuccess,SellerID,BidderID) values (57,23000000,"2019/12/31",0,20005,20002);
insert into ordersdetails(ProID,PriceOrdered,OrderDate ,IsSuccess,SellerID,BidderID) values (57,26000000,"2019/12/31",0,20005,20006);
insert into ordersdetails(ProID,PriceOrdered,OrderDate ,IsSuccess,SellerID,BidderID) values (57,37000000,"2019/12/31",0,20005,200010);
insert into ordersdetails(ProID,PriceOrdered,OrderDate ,IsSuccess,SellerID,BidderID) values (57,29000000,"2019/12/31",0,20005,20009);
insert into ordersdetails(ProID,PriceOrdered,OrderDate ,IsSuccess,SellerID,BidderID) values (57,30000000,"2019/12/31",1,20005,20007);

INSERT INTO products VALUES (58,"iPhone XS Max 256GB",22000000,20005,11,10,null,1000000,0,
"<span>Màn hình: 6.5 In, Super Retina XDR</span>
<span>CPU: Apple A12 Bionic 6 nhân</span>
<span>Camera: Chính 12 MP &amp; Phụ 12 MP</span>
<span>Selfie: 7 MP</span>
<span>PIN: 3174 mAh, có sạc nhanh</span>",'2019/12/25','2020/1/2');

-- các lượt đấu giá
insert into ordersdetails(ProID,PriceOrdered,OrderDate ,IsSuccess,SellerID,BidderID) values (58,23000000,"2019/12/31",0,20005,20002);
insert into ordersdetails(ProID,PriceOrdered,OrderDate ,IsSuccess,SellerID,BidderID) values (58,26000000,"2019/12/31",0,20005,20006);
insert into ordersdetails(ProID,PriceOrdered,OrderDate ,IsSuccess,SellerID,BidderID) values (58,37000000,"2019/12/31",0,20005,200010);
insert into ordersdetails(ProID,PriceOrdered,OrderDate ,IsSuccess,SellerID,BidderID) values (58,29000000,"2019/12/31",0,20005,20009);
insert into ordersdetails(ProID,PriceOrdered,OrderDate ,IsSuccess,SellerID,BidderID) values (58,30000000,"2019/12/31",1,20005,200012);

-- ------------------------------------Watch List ---------------------------------------------
-- user 20002 
insert into watchlist(ProID,UserID) values (1,20002);
insert into watchlist(ProID,UserID) values (11,20002);
insert into watchlist(ProID,UserID) values (21,20002);
insert into watchlist(ProID,UserID) values (31,20002);
insert into watchlist(ProID,UserID) values (41,20002);

-- user 20003
insert into watchlist(ProID,UserID) values (2,20003);
insert into watchlist(ProID,UserID) values (12,20003);
insert into watchlist(ProID,UserID) values (13,20003);
insert into watchlist(ProID,UserID) values (22,20003);
insert into watchlist(ProID,UserID) values (32,20003);
insert into watchlist(ProID,UserID) values (42,20003);
-- user 200011
insert into watchlist(ProID,UserID) values (11,200011);
insert into watchlist(ProID,UserID) values (12,200011);
insert into watchlist(ProID,UserID) values (13,200011);
insert into watchlist(ProID,UserID) values (14,200011);
insert into watchlist(ProID,UserID) values (15,200011);
insert into watchlist(ProID,UserID) values (36,200011);
-- user 200012
insert into watchlist(ProID,UserID) values (21,200012);
insert into watchlist(ProID,UserID) values (12,200012);
insert into watchlist(ProID,UserID) values (13,200012);
insert into watchlist(ProID,UserID) values (24,200012);
insert into watchlist(ProID,UserID) values (15,200012);
insert into watchlist(ProID,UserID) values (38,200012);

insert into promotion(UserID) values (20002);
insert into promotion(UserID) values (20003);

insert into review(OrderID, Review, SendID, ReciveID) values (285, 8, 20005, 20007);
insert into review(OrderID, Review, SendID, ReciveID) values (285, 8, 20007, 20005);
insert into review(OrderID, Review, SendID, ReciveID) values (290, 8, 20005, 200012);
insert into review(OrderID, Review, SendID, ReciveID) values (290, 8, 200012, 20005);

