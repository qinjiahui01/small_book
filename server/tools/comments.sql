drop table if exists `comments`;
create table comments(
    id int not null auto_increment primary key,
    openId varchar(50) not null,
    bookId varchar(10) not null,
    comment varchar(200) not null,
    phone varchar(20),
    location varchar(50)
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='评论表';