drop table if exists `books`;
create table books(
    id int not null auto_increment primary key,
    isbn varchar(20) not null,
    openId varchar(50) not null,
    title varchar(100) not null,
    image varchar(100) not null,
    alt varchar(100) not null,
    publisher varchar(100) not null,
    summary varchar(1000) not null,
    price varchar(100),
    rate float,
    tags varchar(100),
    count int default 0,
    author varchar(100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='图书表';

